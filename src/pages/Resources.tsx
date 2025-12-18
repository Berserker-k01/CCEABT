import { useState, useMemo } from 'react';
import { Search, Filter, Download, FileText, Calendar, Tag, User } from 'lucide-react';
import { resources } from '../data/resources';

export default function Resources() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTheme, setSelectedTheme] = useState<string>('all');
    const [selectedYear, setSelectedYear] = useState<string>('all');

    const themes = Array.from(new Set(resources.map(r => r.theme))).sort();
    const years = Array.from(new Set(resources.map(r => r.year))).sort((a, b) => b - a);

    const filteredResources = useMemo(() => {
        return resources.filter(resource => {
            const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.author?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesTheme = selectedTheme === 'all' || resource.theme === selectedTheme;
            const matchesYear = selectedYear === 'all' || resource.year.toString() === selectedYear;

            return matchesSearch && matchesTheme && matchesYear;
        });
    }, [searchTerm, selectedTheme, selectedYear]);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero Header */}
            <div className="bg-blue-900 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-bold mb-4">Centre de Documentation</h1>
                            <p className="text-blue-200 text-lg max-w-2xl">
                                Accédez à l'ensemble nos études, rapports, guides et publications essentielles sur l'eau et l'assainissement au Togo.
                            </p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                            <div className="flex items-center gap-3">
                                <FileText className="text-yellow-400" size={32} />
                                <div>
                                    <div className="text-2xl font-bold">{resources.length}</div>
                                    <div className="text-blue-200 text-sm">Documents disponibles</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filtres */}
                    <div className="lg:w-1/4">
                        <div className="bg-white p-6 rounded-xl shadow-md sticky top-28">
                            <div className="flex items-center gap-2 mb-6 text-gray-800 border-b pb-4">
                                <Filter size={20} className="text-blue-600" />
                                <h2 className="font-bold text-lg">Filtrer</h2>
                            </div>

                            {/* Recherche */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Mots-clés..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                </div>
                            </div>

                            {/* Filtre Thème */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Thématique</label>
                                <select
                                    value={selectedTheme}
                                    onChange={(e) => setSelectedTheme(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                >
                                    <option value="all">Toutes les thématiques</option>
                                    {themes.map(theme => (
                                        <option key={theme} value={theme}>{theme}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Filtre Année */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Année de publication</label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                >
                                    <option value="all">Toutes les années</option>
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="pt-4 border-t">
                                <button
                                    onClick={() => { setSearchTerm(''); setSelectedTheme('all'); setSelectedYear('all'); }}
                                    className="text-sm text-gray-500 hover:text-blue-600 transition-colors w-full text-center"
                                >
                                    Réinitialiser les filtres
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Liste des résultats */}
                    <div className="lg:w-3/4">
                        <div className="mb-6 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">
                                Documents ({filteredResources.length})
                            </h2>
                            {/* Optional: Sort control could go here */}
                        </div>

                        {filteredResources.length === 0 ? (
                            <div className="bg-white p-12 rounded-xl shadow-sm text-center">
                                <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500 text-lg">Aucun document ne correspond à votre recherche.</p>
                                <button
                                    onClick={() => { setSearchTerm(''); setSelectedTheme('all'); setSelectedYear('all'); }}
                                    className="mt-4 text-blue-600 hover:underline"
                                >
                                    Effacer les filtres
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {filteredResources.map((resource) => (
                                    <div key={resource.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col sm:flex-row gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                                                <span className="font-bold text-xs">{resource.type}</span>
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                                                    <Tag size={12} /> {resource.theme}
                                                </span>
                                                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                                    <Calendar size={12} /> {resource.year}
                                                </span>
                                                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                                    <User size={12} /> {resource.author}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                                {resource.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mb-3">
                                                {resource.size} • Mis à jour le 01/01/2024
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0 flex items-center">
                                            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors font-medium text-sm">
                                                <Download size={16} />
                                                Télécharger
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
