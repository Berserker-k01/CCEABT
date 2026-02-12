import { ExternalLink, Handshake, Globe, Users, Building2, ShieldCheck } from 'lucide-react';

import { useTranslation } from 'react-i18next';
import { useData } from '../context/DataContext';
import { getPartnerStatus } from '../utils/partnerStatus';
import { findPartnerImage, generateImagePaths } from '../utils/partnerUtils';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


export default function Partners() {
  const { t } = useTranslation();
  const { partners } = useData();
  console.log('All Partners:', partners);
  console.log('Institutional Partners Raw:', partners.filter(p => p.type === 'Institutionnel'));


  // Force uniqueness by name to prevent any display duplicates (Data hygiene safety)
  const uniquePartners = Array.from(
    new Map(partners.map(p => [p.name.trim().toLowerCase(), p])).values()
  );

  const internationalMembers = uniquePartners
    .filter(p => p.type === 'International' && getPartnerStatus(p.name) === 'Other')
    .sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }));
  const nationalMembers = uniquePartners
    .filter(p => p.type === 'National' && getPartnerStatus(p.name) === 'Other')
    .sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }));
  const institutionalPartners = uniquePartners
    .filter(p => p.type === 'Institutionnel')
    .sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }));
  // PTF category: all PTF members regardless of type
  const techFinPartners = uniquePartners
    .filter(p => getPartnerStatus(p.name) === 'PTF')
    .sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }));

  const getTranslatedType = (type: string) => {
    switch (type) {
      case 'International': return t('network.type_international');
      case 'National': return t('network.type_national');
      case 'Institutionnel': return t('network.type_institutional');
      case 'Technique': return t('network.type_technical');
      case 'Financier': return t('network.type_financial');
      default: return type;
    }
  };

  // Carousel Logic (Moved to Top Level)
  const carouselPartners = [
    'PADI', 'Chaine de l\'espoir', 'FIADI', 'ODIAE', 'ADESCO', 'AJT', 'CDD',
    'AESEN', 'AFD', 'UE', 'PSEAU', 'Coalition Eau', 'SWA', 'AAFEA', 'ENDWATERPOVERTY',
    'Ambassade de France au Togo', 'GENDA Water Alliance', 'Plan International Togo', 'SEVES', 'CAWST'
  ];
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselPartners.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const currentPartnerName = carouselPartners[carouselIndex];

  // --- Premium Components ---



  const PartnerCard = ({ partner }: { partner: any }) => {
    const [imageState, setImageState] = useState({
      path: (partner.logo && partner.logo.trim() !== "") ? partner.logo : findPartnerImage(partner.name),
      error: false,
      triedPaths: [] as string[]
    });

    const handleImageError = () => {
      const allPaths = [partner.logo, findPartnerImage(partner.name), ...generateImagePaths(partner.name)].filter(Boolean) as string[];
      const currentIndex = allPaths.indexOf(imageState.path || '');

      if (currentIndex < allPaths.length - 1) {
        setImageState(prev => ({
          ...prev,
          path: allPaths[currentIndex + 1],
          triedPaths: [...prev.triedPaths, prev.path || '']
        }));
      } else {
        setImageState(prev => ({ ...prev, error: true }));
      }
    };

    return (
      <div className="group relative bg-white rounded-[2.5rem] p-8 border border-gray-100 hover:border-blue-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] transition-all duration-700 h-full flex flex-col overflow-hidden">
        {/* Subtle Gradient Glow */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-8">
            <div className="h-16 w-full flex items-center justify-start group-hover:scale-105 transition-transform duration-500 origin-left">
              {imageState.path && !imageState.error ? (
                <img
                  src={imageState.path}
                  alt={partner.name}
                  className="max-h-full max-w-[140px] object-contain"
                  onError={handleImageError}
                />
              ) : (
                <div className="h-16 w-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center border border-blue-100 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  {partner.type === 'International' ? <Globe className="text-blue-400" size={32} /> :
                    partner.type === 'Institutionnel' ? <Building2 className="text-indigo-400" size={32} /> :
                      <Users className="text-blue-400" size={32} />}
                </div>
              )}
            </div>
            {partner.website && (
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform group-hover:-translate-y-1"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-4 line-clamp-2">
            {partner.name}
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
            {partner.description || t('partners_page.committed_desc')}
          </p>

          <div className="pt-6 border-t border-gray-50">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600/60 py-1.5 px-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                {getTranslatedType(partner.type)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PartnerSection = ({ title, icon: Icon, colorClass, data }: any) => {
    if (data.length === 0) return null;

    return (
      <div className="mb-40">
        <div className="flex items-end justify-between mb-16 px-4">
          <div className="flex flex-col gap-4">
            <div className={`w-12 h-1.5 rounded-full ${colorClass}`}></div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-4">
              <Icon className="text-gray-300" size={32} />
              {title}
            </h2>
          </div>
          <div className="hidden md:block text-sm font-bold text-gray-400 uppercase tracking-widest">
            {data.length} {t('partners_page.partners_found')}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.map((partner: any, index: number) => (
            <PartnerCard key={index} partner={partner} />
          ))}
        </div>
      </div>
    );
  };


  return (
    <div className="relative bg-white text-gray-900 min-h-screen selection:bg-blue-500/30">
      {/* 1. Cinematic Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes reveal {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .reveal-view {
          animation: reveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      {/* Hero Section - Elite Cinematic Style (RESTORED DARK) */}
      <section className="relative pt-48 pb-64 overflow-hidden border-b border-white/5 bg-[#050810] text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-blue-600/10 rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-green-500/5 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="reveal-view">
              <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl px-5 py-2 rounded-full mb-12 border border-white/10 shadow-2xl">
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]"></div>
                <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-60">{t('home.partners_subtitle')}</span>
              </div>

              <h1 className="text-7xl md:text-[10rem] font-black mb-10 leading-[0.85] tracking-[-0.04em]">
                {t('network.hero_title').split(' ').map((word, i) => (
                  <span key={i} className={`inline-block ${i % 2 === 1 ? 'text-transparent bg-clip-text bg-[linear-gradient(135deg,#60A5FA_0%,#3B82F6_50%,#2563EB_100%)]' : 'text-white'}`}>
                    {word}{' '}
                  </span>
                ))}
              </h1>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-10 mt-16 mt-20">
                <div className="h-px w-24 bg-gradient-to-r from-blue-500 to-transparent hidden md:block"></div>
                <p className="text-xl md:text-2xl leading-relaxed text-gray-400 max-w-2xl font-light tracking-wide">
                  {t('network.hero_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Main Content Area */}
      <section className="py-40">
        <div className="container mx-auto px-4">

          <div className="max-w-7xl mx-auto mt-40">
            {/* Single-Logo Infinite Carousel - Elite Box Design */}
            {/* Landscape Partner Card - Elite Compact Design */}
            <div className="reveal-view mb-40" style={{ animationDelay: '0.4s' }}>
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden relative transform hover:-translate-y-1 transition-transform duration-500 min-h-[220px] flex flex-col md:flex-row">
                  {/* Decorative background element */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-50 to-transparent rounded-full -mr-10 -mt-10 opacity-70 pointer-events-none blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-green-50 to-transparent rounded-full -ml-10 -mb-10 opacity-70 pointer-events-none blur-2xl"></div>

                  {/* Left Side: Logo Carousel */}
                  <div className="relative z-10 w-full md:w-5/12 border-b md:border-b-0 md:border-r border-gray-100 bg-white/50 backdrop-blur-sm p-6 flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center relative min-h-[160px]">
                      <div className="w-full h-full flex items-center justify-center relative min-h-[160px]">
                        {/* Carousel Display */}
                        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                          <AnimatePresence mode="popLayout">
                            <motion.div
                              key={carouselIndex}
                              initial={{ opacity: 0, x: 100 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -100 }}
                              transition={{ duration: 0.5, ease: "easeInOut" }}
                              className="absolute inset-0 flex items-center justify-center w-full h-full"
                            >
                              {(() => {
                                const name = currentPartnerName;
                                const imageUrl = findPartnerImage(name);
                                const isUrl = imageUrl && (imageUrl.startsWith('http') || imageUrl.startsWith('/'));

                                return (
                                  <div className="w-full h-full flex items-center justify-center">
                                    {isUrl ? (
                                      <img
                                        src={imageUrl}
                                        alt={name}
                                        className="max-h-32 max-w-[90%] object-contain drop-shadow-sm"
                                      />
                                    ) : (
                                      <div className="flex flex-col items-center">
                                        <div className="bg-blue-50 p-5 rounded-2xl mb-3">
                                          <Users className="text-blue-500" size={40} />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })()}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Text Content */}
                  <div className="relative z-10 w-full md:w-7/12 p-6 md:p-10 flex flex-col justify-center text-left">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="inline-flex items-center justify-center p-2 rounded-xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100">
                        <Handshake size={20} />
                      </div>
                      <h2 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight">
                        {t('home.partners_ptf_title')} <span className="text-blue-600">&</span> {t('home.partners_ca_title')}
                      </h2>
                    </div>

                    <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4"></div>

                    <p className="text-base text-gray-500 leading-relaxed font-medium">
                      Nous sommes fiers de collaborer avec ces organisations qui partagent notre vision pour un meilleur accès à l'eau et à l'assainissement au Togo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* National Members */}
            <div className="reveal-view" style={{ animationDelay: '0.6s' }}>
              <PartnerSection
                title={t('partners_page.national_title')}
                icon={Users}
                colorClass="bg-green-600"
                data={nationalMembers}
              />
            </div>

            {/* International Members */}
            <div className="reveal-view" style={{ animationDelay: '0.8s' }}>
              <PartnerSection
                title={t('partners_page.international_title')}
                icon={Globe}
                colorClass="bg-blue-600"
                data={internationalMembers}
              />
            </div>

            {/* Institutional Partners */}
            <div className="reveal-view" style={{ animationDelay: '1.0s' }}>
              <PartnerSection
                title={t('partners_page.institutional_title')}
                icon={Building2}
                colorClass="bg-purple-600"
                data={institutionalPartners}
              />
            </div>

            {/* Technical & Financial Partners */}
            <div className="reveal-view" style={{ animationDelay: '1.2s' }}>
              <PartnerSection
                title={t('partners_page.tech_fin_title')}
                icon={ShieldCheck}
                colorClass="bg-yellow-600"
                data={techFinPartners}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Elite Hybrid Version */}
      <section className="py-40 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto reveal-view">
            <Handshake className="mx-auto mb-12 text-blue-600/40" size={100} />

            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter">
              {t('home.view_all_members').split('...').join('')}
            </h2>

            <p className="text-2xl text-gray-600 mb-16 font-light max-w-2xl mx-auto leading-relaxed">
              {t('home.cta_subtitle')}
            </p>

            <button
              onClick={() => window.location.href = '/contact'}
              className="group relative bg-blue-600 text-white px-12 py-6 rounded-full font-black text-xl hover:bg-blue-700 transition-all duration-500 shadow-xl hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10">{t('home.contact_us')}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
