import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
    email?: string;
    password?: string;
}

export interface Submission {
    id: string;
    partnerName: string;
    projectTitle: string;
    location: string;
    period: string;
    beneficiaries: number;
    budget: string;
    status: 'en_attente' | 'reussi' | 'echoue';
    date: string;
    details: string;
    attachment?: string;
}

interface DataContextType {
    driveUrl: string;
    setDriveUrl: (url: string) => void;

    news: NewsItem[];
    addNews: (item: Omit<NewsItem, 'id'>) => void;
    deleteNews: (id: string) => void;
    updateNews: (id: string, updates: Partial<NewsItem>) => void;

    resources: ResourceItem[];
    addResource: (item: Omit<ResourceItem, 'id'>) => void;
    deleteResource: (id: string) => void;

    partners: PartnerItem[];
    addPartner: (item: Omit<PartnerItem, 'id'>) => void;
    deletePartner: (id: string) => void;
    updatePartner: (id: string, updates: Partial<PartnerItem>) => void;
    setPartners: React.Dispatch<React.SetStateAction<PartnerItem[]>>;
    initialPartners: PartnerItem[];

    submissions: Submission[];
    addSubmission: (item: Omit<Submission, 'id' | 'date'> & { status?: Submission['status'] }) => void;
    deleteSubmission: (id: string) => void;
    updateSubmissionStatus: (id: string, status: Submission['status']) => void;
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
    // Organisations membres
    { id: '1', name: 'Eau Vive', type: 'International', description: 'Organisation Internationale membre', email: 'eauvive@cceabt.org', password: 'password123' },
    { id: '2', name: 'CRS', type: 'International', description: 'Organisation Internationale membre', email: 'crs@cceabt.org', password: 'password123' },
    { id: '3', name: 'Plan International', type: 'International', description: 'Organisation Internationale membre', email: 'plan@cceabt.org', password: 'password123' },
    { id: '4', name: 'PADIE', type: 'National', description: 'Organisation Nationale membre', email: 'padie@cceabt.org', password: 'password123' },
    { id: '5', name: 'JVE', type: 'National', description: 'Organisation Nationale membre', email: 'jve@cceabt.org', password: 'password123' },

    // Partenaires Institutionnels
    { id: 'inst1', name: 'Ministère délégué chargé de l’eau et de l’assainissement', type: 'Institutionnel', description: 'Partenaire Institutionnel', website: 'https://eau.gouv.tg/', email: 'ministereeau@cceabt.org', password: 'password123' },
    { id: 'inst2', name: 'Ministère de la Santé, de l’Hygiène Publique et de la Couverture Sanitaire Universelle', type: 'Institutionnel', description: 'Partenaire Institutionnel', website: 'https://sante.gouv.tg/', email: 'ministeresante@cceabt.org', password: 'password123' },
    { id: 'inst3', name: 'Ministère de l’Environnement, des Ressources Forestières, de la Protection Côtière et du Changement Climatique', type: 'Institutionnel', description: 'Partenaire Institutionnel', website: 'https://environnement.gouv.tg/', email: 'ministereenvironnement@cceabt.org', password: 'password123' },
    { id: 'inst4', name: 'Ministère de l\'Administration Territoriale, de la Gouvernance Locale et des Affaires Coutumières', type: 'Institutionnel', description: 'Partenaire Institutionnel', website: 'https://territoire.gouv.tg/', email: 'ministereterritoire@cceabt.org', password: 'password123' },
    { id: 'inst5', name: 'Autorité de régulation du secteur de l\'électricité', type: 'Institutionnel', description: 'Partenaire Institutionnel', website: 'https://www.arse.tg/', email: 'arse@cceabt.org', password: 'password123' },

    // Partenaires Techniques et Financiers
    { id: 'tf1', name: 'AFD (Agence Française de Développement)', type: 'Technique', description: 'Partenaire Technique et Financier', email: 'afd@cceabt.org', password: 'password123' },
    { id: 'tf2', name: 'Union Européenne', type: 'Financier', description: 'Partenaire Technique et Financier', email: 'ue@cceabt.org', password: 'password123' },
];


// --- Context ---

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    // Load from localStorage or use initial data
    const [driveUrl, setDriveUrl] = useState(() => {
        return localStorage.getItem('cceabt_drive_url') || 'https://drive.google.com';
    });

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

    const [submissions, setSubmissions] = useState<Submission[]>(() => {
        const saved = localStorage.getItem('cceabt_submissions');
        return saved ? JSON.parse(saved) : [];
    });


    // Helper to persist to localStorage
    useEffect(() => { localStorage.setItem('cceabt_drive_url', driveUrl); }, [driveUrl]);
    useEffect(() => { localStorage.setItem('cceabt_news', JSON.stringify(news)); }, [news]);
    useEffect(() => { localStorage.setItem('cceabt_resources', JSON.stringify(resources)); }, [resources]);
    useEffect(() => { localStorage.setItem('cceabt_partners', JSON.stringify(partners)); }, [partners]);
    useEffect(() => { localStorage.setItem('cceabt_submissions', JSON.stringify(submissions)); }, [submissions]);

    // Sync across tabs
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'cceabt_drive_url' && e.newValue) setDriveUrl(e.newValue);
            if (e.key === 'cceabt_partners' && e.newValue) setPartners(JSON.parse(e.newValue));
            if (e.key === 'cceabt_news' && e.newValue) setNews(JSON.parse(e.newValue));
            if (e.key === 'cceabt_resources' && e.newValue) setResources(JSON.parse(e.newValue));
            if (e.key === 'cceabt_submissions' && e.newValue) setSubmissions(JSON.parse(e.newValue));
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);


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

    const updatePartner = (id: string, updates: Partial<PartnerItem>) => {
        setPartners(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const addSubmission = (item: Omit<Submission, 'id' | 'date'> & { status?: Submission['status'] }) => {
        const newSubmission: Submission = {
            ...item,
            id: Date.now().toString(),
            status: item.status || 'en_attente',
            date: new Date().toLocaleDateString('fr-FR')
        };
        setSubmissions(prev => [newSubmission, ...prev]);
    };

    const deleteSubmission = (id: string) => {
        setSubmissions(prev => prev.filter(s => s.id !== id));
    };

    const updateSubmissionStatus = (id: string, status: Submission['status']) => {
        setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    };


    const updateNews = (id: string, updates: Partial<NewsItem>) => {
        setNews(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    };


    return (
        <DataContext.Provider value={{
            driveUrl, setDriveUrl,
            news, addNews, deleteNews, updateNews,
            resources, addResource, deleteResource,
            partners, addPartner, deletePartner, updatePartner, setPartners, initialPartners,
            submissions, addSubmission, deleteSubmission, updateSubmissionStatus
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
