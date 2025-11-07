import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h1>
          <p className="text-xl text-gray-600">
            Notre équipe est à votre écoute pour répondre à vos questions et vous accompagner dans vos projets.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <ContactForm className="w-full" />
        </div>
        
        <div className="mt-12 bg-blue-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Autres moyens de nous contacter</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-blue-600" size={28} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Email</h3>
              <a href="mailto:contact@cceabt.org" className="text-blue-600 hover:text-blue-800">
                contact@cceabt.org
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-blue-600" size={28} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Téléphone</h3>
              <a href="tel:+22812345678" className="text-blue-600 hover:text-blue-800">
                +228 12 34 56 78
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-blue-600" size={28} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Adresse</h3>
              <p className="text-gray-600">
                Quartier Nyékonakpoè,<br />
                Rue des Banques,<br />
                Lomé, Togo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
