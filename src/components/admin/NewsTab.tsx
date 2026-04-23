import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Save, Plus, Trash2, Edit } from 'lucide-react';

export default function NewsTab() {
  const { news, addNews, updateNews, deleteNews } = useData();

  const [newsForm, setNewsForm] = useState({ title: '', category: '', date: '', image: '', excerpt: '', content: '' });
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title) return;

    if (editingNewsId) {
      updateNews(editingNewsId, newsForm);
      setEditingNewsId(null);
      alert('Actualité mise à jour !');
    } else {
      addNews(newsForm);
      alert('Actualité ajoutée !');
    }
    setNewsForm({ title: '', category: '', date: '', image: '', excerpt: '', content: '' });
  };

  const handleEditNews = (item: any) => {
    setEditingNewsId(item.id);
    setNewsForm({
      title: item.title,
      category: item.category,
      date: item.date,
      image: item.image,
      excerpt: item.excerpt,
      content: item.content || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Formulaire */}
      <div className="h-fit space-y-6">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-black text-gray-800 mb-6">
            {editingNewsId ? 'Modifier l\'actualité' : 'Ajouter une actualité'}
          </h2>
          
          <form onSubmit={handleAddNews} className="space-y-5">
            {editingNewsId && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-sm text-amber-800 mb-2 flex justify-between items-center font-medium">
                <span>Mode édition activé</span>
                <button 
                  type="button" 
                  onClick={() => {
                    setEditingNewsId(null);
                    setNewsForm({ title: '', category: '', date: '', image: '', excerpt: '', content: '' });
                  }} 
                  className="underline font-bold text-amber-900 border border-amber-300 px-3 py-1 rounded-lg hover:bg-amber-100 transition-colors"
                >
                  Annuler
                </button>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Titre de l'article</label>
              <input type="text" value={newsForm.title} onChange={e => setNewsForm({ ...newsForm, title: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none font-medium transition-all" required />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Thématique</label>
                <select value={newsForm.category} onChange={e => setNewsForm({ ...newsForm, category: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none font-medium transition-all" required>
                  <option value="">Sélectionner...</option>
                  <option value="advocacy">Plaidoyer</option>
                  <option value="water">Eau & Assainissement</option>
                  <option value="training">Formation</option>
                  <option value="testimonials">Témoignage</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Date (ex: 15 Mars 2024)</label>
                <input type="text" value={newsForm.date} onChange={e => setNewsForm({ ...newsForm, date: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none font-medium transition-all" required />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">URL de l'image de couverture</label>
              <input type="url" value={newsForm.image} onChange={e => setNewsForm({ ...newsForm, image: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none font-medium transition-all" placeholder="https://" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Extrait court</label>
              <textarea value={newsForm.excerpt} onChange={e => setNewsForm({ ...newsForm, excerpt: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none font-medium transition-all" rows={3}></textarea>
            </div>
            
            <button type="submit" className={`w-full ${editingNewsId ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'} text-white py-4 rounded-xl transition-all font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg mt-4`}>
              {editingNewsId ? <><Save size={20} /> Mettre à jour l'article</> : <><Plus size={20} /> Publier l'article</>}
            </button>
          </form>
        </div>
      </div>

      {/* Liste */}
      <div>
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-black text-gray-800 mb-6">Articles publiés ({news.length})</h2>
          
          <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
            {news.map(item => (
              <div key={item.id} className="border border-gray-100 rounded-2xl p-4 flex gap-4 bg-gray-50 shadow-sm hover:shadow-md hover:bg-white border-transparent hover:border-gray-200 transition-all group">
                {item.image ? (
                  <img src={item.image} className="w-24 h-24 object-cover rounded-xl shadow-sm" alt="" />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 font-bold shrink-0">
                    Sans image
                  </div>
                )}
                
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 leading-tight line-clamp-2">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100/50 px-2 py-0.5 rounded uppercase tracking-wider">{item.category}</span>
                    <span className="text-[10px] text-gray-400 font-bold">{item.date}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={() => handleEditNews(item)} className="text-blue-500 hover:bg-blue-50 p-2.5 rounded-xl transition-colors bg-white shadow-sm border border-gray-100">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => deleteNews(item.id)} className="text-red-500 hover:bg-red-50 p-2.5 rounded-xl transition-colors bg-white shadow-sm border border-gray-100">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
            {news.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
                <p className="text-sm text-gray-400 font-medium">Aucune actualité publiée.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
