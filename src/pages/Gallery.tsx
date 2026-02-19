import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronRight, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useData } from '../context/DataContext';

// Type pour une image de galerie
export type GalleryItem = {
    id: string; // Changed to string to match DataContext
    src: string;
    title: string; // Changed from titleKey to title to match DataContext
    category: 'event' | 'field' | 'conference' | 'portrait';
    date: string;
    size: 'small' | 'medium' | 'large' | 'tall' | 'wide';
    color: string; // Pour le fond de la tuile si pas d'image ou overlay
};

export default function Gallery() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { galleryItems } = useData();
    const [filter, setFilter] = useState('all');
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    const categories = [
        { id: 'all', label: t('gallery_page.cat_all') },
        { id: 'field', label: t('gallery_page.cat_field') },
        { id: 'event', label: t('gallery_page.cat_event') },
        { id: 'conference', label: t('gallery_page.cat_conference') },
    ];

    const filteredData = filter === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === filter);

    // Fonction pour déterminer la classe CSS de la tuile selon sa taille "Metro"
    const getTileClass = (size: string) => {
        switch (size) {
            case 'large': return 'col-span-2 row-span-2';
            case 'wide': return 'col-span-2 row-span-1';
            case 'tall': return 'col-span-1 row-span-2';
            case 'medium': return 'col-span-1 row-span-1';
            case 'small': return 'col-span-1 row-span-1'; // Petit carré de base
            default: return 'col-span-1 row-span-1';
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white pt-20 pb-10 overflow-x-hidden">

            {/* Header Metro Style */}
            <div className="container mx-auto px-6 md:px-12 mb-12 mt-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white mb-2 flex items-center gap-2 transition-colors">
                            <ChevronRight className="rotate-180" size={20} /> {t('gallery_page.back_btn')}
                        </button>
                        <h1 className="text-5xl md:text-6xl font-light tracking-tight">
                            {t('gallery_page.hero_title')} <span className="font-bold text-blue-500">{t('gallery_page.hero_subtitle')}</span>
                        </h1>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setFilter(cat.id)}
                                className={`px-6 py-2 uppercase text-sm font-bold tracking-wider transition-all border-2 ${filter === cat.id
                                    ? 'border-white bg-white text-slate-900'
                                    : 'border-slate-700 hover:border-slate-500 text-slate-300'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Metro Grid Layout */}
            <div className="container mx-auto px-6 md:px-12">
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[150px] gap-2 md:gap-4"
                >
                    {filteredData.map((item) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3 }}
                            key={item.id}
                            className={`group relative cursor-pointer overflow-hidden shadow-lg ${getTileClass(item.size)} ${item.color}`}
                            onClick={() => setSelectedImage(item)}
                        >
                            <img
                                src={item.src}
                                alt={i18n.exists(item.title) ? t(item.title) : item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />

                            {/* Overlay au survol façon Metro (glissement depuis le bas) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-1">
                                        {t(`gallery_page.cat_${item.category}`)}
                                    </span>
                                    <h3 className="font-semibold text-lg leading-tight">
                                        {i18n.exists(item.title) ? t(item.title) : item.title}
                                    </h3>
                                    <p className="text-slate-300 text-xs mt-1">{item.date}</p>
                                </div>
                            </div>

                            {/* Icone Zoom au centre */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full">
                                    <Maximize2 size={24} />
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Tuile "Dossier Complet" Statique */}
                    <div className="col-span-1 row-span-1 bg-blue-600 p-4 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-blue-500 transition-colors">
                        <Share2 size={32} className="mb-2" />
                        <span className="font-bold text-sm">{t('gallery_page.drive_btn')}</span>
                    </div>

                </motion.div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-10"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={40} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="max-w-6xl max-h-[90vh] relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.src}
                                alt={i18n.exists(selectedImage.title) ? t(selectedImage.title) : selectedImage.title}
                                className="max-w-full max-h-[85vh] object-contain shadow-2xl border-4 border-slate-800"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md p-6 text-white translate-y-full md:translate-y-0">
                                <h2 className="text-2xl font-bold">{i18n.exists(selectedImage.title) ? t(selectedImage.title) : selectedImage.title}</h2>
                                <div className="flex items-center gap-4 text-sm text-slate-300 mt-1">
                                    <span className="uppercase tracking-wider font-semibold text-blue-400">{t(`gallery_page.cat_${selectedImage.category}`)}</span>
                                    <span>•</span>
                                    <span>{selectedImage.date}</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
