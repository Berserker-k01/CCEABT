import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, LogOut, Lock, Eye, EyeOff, Save, Edit, FileText, Building2, Users, Image as ImageIcon, Upload, Link as LinkIcon } from 'lucide-react';
import { getPartnerStatus } from '../utils/partnerStatus';

export default function Admin() {
  const {
    news, partners, resources, galleryItems,
    addNews, updateNews, deleteNews,
    addPartner, updatePartner, deletePartner,
    addResource, deleteResource,
    addGalleryItem, deleteGalleryItem,
    driveUrl, setDriveUrl
  } = useData();
  const navigate = useNavigate();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Admin Settings
  const [adminEmail, setAdminEmail] = useState('admin@cceabt.org');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [isEditingCredentials, setIsEditingCredentials] = useState(false);

  const [activeTab, setActiveTab] = useState<'news' | 'partners' | 'resources' | 'gallery' | 'settings'>('news');

  // Form States (New Logic)
  const [newsForm, setNewsForm] = useState({ title: '', category: '', date: '', image: '', excerpt: '', content: '' });
  const [resourceForm, setResourceForm] = useState({ title: '', type: 'PDF', theme: '', year: new Date().getFullYear().toString(), author: 'CCEABT', size: '', downloadUrl: '' });
  const [partnerForm, setPartnerForm] = useState({ name: '', type: 'Technique' as const, description: '', website: '', email: '', password: '', logo: '' });
  // Gallery Form
  const [galleryForm, setGalleryForm] = useState({ title: '', category: 'event' as const, date: '', src: '' });
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');

  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [activePartnerCategory, setActivePartnerCategory] = useState<'National' | 'International' | 'Institutionnel' | 'Technique'>('National');

  useEffect(() => {
    // Load admin credentials
    const savedEmail = localStorage.getItem('adminEmail') || 'admin@cceabt.org';
    const savedPassword = localStorage.getItem('adminPassword') || 'admin123';
    setAdminEmail(savedEmail);
    setAdminPassword(savedPassword);
  }, []);



  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === adminEmail && password === adminPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const saveCredentials = () => {
    localStorage.setItem('adminEmail', adminEmail);
    localStorage.setItem('adminPassword', adminPassword);
    setIsEditingCredentials(false);
    alert('Identifiants mis à jour avec succès !');
  };

  // --- Handlers for New Logic ---

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

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceForm.title) return;
    addResource(resourceForm);
    setResourceForm({ title: '', type: 'PDF', theme: '', year: new Date().getFullYear().toString(), author: 'CCEABT', size: '', downloadUrl: '' });
    alert('Ressource ajoutée !');
  };

  const handleAddPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.name) return;

    if (editingPartnerId) {
      updatePartner(editingPartnerId, partnerForm);
      setEditingPartnerId(null);
      alert('Partenaire mis à jour !');
    } else {
      addPartner(partnerForm);
      alert('Partenaire ajouté !');
    }

    setPartnerForm({ name: '', type: 'Technique', description: '', website: '', email: '', password: '', logo: '' });
  };

  const startEditingPartner = (partner: any) => {
    setEditingPartnerId(partner.id);
    setPartnerForm({
      name: partner.name,
      type: partner.type,
      description: partner.description || '',
      website: partner.website || '',
      email: partner.email || '',
      password: partner.password || '',
      logo: partner.logo || ''
    });
  };

  const cancelEditingPartner = () => {
    setEditingPartnerId(null);
    setPartnerForm({ name: '', type: 'Technique', description: '', website: '', email: '', password: '', logo: '' });
  };

  // --- Gallery Handlers ---

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
      size: 'medium', // Default size
      color: 'bg-gray-500' // Default fallback color
    });

    setGalleryForm({ title: '', category: 'event', date: '', src: '' });
    alert("Photo ajoutée à la médiathèque !");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-4 py-24">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <Lock className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Administration CCEABT</h1>
            <p className="text-gray-600">Connectez-vous pour gérer le contenu</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                placeholder="admin@cceabt.org"
                required
              />
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="admin123"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Se connecter
            </button>
          </form>
          <div className="mt-6 text-center">
            <button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              ← Retour au site
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Panneau d'administration</h1>
            <p className="text-gray-600 mt-1">Gérez le contenu de votre site web</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <LogOut size={20} /> Déconnexion
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b overflow-x-auto">
            {['news', 'partners', 'resources', 'gallery', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-4 font-semibold transition-colors capitalize whitespace-nowrap flex items-center gap-2 ${activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                {tab === 'news' && 'Actualités'}
                {tab === 'partners' && 'Partenaires'}
                {tab === 'resources' && 'Ressources'}
                {tab === 'gallery' && 'Médiathèque'}
                {tab === 'settings' && 'Paramètres'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md p-6">

          {/* NEWS TAB */}
          {activeTab === 'news' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="h-fit space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{editingNewsId ? 'Modifier l\'actualité' : 'Ajouter une actualité'}</h2>
                <form onSubmit={handleAddNews} className="space-y-4 bg-gray-50 p-6 rounded-xl border">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Titre</label>
                    <input type="text" value={newsForm.title} onChange={e => setNewsForm({ ...newsForm, title: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                    <select value={newsForm.category} onChange={e => setNewsForm({ ...newsForm, category: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
                      <option value="">Choisir...</option>
                      <option value="advocacy">Plaidoyer</option>
                      <option value="water">Eau</option>
                      <option value="training">Formation</option>
                      <option value="testimonials">Témoignage</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input type="text" value={newsForm.date} onChange={e => setNewsForm({ ...newsForm, date: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="ex: 15 Mars 2025" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input type="text" value={newsForm.image} onChange={e => setNewsForm({ ...newsForm, image: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Extrait</label>
                    <textarea value={newsForm.excerpt} onChange={e => setNewsForm({ ...newsForm, excerpt: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" rows={3}></textarea>
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className={`flex-1 ${editingNewsId ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2`}>
                      {editingNewsId ? <><Save size={20} /> Enregistrer</> : <><Plus size={20} /> Ajouter</>}
                    </button>
                    {editingNewsId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingNewsId(null);
                          setNewsForm({ title: '', category: '', date: '', image: '', excerpt: '', content: '' });
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
                      >
                        Annuler
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Liste des actualités</h2>
                <div className="space-y-4">
                  {news.map(item => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 flex gap-4 bg-white shadow-sm">
                      {item.image && <img src={item.image} className="w-20 h-20 object-cover rounded-md bg-gray-100" alt="" />}
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                        <p className="text-xs text-gray-500 mb-1">{item.date} • {item.category}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{item.excerpt}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button onClick={() => handleEditNews(item)} className="text-blue-600 hover:text-blue-800 p-1">
                          <Edit size={20} />
                        </button>
                        <button onClick={() => deleteNews(item.id)} className="text-red-500 hover:text-red-700 p-1">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {news.length === 0 && <p className="text-gray-500 italic text-center py-8">Aucune actualité.</p>}
                </div>
              </div>
            </div>
          )}

          {/* RESOURCES TAB */}
          {activeTab === 'resources' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="h-fit space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Configuration Google Drive</h2>

                <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl mb-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Drive" className="w-8 h-8" />
                    <h3 className="font-black text-blue-900 uppercase tracking-tight">Archive Documentaire Globale</h3>
                  </div>
                  <p className="text-sm text-blue-700 mb-6 leading-relaxed">
                    Ce lien est le point d'entrée principal vers votre bibliothèque. Il permet aux visiteurs d'accéder à <strong>l'ensemble de vos dossiers</strong> d'un seul clic.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Collez le lien du dossier Google Drive ici..."
                      value={driveUrl}
                      onChange={(e) => setDriveUrl(e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white font-medium"
                    />
                    <button
                      onClick={() => alert('Lien global sauvegardé dans le système !')}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-900 transition-all font-bold shadow-lg shadow-blue-200"
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>

                <div className="bg-white border-2 border-dashed border-gray-200 p-6 rounded-2xl mb-8">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">?</span>
                    Comment rendre le Drive accessible à tous ?
                  </h4>
                  <div className="space-y-3">
                    {[
                      "Allez sur votre Google Drive",
                      "Faites un clic droit sur votre dossier 'RESSOURCES'",
                      "Cliquez sur 'Partager'",
                      "Sous 'Accès général', changez 'Limité' par 'Tous les utilisateurs disposant du lien'",
                      "Vérifiez que le rôle est bien 'Lecteur'",
                      "Copiez le lien et collez-le ci-dessus !"
                    ].map((step, i) => (
                      <div key={i} className="flex gap-3 text-sm text-gray-600">
                        <span className="font-black text-blue-600">{i + 1}.</span>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-4">
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <strong>Note Importante :</strong> Pour optimiser le site, les fichiers ne sont pas stockés ici.
                    Téléchargez-les d'abord sur votre Google Drive, assurez-vous que le lien est <strong>Public</strong> (Tous les utilisateurs disposant du lien), puis collez le lien ci-dessous.
                  </p>
                </div>


                <h2 className="text-2xl font-bold text-gray-800 mb-4">Répertorier un document</h2>
                <form onSubmit={handleAddResource} className="space-y-4 bg-gray-50 p-6 rounded-xl border">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Titre</label>
                    <input type="text" value={resourceForm.title} onChange={e => setResourceForm({ ...resourceForm, title: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <select value={resourceForm.type} onChange={e => setResourceForm({ ...resourceForm, type: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
                        <option value="PDF">PDF</option>
                        <option value="Rapport">Rapport</option>
                        <option value="Guide">Guide</option>
                        <option value="Étude">Étude</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Thème</label>
                      <input type="text" value={resourceForm.theme} onChange={e => setResourceForm({ ...resourceForm, theme: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Année</label>
                      <input type="text" value={resourceForm.year} onChange={e => setResourceForm({ ...resourceForm, year: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Taille</label>
                      <input type="text" value={resourceForm.size} onChange={e => setResourceForm({ ...resourceForm, size: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="ex: 2MB" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Lien Téléchargement (Drive/URL)</label>
                    <input type="text" value={resourceForm.downloadUrl} onChange={e => setResourceForm({ ...resourceForm, downloadUrl: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="https://..." />
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2">
                    <Plus size={20} /> Ajouter
                  </button>
                </form>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Liste des ressources</h2>
                <div className="space-y-4">
                  {resources.map(item => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 flex gap-4 bg-white shadow-sm items-center">
                      <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                        <FileText size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                        <p className="text-xs text-gray-500">{item.type} • {item.year} • {item.theme}</p>
                      </div>
                      <button onClick={() => deleteResource(item.id)} className="text-red-500 hover:text-red-700 p-2">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                  {resources.length === 0 && <p className="text-gray-500 italic text-center py-8">Aucune ressource.</p>}
                </div>
              </div>
            </div>
          )}

          {/* PARTNERS TAB */}
          {activeTab === 'partners' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="h-fit space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {editingPartnerId ? 'Modifier le partenaire' : 'Ajouter un partenaire'}
                </h2>
                <form onSubmit={handleAddPartner} className="space-y-4 bg-gray-50 p-6 rounded-xl border">
                  {editingPartnerId && (
                    <div className="bg-yellow-50 border border-yellow-200 p-2 rounded text-sm text-yellow-800 mb-2 flex justify-between items-center">
                      <span>Mode édition activé</span>
                      <button type="button" onClick={cancelEditingPartner} className="underline font-bold">Annuler</button>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nom</label>
                    <input type="text" value={partnerForm.name} onChange={e => setPartnerForm({ ...partnerForm, name: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select value={partnerForm.type} onChange={e => setPartnerForm({ ...partnerForm, type: e.target.value as any })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
                      <option value="Technique">Partenaire Technique</option>
                      <option value="Financier">Partenaire Financier</option>
                      <option value="Institutionnel">Partenaire Institutionnel</option>
                      <option value="International">ONG Internationale</option>
                      <option value="National">ONG Nationale</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea value={partnerForm.description} onChange={e => setPartnerForm({ ...partnerForm, description: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" rows={2}></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Site Web</label>
                    <input type="text" value={partnerForm.website} onChange={e => setPartnerForm({ ...partnerForm, website: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email de connexion</label>
                      <input type="email" value={partnerForm.email} onChange={e => setPartnerForm({ ...partnerForm, email: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                      <input type="text" value={partnerForm.password} onChange={e => setPartnerForm({ ...partnerForm, password: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2">
                    {editingPartnerId ? <><Save size={20} /> Mettre à jour</> : <><Plus size={20} /> Ajouter</>}
                  </button>
                </form>
              </div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Liste des partenaires</h2>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { id: 'National', label: 'National' },
                    { id: 'International', label: 'International' },
                    { id: 'Institutionnel', label: 'Institutionnel' },
                    { id: 'Technique', label: 'PTF' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActivePartnerCategory(cat.id as any)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activePartnerCategory === cat.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
                        }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-6">
                  {(() => {
                    const cat = [
                      { id: 'National', label: 'ONG Nationales' },
                      { id: 'International', label: 'ONG Internationales' },
                      { id: 'Institutionnel', label: 'Partenaires Institutionnels' },
                      { id: 'Technique', label: 'Partenaires Techniques & Financiers' }
                    ].find(c => c.id === activePartnerCategory);

                    if (!cat) return null;

                    const filteredPartners = partners
                      .filter(p => {
                        if (cat.id === 'Technique') {
                          // Pour PTF, utiliser getPartnerStatus pour n'afficher que les 13 PTF de la liste
                          return getPartnerStatus(p.name) === 'PTF';
                        }
                        return p.type === cat.id;
                      })
                      .sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }));

                    return (
                      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          {cat.label} ({filteredPartners.length})
                        </h3>
                        <div className="grid gap-4">
                          {filteredPartners.map(item => (
                            <div key={item.id} className="border border-gray-100 rounded-xl p-4 flex gap-4 bg-white shadow-sm hover:shadow-md transition-shadow items-center group">
                              <div className="bg-gray-50 p-3 rounded-lg text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                {cat.id === 'Institutionnel' ? <Building2 size={24} /> : <Users size={24} />}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-gray-900 leading-tight">{item.name}</h3>
                                {item.email && (
                                  <p className="text-[10px] text-blue-600 font-mono mt-1 px-2 py-0.5 bg-blue-50 w-fit rounded">
                                    {item.email} • {item.password}
                                  </p>
                                )}
                              </div>
                              <div className="flex gap-1">
                                <button onClick={() => startEditingPartner(item)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                                  <Edit size={18} />
                                </button>
                                <button onClick={() => deletePartner(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                          ))}
                          {filteredPartners.length === 0 && (
                            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                              <p className="text-sm text-gray-400 italic">Aucun partenaire enregistré dans cette catégorie.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* GALLERY TAB */}
          {activeTab === 'gallery' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="h-fit space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Ajouter une photo</h2>
                <form onSubmit={handleAddGalleryItem} className="space-y-4 bg-gray-50 p-6 rounded-xl border">

                  {/* Upload Mode Toggle */}
                  <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
                    <button
                      type="button"
                      onClick={() => { setUploadMode('file'); setGalleryForm(prev => ({ ...prev, src: '' })); }}
                      className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${uploadMode === 'file' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Fichier local
                    </button>
                    <button
                      type="button"
                      onClick={() => { setUploadMode('url'); setGalleryForm(prev => ({ ...prev, src: '' })); }}
                      className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${uploadMode === 'url' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Lien URL
                    </button>
                  </div>

                  {/* Image Input Area */}
                  {uploadMode === 'file' ? (
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 bg-white hover:bg-gray-50 transition-colors relative cursor-pointer group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      {galleryForm.src ? (
                        <div className="relative w-full aspect-video">
                          <img src={galleryForm.src} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold">
                            Changer l'image
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-400">
                          <ImageIcon size={48} className="mx-auto mb-2" />
                          <p className="font-semibold">Cliquez pour ajouter une image</p>
                          <p className="text-xs">JPG, PNG (Max 5MB)</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL de l'image</label>
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="url"
                            value={galleryForm.src}
                            onChange={(e) => setGalleryForm({ ...galleryForm, src: e.target.value })}
                            placeholder="https://exemple.com/image.jpg"
                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                          />
                        </div>
                      </div>
                      {galleryForm.src && (
                        <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
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
                    <label className="block text-sm font-medium text-gray-700">Titre</label>
                    <input type="text" value={galleryForm.title} onChange={e => setGalleryForm({ ...galleryForm, title: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" required placeholder="Titre de la photo..." />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                      <select value={galleryForm.category} onChange={e => setGalleryForm({ ...galleryForm, category: e.target.value as any })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
                        <option value="event">Événement</option>
                        <option value="field">Terrain</option>
                        <option value="conference">Conférence</option>
                        <option value="portrait">Portrait</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <input type="text" value={galleryForm.date} onChange={e => setGalleryForm({ ...galleryForm, date: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="ex: Mars 2024" />
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2">
                    <Upload size={20} /> Ajouter à la galerie
                  </button>
                </form>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Médiathèque ({galleryItems.length})</h2>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {galleryItems.map(item => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-3 flex gap-4 bg-white shadow-sm items-center">
                      <img src={item.src} className="w-24 h-24 object-cover rounded-md bg-gray-200" alt="" />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                          <span className="text-xs text-gray-500">{item.date}</span>
                        </div>
                      </div>
                      <button onClick={() => deleteGalleryItem(item.id)} className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                  {galleryItems.length === 0 && <p className="text-gray-500 italic text-center py-8">La galerie est vide.</p>}
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Paramètres de connexion</h2>
              {!isEditingCredentials ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800 mb-2"><strong>Email admin :</strong> {adminEmail}</p>
                    <p className="text-sm text-blue-800"><strong>Mot de passe :</strong> ••••••••</p>
                  </div>
                  <button onClick={() => setIsEditingCredentials(true)} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    <Edit size={20} /> Modifier
                  </button>
                </div>
              ) : (
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nouvel email</label>
                    <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nouveau mot de passe</label>
                    <input type="text" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={saveCredentials} className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                      <Save size={20} /> Enregistrer
                    </button>
                    <button onClick={() => setIsEditingCredentials(false)} className="px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Annuler</button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
