import { useState } from 'react';
import { ExternalLink, Handshake, Globe, Users, Building2 } from 'lucide-react';

interface Partner {
  name: string;
  category: string;
  description: string;
  website?: string;
  logo?: string;
}

const partnersData: Partner[] = [
  // ONG Internationales
  {
    name: 'Eau Vive',
    category: 'ONG Internationale',
    description: 'Organisation internationale spécialisée dans l\'accès à l\'eau potable et l\'assainissement dans les pays en développement.',
    website: 'https://www.eau-vive.org'
  },
  {
    name: 'Catholic Relief Services (CRS)',
    category: 'ONG Internationale',
    description: 'Organisation humanitaire internationale œuvrant pour la justice sociale et l\'aide aux populations vulnérables.',
    website: 'https://www.crs.org'
  },
  {
    name: 'Plan International',
    category: 'ONG Internationale',
    description: 'Organisation de développement communautaire centrée sur les droits des enfants et l\'égalité des filles.',
    website: 'https://plan-international.org'
  },
  
  // ONG Nationales
  {
    name: 'PADIE',
    category: 'ONG Nationale',
    description: 'Programme d\'Appui au Développement Intégré et à l\'Environnement au Togo.',
  },
  {
    name: 'Hydraulique Sans Frontières (HSF)',
    category: 'ONG Nationale',
    description: 'Association œuvrant pour l\'accès à l\'eau potable et l\'assainissement dans les zones rurales.',
  },
  {
    name: 'Jeunes Volontaires pour l\'Environnement (JVE)',
    category: 'ONG Nationale',
    description: 'Réseau de jeunes engagés pour la protection de l\'environnement et le développement durable.',
    website: 'https://www.jve-togo.org'
  },
  {
    name: 'STADD',
    category: 'ONG Nationale',
    description: 'Solidarité Togolaise pour l\'Autopromotion et le Développement Durable.',
  },
  {
    name: 'WEP-Togo',
    category: 'ONG Nationale',
    description: 'Water and Environmental Protection - Organisation pour la protection de l\'eau et de l\'environnement.',
  },
  {
    name: 'PNJE',
    category: 'ONG Nationale',
    description: 'Plateforme Nationale des Jeunes pour l\'Environnement.',
  },
  {
    name: 'ADESCO',
    category: 'ONG Nationale',
    description: 'Association pour le Développement Socio-économique et Communautaire.',
  },
  {
    name: 'SOS VITA',
    category: 'ONG Nationale',
    description: 'Organisation de solidarité pour la vie et l\'amélioration des conditions sanitaires.',
  },
  {
    name: 'AFHON',
    category: 'ONG Nationale',
    description: 'Association des Femmes pour l\'Hygiène et l\'Organisation Nutritionnelle.',
  },
  
  // Partenaires Techniques et Financiers
  {
    name: 'Agence Française de Développement (AFD)',
    category: 'Partenaire Technique et Financier',
    description: 'Institution financière publique française qui met en œuvre la politique de développement de la France.',
    website: 'https://www.afd.fr'
  },
  {
    name: 'Coopération Allemande (GIZ)',
    category: 'Partenaire Technique et Financier',
    description: 'Agence de coopération internationale allemande pour le développement durable.',
    website: 'https://www.giz.de'
  },
  {
    name: 'Union Européenne',
    category: 'Partenaire Technique et Financier',
    description: 'Soutien aux programmes de développement en eau, hygiène et assainissement au Togo.',
    website: 'https://www.eeas.europa.eu'
  },
  {
    name: 'UNICEF Togo',
    category: 'Partenaire Technique et Financier',
    description: 'Fonds des Nations Unies pour l\'enfance, actif dans les programmes WASH au Togo.',
    website: 'https://www.unicef.org/togo'
  },
  {
    name: 'Banque Mondiale',
    category: 'Partenaire Technique et Financier',
    description: 'Institution financière internationale soutenant les projets d\'infrastructure en eau et assainissement.',
    website: 'https://www.worldbank.org'
  },
  
  // Partenaires Institutionnels
  {
    name: 'Ministère délégué auprès du ministère de l\'aménagement du territoire, chargé de l\'eau et de l\'assainissement',
    category: 'Partenaire Institutionnel',
    description: 'Autorité gouvernementale en charge de la politique nationale de l\'eau et de l\'assainissement.',
  },
  {
    name: 'Direction Générale de l\'Eau et de l\'Assainissement',
    category: 'Partenaire Institutionnel',
    description: 'Direction technique responsable de la mise en œuvre des politiques sectorielles.',
  },
  {
    name: 'Collectivités Locales',
    category: 'Partenaire Institutionnel',
    description: 'Communes et préfectures partenaires dans la gestion locale des services d\'eau et d\'assainissement.',
  }
];

const categories = [
  { id: 'all', name: 'Tous les partenaires', icon: Globe },
  { id: 'ONG Internationale', name: 'ONG Internationales', icon: Globe },
  { id: 'ONG Nationale', name: 'ONG Nationales', icon: Users },
  { id: 'Partenaire Technique et Financier', name: 'Partenaires Techniques', icon: Building2 },
  { id: 'Partenaire Institutionnel', name: 'Partenaires Institutionnels', icon: Handshake }
];

export default function Partners() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredPartners = selectedCategory === 'all' 
    ? partnersData 
    : partnersData.filter(partner => partner.category === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white py-32 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-green-600">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20">
              <Handshake className="text-blue-200" size={20} />
              <span className="text-sm font-semibold tracking-wide">Ensemble pour l'eau et l'assainissement</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Nos Partenaires
            </h1>
            
            <p className="text-lg md:text-xl mb-8 leading-relaxed text-blue-50 max-w-3xl mx-auto">
              Le CCEABT collabore avec un réseau diversifié d'organisations nationales et internationales, d'institutions publiques et de partenaires techniques pour maximiser son impact sur le terrain.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50 sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                  }`}
                >
                  <Icon size={18} />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedCategory === 'all' ? 'Tous nos partenaires' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-gray-600">
                {filteredPartners.length} partenaire{filteredPartners.length > 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPartners.map((partner, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-3">
                          {partner.category}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {partner.name}
                        </h3>
                      </div>
                      {partner.website && (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                          aria-label={`Visiter le site de ${partner.name}`}
                        >
                          <ExternalLink className="text-blue-600" size={20} />
                        </a>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {partner.description}
                    </p>
                    
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm group-hover:gap-3 transition-all"
                      >
                        Visiter le site web
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Handshake className="mx-auto mb-6 text-blue-600" size={60} />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Devenez partenaire du CCEABT
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Vous souhaitez collaborer avec nous pour améliorer l'accès à l'eau et à l'assainissement au Togo ? Rejoignez notre réseau de partenaires engagés.
            </p>
            <a
              href="/contact"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
