import { Send, AlertCircle, FileSpreadsheet } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartnerPortal() {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-black text-blue-900 mb-4">
                            Portail <span className="text-blue-600">Partenaire</span>
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
                                href="https://forms.gle/u6kUQypDoLYRaUP27"
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
