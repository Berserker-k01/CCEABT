import { Facebook, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const quickLinks = [
    { name: 'Accueil', page: 'home' },
    { name: 'À propos & Actions', page: 'about' },
    { name: 'Réseau & Partenaires', page: 'network' },
    { name: 'Actualités', page: 'news' },
    { name: 'Contact', page: 'contact' },
  ];

  return (
    <footer className="bg-cceabt-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img
              src="/images/logo CCEABT.png"
              alt="Logo CCEABT"
              className="h-16 w-auto mb-4 brightness-0 invert"
            />
            <h3 className="text-xl font-bold mb-2">CCEABT</h3>
            <p className="text-gray-200 text-sm">
              Réseau national des organisations de la société civile œuvrant dans le secteur Eau, Hygiène et Assainissement au Togo.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => {
                      onNavigate(link.page);
                      window.scrollTo(0, 0);
                    }}
                    className="text-sm text-gray-200 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-200">Quartier Vakpossito, Agoè-Nyivé 3, Lomé – Togo</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="flex-shrink-0" />
                <a href="mailto:cceabt2013@gmail.com" className="text-sm text-gray-200 hover:text-white">
                  cceabt2013@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="flex-shrink-0" />
                <div className="text-sm text-gray-200">
                  <p>+228 91 35 93 98</p>
                  <p>+228 90 22 78 55</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://facebook.com/CCEABT"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-200"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://linkedin.com/company/cceabt"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-200"
              >
                <Linkedin size={24} />
              </a>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => {
                  onNavigate('network');
                  window.scrollTo(0, 0);
                }}
                className="block w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 px-4 rounded transition-colors"
              >
                Adhérer au réseau
              </button>
              <button className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-2 px-4 rounded transition-colors">
                Faire un don
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm text-gray-200">
            <button onClick={() => onNavigate('home')} className="hover:text-white">Mentions légales</button>
            <span>•</span>
            <button onClick={() => onNavigate('home')} className="hover:text-white">Politique de confidentialité</button>
          </div>
          <p className="text-sm text-gray-200 text-center">
            © {new Date().getFullYear()} CCEABT - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
