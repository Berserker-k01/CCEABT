import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, FileText, Download, UserPlus, Handshake, X, Building2, ExternalLink, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useData } from '../context/DataContext';
import MembershipForm from '../components/MembershipForm';

export default function Network() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { partners } = useData();
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'International' | 'National' | 'Institutionnel' | 'Technique'>('All');

  // Grouping partners dynamically
  const internationalMembers = partners.filter(p => p.type === 'International');
  const nationalMembers = partners.filter(p => p.type === 'National');
  const institutionalPartners = partners.filter(p => p.type === 'Institutionnel');
  const technicalPartners = partners.filter(p => p.type === 'Technique' || p.type === 'Financier');

  const categories = [
    { id: 'All', label: t('network.cat_all'), icon: Handshake, count: partners.length },
    { id: 'International', label: t('network.cat_international'), icon: Globe, count: internationalMembers.length },
    { id: 'National', label: t('network.cat_national'), icon: Users, count: nationalMembers.length },
    { id: 'Institutionnel', label: t('network.cat_institutional'), icon: Building2, count: institutionalPartners.length },
    { id: 'Technique', label: t('network.cat_technical'), icon: Download, count: technicalPartners.length },
  ];

  const filteredPartners = partners.filter(p => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Technique') return p.type === 'Technique' || p.type === 'Financier';
    return p.type === selectedCategory;
  });

  const resources = [
    { title: t('network.resource_1'), type: 'PDF', size: '2.5 MB' },
    { title: t('network.resource_2'), type: 'PDF', size: '3.1 MB' },
    { title: t('network.resource_3'), type: 'PDF', size: '4.2 MB' },
    { title: t('network.resource_4'), type: 'PDF', size: '1.8 MB' },
    { title: t('network.resource_5'), type: 'PDF', size: '2.9 MB' }
  ];

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

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white py-32 overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <img
            src="/images/2.webp"
            alt="Réseau & Partenaires"
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center 40%',
              minHeight: '100%',
              minWidth: '100%',
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 animate-fade-in">
              <Users className="text-blue-300" size={20} />
              <span className="text-sm font-semibold">{t('network.hero_badge')}</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight animate-slide-up">
              <span className="bg-gradient-to-r from-blue-200 to-green-200 bg-clip-text text-transparent">
                {t('network.hero_title')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 leading-relaxed text-blue-100 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t('network.hero_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Section Réorganisée : Nos Partenaires avec Onglets */}
      <section className="py-24 bg-white min-h-[600px]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">{t('network.ecosystem_title')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('network.ecosystem_desc')}
              </p>
            </div>

            {/* Barre d'onglets Premium */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 scale-105'
                    : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                >
                  <cat.icon size={20} className={selectedCategory === cat.id ? 'text-white' : 'text-blue-500'} />
                  <span>{cat.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Grille de Partenaires Dynamique */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredPartners.map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                  >
                    {/* Background decoration */}
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0"></div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className={`p-4 rounded-2xl ${partner.type === 'Institutionnel' ? 'bg-purple-100 text-purple-600' :
                          partner.type === 'International' ? 'bg-blue-100 text-blue-600' :
                            partner.type === 'National' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                          }`}>
                          {partner.type === 'Institutionnel' ? <Building2 size={24} /> :
                            partner.type === 'International' ? <Globe size={24} /> : <Users size={24} />}
                        </div>
                        {partner.website && (
                          <a href={partner.website} target="_blank" rel="noopener noreferrer"
                            className="p-2 bg-gray-50 text-gray-400 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-300">
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {partner.name}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                        {partner.description || t('partners_page.committed_desc')}
                      </p>

                      <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                          {getTranslatedType(partner.type)}
                        </span>
                        <div className="flex gap-1">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="w-1 h-1 bg-blue-200 rounded-full"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {filteredPartners.length === 0 && (
                  <div className="col-span-full py-20 text-center">
                    <Handshake size={64} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-400 text-xl italic font-display">{t('network.no_partners')}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Ressources partagées */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <FileText className="text-blue-600" size={40} />
              <h2 className="text-3xl font-bold text-gray-800">{t('network.shared_resources')}</h2>
            </div>

            <div className="grid gap-6">
              {resources.map((resource, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-between border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{resource.title}</h3>
                      <p className="text-sm text-gray-600 font-medium">{resource.type} • {resource.size}</p>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold">
                    <Download size={20} />
                    <span>{t('network.download')}</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/resources')}
                className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition-all shadow-xl hover:scale-105"
              >
                {t('network.all_resources')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Appel à adhésion */}
      <section className="py-24 bg-gradient-to-r from-blue-700 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <UserPlus className="mx-auto mb-8" size={70} />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('network.join_title')}</h2>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90">
            {t('network.join_desc')}
          </p>
          <button
            onClick={() => setIsMembershipModalOpen(true)}
            className="bg-white text-blue-700 px-12 py-5 rounded-full font-bold text-xl hover:bg-blue-50 transition-all shadow-2xl hover:scale-110"
          >
            {t('network.join_btn_full')}
          </button>
        </div>
      </section>

      {/* Modal d'adhésion */}
      <AnimatePresence>
        {isMembershipModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-md"
                onClick={() => setIsMembershipModalOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full mx-auto p-10 text-left overflow-hidden border border-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsMembershipModalOpen(false)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="w-full">
                  <MembershipForm onClose={() => setIsMembershipModalOpen(false)} />
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
