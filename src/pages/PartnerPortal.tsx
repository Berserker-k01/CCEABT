import { useState } from 'react';
import {
    LayoutDashboard,
    BarChart3,
    FileInput,
    Menu,
    X,
    Users,
    TrendingUp,
    Globe,
    Send,
    Download,
    ChevronRight,
    Building2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// --- Sub-components for Views ---

// 1. Overview View
const DashboardOverview = () => {
    const { t } = useTranslation();
    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('portal.welcome_title')}</h2>
                <p className="text-gray-500">{t('portal.welcome_subtitle')}</p>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                        <Users size={24} />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">{t('portal.kpi_active_members')}</h3>
                        <p className="text-2xl font-bold text-gray-900">60+</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">{t('portal.kpi_water_rate')}</h3>
                        <p className="text-2xl font-bold text-gray-900">70.8%</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                        <Globe size={24} />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">{t('portal.kpi_regions')}</h3>
                        <p className="text-2xl font-bold text-gray-900">5/5</p>
                    </div>
                </div>
            </div>

            {/* Recent Activity / Info */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">{t('portal.latest_reports')}</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <FileInput size={18} className="text-gray-400 group-hover:text-blue-500" />
                                <span className="text-sm font-medium text-gray-700">{t('portal.report_annual_2023')}</span>
                            </div>
                            <Download size={16} className="text-gray-400 group-hover:text-blue-500" />
                        </li>
                        <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <FileInput size={18} className="text-gray-400 group-hover:text-blue-500" />
                                <span className="text-sm font-medium text-gray-700">{t('portal.report_audit_2024')}</span>
                            </div>
                            <Download size={16} className="text-gray-400 group-hover:text-blue-500" />
                        </li>
                    </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl text-white shadow-lg">
                    <h3 className="font-bold mb-2">{t('portal.campaign_2024_title')}</h3>
                    <p className="text-blue-100 text-sm mb-6">{t('portal.campaign_2024_desc')}</p>
                    <button className="bg-white text-blue-700 px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-blue-50 transition-colors w-full">
                        {t('portal.submit_data')}
                    </button>
                </div>
            </div>
        </div>
    );
};

// 1. Overview View
const StatsView = () => {
    const { t } = useTranslation();
    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('portal.stats_title')}</h2>
                <p className="text-gray-500">{t('portal.stats_subtitle')}</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-6">{t('portal.water_desserte_title')}</h3>
                <div className="space-y-6">
                    {[
                        { label: t('portal.region_maritime'), val: 65, color: 'bg-blue-500' },
                        { label: t('portal.region_plateaux'), val: 58, color: 'bg-green-500' },
                        { label: t('portal.region_centrale'), val: 72, color: 'bg-purple-500' },
                        { label: t('portal.region_kara'), val: 80, color: 'bg-orange-500' },
                        { label: t('portal.region_savanes'), val: 62, color: 'bg-red-500' },
                    ].map((item, idx) => (
                        <div key={idx}>
                            <div className="flex justify-between text-sm font-medium mb-2">
                                <span className="text-gray-700">{item.label}</span>
                                <span className="text-gray-900">{item.val}%</span>
                            </div>
                            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    style={{ width: `${item.val}%` }}
                                    className={`h-full ${item.color} transition-all duration-1000 ease-out`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-gray-400 mt-6 text-center italic">{t('portal.stats_source')}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">{t('portal.infra_realised')}</h3>
                    <div className="flex items-center justify-center p-8">
                        <div className="w-32 h-32 rounded-full border-8 border-blue-100 border-t-blue-600 flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-800">1,240</span>
                        </div>
                    </div>
                    <p className="text-center text-sm text-gray-500">{t('portal.infra_desc')}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">{t('portal.pop_affected')}</h3>
                    <div className="flex items-center justify-center p-8">
                        <div className="w-32 h-32 rounded-full border-8 border-green-100 border-t-green-600 flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-800">2.5M</span>
                        </div>
                    </div>
                    <p className="text-center text-sm text-gray-500">{t('portal.pop_desc')}</p>
                </div>
            </div>
        </div>
    );
};

// 4. Collection View
const CollectionView = () => {
    const { t } = useTranslation();
    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('portal.collection_title')}</h2>
                <p className="text-gray-500">{t('portal.collection_subtitle')}</p>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-blue-900 mb-3">{t('portal.campaign_2024_title')}</h3>
                    <p className="text-blue-800/80 mb-6 leading-relaxed">
                        {t('portal.campaign_2024_desc')}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="https://forms.gle/u6kUQypDoLYRaUP27"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                        >
                            {t('portal.submit_data')} <Send size={18} />
                        </a>
                    </div>
                </div>
                <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Documents Utiles</h4>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-sm text-gray-600">
                            <Download size={16} className="mt-1 text-blue-500" />
                            Guide de remplissage
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-600">
                            <Download size={16} className="mt-1 text-blue-500" />
                            Modèle Excel (Offline)
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-600">
                            <Download size={16} className="mt-1 text-blue-500" />
                            Indicateurs de référence
                        </li>
                    </ul>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 border border-gray-200 rounded-2xl hover:border-blue-300 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <FileInput size={24} />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Signalement Incident</h3>
                    <p className="text-gray-500 text-sm">Remonter un dysfonctionnement sur un ouvrage ou une urgence sanitaire.</p>
                </div>
                <div className="p-6 border border-gray-200 rounded-2xl hover:border-blue-300 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Users size={24} />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">{t('portal.member_update_title')}</h3>
                    <p className="text-gray-500 text-sm">{t('portal.member_update_desc')}</p>
                </div>
            </div>
        </div>
    );
};


