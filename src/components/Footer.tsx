import { Facebook, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { i18n } = useTranslation();
  const quickLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À propos & Actions', path: '/about' },
    { name: 'Réseau & Partenaires', path: '/network' },
    { name: 'Actualités', path: '/news' },
    { name: 'Contact', path: '/contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-blue-800 text-white w-full">
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
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={scrollToTop}
                    className="text-sm text-gray-200 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
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
              <Link
                to="/network"
                onClick={scrollToTop}
                className="block w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 px-4 rounded transition-colors text-center"
              >
                Adhérer au réseau
              </Link>
              <button className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-2 px-4 rounded transition-colors text-center">
                Faire un don
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm text-gray-200">
            <Link to="/" onClick={scrollToTop} className="hover:text-white">Mentions légales</Link>
            <span>•</span>
            <Link to="/" onClick={scrollToTop} className="hover:text-white">Politique de confidentialité</Link>
          </div>

          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => i18n.changeLanguage('fr')}
              className={`text-sm font-semibold transition-colors ${i18n.language === 'fr' ? 'text-white underline' : 'text-gray-400 hover:text-white'}`}
            >
              FR
            </button>
            <span className="text-gray-400">|</span>
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`text-sm font-semibold transition-colors ${i18n.language === 'en' ? 'text-white underline' : 'text-gray-400 hover:text-white'}`}
            >
              EN
            </button>
          </div>

          <p className="text-sm text-gray-200 text-center">
            © {new Date().getFullYear()} CCEABT - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
