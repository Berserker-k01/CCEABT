import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/2101137/pexels-photo-2101137.jpeg?auto=compress&cs=tinysrgb&w=1920")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cceabt-blue/90 to-cceabt-blue/70"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Accès pour tous à l'eau et à l'assainissement
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-8">
            Ensemble pour un Togo où chaque citoyen a accès à l'eau potable et à des services d'assainissement durables.
          </p>
          <a
            href="#actions"
            className="inline-block bg-cceabt-green hover:bg-cceabt-green/90 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Découvrir nos actions
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
      >
        <ChevronDown size={40} />
      </a>
    </section>
  );
}
