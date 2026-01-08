import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Send, AlertCircle, Lock, LogOut, FileSpreadsheet } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartnerPortal() {
    const { partners } = useData();

    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [loggedInPartner, setLoggedInPartner] = useState<any>(null);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const partner = partners.find(p => p.email === loginEmail && p.password === loginPassword);
        if (partner) {
            setIsAuthenticated(true);
            setLoggedInPartner(partner);
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
                            className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full font-bold text-sm hover:bg-red-200 transition-colors"
                        >
                            <LogOut size={16} /> Déconnexion
                        </button>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-black text-blue-900 mb-4">
                            Bienvenue, <span className="text-blue-600">{loggedInPartner.name}</span>
                        </h1>
                        <p className="text-xl text-gray-600">
                            Espace de collecte de données et de reporting WASH
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-gray-100"
                    >
                        <div className="mb-8">
                            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FileSpreadsheet className="text-blue-600 w-12 h-12" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Soumettre votre rapport d'activités</h2>
                            <p className="text-gray-600 leading-relaxed mb-8">
                                Pour faciliter la collecte et la centralisation des données, nous vous invitons à remplir le formulaire de reporting officiel via Google Forms. Cela ne prend que quelques minutes.
                            </p>

                            <a
                                href="https://forms.google.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 transition-all"
                            >
                                Accéder au Formulaire de Collecte
                                <Send size={20} />
                            </a>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800 flex items-start gap-3 text-left">
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <p>
                                Assurez-vous d'avoir toutes les informations nécessaires (chiffres clés, localisation, photos) avant de commencer la saisie.
                            </p>
                        </div>
                    </motion.div>

                    <div className="mt-8 text-center text-gray-500 text-sm">
                        <p>Besoin d'aide ? Contactez le support technique à <a href="mailto:support@cceabt.org" className="text-blue-600 hover:underline">support@cceabt.org</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
