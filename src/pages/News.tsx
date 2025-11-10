import { Newspaper, Calendar, Tag, Image, Facebook, Linkedin } from 'lucide-react';
import { useState } from 'react';

// Données des catégories
const categories = [
  { id: 'all', name: 'Toutes les actualités', color: 'gray' },
  { id: 'advocacy', name: 'Plaidoyer et politiques publiques', color: 'blue' },
  { id: 'water', name: 'Eau et assainissement', color: 'green' },
  { id: 'training', name: 'Formations et sensibilisations', color: 'purple' },
  { id: 'testimonials', name: 'Témoignages et projets communautaires', color: 'yellow' }
];

// Données des actualités
const newsData = [
    {
      id: 1,
      title: 'Renforcement des capacités des associations membres à Lomé',
      date: '15 Mars 2025',
      category: 'training',
      excerpt: 'Un atelier de formation de 3 jours a réuni plus de 30 représentants des ONG membres pour renforcer leurs compétences en plaidoyer et gestion de projets.',
      image: null
    },
    {
      id: 2,
      title: 'Étude sur la gouvernance du secteur de l\'eau au Togo',
      date: '8 Mars 2025',
      category: 'advocacy',
      excerpt: 'Publication d\'une étude approfondie sur les défis et opportunités de la gouvernance du secteur EHA, avec des recommandations pour les décideurs.',
      image: null
    },
    {
      id: 3,
      title: 'Célébration de la Journée Mondiale de l\'Eau – édition 2025',
      date: '22 Mars 2025',
      category: 'water',
      excerpt: 'Le CCEABT a organisé plusieurs événements à travers le pays pour sensibiliser sur l\'importance de l\'eau potable et de l\'assainissement.',
      image: null
    },
    {
      id: 4,
      title: 'Campagne nationale : Fin de la défécation à ciel ouvert',
      date: '1 Février 2025',
      category: 'water',
      excerpt: 'Lancement d\'une grande campagne de sensibilisation dans 5 régions pour promouvoir les installations sanitaires améliorées.',
      image: null
    },
    {
      id: 5,
      title: 'Atelier de formation des ONG membres du réseau',
      date: '20 Janvier 2025',
      category: 'training',
      excerpt: 'Formation intensive sur les techniques de mobilisation communautaire et de plaidoyer pour l\'accès à l\'eau.',
      image: null
    },
    {
      id: 6,
      title: 'Témoignage : L\'impact du CCEABT dans la région de Kara',
      date: '10 Janvier 2025',
      category: 'testimonials',
      excerpt: 'Découvrez comment nos actions ont transformé l\'accès à l\'eau dans plusieurs villages de la région de Kara.',
      image: null
    }
  ];

// Composant principal
export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filtre les actualités par catégorie sélectionnée
  const filteredNews = selectedCategory === 'all' 
    ? newsData 
    : newsData.filter(item => item.category === selectedCategory);

  // Récupère la couleur associée à une catégorie
  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || 'gray';
  };

  // Classes de couleur pour les catégories
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    gray: 'bg-gray-100 text-gray-800'
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white py-32 overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <img 
            src="/images/3.jpg" 
            alt="Actualités CCEABT" 
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
              <Newspaper className="text-blue-300" size={20} />
              <span className="text-sm font-semibold">Pour un accès universel et durable à l'eau et à l'hygiène</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight animate-slide-up text-blue-600">
              Actualités
            </h1>
            <p className="text-xl md:text-2xl mb-10 leading-relaxed text-white max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Depuis plus de dix ans, le CCEABT œuvre aux côtés des communautés et des acteurs publics pour offrir à chaque citoyen togolais une eau potable de qualité, des infrastructures sanitaires améliorées et un cadre de vie sain.
              <br /><br />
              Ensemble, bâtissons un Togo où l'eau et l'hygiène sont des droits, et non des privilèges.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-gray-50 sticky top-24 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Tag className="text-blue-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Catégories</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Nos dernières actualités</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((item) => (
                <article key={item.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-200">
                  <div className="bg-gray-200 h-48 flex items-center justify-center text-gray-400">
                    <Image size={48} />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="text-gray-500" size={16} />
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${colorClasses[getCategoryColor(item.category)]}`}>
                      {categories.find(cat => cat.id === item.category)?.name}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.excerpt}</p>
                    <button className="text-blue-600 font-semibold hover:underline">
                      Lire la suite →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Galerie média */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Galerie média</h2>
            <p className="text-gray-600 mb-8">
              Photos, affiches de campagnes, vidéos de terrain et reportages.
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="bg-white h-48 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center text-gray-400">
                  <Image size={48} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Flux social */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Suivez-nous sur les réseaux sociaux</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-8 rounded-lg shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Facebook className="text-blue-600" size={40} />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Facebook</h3>
                    <p className="text-gray-600">CCEABT</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Suivez nos actualités, événements et campagnes de sensibilisation.
                </p>
                <a 
                  href="https://facebook.com/CCEABT" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Suivre sur Facebook
                </a>
              </div>

              <div className="bg-blue-50 p-8 rounded-lg shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Linkedin className="text-blue-700" size={40} />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">LinkedIn</h3>
                    <p className="text-gray-600">Profil officiel</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Rejoignez notre réseau professionnel et découvrez nos opportunités.
                </p>
                <a 
                  href="https://linkedin.com/company/cceabt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
                >
                  Suivre sur LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter subscription */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Newspaper className="mx-auto mb-6" size={60} />
          <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir nos actualités directement dans votre boîte mail.
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input 
              type="email" 
              placeholder="Votre adresse email" 
              className="flex-1 px-4 py-3 rounded-lg text-gray-800"
            />
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
              S'inscrire
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
