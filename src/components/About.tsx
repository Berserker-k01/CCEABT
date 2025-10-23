import { Heart, Eye, Target, Handshake } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Citoyenneté',
      description: 'Promouvoir la participation citoyenne pour un accès équitable aux services essentiels.',
    },
    {
      icon: Eye,
      title: 'Durabilité',
      description: 'Garantir des solutions pérennes respectueuses de l\'environnement.',
    },
    {
      icon: Target,
      title: 'Engagement',
      description: 'Œuvrer sans relâche pour l\'atteinte des objectifs de développement durable.',
    },
    {
      icon: Handshake,
      title: 'Concertation',
      description: 'Favoriser le dialogue et la collaboration entre tous les acteurs.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-cceabt-blue mb-6">À propos du CCEABT</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Le Conseil de Concertation pour l'Eau et l'Assainissement de Base au Togo (CCEABT) est le réseau national des organisations de la société civile œuvrant dans le secteur Eau, Hygiène et Assainissement (EHA) au Togo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-cceabt-blue to-cceabt-blue/90 text-white p-8 rounded-2xl">
            <Eye size={48} className="mb-4" />
            <h3 className="text-2xl font-bold mb-4">Notre Vision</h3>
            <p className="text-lg leading-relaxed">
              Un Togo où chaque citoyen a accès à l'eau potable et à des services d'assainissement durables, contribuant ainsi à l'amélioration de la santé publique et au développement socio-économique.
            </p>
          </div>

          <div className="bg-gradient-to-br from-cceabt-green to-cceabt-green/90 text-white p-8 rounded-2xl">
            <Target size={48} className="mb-4" />
            <h3 className="text-2xl font-bold mb-4">Notre Mission</h3>
            <p className="text-lg leading-relaxed">
              Renforcer les capacités des organisations membres, promouvoir le plaidoyer pour des politiques publiques efficaces et coordonner les actions en faveur de l'accès universel à l'eau et à l'assainissement.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-cceabt-blue text-center mb-12">Nos Valeurs</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-200"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-cceabt-light-blue/20 rounded-full mb-4">
                  <value.icon size={32} className="text-cceabt-blue" />
                </div>
                <h4 className="text-xl font-semibold text-cceabt-blue mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