// --- Main Dashboard Layout ---

export default function PartnerPortal() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const tabs = [
        { id: 'overview', label: t('portal.nav_overview'), icon: LayoutDashboard },
        { id: 'stats', label: t('portal.nav_stats'), icon: BarChart3 },
        { id: 'collection', label: t('portal.nav_collection'), icon: FileInput },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <DashboardOverview />;
            case 'stats': return <StatsView />;
            case 'collection': return <CollectionView />;
            default: return <DashboardOverview />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-start">

            {/* Sidebar Desktop - Sticky */}
            <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 sticky top-24 h-[calc(100vh-6rem)]">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-blue-900 font-bold text-lg">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            <Building2 size={18} />
                        </div>
                        {t('portal.member_space')}
                    </div>
                </div>
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === tab.id
                                ? 'bg-blue-50 text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <tab.icon size={20} />
                            {tab.label}
                            {activeTab === tab.id && <ChevronRight size={16} className="ml-auto" />}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <div className="bg-slate-900 rounded-xl p-4 text-white">
                        <p className="text-xs text-slate-400 font-bold uppercase mb-1">Support</p>
                        <p className="text-sm font-medium mb-3">{t('portal.need_help')}</p>
                        <a href="mailto:support@cceabt.org" className="text-xs bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg block text-center transition-colors">
                            {t('portal.contact_admin')}
                        </a>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
            )}

            <aside className={`fixed top-20 left-0 w-64 h-[calc(100vh-5rem)] bg-white z-50 transform transition-transform duration-300 lg:hidden border-r border-gray-200 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="p-6 flex items-center justify-between border-b border-gray-100">
                    <span className="font-bold text-gray-900">{t('portal.menu')}</span>
                    <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
                </div>
                <nav className="p-4 space-y-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === tab.id
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <tab.icon size={20} />
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-4 md:p-8 lg:p-12 w-full min-w-0">
                {/* Mobile Menu Trigger */}
                <div className="lg:hidden mb-6 flex items-center gap-4">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm"
                    >
                        <Menu size={24} className="text-gray-700" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">{t('portal.dashboard_title')}</h1>
                </div>

                <div className="max-w-6xl mx-auto">
                    {renderContent()}
                </div>
            </main>

        </div>
    );
}
