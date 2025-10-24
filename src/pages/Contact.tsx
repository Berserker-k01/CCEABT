import { Mail, Phone, MapPin, Facebook, Linkedin, Send, Droplet, Heart } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    attachment: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Message envoyé avec succès! (Fonctionnalité à implémenter)');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Mail size={40} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">Contactez-nous</h1>
          <p className="text-2xl max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Une question ? Un projet ? Nous sommes à votre écoute pour vous accompagner.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Nos coordonnées</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-blue-50 p-6 rounded-lg">
                  <MapPin className="text-blue-600 flex-shrink-0" size={32} />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Adresse</h3>
                    <p className="text-gray-700">
                      Quartier Vakpossito<br />
                      Commune Agoè-Nyivé 3<br />
                      Lomé – Togo
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-green-50 p-6 rounded-lg">
                  <Mail className="text-green-600 flex-shrink-0" size={32} />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Email</h3>
                    <a 
                      href="mailto:cceabt2013@gmail.com" 
                      className="text-green-600 hover:underline"
                    >
                      cceabt2013@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-purple-50 p-6 rounded-lg">
                  <Phone className="text-purple-600 flex-shrink-0" size={32} />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Téléphones</h3>
                    <div className="space-y-1 text-gray-700">
                      <p>(+228) 91 35 93 98</p>
                      <p>(+228) 90 22 78 55</p>
                      <p>(+228) 70 88 88 74</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Réseaux sociaux</h3>
                <div className="flex gap-4">
                  <a 
                    href="https://facebook.com/CCEABT" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Facebook size={24} />
                  </a>
                  <a 
                    href="https://linkedin.com/company/cceabt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-700 text-white p-4 rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Formulaire de contact</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2 group-focus-within:text-blue-600 transition-colors">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-400"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 group-focus-within:text-blue-600 transition-colors">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-400"
                      placeholder="votre@email.com"
                    />
                  </div>

                <div className="group">
                  <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2 group-focus-within:text-blue-600 transition-colors">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-400"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="adhesion">Adhésion au réseau</option>
                    <option value="partenariat">Demande de partenariat</option>
                    <option value="information">Demande d'information</option>
                    <option value="don">Faire un don</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div className="group">
                  <label htmlFor="message" className="block text-gray-700 font-semibold mb-2 group-focus-within:text-blue-600 transition-colors">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-400 resize-none"
                    placeholder="Votre message..."
                  />
                </div>

                <div>
                  <label htmlFor="attachment" className="block text-gray-700 font-semibold mb-2">
                    Pièce jointe (optionnelle)
                  </label>
                  <input
                    type="file"
                    id="attachment"
                    name="attachment"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2 hover:scale-105"
                >
                  <Send size={24} className="group-hover:translate-x-1 transition-transform" />
                  Envoyer le message
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Localisation</h2>
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video bg-gray-200 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MapPin className="mx-auto mb-3" size={48} />
                  <p className="font-semibold">Carte Google Maps</p>
                  <p className="text-sm">Quartier Vakpossito, Agoè-Nyivé 3, Lomé</p>
                  <a 
                    href="https://maps.google.com/?q=Vakpossito,Agoè-Nyivé,Lomé,Togo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ouvrir dans Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Droplet className="mx-auto mb-6" size={60} />
          <h2 className="text-3xl font-bold mb-4">Chaque goutte compte.</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Soutenez nos actions pour un Togo propre, équitable et en bonne santé.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-yellow-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 transition-all shadow-lg flex items-center gap-2">
              <Heart size={24} />
              Faire un don
            </button>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg">
              Rejoindre le réseau
            </button>
          </div>
        </div>
      </section>

      {/* QR Code Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">QR Code - Adhésion / Don</h3>
          <div className="inline-block bg-gray-200 w-48 h-48 rounded-lg flex items-center justify-center text-gray-500">
            <div>
              <p className="font-semibold">QR Code</p>
              <p className="text-sm">Scannez pour adhérer ou faire un don</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
