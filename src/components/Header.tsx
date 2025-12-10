import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'À propos & Nos actions', path: '/about' },
    { name: 'Réseau & Partenaires', path: '/network' },
    { name: 'Actualités', path: '/news' },
    { name: 'Contact', path: '/contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          <Link
            to="/"
            onClick={scrollToTop}
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-200 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <img
                src="/images/logo CCEABT.png"
                alt="Logo CCEABT"
                className="h-20 w-auto relative z-10 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold text-cceabt-blue">CCEABT</h1>
              <p className="text-xs text-gray-600">Conseil de Concertation pour l'Eau et l'Assainissement</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={scrollToTop}
                className={`relative font-semibold transition-all duration-300 px-3 py-2 rounded-lg ${location.pathname === item.path
                    ? 'text-white bg-blue-700 shadow-lg'
                    : item.path === '/network'
                      ? 'text-green-600 hover:text-green-700 hover:bg-green-50'
                      : 'text-cceabt-blue hover:text-cceabt-green hover:bg-blue-50'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <button
            className="lg:hidden text-cceabt-blue"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToTop();
                }}
                className={`text-left font-medium transition-colors duration-200 ${location.pathname === item.path
                    ? 'text-cceabt-blue font-bold'
                    : 'text-cceabt-blue hover:text-cceabt-blue hover:text-glow-blue'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
