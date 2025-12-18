import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- Types ---

export interface NewsItem {
    id: string;
    title: string;
    category: string;
    date: string;
    image: string;
    excerpt: string;
    content: string; // Pour le futur détail
}

export interface ResourceItem {
    id: string;
    title: string;
    type: string; // PDF, Rapport, etc.
    theme: string;
    year: string;
    author: string;
    size: string;
    downloadUrl: string; // Simulé pour l'instant
}

export interface PartnerItem {
    id: string;
    name: string;
    type: 'Technique' | 'Financier' | 'Institutionnel' | 'International' | 'National';
    description?: string;
    website?: string;
    logo?: string;
}

interface DataContextType {
    news: NewsItem[];
    addNews: (item: Omit<NewsItem, 'id'>) => void;
    deleteNews: (id: string) => void;

    resources: ResourceItem[];
    addResource: (item: Omit<ResourceItem, 'id'>) => void;
    deleteResource: (id: string) => void;

    partners: PartnerItem[];
    addPartner: (item: Omit<PartnerItem, 'id'>) => void;
    deletePartner: (id: string) => void;
}

// --- Initial Mock Data (Pour ne pas démarrer vide) ---

const initialNews: NewsItem[] = [
    {
        id: '1',
        title: 'Lancement du projet "Eau pour Tous" dans la région des Savanes',
        category: 'Projet Terrain',
        date: '15 Mars 2024',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
        excerpt: 'Une nouvelle initiative majeure pour apporter l\'eau potable à plus de 5000 foyers ruraux.',
        content: ''
    },
    {
        id: '2',
        title: 'Conférence nationale sur l\'assainissement urbain à Lomé',
        category: 'Plaidoyer',
        date: '28 Février 2024',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b43?auto=format&fit=crop&q=80&w=800',
        excerpt: 'Le CCEABT réunit les acteurs clés pour discuter des défis de l\'assainissement dans la capitale.',
        content: ''
    },
    {
        id: '3',
        title: 'Formation des acteurs locaux sur la gestion des points d\'eau',
        category: 'Renforcement de capacités',
        date: '10 Février 2024',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
        excerpt: 'Trois jours de formation intensive pour les comités de gestion d\'eau villageois.',
        content: ''
    }
];

const initialResources: ResourceItem[] = [
    { id: '1', title: "Rapport annuel sur l'état de l'eau au Togo 2023", type: 'Rapport', theme: 'Eau potable', year: '2023', author: 'CCEABT', size: '4.2 MB', downloadUrl: '#' },
    { id: '2', title: "Guide des bonnes pratiques d'hygiène en milieu scolaire", type: 'Guide', theme: 'Hygiène', year: '2022', author: 'Partenaires', size: '2.5 MB', downloadUrl: '#' },
    { id: '3', title: "Étude sur l'impact de l'assainissement autonome", type: 'Étude', theme: 'Assainissement', year: '2023', author: 'Consultants', size: '3.8 MB', downloadUrl: '#' },
];

const initialPartners: PartnerItem[] = [
    { id: '1', name: 'Eau Vive', type: 'International', description: 'ONG Internationale', website: 'https://www.eau-vive.org' },
    { id: '2', name: 'CRS', type: 'International', description: 'Catholic Relief Services', website: '#' },
    { id: '3', name: 'Plan International', type: 'International', description: 'Plan International Togo', website: '#' },
];


// --- Context ---

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    // Load from localStorage or use initial data
    const [news, setNews] = useState<NewsItem[]>(() => {
        const saved = localStorage.getItem('cceabt_news');
        return saved ? JSON.parse(saved) : initialNews;
    });

    const [resources, setResources] = useState<ResourceItem[]>(() => {
        const saved = localStorage.getItem('cceabt_resources');
        return saved ? JSON.parse(saved) : initialResources;
    });

    const [partners, setPartners] = useState<PartnerItem[]>(() => {
        const saved = localStorage.getItem('cceabt_partners');
        return saved ? JSON.parse(saved) : initialPartners;
    });


    // Helper to persist to localStorage
    useEffect(() => { localStorage.setItem('cceabt_news', JSON.stringify(news)); }, [news]);
    useEffect(() => { localStorage.setItem('cceabt_resources', JSON.stringify(resources)); }, [resources]);
    useEffect(() => { localStorage.setItem('cceabt_partners', JSON.stringify(partners)); }, [partners]);


    // --- Actions ---

    const addNews = (item: Omit<NewsItem, 'id'>) => {
        const newItem = { ...item, id: Date.now().toString() };
        setNews(prev => [newItem, ...prev]);
    };

    const deleteNews = (id: string) => {
        setNews(prev => prev.filter(item => item.id !== id));
    };


    const addResource = (item: Omit<ResourceItem, 'id'>) => {
        const newItem = { ...item, id: Date.now().toString() };
        setResources(prev => [newItem, ...prev]);
    };

    const deleteResource = (id: string) => {
        setResources(prev => prev.filter(item => item.id !== id));
    };

    const addPartner = (item: Omit<PartnerItem, 'id'>) => {
        const newItem = { ...item, id: Date.now().toString() };
        setPartners(prev => [newItem, ...prev]);
    };

    const deletePartner = (id: string) => {
        setPartners(prev => prev.filter(item => item.id !== id));
    };


    return (
        <DataContext.Provider value={{
            news, addNews, deleteNews,
            resources, addResource, deleteResource,
            partners, addPartner, deletePartner
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
