import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { generateImagePaths, findPartnerImage } from '../utils/partnerUtils';
import { useData } from '../context/DataContext';
import { Globe, Users, Building2 } from 'lucide-react';

interface PartnerScrollBandProps {
  partners: string[];
  title: string;
  icon: React.ReactNode;
  gradientFrom: string;
  partnerType?: 'CA' | 'PTF';
}

interface PartnerImageState {
  currentPath: string | null;
  error: boolean;
  triedPaths: string[];
}

export default function PartnerScrollBand({
  partners,
  title,
  icon,
  gradientFrom
}: PartnerScrollBandProps) {
  const { partners: allPartners } = useData();
  const [imageStates, setImageStates] = useState<Record<string, PartnerImageState>>({});
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);

  // Group partners into pages
  const totalPages = Math.ceil(partners.length / itemsPerPage);

  // Triple the pages for infinite loop effect
  const basePages = Array.from({ length: totalPages }, (_, i) =>
    partners.slice(i * itemsPerPage, (i + 1) * itemsPerPage)
  );
  // We use 3 sets to ensure we can always slide forward
  const displayPages = [...basePages, ...basePages, ...basePages];
  const centerOffset = totalPages;

  // Initial set centerOffset
  useEffect(() => {
    if (totalPages > 0) {
      setIsTransitioning(false);
      setDisplayIndex(centerOffset);
    }
  }, [totalPages, centerOffset]);

  // Auto-pagination logic
  useEffect(() => {
    if (totalPages <= 1) return;
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setDisplayIndex((prev: number) => prev + 1);
    }, 6500);
    return () => clearInterval(timer);
  }, [totalPages]);

  // Handle jump-back for infinite loop
  const handleAnimationComplete = () => {
    if (displayIndex >= 2 * totalPages) {
      // Jump back to the equivalent page in the middle set
      setIsTransitioning(false);
      setDisplayIndex(centerOffset);
    } else if (displayIndex < totalPages) {
      setIsTransitioning(false);
      setDisplayIndex(displayIndex + totalPages);
    }
  };

  // ... (findPartnerByName and image logic remains same)

  // Handle responsive items per page
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(4);
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const findPartnerByName = (name: string) => {
    const normalize = (str: string) =>
      str.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ')
        .replace(/[^a-z0-9\s]/g, '')
        .trim();

    const normalizedName = normalize(name);

    const nameMappings: Record<string, string[]> = {
      'padi': ['padi', 'padie'],
      'chaine de lespoir': ['chaine', 'espoir', 'chainedelespoir'],
      'fiadi': ['fiadi'],
      'odiae': ['odiae'],
      'adesco': ['adesco'],
      'ajt': ['ajt'],
      'cdd': ['cdd'],
      'aesen': ['aesen'],
      'afd': ['afd', 'agence francaise developpement'],
      'ue': ['ue', 'union europeenne', 'european union', 'eu'],
      'pseau': ['pseau'],
      'coalition eau': ['coalition eau', 'coalitioneau'],
      'swa': ['swa', 'sanitation water alliance'],
      'aafea': ['aafea'],
      'endwaterpoverty': ['endwaterpoverty', 'end water poverty', 'ewp'],
      'ambassade de france au togo': ['ambassade france', 'france togo', 'french embassy'],
      'genda water alliance': ['genda', 'genda water', 'genda alliance'],
      'plan international togo': ['plan international', 'plan togo'],
      'seves': ['seves'],
      'cawst': ['cawst']
    };

    return allPartners.find(p => {
      const partnerName = normalize(p.name);
      const partnerAcronym = p.acronym ? normalize(p.acronym) : '';
      if (partnerName === normalizedName || partnerAcronym === normalizedName) return true;
      const searchKey = normalizedName;
      if (nameMappings[searchKey]) {
        if (nameMappings[searchKey].some(v => partnerName.includes(v) || partnerAcronym.includes(v))) return true;
      }
      if (partnerName.includes(normalizedName) || normalizedName.includes(partnerName)) return true;
      return false;
    });
  };

  useEffect(() => {
    const initialStates: Record<string, PartnerImageState> = {};
    partners.forEach(name => {
      const directUrl = findPartnerImage(name);
      if (directUrl === null) {
        initialStates[name] = { currentPath: null, error: true, triedPaths: [] };
        return;
      }
      if (directUrl && directUrl.startsWith('http')) {
        initialStates[name] = { currentPath: directUrl, error: false, triedPaths: [] };
        return;
      }
      const partnerData = findPartnerByName(name);
      if (partnerData?.logo) {
        initialStates[name] = { currentPath: partnerData.logo, error: false, triedPaths: [] };
        return;
      }
      const paths = generateImagePaths(name);
      initialStates[name] = { currentPath: paths[0] || null, error: false, triedPaths: [] };
    });
    setImageStates(initialStates);
  }, [partners, allPartners]);

  const handleImageError = (partnerName: string) => {
    setImageStates(prev => {
      const current = prev[partnerName];
      if (!current) return prev;
      const allPaths: string[] = [];
      const directUrl = findPartnerImage(partnerName);
      if (directUrl && directUrl.startsWith('http')) allPaths.push(directUrl);
      const partnerData = findPartnerByName(partnerName);
      if (partnerData?.logo) allPaths.push(partnerData.logo);
      allPaths.push(...generateImagePaths(partnerName));
      const currentIndex = allPaths.indexOf(current.currentPath || '');
      if (currentIndex < allPaths.length - 1) {
        return {
          ...prev,
          [partnerName]: {
            currentPath: allPaths[currentIndex + 1],
            error: false,
            triedPaths: [...current.triedPaths, current.currentPath || '']
          }
        };
      }
      return { ...prev, [partnerName]: { ...current, error: true } };
    });
  };


  const PartnerCard = ({ name }: { name: string }) => {
    const state = imageStates[name];
    const hasImage = state?.currentPath && !state?.error;
    const partnerData = findPartnerByName(name);

    return (
      <div className="flex flex-col items-center justify-center p-3 h-80 transition-transform hover:scale-105">
        <div className="w-full h-full flex items-center justify-center relative bg-white/80 backdrop-blur-sm rounded-[2.5rem] border border-gray-100 shadow-md p-4 group overflow-hidden">
          {/* Subtle Gradient Glow */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>

          {hasImage ? (
            <img
              src={state.currentPath!}
              alt={name}
              className="max-w-full max-h-full object-contain filter group-hover:scale-110 transition-all duration-700"
              onError={() => handleImageError(name)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="h-16 w-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center border border-blue-100 shadow-inner group-hover:scale-110 transition-transform duration-500 mb-3">
                {partnerData?.type === 'International' ? <Globe className="text-blue-400" size={32} /> :
                  partnerData?.type === 'Institutionnel' ? <Building2 className="text-indigo-400" size={32} /> :
                    <Users className="text-blue-400" size={32} />}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-center px-2 line-clamp-1">
                {partnerData?.acronym || name}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <div className={`inline-flex items-center gap-3 ${gradientFrom} px-8 py-4 rounded-full mb-4 shadow-xl border border-white/50`}>
          <div className="text-blue-600">{icon}</div>
          <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
            {title}
          </h3>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 overflow-hidden" ref={containerRef}>
        <div className="flex items-center h-80 overflow-hidden">
          <motion.div
            animate={{ x: `-${displayIndex * 100}%` }}
            transition={{
              duration: isTransitioning ? 2.0 : 0,
              ease: isTransitioning ? [0.16, 1, 0.3, 1] : "linear"
            }}
            onAnimationComplete={handleAnimationComplete}
            className="flex w-full"
          >
            {displayPages.map((page, pageIdx) => (
              <div
                key={pageIdx}
                className="flex-shrink-0 w-full grid gap-4"
                style={{
                  gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))`
                }}
              >
                {page.map((name, index) => (
                  <div key={`${pageIdx}-${index}`}>
                    <PartnerCard name={name} />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Page Indicators removed for infinite unidirectional loop to feel more professional */}
      </div>
    </div>
  );
}
