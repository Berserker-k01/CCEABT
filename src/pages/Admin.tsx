import { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, LayoutDashboard, FileText, Building2, Image as ImageIcon, Upload, Link as LinkIcon } from 'lucide-react';
import AdminHeader from '../components/admin/AdminHeader';
import DashboardTab from '../components/admin/DashboardTab';
import NewsTab from '../components/admin/NewsTab';
import PartnersTab from '../components/admin/PartnersTab';
import ResourcesTab from '../components/admin/ResourcesTab';
import GalleryTab from '../components/admin/GalleryTab';
import ExternalLinksTab from '../components/admin/ExternalLinksTab';
import SecurityTab from '../components/admin/SecurityTab';

type TabId = 'dashboard' | 'news' | 'partners' | 'resources' | 'gallery' | 'links' | 'security';

export default function Admin() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Admin Credentials
  const [adminEmail, setAdminEmail] = useState('admin@cceabt.org');
  const [adminPassword, setAdminPassword] = useState('admin123');

  const [activeTab, setActiveTab] = useState<TabId>('dashboard');

  useEffect(() => {
    // Load admin credentials
    const savedEmail = localStorage.getItem('adminEmail') || 'admin@cceabt.org';
    const savedPassword = localStorage.getItem('adminPassword') || 'admin123';
    setAdminEmail(savedEmail);
    setAdminPassword(savedPassword);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate against current local storage credentials
    const currentEmail = localStorage.getItem('adminEmail') || 'admin@cceabt.org';
    const currentPassword = localStorage.getItem('adminPassword') || 'admin123';
    
    if (email === currentEmail && password === currentPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Identifiants incorrects');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0f1d] to-[#1a233a] flex items-center justify-center p-4">
        <div className="w-full max-w-md w-full animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-2xl shadow-blue-600/30 transform -rotate-6">
              <Lock size={32} className="text-white transform rotate-6" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight uppercase mb-2">Accès Sécurisé</h1>
            <p className="text-blue-200 text-sm tracking-widest font-bold uppercase">Système d'Administration CCEABT</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Adresse Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white outline-none font-medium transition-all"
                  placeholder="admin@cceabt.org"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white outline-none font-medium transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-bold px-4 py-3 rounded-xl flex items-center justify-center animate-in shake">
                  {error}
                </div>
              )}

              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm tracking-wider uppercase hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]">
                Déverrouiller
              </button>
            </form>
          </div>
          <div className="mt-8 text-center">
             <a href="/" className="text-gray-400 hover:text-white text-xs font-bold tracking-widest uppercase transition-colors">
               ← Retour au Portail Public
             </a>
          </div>
        </div>
      </div>
    );
  }

  const TABS = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'news', label: 'Actualités', icon: FileText },
    { id: 'partners', label: 'Partenaires', icon: Building2 },
    { id: 'resources', label: 'Ressources', icon: Upload },
    { id: 'gallery', label: 'Médiathèque', icon: ImageIcon },
    { id: 'links', label: 'Liens Externes', icon: LinkIcon },
    { id: 'security', label: 'Accès & Sécurité', icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <AdminHeader onLogout={handleLogout} />

      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Navigation Tabs - Pill Shaped */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-4 custom-scrollbar">
          <div className="bg-white border border-gray-200 rounded-[2rem] p-2 flex gap-1 shadow-sm w-max">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabId)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 shadow-sm border border-blue-100/50'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Rendering */}
        <div className="w-full">
          {activeTab === 'dashboard' && <DashboardTab onNavigate={(id) => setActiveTab(id as TabId)} />}
          {activeTab === 'news' && <NewsTab />}
          {activeTab === 'partners' && <PartnersTab />}
          {activeTab === 'resources' && <ResourcesTab />}
          {activeTab === 'gallery' && <GalleryTab />}
          {activeTab === 'links' && <ExternalLinksTab />}
          {activeTab === 'security' && <SecurityTab />}
        </div>
      </main>
    </div>
  );
}
