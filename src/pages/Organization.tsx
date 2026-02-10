import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Target, Briefcase, Share2, ArrowRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TogoMap from '../components/TogoMap';
import { useTranslation } from 'react-i18next';

const OrgCard = ({ icon: Icon, title, role, color, description, customContent }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden min-h-[400px]"
    >
        {/* Decorative Background Elements */}
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-10 -mr-20 -mt-20 ${color.replace('text-', 'bg-')}`}></div>
        <div className={`absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[80px] opacity-5 -ml-10 -mb-10 ${color.replace('text-', 'bg-')}`}></div>

        <div className="relative z-10">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className={`shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg ${color.replace('text-', 'bg-').replace('600', '100')} ${color}`}>
                    <Icon size={40} />
                </div>

                <div className="flex-1">
                    <h3 className="text-4xl font-bold text-gray-800 mb-2">{title}</h3>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${color.replace('text-', 'bg-').replace('600', '100')} ${color}`}>
                        {role}
                    </div>

                    <p className="text-gray-600 leading-relaxed text-xl mb-8 max-w-3xl">
                        {description}
                    </p>

                    {customContent}
                </div>
            </div>
        </div>
    </motion.div>
);

export default function Organization() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('ag');
    const [hoveredPlatform, setHoveredPlatform] = useState<any>(null);

    const tabs = [
        {
            id: 'ag',
            label: t('organization.ag_label'),
            icon: Users,
            color: 'text-blue-600',
            gradient: 'from-blue-500 to-blue-600',
            ring: 'ring-blue-200',
            role: t('organization.ag_role'),
            description: t('organization.ag_desc')
        },
        {
            id: 'ca',
            label: t('organization.ca_label'),
            icon: Target,
            color: 'text-green-600',
            gradient: 'from-green-500 to-green-600',
            ring: 'ring-green-200',
            role: t('organization.ca_role'),
            description: t('organization.ca_desc')
        },
        {
            id: 'se',
            label: t('organization.se_label'),
            icon: Briefcase,
            color: 'text-purple-600',
            gradient: 'from-purple-500 to-purple-600',
            ring: 'ring-purple-200',
            role: t('organization.se_role'),
            description: t('organization.se_desc')
        },
        {
            id: 'platforms',
            label: t('organization.plat_label'),
            icon: Share2,
            color: 'text-orange-600',
            gradient: 'from-orange-500 to-orange-600',
            ring: 'ring-orange-200',
            role: t('organization.plat_role'),
            description: t('organization.plat_desc'),
        },
    ];

    const activeTabData = tabs.find(t => t.id === activeTab);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20 relative">
            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-24 relative overflow-hidden mb-12">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-20 transform translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-[120px] opacity-20 transform -translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-6 border border-white/20">
                            {t('about.governance_subtitle')}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            {t('organization.hero_title')}
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            {t('organization.plat_desc')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Central Icon Navigation */}
            <div className="container mx-auto px-4 mb-16 relative z-20">
                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                    {tabs.map((tab, index) => (
                        <motion.button
                            key={tab.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setActiveTab(tab.id)}
                            className={`group flex flex-col items-center gap-4 transition-all duration-300 ${activeTab === tab.id ? 'scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100'
                                }`}
                        >
                            <div className={`w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${activeTab === tab.id
                                ? `bg-gradient-to-br ${tab.gradient} text-white ring-4 ring-white ring-offset-4 ring-offset-gray-50`
                                : `bg-white text-gray-400 group-hover:text-gray-600 group-hover:bg-gray-50 border-2 border-transparent group-hover:border-gray-200`
                                }`}>
                                <tab.icon size={40} className="relative z-10" strokeWidth={activeTab === tab.id ? 2 : 1.5} />
                            </div>
                            <span className={`font-bold text-sm md:text-lg tracking-wide transition-colors ${activeTab === tab.id ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'
                                }`}>
                                {tab.label}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        {activeTab === 'platforms' ? (
                            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
                                <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                                    <div className="bg-orange-100 p-4 rounded-2xl text-orange-600">
                                        <Share2 size={32} />
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h3 className="text-3xl font-bold text-gray-900">{t('organization.plat_label')}</h3>
                                        <p className="text-orange-600 font-bold uppercase text-xs tracking-wider mt-1">{t('organization.plat_role')}</p>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-lg mb-10 leading-relaxed text-center md:text-left max-w-3xl mx-auto md:mx-0">
                                    {t('organization.plat_map_desc')}
                                </p>

                                <div className="grid lg:grid-cols-2 gap-12">
                                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 shadow-inner">
                                        <TogoMap onHover={setHoveredPlatform} />
                                    </div>

                                    <div className="flex flex-col justify-center space-y-8 min-h-[400px]">
                                        <AnimatePresence mode="wait">
                                            {hoveredPlatform ? (
                                                <motion.div
                                                    key={hoveredPlatform.id}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    className={`${hoveredPlatform.bgClass} p-8 rounded-3xl border ${hoveredPlatform.borderClass} shadow-sm`}
                                                >
                                                    <div className="space-y-4">
                                                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                                            {t('togo_map.platform_reg')}
                                                        </h4>
                                                        <h3 className="text-4xl font-black text-gray-900 uppercase">
                                                            {hoveredPlatform.label}
                                                        </h3>
                                                        <div className={`text-xl font-bold ${hoveredPlatform.accentClass}`}>
                                                            {hoveredPlatform.org}
                                                        </div>
                                                        <p className="text-gray-600 leading-relaxed text-lg pt-4 border-t border-gray-200/50">
                                                            {hoveredPlatform.description}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="default-cards"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="space-y-8"
                                                >
                                                    <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 transition-all hover:shadow-md">
                                                        <div className="flex items-start gap-4">
                                                            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                                                                <MapPin size={24} />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-xl text-blue-900 mb-2">{t('togo_map.nat_coverage_title')}</h4>
                                                                <p className="text-blue-800/80 leading-relaxed">
                                                                    {t('togo_map.nat_coverage_desc')}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="bg-green-50 p-8 rounded-3xl border border-green-100 transition-all hover:shadow-md">
                                                        <div className="flex items-start gap-4">
                                                            <div className="bg-green-100 p-3 rounded-xl text-green-600">
                                                                <Users size={24} />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-xl text-green-900 mb-2">{t('togo_map.loc_coord_title')}</h4>
                                                                <p className="text-green-800/80 leading-relaxed">
                                                                    {t('togo_map.loc_coord_desc')}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <OrgCard
                                {...activeTabData}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* CTA Final */}
            <section className="py-24 mt-20 bg-slate-900 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-8">{t('organization.cta_rejoin')}</h2>
                    <button
                        onClick={() => navigate('/join')}
                        className="inline-flex items-center gap-2 bg-blue-600 px-10 py-4 rounded-full font-bold hover:bg-blue-500 transition-all hover:scale-105 shadow-lg shadow-blue-600/30"
                    >
                        {t('organization.cta_btn')}
                        <ArrowRight size={20} />
                    </button>
                </div>
            </section>
        </div>
    );
}
