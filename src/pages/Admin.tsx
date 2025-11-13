import { useState, useEffect } from 'react';
import { Lock, LogOut, Save, Edit, Trash2, Plus, Eye, EyeOff, Link as LinkIcon, Upload, FileText } from 'lucide-react';

interface AdminProps {
  onNavigate: (page: string) => void;
}

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface Partner {
  id: string;
  name: string;
  category: string;
  description: string;
  website?: string;
}

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  date: string;
}

interface ResourceLink {
  id: string;
  title: string;
  description: string;
  driveUrl: string;
  type: string;
  fileData?: string;
  fileName?: string;
}

export default function Admin({ onNavigate }: AdminProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('news');

  // Credentials stored in localStorage
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isEditingCredentials, setIsEditingCredentials] = useState(false);

  // Content states
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [resources, setResources] = useState<ResourceLink[]>([]);

  useEffect(() => {
    // Load admin credentials from localStorage
    const savedEmail = localStorage.getItem('adminEmail') || 'admin@cceabt.org';
    const savedPassword = localStorage.getItem('adminPassword') || 'admin123';
    setAdminEmail(savedEmail);
    setAdminPassword(savedPassword);

    // Load content from localStorage
    const savedNews = localStorage.getItem('newsItems');
    const savedPartners = localStorage.getItem('partners');
    const savedGallery = localStorage.getItem('galleryItems');
    const savedResources = localStorage.getItem('resources');
    
    if (savedNews) setNewsItems(JSON.parse(savedNews));
    if (savedPartners) setPartners(JSON.parse(savedPartners));
    if (savedGallery) setGalleryItems(JSON.parse(savedGallery));
    if (savedResources) setResources(JSON.parse(savedResources));
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

  const saveNews = () => {
    localStorage.setItem('newsItems', JSON.stringify(newsItems));
    alert('Actualités sauvegardées !');
  };

  const savePartners = () => {
    localStorage.setItem('partners', JSON.stringify(partners));
    alert('Partenaires sauvegardés !');
  };

  const addNewsItem = () => {
    const newItem: NewsItem = {
      id: Date.now().toString(),
      title: 'Nouvelle actualité',
      description: 'Description de l\'actualité',
      date: new Date().toISOString().split('T')[0]
    };
    setNewsItems([...newsItems, newItem]);
  };

  const deleteNewsItem = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
      setNewsItems(newsItems.filter(item => item.id !== id));
    }
  };

  const updateNewsItem = (id: string, field: string, value: string) => {
    setNewsItems(newsItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const addPartner = () => {
    const newPartner: Partner = {
      id: Date.now().toString(),
      name: 'Nouveau partenaire',
      category: 'ONG Nationale',
      description: 'Description du partenaire',
      website: ''
    };
    setPartners([...partners, newPartner]);
  };

  const deletePartner = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) {
      setPartners(partners.filter(item => item.id !== id));
    }
  };

  const updatePartner = (id: string, field: string, value: string) => {
    setPartners(partners.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Gallery management functions
  const saveGallery = () => {
    localStorage.setItem('galleryItems', JSON.stringify(galleryItems));
    alert('Galerie sauvegardée !');
  };

  const addGalleryItem = () => {
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      title: 'Nouvelle image',
      imageUrl: '',
      description: 'Description de l\'image',
      date: new Date().toISOString().split('T')[0]
    };
    setGalleryItems([...galleryItems, newItem]);
  };

  const deleteGalleryItem = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      setGalleryItems(galleryItems.filter(item => item.id !== id));
    }
  };

  const updateGalleryItem = (id: string, field: string, value: string) => {
    setGalleryItems(galleryItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleImageUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateGalleryItem(id, 'imageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Resources management functions
  const saveResources = () => {
    localStorage.setItem('resources', JSON.stringify(resources));
    alert('Ressources sauvegardées !');
  };

  const addResource = () => {
    const newResource: ResourceLink = {
      id: Date.now().toString(),
      title: 'Nouvelle ressource',
      description: 'Description de la ressource',
      driveUrl: '',
      type: 'Document'
    };
    setResources([...resources, newResource]);
  };

  const deleteResource = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette ressource ?')) {
      setResources(resources.filter(item => item.id !== id));
    }
  };

  const updateResource = (id: string, field: string, value: string) => {
    setResources(resources.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleDocumentUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResources(resources.map(item => 
          item.id === id ? { ...item, fileData: reader.result as string, fileName: file.name } : item
        ));
      };
      reader.readAsDataURL(file);
    }
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
            <p className="text-gray-600">Connectez-vous pour gérer le contenu du site</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="admin@cceabt.org"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
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

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
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
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('news')}
              className={`px-6 py-4 font-semibold transition-colors ${
                activeTab === 'news'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Actualités
            </button>
            <button
              onClick={() => setActiveTab('partners')}
              className={`px-6 py-4 font-semibold transition-colors ${
                activeTab === 'partners'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Partenaires
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-6 py-4 font-semibold transition-colors ${
                activeTab === 'gallery'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Galerie
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-6 py-4 font-semibold transition-colors ${
                activeTab === 'resources'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Ressources
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-4 font-semibold transition-colors ${
                activeTab === 'settings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Paramètres
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'news' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestion des actualités</h2>
                <div className="flex gap-3">
                  <button
                    onClick={addNewsItem}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    <Plus size={20} />
                    Ajouter
                  </button>
                  <button
                    onClick={saveNews}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <Save size={20} />
                    Sauvegarder
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {newsItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateNewsItem(item.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg font-semibold"
                        placeholder="Titre"
                      />
                      <textarea
                        value={item.description}
                        onChange={(e) => updateNewsItem(item.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows={3}
                        placeholder="Description"
                      />
                      <div className="flex items-center justify-between">
                        <input
                          type="date"
                          value={item.date}
                          onChange={(e) => updateNewsItem(item.id, 'date', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <button
                          onClick={() => deleteNewsItem(item.id)}
                          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Trash2 size={18} />
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {newsItems.length === 0 && (
                  <p className="text-center text-gray-500 py-8">Aucune actualité. Cliquez sur "Ajouter" pour créer une actualité.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'partners' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestion des partenaires</h2>
                <div className="flex gap-3">
                  <button
                    onClick={addPartner}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    <Plus size={20} />
                    Ajouter
                  </button>
                  <button
                    onClick={savePartners}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <Save size={20} />
                    Sauvegarder
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {partners.map((partner) => (
                  <div key={partner.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={partner.name}
                        onChange={(e) => updatePartner(partner.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg font-semibold"
                        placeholder="Nom du partenaire"
                      />
                      <select
                        value={partner.category}
                        onChange={(e) => updatePartner(partner.id, 'category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="ONG Internationale">ONG Internationale</option>
                        <option value="ONG Nationale">ONG Nationale</option>
                        <option value="Partenaire Technique et Financier">Partenaire Technique et Financier</option>
                        <option value="Partenaire Institutionnel">Partenaire Institutionnel</option>
                      </select>
                      <textarea
                        value={partner.description}
                        onChange={(e) => updatePartner(partner.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows={2}
                        placeholder="Description"
                      />
                      <input
                        type="url"
                        value={partner.website || ''}
                        onChange={(e) => updatePartner(partner.id, 'website', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Site web (optionnel)"
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={() => deletePartner(partner.id)}
                          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Trash2 size={18} />
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {partners.length === 0 && (
                  <p className="text-center text-gray-500 py-8">Aucun partenaire. Cliquez sur "Ajouter" pour créer un partenaire.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestion de la galerie</h2>
                <div className="flex gap-3">
                  <button
                    onClick={addGalleryItem}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    <Plus size={20} />
                    Ajouter
                  </button>
                  <button
                    onClick={saveGallery}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <Save size={20} />
                    Sauvegarder
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {galleryItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateGalleryItem(item.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg font-semibold"
                        placeholder="Titre de l'image"
                      />
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Uploader une image
                        </label>
                        <div className="flex gap-2">
                          <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer transition-colors bg-gray-50 hover:bg-blue-50">
                            <Upload size={20} className="text-gray-600" />
                            <span className="text-sm text-gray-600">Choisir une image</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(item.id, e)}
                              className="hidden"
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">Ou entrez une URL ci-dessous</p>
                      </div>
                      <input
                        type="url"
                        value={item.imageUrl}
                        onChange={(e) => updateGalleryItem(item.id, 'imageUrl', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="URL de l'image (ex: /images/photo.jpg)"
                      />
                      <textarea
                        value={item.description}
                        onChange={(e) => updateGalleryItem(item.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows={2}
                        placeholder="Description"
                      />
                      <div className="flex items-center justify-between">
                        <input
                          type="date"
                          value={item.date}
                          onChange={(e) => updateGalleryItem(item.id, 'date', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <button
                          onClick={() => deleteGalleryItem(item.id)}
                          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Trash2 size={18} />
                          Supprimer
                        </button>
                      </div>
                      {item.imageUrl && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600 mb-2">Aperçu :</p>
                          <img src={item.imageUrl} alt={item.title} className="max-h-40 rounded-lg object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {galleryItems.length === 0 && (
                  <p className="text-center text-gray-500 py-8">Aucune image. Cliquez sur "Ajouter" pour créer une image.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestion des ressources partagées</h2>
                <div className="flex gap-3">
                  <button
                    onClick={addResource}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    <Plus size={20} />
                    Ajouter
                  </button>
                  <button
                    onClick={saveResources}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <Save size={20} />
                    Sauvegarder
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 mb-2">
                  💡 <strong>Deux options pour ajouter des documents :</strong>
                </p>
                <ul className="text-sm text-blue-800 list-disc list-inside space-y-1">
                  <li><strong>Upload direct :</strong> Uploadez un fichier depuis votre ordinateur (stocké dans le navigateur)</li>
                  <li><strong>Google Drive :</strong> Collez un lien Google Drive partagé (recommandé pour les gros fichiers)</li>
                </ul>
              </div>

              <div className="space-y-4">
                {resources.map((resource) => (
                  <div key={resource.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={resource.title}
                        onChange={(e) => updateResource(resource.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg font-semibold"
                        placeholder="Titre de la ressource"
                      />
                      <select
                        value={resource.type}
                        onChange={(e) => updateResource(resource.id, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="Document">Document</option>
                        <option value="PDF">PDF</option>
                        <option value="Présentation">Présentation</option>
                        <option value="Feuille de calcul">Feuille de calcul</option>
                        <option value="Vidéo">Vidéo</option>
                        <option value="Autre">Autre</option>
                      </select>
                      <textarea
                        value={resource.description}
                        onChange={(e) => updateResource(resource.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows={2}
                        placeholder="Description de la ressource"
                      />
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Uploader un document
                        </label>
                        <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer transition-colors bg-gray-50 hover:bg-blue-50">
                          <FileText size={20} className="text-gray-600" />
                          <span className="text-sm text-gray-600">
                            {resource.fileName || 'Choisir un fichier'}
                          </span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                            onChange={(e) => handleDocumentUpload(resource.id, e)}
                            className="hidden"
                          />
                        </label>
                        {resource.fileName && (
                          <p className="text-xs text-green-600">✓ Fichier uploadé: {resource.fileName}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Lien Google Drive (optionnel)
                        </label>
                        <input
                          type="url"
                          value={resource.driveUrl}
                          onChange={(e) => updateResource(resource.id, 'driveUrl', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="https://drive.google.com/file/d/..."
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        {resource.driveUrl && (
                          <a
                            href={resource.driveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                          >
                            <LinkIcon size={16} />
                            Tester le lien
                          </a>
                        )}
                        <button
                          onClick={() => deleteResource(resource.id)}
                          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors ml-auto"
                        >
                          <Trash2 size={18} />
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {resources.length === 0 && (
                  <p className="text-center text-gray-500 py-8">Aucune ressource. Cliquez sur "Ajouter" pour créer une ressource.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Paramètres de connexion</h2>
              
              {!isEditingCredentials ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800 mb-2">
                      <strong>Email actuel :</strong> {adminEmail}
                    </p>
                    <p className="text-sm text-blue-800">
                      <strong>Mot de passe :</strong> ••••••••
                    </p>
                  </div>
                  <button
                    onClick={() => setIsEditingCredentials(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <Edit size={20} />
                    Modifier les identifiants
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nouvel email
                    </label>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="admin@cceabt.org"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nouveau mot de passe
                    </label>
                    <input
                      type="text"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Nouveau mot de passe"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={saveCredentials}
                      className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      <Save size={20} />
                      Sauvegarder
                    </button>
                    <button
                      onClick={() => setIsEditingCredentials(false)}
                      className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      ⚠️ <strong>Important :</strong> Notez bien vos nouveaux identifiants. Vous en aurez besoin pour vous reconnecter.
                    </p>
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
