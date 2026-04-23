import { useData } from '../../context/DataContext';
import { Users, FileText, Newspaper, Image as ImageIcon, PlusCircle, Settings } from 'lucide-react';

interface DashboardTabProps {
  onNavigate: (tab: string) => void;
}

export default function DashboardTab({ onNavigate }: DashboardTabProps) {
  const { news, partners, resources, galleryItems } = useData();

  const metrics = [
    { label: 'Partenaires', value: partners.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', tab: 'partners' },
    { label: 'Ressources', value: resources.length, icon: FileText, color: 'text-green-600', bg: 'bg-green-50', tab: 'resources' },
    { label: 'Actualités', value: news.length, icon: Newspaper, color: 'text-amber-600', bg: 'bg-amber-50', tab: 'news' },
    { label: 'Photos / Galerie', value: galleryItems.length, icon: ImageIcon, color: 'text-purple-600', bg: 'bg-purple-50', tab: 'gallery' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-gray-800 tracking-tight">Tableau de bord</h2>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div 
              key={i} 
              onClick={() => onNavigate(metric.tab)}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className={`w-14 h-14 ${metric.bg} ${metric.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <Icon size={28} strokeWidth={2.5} />
              </div>
              <h3 className="text-4xl font-black text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-gray-500 font-bold uppercase tracking-wider text-xs">{metric.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Actions Rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button onClick={() => onNavigate('news')} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-gray-100 text-left group">
            <div className="bg-white p-2 rounded-lg shadow-sm group-hover:bg-blue-100"><PlusCircle size={24} /></div>
            <div>
              <p className="font-bold">Nouvelle Actualité</p>
              <p className="text-xs text-gray-500 group-hover:text-blue-500">Publier un article</p>
            </div>
          </button>
          
          <button onClick={() => onNavigate('partners')} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-green-50 hover:text-green-600 transition-colors border border-gray-100 text-left group">
            <div className="bg-white p-2 rounded-lg shadow-sm group-hover:bg-green-100"><Users size={24} /></div>
            <div>
              <p className="font-bold">Nouveau Partenaire</p>
              <p className="text-xs text-gray-500 group-hover:text-green-500">Ajouter à l'annuaire</p>
            </div>
          </button>

          <button onClick={() => onNavigate('resources')} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-amber-50 hover:text-amber-600 transition-colors border border-gray-100 text-left group">
            <div className="bg-white p-2 rounded-lg shadow-sm group-hover:bg-amber-100"><FileText size={24} /></div>
            <div>
              <p className="font-bold">Ajouter Document</p>
              <p className="text-xs text-gray-500 group-hover:text-amber-500">Uploader une ressource</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
