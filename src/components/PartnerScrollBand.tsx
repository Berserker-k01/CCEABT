import { useState, useEffect } from 'react';
import { generateImagePaths } from '../utils/partnerUtils';

interface PartnerScrollBandProps {
  partners: string[];
  title: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  hoverColor: string;
  animationDuration?: string;
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
  gradientFrom,
  gradientTo,
  borderColor,
  hoverColor,
  animationDuration = '30s'
}: PartnerScrollBandProps) {
  const [imageStates, setImageStates] = useState<Record<string, PartnerImageState>>({});

  useEffect(() => {
    // Initialiser les états d'images pour tous les partenaires
    const initialStates: Record<string, PartnerImageState> = {};
    partners.forEach(name => {
      const paths = generateImagePaths(name);
      initialStates[name] = {
        currentPath: paths[0] || null,
        error: false,
        triedPaths: []
      };
    });
    setImageStates(initialStates);
  }, [partners]);

  const handleImageError = (partnerName: string) => {
    setImageStates(prev => {
      const current = prev[partnerName];
      if (!current) return prev;

      const allPaths = generateImagePaths(partnerName);
      const currentIndex = allPaths.indexOf(current.currentPath || '');
      
      if (currentIndex < allPaths.length - 1) {
        // Essayer le prochain chemin
        const nextPath = allPaths[currentIndex + 1];
        return {
          ...prev,
          [partnerName]: {
            currentPath: nextPath,
            error: false,
            triedPaths: [...current.triedPaths, current.currentPath || '']
          }
        };
      } else {
        // Tous les chemins ont été essayés, afficher le fallback
        return {
          ...prev,
          [partnerName]: {
            ...current,
            error: true
          }
        };
      }
    });
  };

  const PartnerCard = ({ name, isDuplicate = false }: { name: string; isDuplicate?: boolean }) => {
    const state = imageStates[name];
    const hasImage = state?.currentPath && !state?.error;

    return (
      <div
        className="flex-shrink-0 mx-8 flex flex-col items-center justify-center w-56 h-40"
      >
        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-2xl border-2 ${borderColor} p-6 relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm hover:border-opacity-100 border-opacity-60`}>
          {hasImage ? (
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={state.currentPath!}
                alt={name}
                className="max-w-[90%] max-h-[90%] object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-xl brightness-100 group-hover:brightness-110"
                onError={() => handleImageError(name)}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className={`w-20 h-20 rounded-full ${gradientFrom} flex items-center justify-center mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-3xl font-extrabold text-gray-600 group-hover:text-gray-800 transition-colors">{name.charAt(0)}</span>
              </div>
              <span className={`text-gray-700 font-bold text-center text-xs leading-tight ${hoverColor} group-hover:scale-105 transition-transform px-2`}>
                {name}
              </span>
            </div>
          )}
          
          {/* Effet de brillance au survol */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="text-center mb-10">
        <div className={`inline-flex items-center gap-3 ${gradientFrom} px-8 py-4 rounded-full mb-4 shadow-lg`}>
          {icon}
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
            {title}
          </h3>
        </div>
      </div>

      {/* Bande de défilement avec masques de gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl border-2 border-gray-200 py-12 backdrop-blur-sm">
        {/* Masques de gradient pour effet fade */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white via-white/95 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white via-white/95 to-transparent z-10 pointer-events-none"></div>
        
        {/* Ligne décorative en haut */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        
        <div className="flex animate-scroll-horizontal" style={{ animationDuration }}>
          {/* Première série */}
          {partners.map((name, index) => (
            <PartnerCard key={`partner-${index}`} name={name} />
          ))}
          
          {/* Duplication pour effet infini */}
          {partners.map((name, index) => (
            <PartnerCard key={`partner-dup-${index}`} name={name} isDuplicate={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
