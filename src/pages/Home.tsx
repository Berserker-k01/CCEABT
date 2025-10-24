import { ArrowRight, Droplet, Users, Heart, TrendingUp, Award, Target, Lightbulb, Sparkles } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 animate-fade-in">
              <Sparkles className="text-yellow-300" size={20} />
              <span className="text-sm font-semibold">Depuis 2013 au service de l'eau pour tous</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight animate-slide-up">
              <span className="bg-gradient-to-r from-blue-200 to-green-200 bg-clip-text text-transparent">
                Pour un accès universel
              </span>
              <br />
              <span className="text-white">à l'eau et à l'hygiène</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 leading-relaxed text-blue-100 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Le CCEABT garantit à chaque citoyen togolais l'accès à une eau potable, à des installations sanitaires améliorées et à un environnement sain.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={() => onNavigate('about')}
                className="group bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 shadow-lg flex items-center gap-2 hover:scale-105"
              >
                Découvrir le CCEABT 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('network')}
                className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 hover:shadow-2xl transition-all duration-300 shadow-lg hover:scale-105"
              >
                Rejoindre le réseau
              </button>
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-8 py-4 rounded-full font-semibold hover:from-yellow-500 hover:to-yellow-600 hover:shadow-2xl transition-all duration-300 shadow-lg hover:scale-105">
                Faire un don
              </button>
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249, 250, 251)"/>
          </svg>
        </div>
      </section>

      {/* Qui sommes-nous */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-blue-100 px-6 py-3 rounded-full mb-4">
                <Lightbulb className="text-blue-600" size={28} />
                <span className="text-blue-600 font-semibold">Notre mission</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Qui sommes-nous ?</h2>
              <p className="text-xl text-gray-700 mb-4 leading-relaxed max-w-4xl mx-auto">
                Le CCEABT est une <span className="text-blue-600 font-semibold">plateforme nationale de la société civile</span> regroupant plus de 40 organisations actives dans les domaines de l'eau, de l'hygiène et de l'assainissement.
              </p>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Nous œuvrons ensemble pour influencer les politiques publiques, renforcer les capacités locales et améliorer les conditions de vie des communautés.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border-t-4 border-blue-600 hover:-translate-y-2">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Droplet className="text-blue-600" size={40} />
                </div>
                <h3 className="text-5xl font-bold text-blue-600 mb-3 group-hover:scale-110 transition-transform">60%</h3>
                <p className="text-gray-700 font-medium">de desserte nationale en eau potable</p>
                <p className="text-sm text-gray-500 mt-2">(2020)</p>
              </div>
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border-t-4 border-green-600 hover:-translate-y-2">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Users className="text-green-600" size={40} />
                </div>
                <h3 className="text-5xl font-bold text-green-600 mb-3 group-hover:scale-110 transition-transform">40+</h3>
                <p className="text-gray-700 font-medium">ONG et associations membres</p>
                <p className="text-sm text-gray-500 mt-2">actives</p>
              </div>
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border-t-4 border-purple-600 hover:-translate-y-2">
                <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="text-purple-600" size={40} />
                </div>
                <h3 className="text-5xl font-bold text-purple-600 mb-3 group-hover:scale-110 transition-transform">10+</h3>
                <p className="text-gray-700 font-medium">ans d'action citoyenne</p>
                <p className="text-sm text-gray-500 mt-2">pour l'eau et l'assainissement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos axes d'action */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Nos axes d'action</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quatre piliers pour transformer l'accès à l'eau et à l'hygiène au Togo
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="group relative p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                  <Target size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Plaidoyer & influence politique</h3>
                <p className="text-gray-700 leading-relaxed">Défendre le droit à l'eau, à l'hygiène et à l'assainissement pour tous.</p>
              </div>
            </div>
            
            <div className="group relative p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="bg-green-600 text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                  <Droplet size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Eau potable & gestion durable</h3>
                <p className="text-gray-700 leading-relaxed">Protéger la ressource, améliorer les infrastructures et encourager une gestion responsable.</p>
              </div>
            </div>
            
            <div className="group relative p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="bg-purple-600 text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                  <Heart size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Assainissement & hygiène</h3>
                <p className="text-gray-700 leading-relaxed">Mettre fin à la défécation à ciel ouvert et promouvoir des pratiques saines.</p>
              </div>
            </div>
            
            <div className="group relative p-8 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="bg-yellow-600 text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                  <Award size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Renforcement de capacités</h3>
                <p className="text-gray-700 leading-relaxed">Former et outiller les acteurs communautaires et les ONG membres.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Actualités récentes */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Actualités récentes</h2>
            <p className="text-xl text-gray-600">Restez informé de nos dernières actions sur le terrain</p>
          </div>
          
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-10">
            <div className="group bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-600 hover:-translate-y-1">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-blue-600 text-white rounded-lg p-2">
                  <Award size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">Atelier de formation des ONG membres</h3>
                  <p className="text-sm text-gray-600">Renforcement des capacités à Lomé</p>
                </div>
              </div>
            </div>
            
            <div className="group bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-green-600 hover:-translate-y-1">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-green-600 text-white rounded-lg p-2">
                  <Target size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">Campagne nationale zéro défécation</h3>
                  <p className="text-sm text-gray-600">Action dans 5 régions du Togo</p>
                </div>
              </div>
            </div>
            
            <div className="group bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-purple-600 hover:-translate-y-1">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-purple-600 text-white rounded-lg p-2">
                  <TrendingUp size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">Étude sur le financement du secteur EHA</h3>
                  <p className="text-sm text-gray-600">Analyse approfondie des budgets</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => onNavigate('news')}
              className="group inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Voir toutes les actualités 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Nos partenaires */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Nos partenaires</h2>
            <p className="text-xl text-gray-600 mb-8">Une collaboration forte pour un impact durable</p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-6">
              {['Eau Vive', 'CRS', 'Plan International', 'PADIE', 'HSF', 'JVE', 'STADD', 'WEP-Togo'].map((partner, index) => (
                <div 
                  key={index}
                  className="bg-white px-6 py-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-gray-100 hover:border-blue-200"
                >
                  <p className="font-semibold text-gray-700 text-center">{partner}</p>
                </div>
              ))}
              <div className="bg-gradient-to-r from-blue-100 to-green-100 px-6 py-4 rounded-xl shadow-md">
                <p className="font-semibold text-gray-600 text-center">+ bien d'autres</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appel à l'action final */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-8 animate-bounce">
            <Heart className="text-white" size={48} />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
            Vous souhaitez soutenir l'accès à l'eau et à l'hygiène pour tous ?
          </h2>
          
          <p className="text-2xl mb-10 text-blue-100 max-w-2xl mx-auto">
            Rejoignez le mouvement dès aujourd'hui et faites la différence.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onNavigate('network')}
              className="group bg-white text-blue-600 px-10 py-5 rounded-full font-bold hover:shadow-2xl transition-all duration-300 shadow-lg hover:scale-110 text-lg"
            >
              <span className="flex items-center gap-2">
                Rejoindre le réseau
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-10 py-5 rounded-full font-bold hover:from-yellow-500 hover:to-yellow-600 hover:shadow-2xl transition-all duration-300 shadow-lg hover:scale-110 text-lg"
            >
              Nous contacter
            </button>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/20">
            <p className="text-blue-100 text-lg">
              <strong className="text-white">Chaque goutte compte</strong> — Ensemble pour un Togo propre, équitable et en bonne santé
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
