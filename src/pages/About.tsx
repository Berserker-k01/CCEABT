import { Target, Eye, Heart, Users, TrendingUp, Award, Handshake, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function About() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    timelineRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleSections(prev => new Set(prev).add(index));
              }
            });
          },
          { threshold: 0.2 }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <div className="pt-24">
      {/* Hero Section - Full screen with stats overlay */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-blue-900 via-blue-800 to-green-900 text-white overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold">
              Depuis 2013 pour le Togo
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-fade-in">
              Transformer l'accès à l'eau au Togo
            </h1>
            <p className="text-2xl md:text-3xl text-blue-100 mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Une plateforme de 40+ organisations unies pour garantir le droit à l'eau, à l'hygiène et à l'assainissement pour tous les Togolais.
            </p>
          </div>

          {/* Stats Grid Overlay */}
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">40+</div>
              <div className="text-blue-100 font-medium">Organisations membres</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-green-200 to-white bg-clip-text text-transparent">60%</div>
              <div className="text-green-100 font-medium">Desserte en eau potable (2020)</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent">10+</div>
              <div className="text-purple-100 font-medium">Années d'impact</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">8.3M</div>
              <div className="text-yellow-100 font-medium">Habitants au Togo</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Mission Statement - Bold & Centered */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Nous œuvrons pour que chaque Togolais ait accès à{' '}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                l'eau potable, l'hygiène et l'assainissement
              </span>
            </h2>
            <p className="text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Une plateforme nationale de la société civile regroupant plus de 40 organisations pour transformer durablement l'accès à l'eau au Togo.
            </p>
          </div>
        </div>
      </section>

      {/* Notre histoire - Modern Timeline */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">Notre parcours</span>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Une décennie d'impact</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">De la création en 2013 à aujourd'hui, découvrez les étapes clés de notre évolution</p>
            </div>
            {/* Timeline Container with animated line */}
            <div className="relative">
              {/* Animated vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-green-600 to-purple-600 opacity-20"></div>
              <div 
                className="absolute left-6 top-0 w-1 bg-gradient-to-b from-blue-600 via-green-600 to-purple-600 transition-all duration-[2500ms]"
                style={{ 
                  height: visibleSections.size > 0 ? '100%' : '0%',
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              ></div>

              <div className="space-y-12">
                {/* 2013 - Création */}
                <div 
                  ref={el => timelineRefs.current[0] = el}
                  className={`relative pl-20 transition-all duration-[1200ms] ${
                    visibleSections.has(0) 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-20'
                  }`}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}
                >
                  {/* Year Badge with pulse animation */}
                  <div className="absolute left-0 top-0 group">
                    <div className={`absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-0 transition-opacity duration-1000 ${
                      visibleSections.has(0) ? 'opacity-50 animate-pulse' : ''
                    }`}></div>
                    <div 
                      className={`relative bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-[900ms] ${
                        visibleSections.has(0) ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'
                      }`}
                      style={{ transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                    >
                      2013
                    </div>
                  </div>
                  
                  <div 
                    className={`bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-xl border-l-4 border-blue-600 transition-all duration-[800ms] delay-[150ms] hover:shadow-2xl hover:scale-[1.02] cursor-pointer ${
                      visibleSections.has(0) ? 'scale-100 rotate-0' : 'scale-90 -rotate-2'
                    }`}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-transparent rounded-full"></div>
                      <h3 className="text-2xl font-bold text-blue-900">Création de la plateforme</h3>
                    </div>
                    <p className="mb-6 text-gray-700 leading-relaxed">
                      Les ONG et associations intervenant dans le sous-secteur de l'assainissement de base au Togo se constituent en plateforme pour faire sortir de l'ornière cette problématique négligée.
                    </p>
                    <div className="bg-white p-6 rounded-xl border-l-4 border-red-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <p className="font-bold text-red-700 text-lg">Le contexte alarmant :</p>
                      </div>
                      <ul className="space-y-3 text-base">
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">•</span>
                          <span>Moins de <strong>1% du budget de l'État</strong> alloué au secteur</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">•</span>
                          <span>Données disparates et non fiables sur l'assainissement</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">•</span>
                          <span>Installations sanitaires améliorées : <strong>10% (2005)</strong> puis <strong>54% (2015 QUIBB)</strong> vs <strong>12% (2015 JMP)</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">•</span>
                          <span>Règles d'hygiène peu respectées sur l'ensemble du territoire</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 2018 - Extension */}
                <div 
                  ref={el => timelineRefs.current[1] = el}
                  className={`relative pl-20 transition-all duration-[1100ms] delay-200 ${
                    visibleSections.has(1) 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-24'
                  }`}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}
                >
                  <div className="absolute left-0 top-0 group">
                    <div className={`absolute inset-0 bg-green-600 rounded-full blur-xl opacity-0 transition-opacity duration-1000 ${
                      visibleSections.has(1) ? 'opacity-50 animate-pulse' : ''
                    }`}></div>
                    <div 
                      className={`relative bg-gradient-to-br from-green-500 to-green-700 text-white font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-[850ms] ${
                        visibleSections.has(1) ? 'scale-100 rotate-[360deg]' : 'scale-0 rotate-0'
                      }`}
                      style={{ transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}
                    >
                      2018
                    </div>
                  </div>
                  
                  <div 
                    className={`bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-xl border-l-4 border-green-600 transition-all duration-[750ms] delay-100 hover:shadow-2xl hover:scale-[1.02] cursor-pointer ${
                      visibleSections.has(1) ? 'scale-100 rotate-0' : 'scale-88 rotate-1'
                    }`}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-1 w-12 bg-gradient-to-r from-green-600 to-transparent rounded-full"></div>
                      <h3 className="text-2xl font-bold text-green-900">Intégration de l'eau potable</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Pour plus d'efficacité et en reconnaissance du <strong className="text-green-700">lien intrinsèque entre eau et assainissement</strong>, les membres décident d'intégrer la problématique de l'eau potable aux domaines d'intervention du réseau.
                    </p>
                  </div>
                </div>

                {/* 2020 - Impacts */}
                <div 
                  ref={el => timelineRefs.current[2] = el}
                  className={`relative pl-20 transition-all duration-[1300ms] delay-300 ${
                    visibleSections.has(2) 
                      ? 'opacity-100 translate-x-0 translate-y-0' 
                      : 'opacity-0 -translate-x-16 translate-y-8'
                  }`}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                >
                  <div className="absolute left-0 top-0 group">
                    <div className={`absolute inset-0 bg-purple-600 rounded-full blur-xl opacity-0 transition-opacity duration-1000 ${
                      visibleSections.has(2) ? 'opacity-50 animate-pulse' : ''
                    }`}></div>
                    <div 
                      className={`relative bg-gradient-to-br from-purple-500 to-purple-700 text-white font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-[1000ms] ${
                        visibleSections.has(2) ? 'scale-110 rotate-0' : 'scale-0 rotate-[270deg]'
                      }`}
                      style={{ transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.275)' }}
                    >
                      2020
                    </div>
                  </div>
                  
                  <div 
                    className={`bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-xl border-l-4 border-purple-600 transition-all duration-[850ms] delay-[200ms] hover:shadow-2xl hover:scale-[1.02] cursor-pointer ${
                      visibleSections.has(2) ? 'scale-100 rotate-0' : 'scale-92 -rotate-1'
                    }`}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-transparent rounded-full"></div>
                      <h3 className="text-2xl font-bold text-purple-900">Des progrès mesurables</h3>
                    </div>
                    <p className="mb-6 text-gray-700 leading-relaxed">
                      Avec une population de <strong className="text-purple-700">8 279 000 habitants</strong>, le taux de desserte nationale en eau potable progresse de <strong className="text-purple-700">53% (2019) à 60% (2020)</strong>.
                    </p>
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border-l-4 border-yellow-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                        <p className="font-bold text-yellow-800 text-lg">Défis persistants :</p>
                      </div>
                      <p className="text-base text-gray-700 leading-relaxed">
                        En milieu semi-urbain et rural, <strong>plus de la moitié des ménages n'ont toujours pas un accès durable à l'eau potable</strong>, en raison du manque de financements pour réaliser les ouvrages et des difficultés de gestion durable des infrastructures existantes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Aujourd'hui */}
                <div 
                  ref={el => timelineRefs.current[3] = el}
                  className={`relative pl-20 transition-all duration-[1400ms] delay-400 ${
                    visibleSections.has(3) 
                      ? 'opacity-100 translate-x-0 scale-100' 
                      : 'opacity-0 -translate-x-28 scale-95'
                  }`}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                >
                  <div className="absolute left-0 top-0 group">
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 rounded-full blur-xl opacity-0 transition-opacity duration-1000 ${
                      visibleSections.has(3) ? 'opacity-70 animate-pulse' : ''
                    }`}></div>
                    <div 
                      className={`relative bg-gradient-to-br from-blue-600 via-blue-500 to-green-600 text-white font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-[1100ms] ${
                        visibleSections.has(3) ? 'scale-125 rotate-[720deg]' : 'scale-0 rotate-0'
                      }`}
                      style={{ transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.475)' }}
                    >
                      <span className="animate-pulse">✓</span>
                    </div>
                  </div>
                  
                  <div 
                    className={`bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 p-8 rounded-2xl shadow-2xl border-2 border-blue-400 transition-all duration-[900ms] delay-[250ms] relative overflow-hidden hover:shadow-3xl hover:scale-[1.03] cursor-pointer group ${
                      visibleSections.has(3) ? 'scale-105 rotate-0' : 'scale-85 rotate-2'
                    }`}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.375)' }}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:translate-x-full transition-all duration-700 transform -skew-x-12" style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <div className="h-1 w-12 bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 rounded-full animate-pulse"></div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-green-800 bg-clip-text text-transparent">Aujourd'hui : Une voix collective forte</h3>
                    </div>
                    <p className="mb-6 font-bold text-blue-700 text-lg relative z-10">
                      Le CCEABT représente la voix collective de plus de 40 organisations de la société civile dans le secteur Eau, Hygiène et Assainissement.
                    </p>
                    <div className="bg-white p-6 rounded-xl shadow-inner relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <p className="font-bold text-gray-900 text-lg">Gouvernance :</p>
                      </div>
                      <ul className="space-y-1 text-base">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="text-blue-600" size={18} />
                          <span><strong>Assemblée Générale (AG)</strong> - Organe décisionnel</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="text-blue-600" size={18} />
                          <span><strong>Conseil d'Administration (CA)</strong> - Président-Chef de file</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="text-blue-600" size={18} />
                          <span><strong>Coordination Opérationnelle</strong> - Chef de projets</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Valeurs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Vision */}
            <div className="group relative bg-gradient-to-br from-blue-500 to-blue-700 p-8 rounded-2xl shadow-2xl text-white overflow-hidden hover:-translate-y-2 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Eye size={36} />
                </div>
                <h3 className="text-3xl font-bold mb-4">Vision</h3>
                <p className="leading-relaxed text-blue-50">
                  Œuvrer à faciliter l'accès de tous à l'eau potable, à l'hygiène et à l'assainissement, amener les populations à consommer en permanence de l'eau potable et à utiliser des installations sanitaires améliorées pour leurs besoins.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="group relative bg-gradient-to-br from-green-500 to-green-700 p-8 rounded-2xl shadow-2xl text-white overflow-hidden hover:-translate-y-2 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Target size={36} />
                </div>
                <h3 className="text-3xl font-bold mb-4">Nos Missions</h3>
                <ul className="space-y-3 text-green-50">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={20} />
                    <span>Mener des actions de <strong>plaidoyer pour la protection de la ressource</strong> et l'effectivité du droit à l'eau, à l'hygiène et à l'assainissement pour tous, y compris les plus vulnérables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={20} />
                    <span><strong>Influencer les décideurs</strong> pour des engagements ambitieux et respectés dans le secteur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={20} />
                    <span><strong>Renforcer les capacités et l'expertise</strong> des associations/ONG membres pour mener des actions communes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={20} />
                    <span><strong>Informer et mobiliser</strong> la population pour l'action</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Valeurs */}
            <div className="group relative bg-gradient-to-br from-purple-500 to-purple-700 p-8 rounded-2xl shadow-2xl text-white overflow-hidden hover:-translate-y-2 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Heart size={36} />
                </div>
                <h3 className="text-3xl font-bold mb-4">Nos valeurs</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={20} />
                    <span>Transparence et redevabilité</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={20} />
                    <span>Solidarité et inclusion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={20} />
                    <span>Engagement citoyen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={20} />
                    <span>Coopération et partage</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos domaines d'intervention */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">⚙️ Nos domaines d'intervention</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Quatre axes stratégiques pour un impact maximal</p>
          </div>
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Plaidoyer */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-800 mb-3">Plaidoyer & influence politique</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                      <span>Défense du droit à l'eau et à l'assainissement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                      <span>Appui à l'augmentation du budget national et communal pour le secteur</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                      <span>Élaboration de documents et guides de plaidoyer</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Eau potable */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="text-2xl font-bold text-green-800 mb-3">Eau potable & protection des ressources</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                      <span>Études sur la gestion de la ressource</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                      <span>Sensibilisation sur la pollution et le gaspillage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                      <span>Appui technique à la planification des ouvrages hydrauliques</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Hygiène & assainissement */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-8 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="text-2xl font-bold text-purple-800 mb-3">Hygiène & assainissement communautaire</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-purple-600 mt-1 flex-shrink-0" size={20} />
                      <span>Campagnes "Zéro défécation à ciel ouvert"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-purple-600 mt-1 flex-shrink-0" size={20} />
                      <span>Promotion d'installations sanitaires améliorées</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-purple-600 mt-1 flex-shrink-0" size={20} />
                      <span>Appui aux communes pour la mise en œuvre du tarif social de l'eau</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Renforcement des capacités */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="text-2xl font-bold text-yellow-800 mb-3">Renforcement des capacités</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-yellow-600 mt-1 flex-shrink-0" size={20} />
                      <span>Ateliers de formation pour ONG et collectivités</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-yellow-600 mt-1 flex-shrink-0" size={20} />
                      <span>Création d'outils pratiques : guides, études, modules de sensibilisation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Réalisations Concrètes */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Nos Réalisations Concrètes</h2>
              <p className="text-xl text-gray-600">Actions menées pour transformer le secteur EHA au Togo</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Réalisation 1 */}
              <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-600">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold group-hover:scale-110 transition-transform">1</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Ateliers de renforcement de capacités</h3>
                    <p className="text-gray-600">Organisation de divers ateliers de formation pour les OSC membres du réseau</p>
                  </div>
                </div>
              </div>

              {/* Réalisation 2 */}
              <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-green-600">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 text-green-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold group-hover:scale-110 transition-transform">2</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Guide pratique de plaidoyer</h3>
                    <p className="text-gray-600">Élaboration d'un guide pratique de plaidoyer dans le domaine de l'eau et de l'assainissement</p>
                  </div>
                </div>
              </div>

              {/* Réalisation 3 */}
              <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-purple-600">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 text-purple-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold group-hover:scale-110 transition-transform">3</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Document de plaidoyer budgétaire</h3>
                    <p className="text-gray-600">Plaidoyer pour l'augmentation du budget alloué au secteur EHA dans les communes et la régulation du prix de l'eau</p>
                  </div>
                </div>
              </div>

              {/* Réalisation 4 */}
              <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-yellow-600">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 text-yellow-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold group-hover:scale-110 transition-transform">4</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Étude sur le financement du secteur</h3>
                    <p className="text-gray-600">Étude approfondie sur le financement du secteur eau/assainissement dans les budgets communaux et sur l'application du tarif social de l'eau aux bornes fontaines publiques</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ressources */}
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-green-600 p-8 rounded-2xl shadow-2xl text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Accédez à nos ressources documentaires</h3>
              <p className="mb-6 text-blue-50">Guides, études, rapports et documents de plaidoyer disponibles en ligne</p>
              <a 
                href="https://drive.google.com/drive/folders/1ga9804Q7vacAu7dIbmNdtG86GTXPnWW4?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
              >
                <BookOpen size={24} />
                Consulter les ressources
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Résultats et impacts */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Résultats et impacts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
              <TrendingUp className="mx-auto mb-4" size={48} />
              <p className="text-sm mb-2">Taux de desserte en eau potable</p>
              <p className="text-3xl font-bold">53% → 60%</p>
              <p className="text-sm opacity-90">(2019-2020)</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
              <Users className="mx-auto mb-4" size={48} />
              <p className="text-sm mb-2">ONG et associations membres</p>
              <p className="text-3xl font-bold">40+</p>
              <p className="text-sm opacity-90">formées et accompagnées</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
              <Award className="mx-auto mb-4" size={48} />
              <p className="text-sm mb-2">Études et plaidoyers réalisés</p>
              <p className="text-3xl font-bold">Nombreux</p>
              <p className="text-sm opacity-90">pour les budgets communaux</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
              <Handshake className="mx-auto mb-4" size={48} />
              <p className="text-sm mb-2">Coordination renforcée</p>
              <p className="text-3xl font-bold">Excellence</p>
              <p className="text-sm opacity-90">entre acteurs de la société civile</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gouvernance - Modern Layout */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">Notre structure</span>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Une gouvernance transparente</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Trois organes complémentaires pour une action efficace et démocratique</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Assemblée Générale */}
              <div className="group relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-blue-400">
                <div className="absolute top-4 right-4 text-6xl opacity-10 font-bold">01</div>
                <div className="relative z-10">
                  <div className="bg-blue-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                    <Users size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Assemblée Générale</h3>
                  <p className="text-gray-600 leading-relaxed">Organe décisionnel suprême regroupant l'ensemble des membres pour définir les orientations stratégiques du réseau.</p>
                </div>
              </div>

              {/* Conseil d'Administration */}
              <div className="group relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-green-400">
                <div className="absolute top-4 right-4 text-6xl opacity-10 font-bold">02</div>
                <div className="relative z-10">
                  <div className="bg-green-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                    <Target size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Conseil d'Administration</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">Dirigé par le Président-Chef de file, il pilote les activités et veille à la mise en œuvre des décisions.</p>
                  <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    Président-Chef de file
                  </div>
                </div>
              </div>

              {/* Coordination Opérationnelle */}
              <div className="group relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-purple-400">
                <div className="absolute top-4 right-4 text-6xl opacity-10 font-bold">03</div>
                <div className="relative z-10">
                  <div className="bg-purple-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                    <Award size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Coordination Opérationnelle</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">Animée par le Chef de projets, elle assure la gestion quotidienne et la coordination des actions sur le terrain.</p>
                  <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    Chef de projets
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Powerful */}
      <section className="relative py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-green-900 text-white overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Rejoignez le mouvement pour l'eau au Togo
            </h2>
            <p className="text-2xl md:text-3xl text-blue-100 mb-12 leading-relaxed">
              Ensemble, nous pouvons garantir l'accès à l'eau potable pour tous les Togolais. Votre engagement compte.
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center mb-16">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 bg-white text-blue-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105"
              >
                Devenir membre
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#resources"
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 shadow-2xl hover:scale-105"
              >
                Nos ressources
                <BookOpen size={24} />
              </a>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-8 text-blue-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>cceabt2013@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>+228 91 35 93 98</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Lomé, Togo</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
