import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Accueil', href: '#home' },
    { name: 'À propos', href: '#about' },
    { name: 'Nos actions', href: '#actions' },
    { name: 'Membres & Partenaires', href: '#members' },
    { name: 'Actualités', href: '#news' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center space-x-3">
            <img
              src="/images/logo CCEABT.png"
              alt="Logo CCEABT"
              className="h-20 w-auto"
            />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-cceabt-blue">CCEABT</h1>
              <p className="text-xs text-gray-600">Conseil de Concertation pour l'Eau et l'Assainissement</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-cceabt-blue hover:text-cceabt-green font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
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
              <a
                key={item.name}
                href={item.href}
                className="text-cceabt-blue hover:text-cceabt-green font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
