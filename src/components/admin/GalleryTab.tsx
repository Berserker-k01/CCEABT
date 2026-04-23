import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Image as ImageIcon, Upload, Link as LinkIcon, Trash2 } from 'lucide-react';

export default function GalleryTab() {
  const { galleryItems, addGalleryItem, deleteGalleryItem } = useData();

  const [galleryForm, setGalleryForm] = useState({ title: '', category: 'event' as const, date: '', src: '' });
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limit size to 5MB before processing
    if (file.size > 5 * 1024 * 1024) {
      alert("L'image est trop volumineuse (Max 5MB)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Resize if too large (max 1200px width)
        const MAX_WIDTH = 1200;
        if (width > MAX_WIDTH) {
          height = (height * MAX_WIDTH) / width;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        // Compress to JPEG 0.7 quality
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setGalleryForm(prev => ({ ...prev, src: dataUrl }));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.src || !galleryForm.title) {
      alert("Veuillez ajouter une image et un titre");
      return;
    }

    addGalleryItem({
      src: galleryForm.src,
      title: galleryForm.title,
      category: galleryForm.category as any,
      date: galleryForm.date || new Date().toLocaleDateString('fr-FR'),
      size: 'medium',
      color: 'bg-gray-500'
    });

    setGalleryForm({ title: '', category: 'event', date: '', src: '' });
    alert("Photo ajoutée à la médiathèque !");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Formulaire */}
      <div className="h-fit space-y-6">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-black text-gray-800 mb-6">Ajouter une photo</h2>
          
          <form onSubmit={handleAddGalleryItem} className="space-y-6">
            
            {/* Toggle File/URL */}
            <div className="flex bg-gray-100 p-1.5 rounded-xl">
              <button
                type="button"
                onClick={() => { setUploadMode('file'); setGalleryForm(prev => ({ ...prev, src: '' })); }}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${uploadMode === 'file' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Uploader un fichier
              </button>
              <button
                type="button"
                onClick={() => { setUploadMode('url'); setGalleryForm(prev => ({ ...prev, src: '' })); }}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${uploadMode === 'url' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Lien Web (URL)
              </button>
            </div>

            {uploadMode === 'file' ? (
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-3xl p-8 bg-gray-50 hover:bg-purple-50 hover:border-purple-300 transition-colors relative cursor-pointer group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {galleryForm.src ? (
                  <div className="relative w-full overflow-hidden rounded-2xl aspect-video shadow-md">
                    <img src={galleryForm.src} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white font-bold bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">Changer l'image</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400 group-hover:text-purple-500 transition-colors">
                    <ImageIcon size={56} className="mx-auto mb-4" />
                    <p className="font-bold text-gray-600 group-hover:text-purple-600">Cliquez pour importer</p>
                    <p className="text-xs font-medium mt-1">JPG, PNG (Max 5MB)</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">URL de l'image</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="url"
                      value={galleryForm.src}
                      onChange={(e) => setGalleryForm({ ...galleryForm, src: e.target.value })}
                      placeholder="https://exemple.com/image.jpg"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none font-medium transition-all"
                    />
                  </div>
                </div>
                {galleryForm.src && (
                  <div className="relative w-full aspect-video bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                    <img
                      src={galleryForm.src}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Titre / Légende de la photo</label>
              <input type="text" value={galleryForm.title} onChange={e => setGalleryForm({ ...galleryForm, title: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none font-medium transition-all" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Catégorie</label>
                <select value={galleryForm.category} onChange={e => setGalleryForm({ ...galleryForm, category: e.target.value as any })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none font-medium transition-all">
                  <option value="event">Événement</option>
                  <option value="field">Mission terrain</option>
                  <option value="conference">Conférence</option>
                  <option value="portrait">Portrait</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Date (Optionnel)</label>
                <input type="text" value={galleryForm.date} onChange={e => setGalleryForm({ ...galleryForm, date: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none font-medium transition-all" placeholder="ex: Mars 2024" />
              </div>
            </div>

            <button type="submit" className="w-full bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 transition-all font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 mt-4">
              <Upload size={20} /> Ajouter à la galerie
            </button>
          </form>
        </div>
      </div>

      {/* Liste */}
      <div>
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-black text-gray-800 mb-6">Photos ({galleryItems.length})</h2>
          
          <div className="grid grid-cols-2 gap-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
            {galleryItems.map(item => (
              <div key={item.id} className="relative group rounded-2xl overflow-hidden border border-gray-100 shadow-sm aspect-square bg-gray-100">
                <img src={item.src} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <h3 className="font-bold text-white leading-tight line-clamp-2 text-sm">{item.title}</h3>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-purple-500/80 text-white px-2 py-0.5 rounded backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                  <button 
                    onClick={() => deleteGalleryItem(item.id)} 
                    className="absolute top-3 right-3 bg-red-500 text-white p-2 text-xs rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {galleryItems.length === 0 && (
              <div className="col-span-2 text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-sm text-gray-400 font-medium">Aucune photo dans la galerie.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
