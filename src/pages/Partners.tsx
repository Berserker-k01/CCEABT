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

  // Logo Carousel Component - Professional Premium Version
  const HeroLogoCarousel = ({ logos }: { logos: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      if (logos.length === 0) return;
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
        setProgress(0);
      }, 4000);
      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 40);
      return () => {
        clearInterval(interval);
        clearInterval(progressInterval);
      };
    }, [logos.length]);

    if (logos.length === 0) return null;

    return (
      <div className="relative max-w-5xl mx-auto -mt-16 mb-20 z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 rounded-[2rem] blur-2xl opacity-20 animate-pulse"></div>
        <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-[2.5rem] p-10 shadow-2xl flex flex-col md:flex-row items-center gap-12 overflow-hidden">
          {/* Active Logo with premium animation */}
          <div className="relative w-48 h-48 flex-shrink-0 group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-50 rounded-2xl opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center p-8">
              {logos.map((logo, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${index === currentIndex ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 -rotate-6'
                    }`}
                >
                  <img src={logo} alt="Partner" className="max-w-full max-h-full object-contain filter drop-shadow-xl" />
                </div>
              ))}
            </div>

            {/* Progress Circular Indicator */}
            <svg className="absolute -inset-2 w-[calc(100%+1rem)] h-[calc(100%+1rem)] -rotate-90">
              <circle
                cx="50%" cy="50%" r="48%"
                stroke="currentColor" strokeWidth="2"
                fill="none" className="text-gray-100"
              />
              <circle
                cx="50%" cy="50%" r="48%"
                stroke="url(#premium-gradient)" strokeWidth="3"
                fill="none" strokeDasharray="100 100"
                strokeDashoffset={100 - progress}
                className="transition-all duration-100"
              />
              <defs>
                <linearGradient id="premium-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-bold mb-4">
              <ShieldCheck size={16} />
              <span>{t('network.hero_title')}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-green-700">
              {partners[currentIndex]?.name || "Nos Partenaires"}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
              {partners[currentIndex]?.description || t('partners_page.committed_desc')}
            </p>

            <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
              <div className="flex gap-1.5">
                {logos.slice(0, 8).map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex % 8 ? 'w-8 bg-blue-600' : 'w-2 bg-gray-200'}`}></div>
                ))}
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">
                {currentIndex + 1} / {logos.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PartnerSection = ({ title, subtitle, icon: Icon, colorClass, data }: any) => {
    if (data.length === 0) return null;

    return (
      <div className="mb-24">
        <div className="flex items-center gap-4 mb-12 border-b border-gray-100 pb-6">
          <div className={`${colorClass} p-3 rounded-2xl text-white shadow-lg`}>
            <Icon size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600">{subtitle}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((partner: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:-translate-y-1 flex flex-col h-full"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    {partner.logo && (
                      <div className="mb-6 h-20 flex items-center justify-start group-hover:scale-105 transition-transform">
                        <img src={partner.logo} alt={partner.name} className="max-h-full max-w-[150px] object-contain" />
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {partner.name}
                    </h3>
                  </div>
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                    >
                      <ExternalLink className="text-blue-600" size={20} />
                    </a>
                  )}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                  {partner.description || t('partners_page.committed_desc')}
                </p>
                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wider">
                    {getTranslatedType(partner.type)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const allLogos = partners.filter(p => p.logo).map(p => p.logo as string);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative text-white py-32 overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-green-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-8 border border-white/20">
              <Handshake className="text-blue-200" size={20} />
              <span className="text-sm font-semibold tracking-wide">{t('home.partners_subtitle')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
              {t('network.hero_title')}
            </h1>

            <p className="text-xl md:text-2xl leading-relaxed text-blue-50 max-w-3xl mx-auto">
              {t('network.hero_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 pt-12 bg-gray-50/30">
        <div className="container mx-auto px-4">
          <HeroLogoCarousel logos={allLogos} />

          <div className="max-w-7xl mx-auto">
            {/* 1. Organisations membres */}
            <div className="mb-24">
              <div className="flex items-center gap-4 mb-16 px-4">
                <div className="h-10 w-2 bg-blue-600 rounded-full"></div>
                <h2 className="text-4xl font-extrabold text-gray-900">{t('partners_page.orgs_members_title')}</h2>
              </div>

              <PartnerSection
                title={t('partners_page.national_title')}
                subtitle={t('partners_page.national_subtitle')}
                icon={Users}
                colorClass="bg-green-600"
                data={nationalMembers}
              />

              <PartnerSection
                title={t('partners_page.international_title')}
                subtitle={t('partners_page.international_subtitle')}
                icon={Globe}
                colorClass="bg-blue-600"
                data={internationalMembers}
              />
            </div>

            {/* 2. Partenaires institutionnels */}
            <PartnerSection
              title={t('partners_page.institutional_title')}
              subtitle={t('partners_page.institutional_subtitle')}
              icon={Building2}
              colorClass="bg-purple-600"
              data={institutionalPartners}
            />

            {/* 3. Partenaires techniques et financiers */}
            <PartnerSection
              title={t('partners_page.tech_fin_title')}
              subtitle={t('partners_page.tech_fin_subtitle')}
              icon={ShieldCheck}
              colorClass="bg-yellow-600"
              data={techFinPartners}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Handshake className="mx-auto mb-8 text-blue-600" size={70} />
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
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
