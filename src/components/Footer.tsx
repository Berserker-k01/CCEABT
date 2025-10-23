import { Facebook, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cceabt-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-200">Lomé, Togo</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="flex-shrink-0" />
                <a href="mailto:contact@cceabt.tg" className="text-sm text-gray-200 hover:text-white">
                  contact@cceabt.tg
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="flex-shrink-0" />
                <p className="text-sm text-gray-200">+228 XX XX XX XX</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-200"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-200"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-200">
            © {new Date().getFullYear()} CCEABT - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
