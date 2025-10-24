import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Accueil', page: 'home' },
    { name: 'À propos & Nos actions', page: 'about' },
    { name: 'Réseau & Partenaires', page: 'network' },
    { name: 'Actualités', page: 'news' },
    { name: 'Contact', page: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          <button 
            onClick={() => {
              onNavigate('home');
              window.scrollTo(0, 0);
            }}
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
              <h1 className="text-xl font-bold text-cceabt-blue group-hover:text-cceabt-green transition-colors">CCEABT</h1>
              <p className="text-xs text-gray-600">Conseil de Concertation pour l'Eau et l'Assainissement</p>
            </div>
          </button>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  onNavigate(item.page);
                  window.scrollTo(0, 0);
                }}
                className={`relative font-semibold transition-all duration-300 px-3 py-2 rounded-lg ${
                  currentPage === item.page
                    ? 'text-white bg-gradient-to-r from-blue-600 to-green-600 shadow-lg'
                    : 'text-cceabt-blue hover:text-cceabt-green hover:bg-blue-50'
                }`}
              >
                {item.name}
              </button>
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
              <button
                key={item.name}
                onClick={() => {
                  onNavigate(item.page);
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`text-left font-medium transition-colors duration-200 ${
                  currentPage === item.page
                    ? 'text-cceabt-green font-bold'
                    : 'text-cceabt-blue hover:text-cceabt-green'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
