import { Target, Eye, Heart, Users, TrendingUp, Award, Handshake, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
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
    <div>
      {/* Hero Section - Full screen with stats overlay */}
      <section className="relative min-h-[90vh] flex items-center text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/images/4.jpg"
            alt="À propos du CCEABT"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-green-900/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold">
              {t('about.hero.tag')}
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-fade-in">
              {t('about.hero.title')}
            </h1>
            <p className="text-2xl md:text-3xl text-blue-100 mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t('about.hero.subtitle')}
            </p>
          </div>

          {/* Stats Grid Overlay */}
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">40+</div>
              <div className="text-blue-100 font-medium">{t('about.hero.stats.members')}</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-green-200 to-white bg-clip-text text-transparent">60%</div>
              <div className="text-green-100 font-medium">{t('about.hero.stats.coverage')}</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent">10+</div>
              <div className="text-purple-100 font-medium">{t('about.hero.stats.years')}</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">8.3M</div>
              <div className="text-yellow-100 font-medium">{t('about.hero.stats.population')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement - Bold & Centered */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              {t('about.mission_statement.title')} {' '}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                {t('about.mission_statement.highlight')}
              </span>
            </h2>
            <p className="text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {t('about.mission_statement.description')}
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
                  className={`relative pl-20 transition-all duration-[1200ms] ${visibleSections.has(0)
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-20'
                    }`}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}
                >
                  {/* Year Badge with pulse animation */}
                  <div className="absolute left-0 top-0 group">
                    <div className={`absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-0 transition-opacity duration-1000 ${visibleSections.has(0) ? 'opacity-50 animate-pulse' : ''
                      }`}></div>
                    <div
                      className={`relative bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-[900ms] ${visibleSections.has(0) ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'
                        }`}
                      style={{ transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                    >
                      2013
                    </div>
                  </div>

                  <div
                    className={`bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-xl border-l-4 border-blue-600 transition-all duration-[800ms] delay-[150ms] hover:shadow-2xl hover:scale-[1.02] cursor-pointer ${visibleSections.has(0) ? 'scale-100 rotate-0' : 'scale-90 -rotate-2'
                      }`}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-transparent rounded-full"></div>
                      <h3 className="text-2xl font-bold text-blue-900">{t('about.timeline.2013.title')}</h3>
                    </div>
                    <p className="mb-6 text-gray-700 leading-relaxed">
                      {t('about.timeline.2013.desc')}
                    </p>
                    <div className="bg-white p-6 rounded-xl border-l-4 border-red-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <p className="font-bold text-red-700 text-lg">{t('about.timeline.2013.context_title')}</p>
                      </div>
                      <ul className="space-y-3 text-base">
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">•</span>
                          <span>{t('about.timeline.2013.context_list.0')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">•</span>
                          <span>{t('about.timeline.2013.context_list.1')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">•</span>
                          <span>{t('about.timeline.2013.context_list.2')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">•</span>
                          <span>{t('about.timeline.2013.context_list.3')}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 2018 - Extension */}
                <div
                  ref={el => timelineRefs.current[1] = el}
                  className={`relative pl-20 transition-all duration-[1100ms] delay-200 ${visibleSections.has(1)
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-24'
                    }`}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}
                >
                  <div className="absolute left-0 top-0 group">
                    <div className={`absolute inset-0 bg-green-600 rounded-full blur-xl opacity-0 transition-opacity duration-1000 ${visibleSections.has(1) ? 'opacity-50 animate-pulse' : ''
                      }`}></div>
                    <div
                      className={`relative bg-gradient-to-br from-green-500 to-green-700 text-white font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-[850ms] ${visibleSections.has(1) ? 'scale-100 rotate-[360deg]' : 'scale-0 rotate-0'
                        }`}
                      style={{ transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}
                    >
                      2018
                    </div>
                  </div>

                  <div
                    className={`bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-xl border-l-4 border-green-600 transition-all duration-[750ms] delay-100 hover:shadow-2xl hover:scale-[1.02] cursor-pointer ${visibleSections.has(1) ? 'scale-100 rotate-0' : 'scale-88 rotate-1'
                      }`}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-1 w-12 bg-gradient-to-r from-green-600 to-transparent rounded-full"></div>
                      <h3 className="text-2xl font-bold text-green-900">{t('about.timeline.2018.title')}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {t('about.timeline.2018.desc')}
                    </p>
                  </div>
                </div>

                {/* 2020 - Impacts */}
                <div
                  ref={el => timelineRefs.current[2] = el}
                  className={`relative pl-20 transition-all duration-[1300ms] delay-300 ${visibleSections.has(2)
                    ? 'opacity-100 translate-x-0 translate-y-0'
                    : 'opacity-0 -translate-x-16 translate-y-8'
                    }`}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                >
                  <div className="absolute left-0 top-0 group">
                    <div className={`absolute inset-0 bg-purple-600 rounded-full blur-xl opacity-0 transition-opacity duration-1000 ${visibleSections.has(2) ? 'opacity-50 animate-pulse' : ''
                      }`}></div>
                    <div
                      className={`relative bg-gradient-to-br from-purple-500 to-purple-700 text-white font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-[1000ms] ${visibleSections.has(2) ? 'scale-110 rotate-0' : 'scale-0 rotate-[270deg]'
                        }`}
                      style={{ transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.275)' }}
                    >
                      2020
                    </div>
                  </div>

                  <div
                    className={`bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-xl border-l-4 border-purple-600 transition-all duration-[850ms] delay-[200ms] hover:shadow-2xl hover:scale-[1.02] cursor-pointer ${visibleSections.has(2) ? 'scale-100 rotate-0' : 'scale-92 -rotate-1'
                      }`}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-transparent rounded-full"></div>
                      <h3 className="text-2xl font-bold text-purple-900">{t('about.timeline.2020.title')}</h3>
                    </div>
                    <p className="mb-6 text-gray-700 leading-relaxed">
                      {t('about.timeline.2020.desc')}
                    </p>
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border-l-4 border-yellow-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                        <p className="font-bold text-yellow-800 text-lg">{t('about.timeline.2020.challenges_title')}</p>
                      </div>
                      <p className="text-base text-gray-700 leading-relaxed">
                        {t('about.timeline.2020.challenges_desc')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Aujourd'hui */}
                <div
                  ref={el => timelineRefs.current[3] = el}
                  className={`relative pl-20 transition-all duration-[1400ms] delay-400 ${visibleSections.has(3)
                    ? 'opacity-100 translate-x-0 scale-100'
                    : 'opacity-0 -translate-x-28 scale-95'
                    }`}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                >
                  <div className="absolute left-0 top-0 group">
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 rounded-full blur-xl opacity-0 transition-opacity duration-1000 ${visibleSections.has(3) ? 'opacity-70 animate-pulse' : ''
                      }`}></div>
                    <div
                      className={`relative bg-gradient-to-br from-blue-600 via-blue-500 to-green-600 text-white font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-[1100ms] ${visibleSections.has(3) ? 'scale-125 rotate-[720deg]' : 'scale-0 rotate-0'
                        }`}
                      style={{ transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.475)' }}
                    >
                      <span className="animate-pulse">✓</span>
                    </div>
                  </div>

                  <div
                    className={`bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 p-8 rounded-2xl shadow-2xl border-2 border-blue-400 transition-all duration-[900ms] delay-[250ms] relative overflow-hidden hover:shadow-3xl hover:scale-[1.03] cursor-pointer group ${visibleSections.has(3) ? 'scale-105 rotate-0' : 'scale-85 rotate-2'
                      }`}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.375)' }}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:translate-x-full transition-all duration-700 transform -skew-x-12" style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <div className="h-1 w-12 bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 rounded-full animate-pulse"></div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-green-800 bg-clip-text text-transparent">{t('about.timeline.today.title')}</h3>
                    </div>
                    <p className="mb-6 font-bold text-blue-700 text-lg relative z-10">
                      {t('about.timeline.today.desc')}
                    </p>
                    <div className="bg-white p-6 rounded-xl shadow-inner relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <p className="font-bold text-gray-900 text-lg">{t('about.timeline.today.governance_title')}</p>
                      </div>
                      <ul className="space-y-1 text-base">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="mt-1 flex-shrink-0" size={18} />
                          <span>{t('about.timeline.today.governance_list.0')}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="mt-1 flex-shrink-0" size={18} />
                          <span>{t('about.timeline.today.governance_list.1')}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="mt-1 flex-shrink-0" size={18} />
                          <span>{t('about.timeline.today.governance_list.2')}</span>
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
                <h3 className="text-3xl font-bold mb-4">{t('about.values.vision.title')}</h3>
                <p className="leading-relaxed text-blue-50">
                  {t('about.values.vision.desc')}
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
                <h3 className="text-3xl font-bold mb-4">{t('about.values.missions.title')}</h3>
                <ul className="space-y-3 text-green-50">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={20} />
                    <span>{t('about.values.missions.list.0')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={20} />
                    <span>{t('about.values.missions.list.1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={20} />
                    <span>{t('about.values.missions.list.2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={20} />
                    <span>{t('about.values.missions.list.3')}</span>
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
                <h3 className="text-3xl font-bold mb-4">{t('about.values.valeurs.title')}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={20} />
                    <span>{t('about.values.valeurs.list.0')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={20} />
                    <span>{t('about.values.valeurs.list.1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={20} />
                    <span>{t('about.values.valeurs.list.2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={20} />
                    <span>{t('about.values.valeurs.list.3')}</span>
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{t('about.domains.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('about.domains.subtitle')}</p>
          </div>
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Plaidoyer */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold group-hover:scale-110 transition-transform">1</div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-800 mb-3">{t('about.domains.advocacy.title')}</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                      <span>{t('about.domains.advocacy.list.0')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                      <span>{t('about.domains.advocacy.list.1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                      <span>{t('about.domains.advocacy.list.2')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Eau potable */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold group-hover:scale-110 transition-transform">2</div>
                <div>
                  <h3 className="text-2xl font-bold text-green-800 mb-3">{t('about.domains.water.title')}</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                      <span>{t('about.domains.water.list.0')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                      <span>{t('about.domains.water.list.1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                      <span>{t('about.domains.water.list.2')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Hygiène & assainissement */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-8 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold group-hover:scale-110 transition-transform">3</div>
                <div>
                  <h3 className="text-2xl font-bold text-purple-800 mb-3">{t('about.domains.hygiene.title')}</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-purple-600 mt-1 flex-shrink-0" size={20} />
                      <span>{t('about.domains.hygiene.list.0')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-purple-600 mt-1 flex-shrink-0" size={20} />
                      <span>{t('about.domains.hygiene.list.1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-purple-600 mt-1 flex-shrink-0" size={20} />
                      <span>{t('about.domains.hygiene.list.2')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Renforcement des capacités */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold group-hover:scale-110 transition-transform">4</div>
                <div>
                  <h3 className="text-2xl font-bold text-yellow-800 mb-3">{t('about.domains.capacity.title')}</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-yellow-600 mt-1 flex-shrink-0" size={20} />
                      <span>{t('about.domains.capacity.list.0')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-yellow-600 mt-1 flex-shrink-0" size={20} />
                      <span>{t('about.domains.capacity.list.1')}</span>
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
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{t('about.realizations.title')}</h2>
              <p className="text-xl text-gray-600">{t('about.realizations.subtitle')}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Réalisation 1 */}
              <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-600">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold group-hover:scale-110 transition-transform">1</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{t('about.realizations.items.0.title')}</h3>
                    <p className="text-gray-600">{t('about.realizations.items.0.desc')}</p>
                  </div>
                </div>
              </div>

              {/* Réalisation 2 */}
              <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-green-600">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 text-green-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold group-hover:scale-110 transition-transform">2</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{t('about.realizations.items.1.title')}</h3>
                    <p className="text-gray-600">{t('about.realizations.items.1.desc')}</p>
                  </div>
                </div>
              </div>

              {/* Réalisation 3 */}
              <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-purple-600">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 text-purple-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold group-hover:scale-110 transition-transform">3</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{t('about.realizations.items.2.title')}</h3>
                    <p className="text-gray-600">{t('about.realizations.items.2.desc')}</p>
                  </div>
                </div>
              </div>

              {/* Réalisation 4 */}
              <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-yellow-600">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 text-yellow-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold group-hover:scale-110 transition-transform">4</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{t('about.realizations.items.3.title')}</h3>
                    <p className="text-gray-600">{t('about.realizations.items.3.desc')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ressources */}
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-green-600 p-8 rounded-2xl shadow-2xl text-white text-center">
              <h3 className="text-2xl font-bold mb-4">{t('about.resources.title')}</h3>
              <p className="mb-6 text-blue-50">{t('about.resources.desc')}</p>
              <a
                href="https://drive.google.com/drive/folders/1ga9804Q7vacAu7dIbmNdtG86GTXPnWW4?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
              >
                <BookOpen size={24} />
                {t('about.resources.btn')}
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Résultats et impacts */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('about.impact.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
              <TrendingUp className="mx-auto mb-4" size={48} />
              <p className="text-sm mb-2">{t('about.impact.water_rate')}</p>
              <p className="text-3xl font-bold">53% → 60%</p>
              <p className="text-sm opacity-90">(2019-2020)</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
              <Users className="mx-auto mb-4" size={48} />
              <p className="text-sm mb-2">{t('about.impact.members')}</p>
              <p className="text-3xl font-bold">40+</p>
              <p className="text-sm opacity-90">{t('about.impact.members_sub')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
              <Award className="mx-auto mb-4" size={48} />
              <p className="text-sm mb-2">{t('about.impact.studies')}</p>
              <p className="text-3xl font-bold">{t('about.impact.studies_val')}</p>
              <p className="text-sm opacity-90">{t('about.impact.studies_sub')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
              <Handshake className="mx-auto mb-4" size={48} />
              <p className="text-sm mb-2">{t('about.impact.coordination')}</p>
              <p className="text-3xl font-bold">{t('about.impact.coordination_val')}</p>
              <p className="text-sm opacity-90">{t('about.impact.coordination_sub')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gouvernance - Modern Layout */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">{t('about.governance.tag')}</span>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">{t('about.governance.title')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('about.governance.subtitle')}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Assemblée Générale */}
              <div className="group relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-blue-400">
                <div className="absolute top-4 right-4 text-6xl opacity-10 font-bold">01</div>
                <div className="relative z-10">
                  <div className="bg-blue-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                    <Users size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('about.governance.ag.title')}</h3>
                  <p className="text-gray-600 leading-relaxed">{t('about.governance.ag.desc')}</p>
                </div>
              </div>

              {/* Conseil d'Administration */}
              <div className="group relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-green-400">
                <div className="absolute top-4 right-4 text-6xl opacity-10 font-bold">02</div>
                <div className="relative z-10">
                  <div className="bg-green-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                    <Target size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('about.governance.ca.title')}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{t('about.governance.ca.desc')}</p>
                  <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    {t('about.governance.ca.role')}
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('about.governance.co.title')}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{t('about.governance.co.desc')}</p>
                  <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    {t('about.governance.co.role')}
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
              {t('about.cta.title')}
            </h2>
            <p className="text-2xl md:text-3xl text-blue-100 mb-12 leading-relaxed">
              {t('about.cta.desc')}
            </p>

            <div className="flex flex-wrap gap-6 justify-center mb-16">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 bg-white text-blue-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105"
              >
                {t('about.cta.join')}
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#resources"
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 shadow-2xl hover:scale-105"
              >
                {t('about.cta.resources')}
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
