import { ExternalLink, Handshake, Globe, Users, Building2, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useData } from '../context/DataContext';
import { getPartnerStatus } from '../utils/partnerStatus';
import { useState, useEffect } from 'react';

export default function Partners() {
  const { t } = useTranslation();
  const { partners } = useData();

  // Grouping partners and sorting alphabetically
  const internationalMembers = partners
    .filter(p => p.type === 'International');
  const nationalMembers = partners
    .filter(p => p.type === 'National')
    .sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }));
  const institutionalPartners = partners
    .filter(p => p.type === 'Institutionnel');
  // Filtrer uniquement les 13 PTF de la liste définitive (pas tous les Technique/Financier)
  const techFinPartners = partners
    .filter(p => getPartnerStatus(p.name) === 'PTF');

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

  // --- Premium Components ---

  // 1. Infinite Moving Marquee (Social Proof)
  const LogoMarquee = ({ logos }: { logos: string[] }) => {
    // Duplicate logos to ensure seamless loop
    const displayLogos = [...logos, ...logos, ...logos, ...logos];

    return (
      <div className="relative w-full overflow-hidden bg-white/50 backdrop-blur-sm border-y border-gray-100 py-10 z-20">
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {displayLogos.map((logo, i) => (
            <div key={i} className="inline-block mx-12 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100">
              <img src={logo} alt="Partner" className="h-12 w-auto object-contain pointer-events-none" />
            </div>
          ))}
        </div>
        {/* Gradients for fading edges */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
      </div>
    );
  };

  // 2. Partner Spotlight (Immersive Focus)
  const PartnerSpotlight = ({ partners }: { partners: any[] }) => {
    const [index, setIndex] = useState(0);
    const partner = partners[index % partners.length];

    useEffect(() => {
      if (partners.length === 0) return;
      const timer = setInterval(() => setIndex(i => i + 1), 6000);
      return () => clearInterval(timer);
    }, [partners.length]);

    if (!partner) return null;

    return (
      <div className="relative w-full max-w-6xl mx-auto mb-32 group">
        {/* Dynamic Atmospheric Background */}
        <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-green-600/20 rounded-[3rem] blur-3xl opacity-50 transition-all duration-1000 group-hover:opacity-75"></div>

        <div className="relative overflow-hidden bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] flex flex-col lg:flex-row min-h-[500px]">
          {/* Visual Showcase Side */}
          <div className="relative w-full lg:w-1/2 bg-gray-50/50 flex items-center justify-center p-12 overflow-hidden">
            <div className="absolute inset-0 opacity-10 blur-2xl scale-150 transition-all duration-1000">
              <img src={partner.logo} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="relative z-10 transform transition-all duration-700 group-hover:scale-110">
              <img src={partner.logo} alt={partner.name} className="max-w-[280px] max-h-[160px] object-contain drop-shadow-2xl" />
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></div>
              {t('network.hero_title')}
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight transition-all duration-500">
              {partner.name}
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-8 flex-grow">
              {partner.description || t('partners_page.committed_desc')}
            </p>

            <div className="flex items-center gap-6 pt-8 border-t border-gray-100 mt-auto">
              <div className="flex gap-2">
                {[...Array(Math.min(partners.length, 5))].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all duration-500 ${i === index % partners.length ? 'w-10 bg-blue-600' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-400">
                {String((index % partners.length) + 1).padStart(2, '0')} / {String(partners.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PartnerCard = ({ partner }: { partner: any }) => (
    <div className="group relative bg-white rounded-3xl p-8 border border-transparent hover:border-blue-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] transition-all duration-500 h-full flex flex-col">
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-blue-50/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-8">
          <div className="h-16 w-32 flex items-center justify-start group-hover:scale-110 transition-transform duration-500 origin-left">
            {partner.logo ? (
              <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain" />
            ) : (
              <div className="h-full w-full bg-gray-50 rounded-xl flex items-center justify-center">
                <Users className="text-gray-300" />
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
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600/40 py-1.5 px-3 bg-blue-50/50 rounded-full group-hover:bg-blue-100/50 transition-colors">
              {getTranslatedType(partner.type)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const PartnerSection = ({ title, icon: Icon, colorClass, data }: any) => {
    if (data.length === 0) return null;

    return (
      <div className="mb-32">
        <div className="flex items-end justify-between mb-16 px-4">
          <div className="flex flex-col gap-4">
            <div className={`w-12 h-1.5 rounded-full ${colorClass}`}></div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-4">
              <Icon className="text-gray-300" size={32} />
              {title}
            </h2>
          </div>
          <div className="hidden md:block text-sm font-bold text-gray-400 uppercase tracking-widest">
            {data.length} Total
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((partner: any, index: number) => (
            <PartnerCard key={index} partner={partner} />
          ))}
        </div>
      </div>
    );
  };

  const allLogos = partners.filter(p => p.logo).map(p => p.logo as string);
  const spotlightPartners = partners.filter(p => getPartnerStatus(p.name) === 'PTF').slice(0, 5);

  return (
    <div className="bg-gray-50/50">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Hero Section - Refined */}
      <section className="relative text-white pt-40 pb-52 overflow-hidden bg-[#0A0F1E]">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[120px]"></div>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-600 rounded-full blur-[100px] opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full mb-10 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <span className="text-sm font-bold tracking-widest uppercase opacity-80">{t('home.partners_subtitle')}</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.95] tracking-tighter">
              {t('network.hero_title').split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 1 ? 'text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>

            <p className="text-xl md:text-2xl leading-relaxed text-gray-400 max-w-2xl mx-auto font-medium">
              {t('network.hero_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Infinite Marquee Section */}
      <div className="-mt-12 relative z-20">
        <LogoMarquee logos={allLogos} />
      </div>

      {/* Main Content Area */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          {/* Spotlight Section */}
          <PartnerSpotlight partners={spotlightPartners} />

          <div className="max-w-7xl mx-auto mt-20">
            {/* National Members */}
            <PartnerSection
              title={t('partners_page.national_title')}
              icon={Users}
              colorClass="bg-green-600"
              data={nationalMembers}
            />

            {/* International Members */}
            <PartnerSection
              title={t('partners_page.international_title')}
              icon={Globe}
              colorClass="bg-blue-600"
              data={internationalMembers}
            />

            {/* Institutional Partners */}
            <PartnerSection
              title={t('partners_page.institutional_title')}
              icon={Building2}
              colorClass="bg-purple-600"
              data={institutionalPartners}
            />

            {/* Technical & Financial Partners */}
            <PartnerSection
              title={t('partners_page.tech_fin_title')}
              icon={ShieldCheck}
              colorClass="bg-yellow-600"
              data={techFinPartners}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Handshake className="mx-auto mb-8 text-blue-600" size={70} />
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              {t('home.view_all_members').split('...').join('')}
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              {t('home.cta_subtitle')}
            </p>
            <button
              onClick={() => window.location.href = '/contact'}
              className="bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl hover:scale-105"
            >
              {t('home.contact_us')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
