import { Users, Network as NetworkIcon, FileText, Download, UserPlus, Handshake, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MembershipForm from '../components/MembershipForm';

export default function Network() {
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
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
    <div>
      {/* Hero Section */}
      <section className="relative text-white py-32 overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <img 
            src="/images/2.webp" 
            alt="Réseau & Partenaires" 
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
              <Users className="text-blue-300" size={20} />
              <span className="text-sm font-semibold">Un réseau solidaire pour l'accès à l'eau</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight animate-slide-up">
              <span className="bg-gradient-to-r from-blue-200 to-green-200 bg-clip-text text-transparent">
                Réseau & Partenaires
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 leading-relaxed text-blue-100 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Une plateforme collaborative pour un impact collectif dans le secteur de l'eau, de l'hygiène et de l'assainissement.
            </p>
          </div>
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
                    <span>Ministère délégué auprès du ministère de l'aménagement du territoire, chargé de l'eau et de l'assainissement</span>
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
          <button 
            onClick={() => setIsMembershipModalOpen(true)}
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg text-lg hover:scale-105 transform"
          >
            Adhérer au CCEABT
          </button>
        </div>
      </section>

      {/* Modal d'adhésion */}
      <AnimatePresence>
        {isMembershipModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4 text-center">
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsMembershipModalOpen(false)}
              />
              
              {/* Contenu de la modale */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-auto p-6 text-left overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsMembershipModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
                
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <MembershipForm onClose={() => setIsMembershipModalOpen(false)} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
