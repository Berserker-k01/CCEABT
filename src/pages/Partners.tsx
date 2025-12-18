import { useState } from 'react';
import { ExternalLink, Handshake, Globe, Users, Building2 } from 'lucide-react';
import { useData } from '../context/DataContext';

const categories = [
  { id: 'all', name: 'Tous les partenaires', icon: Globe },
  { id: 'ONG Internationale', name: 'ONG Internationales', icon: Globe },
  { id: 'ONG Nationale', name: 'ONG Nationales', icon: Users },
  { id: 'Partenaire Technique et Financier', name: 'Partenaires Techniques', icon: Building2 },
  { id: 'Partenaire Institutionnel', name: 'Partenaires Institutionnels', icon: Handshake }
  // Note: 'International', 'National' etc. from DataContext need to map to these IDs or vice-versa.
  // The DataContext uses: 'Technique' | 'Financier' | 'Institutionnel' | 'International' | 'National'
  // The UI filters above use specifically: 'ONG Internationale', 'ONG Nationale', 'Partenaire Technique et Financier', 'Partenaire Institutionnel'
  // I need to align them.
  // Let's update the filter categories to match the Data Mode (or vice versa). 
  // Given I already updated Admin to use specific values, I should check what I put in Admin.
  // In Admin I used: <option value="Technique">...
  // Wait, in Admin I put:
  // <option value="ONG Internationale">ONG Internationale</option>
  // <option value="ONG Nationale">ONG Nationale</option>
  // <option value="Partenaire Technique et Financier">Partenaire Technique et Financier</option>
  // <option value="Partenaire Institutionnel">Partenaire Institutionnel</option>
  // So the DataContext types were slightly off in initial definition but the Admin form uses the correct strings corresponding to these filters.
  // However, the initial mock data in DataContext uses 'International', 'National'.
  // I should update the categories here to catch 'International' as 'ONG Internationale' etc if needed, or just standardise.
  // Standardising to what's in Admin is best.
];

export default function Partners() {
  const { partners } = useData();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPartners = selectedCategory === 'all'
    ? partners
    : partners.filter(partner => partner.type === selectedCategory || partner.category === selectedCategory);
  // Handling both 'type' (from context interface) and potential 'category' field if data varies.
  // The DataContext defines 'type', but previous static data used 'category'.
  // Let's assume 'type' is the field to check against.

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
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all ${selectedCategory === category.id
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
                          {partner.type}
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
