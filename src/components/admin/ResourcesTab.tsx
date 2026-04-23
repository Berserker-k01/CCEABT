import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FileText, Plus, Trash2 } from 'lucide-react';

export default function ResourcesTab() {
  const { resources, addResource, deleteResource } = useData();

  const [resourceForm, setResourceForm] = useState({ 
    title: '', type: 'PDF', theme: '', year: new Date().getFullYear().toString(), author: 'CCEABT', size: '', downloadUrl: '' 
  });

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceForm.title) return;
    addResource(resourceForm);
    setResourceForm({ title: '', type: 'PDF', theme: '', year: new Date().getFullYear().toString(), author: 'CCEABT', size: '', downloadUrl: '' });
    alert('Ressource ajoutée !');
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Formulaire d'ajout */}
      <div className="h-fit space-y-6">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-black text-gray-800 mb-6">Répertorier un document</h2>
          
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-6">
            <p className="text-xs text-amber-800 leading-relaxed font-medium">
              <strong>Note Importante :</strong> Pour optimiser le site, téléchargez d'abord vos fichiers sur votre Google Drive, assurez-vous que le lien est <strong>Public</strong>, puis collez le lien ci-dessous.
            </p>
          </div>

          <form onSubmit={handleAddResource} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Titre du document</label>
              <input type="text" value={resourceForm.title} onChange={e => setResourceForm({ ...resourceForm, title: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none font-medium transition-all" required placeholder="Ex: Rapport d'activité 2024" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
                <select value={resourceForm.type} onChange={e => setResourceForm({ ...resourceForm, type: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none font-medium transition-all">
                  <option value="PDF">PDF</option>
                  <option value="Rapport">Rapport</option>
                  <option value="Guide">Guide</option>
                  <option value="Étude">Étude</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Thème</label>
                <input type="text" value={resourceForm.theme} onChange={e => setResourceForm({ ...resourceForm, theme: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none font-medium transition-all" placeholder="Ex: Eau, Assainissement..." />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Année / Mois</label>
                <input type="text" value={resourceForm.year} onChange={e => setResourceForm({ ...resourceForm, year: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none font-medium transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Taille du fichier</label>
                <input type="text" value={resourceForm.size} onChange={e => setResourceForm({ ...resourceForm, size: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none font-medium transition-all" placeholder="ex: 2.5 MB" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Lien Téléchargement (Drive/URL)</label>
              <input type="text" value={resourceForm.downloadUrl} onChange={e => setResourceForm({ ...resourceForm, downloadUrl: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none font-medium transition-all" placeholder="https://drive.google.com/..." />
            </div>
            
            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-all font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 mt-4">
              <Plus size={20} /> Ajouter la ressource
            </button>
          </form>
        </div>
      </div>

      {/* Liste */}
      <div>
        <h2 className="text-2xl font-black text-gray-800 mb-6">Liste des ressources ({resources.length})</h2>
        <div className="space-y-4">
          {resources.map(item => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-5 flex gap-5 shadow-sm hover:shadow-md transition-shadow items-center group">
              <div className="bg-green-50 p-4 rounded-xl text-green-600 group-hover:bg-green-100 transition-colors">
                <FileText size={28} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg line-clamp-1 mb-1">{item.title}</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">{item.type}</span>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">{item.year}</span>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">{item.theme}</span>
                </div>
              </div>
              <button 
                onClick={() => deleteResource(item.id)} 
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-3 rounded-xl transition-colors"
              >
                <Trash2 size={22} />
              </button>
            </div>
          ))}
          {resources.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">Aucun document dans la base de données.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
