import { Calendar, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function News() {
  const { t } = useTranslation();
  const articles = [
    {
      id: 1,
      title: t('home.news_art_1_t'),
      excerpt: t('home.news_art_1_e'),
      date: '15 Mars 2025',
      image: 'https://images.pexels.com/photos/1102915/pexels-photo-1102915.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: t('home.news_cat_projets'),
    },
    {
      id: 2,
      title: t('home.news_art_2_t'),
      excerpt: t('home.news_art_2_e'),
      date: '8 Mars 2025',
      image: 'https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: t('home.news_cat_evenements'),
    },
    {
      id: 3,
      title: t('home.news_art_3_t'),
      excerpt: t('home.news_art_3_e'),
      date: '22 Février 2025',
      image: 'https://images.pexels.com/photos/1146708/pexels-photo-1146708.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: t('home.news_cat_actualites'),
    },
    {
      id: 4,
      title: t('home.news_art_4_t'),
      excerpt: t('home.news_art_4_e'),
      date: '10 Février 2025',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: t('home.news_cat_partenariats'),
    },
    {
      id: 5,
      title: t('home.news_art_5_t'),
      excerpt: t('home.news_art_5_e'),
      date: '28 Janvier 2025',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: t('home.news_cat_formations'),
    },
    {
      id: 6,
      title: t('home.news_art_6_t'),
      excerpt: t('home.news_art_6_e'),
      date: '15 Janvier 2025',
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: t('home.news_cat_publications'),
    },
  ];

  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cceabt-blue mb-4">{t('home.news_title')}</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t('home.news_desc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-cceabt-green bg-cceabt-green/10 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={16} className="mr-1" />
                    {article.date}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-cceabt-blue mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <button className="flex items-center text-cceabt-blue font-semibold hover:text-cceabt-green transition-colors duration-200">
                  {t('home.news_read_more')}
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-cceabt-blue hover:bg-cceabt-blue/90 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200">
            {t('home.news_view_all')}
          </button>
        </div>
      </div>
    </section>
  );
}
