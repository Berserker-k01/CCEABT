import { useState } from 'react';
import { useData } from '../context/DataContext';
import { LayoutDashboard, FileSpreadsheet, Send, CheckCircle2, AlertCircle, Building2, MapPin, Calendar, Users, BarChart3, Paperclip, Lock, LogOut, Download, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartnerPortal() {
    const { addSubmission, partners, submissions, deleteSubmission } = useData();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [loggedInPartner, setLoggedInPartner] = useState<any>(null);

    const [formData, setFormData] = useState({
        partnerName: '',
        projectTitle: '',
        location: '',
        period: '',
        beneficiaries: 0,
        budget: '',
        details: '',
        attachment: ''
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const partner = partners.find(p => p.email === loginEmail && p.password === loginPassword);
        if (partner) {
            setIsAuthenticated(true);
            setLoggedInPartner(partner);
            setFormData(prev => ({ ...prev, partnerName: partner.name }));
            setAuthError('');
        } else {
            setAuthError('Email ou mot de passe incorrect.');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setLoggedInPartner(null);
        setLoginEmail('');
        setLoginPassword('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedFile) {
            setUploadError('Veuillez sélectionner un fichier');
            return;
        }

        setIsUploading(true);
        setUploadError('');

        try {
            // Create FormData for file upload
            const uploadData = new FormData();
            uploadData.append('file', selectedFile);
            uploadData.append('partnerName', formData.partnerName);
            uploadData.append('projectTitle', formData.projectTitle);
            uploadData.append('location', formData.location);
            uploadData.append('period', formData.period);
            uploadData.append('beneficiaries', formData.beneficiaries.toString());
            uploadData.append('budget', formData.budget);
            uploadData.append('details', formData.details);

            // Use environment variable for API URL (production) or localhost (development)
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

            // Upload to backend
            const response = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                body: uploadData
            });

            const result = await response.json();

            if (result.success) {
                // Add submission with Google Drive link and "reussi" status
                addSubmission({
                    ...formData,
                    attachment: result.data.webViewLink,
                    status: 'reussi' as any
                });

                setIsSubmitted(true);
                setTimeout(() => {
                    setIsSubmitted(false);
                    setFormData({
                        partnerName: loggedInPartner?.name || '',
                        projectTitle: '',
                        location: '',
                        period: '',
                        beneficiaries: 0,
                        budget: '',
                        details: '',
                        attachment: ''
                    });
                    setSelectedFile(null);
                }, 3000);
            } else {
                // Add submission with "echoue" status
                addSubmission({
                    ...formData,
                    attachment: selectedFile.name,
                    status: 'echoue' as any
                });
                setUploadError(result.message || 'Échec de l\'upload');
            }
        } catch (error) {
            console.error('Erreur upload:', error);
            // Add submission with "echoue" status
            addSubmission({
                ...formData,
                attachment: selectedFile.name,
                status: 'echoue' as any
            });
            setUploadError('Erreur de connexion au serveur');
        } finally {
            setIsUploading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
                >
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3">
                            <Lock className="text-white" size={40} />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Espace Partenaire</h1>
                        <p className="text-gray-600 font-medium">Connectez-vous pour transmettre vos données au CCEABT</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email de connexion</label>
                            <input
                                type="email"
                                value={loginEmail}
                                onChange={e => setLoginEmail(e.target.value)}
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                                placeholder="votre@email.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Mot de passe</label>
                            <input
                                type="password"
                                value={loginPassword}
                                onChange={e => setLoginPassword(e.target.value)}
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {authError && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-semibold flex items-center gap-2">
                                <AlertCircle size={18} /> {authError}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-1"
                        >
                            Se connecter
                        </button>
                    </form>

                    <p className="mt-8 text-center text-gray-500 text-sm italic">
                        Identifiants fournis par le secrétariat du CCEABT
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-gray-200 hover:bg-red-100 hover:text-red-700 px-4 py-2 rounded-full text-sm font-bold transition-all"
                        >
                            <LogOut size={16} /> Déconnexion ({loggedInPartner?.name})
                        </button>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6 font-semibold"
                    >
                        <LayoutDashboard size={18} />
                        Portail {loggedInPartner?.type}
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Collecte de Données</h1>
                    <p className="text-xl text-gray-600">
                        Bienvenue, <strong>{loggedInPartner?.name}</strong>. Contribuez à la base de données WASH.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
                    {/* Instructions Column */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <AlertCircle className="text-blue-600" size={24} />
                                Instructions
                            </h3>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">1</div>
                                    <p>Remplissez les informations générales de l'organisation.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">2</div>
                                    <p>Précisez les indicateurs clés de performance du projet.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">3</div>
                                    <p>Soumettez pour revue par le secrétariat exécutif du CCEABT.</p>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 to-green-600 p-8 rounded-3xl text-white shadow-xl">
                            <BarChart3 className="mb-4 opacity-50" size={48} />
                            <h4 className="text-xl font-bold mb-2">Impact Collectif</h4>
                            <p className="text-blue-50 opacity-90">
                                Vos données permettent au CCEABT de produire des rapports consolidés et d'orienter le plaidoyer national.
                            </p>
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                            <div className="bg-gray-800 p-6 text-white flex items-center gap-3">
                                <FileSpreadsheet size={24} className="text-green-400" />
                                <h2 className="text-xl font-bold">Formulaire de Reporting</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                            <Building2 size={16} /> Nom de l'Organisation
                                        </label>
                                        <input
                                            required
                                            readOnly
                                            type="text"
                                            value={formData.partnerName}
                                            className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 cursor-not-allowed font-semibold text-gray-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                            <Calendar size={16} /> Titre du Projet
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.projectTitle}
                                            onChange={e => setFormData({ ...formData, projectTitle: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                            placeholder="Ex: Projet GIRE phase 2"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                            <MapPin size={16} /> Zone d'intervention
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.location}
                                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                            placeholder="Préfecture, Région..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                            <Calendar size={16} /> Période couverte
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.period}
                                            onChange={e => setFormData({ ...formData, period: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                            placeholder="Ex: Janvier - Juin 2024"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                            <Users size={16} /> Nombre de Bénéficiaires
                                        </label>
                                        <input
                                            required
                                            type="number"
                                            value={formData.beneficiaries}
                                            onChange={e => setFormData({ ...formData, beneficiaries: parseInt(e.target.value) })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                            <BarChart3 size={16} /> Budget mobilisé
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.budget}
                                            onChange={e => setFormData({ ...formData, budget: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                            placeholder="Ex: 15.000.000 FCFA"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <FileSpreadsheet size={16} /> Détails techniques
                                    </label>
                                    <textarea
                                        required
                                        value={formData.details}
                                        onChange={e => setFormData({ ...formData, details: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                        rows={4}
                                        placeholder="Détails des réalisations..."
                                    ></textarea>
                                </div>

                                <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-3xl p-6 mb-8">
                                    <h4 className="flex items-center gap-2 font-bold text-blue-800 mb-4">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Drive" className="w-5 h-5" />
                                        Upload automatique vers Google Drive CCEABT
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block w-full cursor-pointer">
                                                <div className="border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center hover:bg-blue-100 transition-all">
                                                    {selectedFile ? (
                                                        <div className="flex items-center justify-center gap-3">
                                                            <CheckCircle2 className="text-green-600" size={32} />
                                                            <div className="text-left">
                                                                <p className="font-bold text-gray-900">Fichier sélectionné</p>
                                                                <p className="text-sm text-gray-600 truncate max-w-xs">{selectedFile.name}</p>
                                                                <p className="text-xs text-gray-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <Paperclip className="mx-auto text-blue-600 mb-2" size={40} />
                                                            <p className="font-bold text-gray-900">Cliquez pour sélectionner votre fichier</p>
                                                            <p className="text-xs text-gray-500 mt-1">PDF, Word, Excel (max 50MB)</p>
                                                        </div>
                                                    )}
                                                </div>
                                                <input
                                                    type="file"
                                                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            setSelectedFile(file);
                                                            setFormData({ ...formData, attachment: file.name });
                                                            setUploadError('');
                                                        }
                                                    }}
                                                    className="hidden"
                                                    required
                                                />
                                            </label>
                                        </div>
                                        {uploadError && (
                                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
                                                <AlertCircle size={20} />
                                                <p className="text-sm font-medium">{uploadError}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitted || isUploading}
                                        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${isSubmitted ? 'bg-green-100 text-green-700' :
                                            isUploading ? 'bg-gray-400 text-white cursor-not-allowed' :
                                                'bg-blue-600 text-white hover:bg-blue-700'
                                            }`}
                                    >
                                        {isSubmitted ? (
                                            <><CheckCircle2 size={24} /> Envoyé avec succès</>
                                        ) : isUploading ? (
                                            <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> Upload en cours...</>
                                        ) : (
                                            <><Send size={20} /> Envoyer vers Google Drive</>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Historique Sécurisé (Uniquement pour le partenaire connecté) */}
                <div className="max-w-5xl mx-auto mt-12">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="bg-blue-900 p-6 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <FileSpreadsheet size={24} className="text-blue-400" />
                                <h2 className="text-xl font-bold">Vos soumissions antérieures</h2>
                            </div>
                            <span className="text-xs bg-white/10 px-3 py-1 rounded-full border border-white/20">
                                Connecté en tant que : {loggedInPartner?.name}
                            </span>
                        </div>

                        <div className="p-8">
                            {submissions.filter(s => s.partnerName === loggedInPartner?.name).length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 italic">Aucun historique disponible pour votre organisation.</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {submissions
                                        .filter(s => s.partnerName === loggedInPartner?.name)
                                        .map(sub => (
                                            <div key={sub.id} className="border border-gray-100 rounded-2xl p-6 bg-gray-50">
                                                <div className="flex flex-wrap items-center justify-between gap-4">
                                                    <div>
                                                        <h3 className="font-bold text-gray-900">{sub.projectTitle}</h3>
                                                        <p className="text-sm text-gray-500">{sub.date} • {sub.location}</p>
                                                        <span className={`inline-block mt-2 text-[10px] font-bold px-2 py-1 rounded uppercase ${sub.status === 'reussi' ? 'bg-green-100 text-green-700' : sub.status === 'echoue' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                            {sub.status === 'reussi' ? 'Réussi' : sub.status === 'echoue' ? 'Échoué' : 'En attente'}
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        {sub.attachment && (
                                                            <a
                                                                href={sub.attachment}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
                                                            >
                                                                <Download size={16} /> Voir sur Drive
                                                            </a>
                                                        )}
                                                        <button onClick={() => { if (confirm('Supprimer ?')) deleteSubmission(sub.id) }} className="text-gray-400 hover:text-red-600 p-2">
                                                            <Trash2 size={20} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
