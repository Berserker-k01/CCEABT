import { Droplet, Users, Building2, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Stats() {
  const { t } = useTranslation();
  const stats = [
    {
      icon: Users,
      value: '50+',
      label: t('home.stats_members'),
    },
    {
      icon: Droplet,
      value: '100+',
      label: t('home.stats_projects'),
    },
    {
      icon: Building2,
      value: '15+',
      label: t('home.stats_partners'),
    },
    {
      icon: Target,
      value: '1M+',
      label: t('home.stats_beneficiaries'),
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-cceabt-light-blue to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cceabt-blue rounded-full mb-4">
                <stat.icon size={32} className="text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-cceabt-blue mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-700 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
