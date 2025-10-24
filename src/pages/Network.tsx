import { Users, Network as NetworkIcon, FileText, Download, UserPlus, Handshake } from 'lucide-react';

export default function Network() {
  const members = [
    'PADIE', 'JVE', 'HSF', 'STADD', 'Plan International', 'Eau Vive', 'CRS', 
    'WEP-Togo', 'PNJE', 'ADESCO', 'SOS VITA', 'AFHON', 'ANAD', 'APEL',
    'ATBEF', 'CDJP', 'CERF', 'CLEF', 'CRAD', 'FDR', 'GRADH',
    'IHEDA', 'RAFIA', 'RAJS', 'ROSE', 'UONGTO', 'WADR'
  ];

  const technicalPartners = [
    { name: 'Eau Vive', type: 'Technique' },
    { name: 'CRS', type: 'Technique' },
    { name: 'Plan International', type: 'Technique' },
    { name: 'HSF (Hydraulique Sans Frontières)', type: 'Technique' },
    { name: 'JVE (Jeunes Volontaires pour l\'Environnement)', type: 'Technique' },
    { name: 'STADD', type: 'Technique' }
  ];

  const resources = [
    { title: 'Guide de plaidoyer pour l\'eau et l\'assainissement', type: 'PDF', size: '2.5 MB' },
    { title: 'Étude sur la gouvernance du secteur EHA', type: 'PDF', size: '3.1 MB' },
    { title: 'Rapport annuel 2023', type: 'PDF', size: '4.2 MB' },
    { title: 'Manuel de formation - Hygiène communautaire', type: 'PDF', size: '1.8 MB' },
    { title: 'Stratégie nationale Eau-Hygiène-Assainissement', type: 'PDF', size: '2.9 MB' }
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Réseau & Partenaires</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Une plateforme collaborative pour un impact collectif dans le secteur de l'eau, de l'hygiène et de l'assainissement.
          </p>
        </div>
      </section>

      {/* Notre réseau */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <NetworkIcon className="text-blue-600" size={40} />
              <h2 className="text-3xl font-bold text-gray-800">Notre réseau</h2>
            </div>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Le CCEABT fédère plus de 40 organisations qui partagent une même vision : améliorer l'accès à l'eau, à l'hygiène et à l'assainissement pour tous au Togo.
            </p>
            <p className="text-gray-600 mb-6">
              Chaque membre contribue à renforcer l'impact du réseau sur le terrain.
            </p>
          </div>
        </div>
      </section>

      {/* Les membres du réseau */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Users className="text-green-600" size={40} />
              <h2 className="text-3xl font-bold text-gray-800">Les membres du réseau</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {members.map((member, index) => (
                <div 
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center font-semibold text-gray-700 border-2 border-green-100 hover:border-green-300"
                >
                  {member}
                </div>
              ))}
              <div className="bg-gradient-to-br from-green-100 to-blue-100 p-4 rounded-lg shadow-md text-center font-semibold text-gray-600 border-2 border-dashed border-green-300 flex items-center justify-center">
                + et bien d'autres...
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partenaires techniques & financiers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Handshake className="text-blue-600" size={40} />
              <h2 className="text-3xl font-bold text-gray-800">Partenaires techniques & financiers</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Partenaires Techniques</h3>
                <ul className="space-y-2 text-gray-700">
                  {technicalPartners.map((partner, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>{partner.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-800 mb-4">Partenaires Financiers</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Partenaires institutionnels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>ONG internationales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Fondations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-purple-800 mb-4">Partenaires Institutionnels</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span>Ministère de l'Eau et de l'Hydraulique Villageoise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span>Collectivités locales</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ressources partagées */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="text-blue-600" size={40} />
              <h2 className="text-3xl font-bold text-gray-800">Ressources partagées</h2>
            </div>
            <p className="text-gray-700 mb-6">
              Accédez à nos guides pratiques, rapports d'études, documents de plaidoyer et publications.
            </p>
            
            <div className="space-y-4 mb-8">
              {resources.map((resource, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <FileText className="text-blue-600" size={32} />
                    <div>
                      <h3 className="font-semibold text-gray-800">{resource.title}</h3>
                      <p className="text-sm text-gray-600">{resource.type} • {resource.size}</p>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Download size={20} />
                    <span className="hidden md:inline">Télécharger</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a 
                href="#" 
                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors shadow-lg"
              >
                <FileText size={24} />
                Accéder à nos ressources (Google Drive)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Appel à adhésion */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <UserPlus className="mx-auto mb-6" size={60} />
          <h2 className="text-3xl font-bold mb-4">Rejoignez notre réseau</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Vous êtes une organisation, une institution ou un partenaire souhaitant agir pour un Togo plus propre et plus sain ?
            Rejoignez notre réseau dès aujourd'hui.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg text-lg">
            Adhérer au CCEABT
          </button>
        </div>
      </section>
    </div>
  );
}
