import { motion } from 'framer-motion';
import { Shield, Scale, FileText, Lock } from 'lucide-react';

export default function LegalNotices() {

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Mentions Légales</h1>
                        <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="p-8 md:p-12 space-y-12 text-gray-700">

                            <section className="space-y-4">
                                <h2 className="flex items-center gap-3 text-2xl font-bold text-blue-900">
                                    <Scale className="text-blue-600" size={28} />
                                    1. Éditeur du Site
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                                    <div>
                                        <p className="font-bold text-gray-900 mb-1">Organisation</p>
                                        <p>Conseil de Concertation pour l’Eau et l’Assainissement de Base au Togo (CCEABT)</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 mb-1">Siège Social</p>
                                        <p>Lomé, Togo</p>
                                        <p>Quartier Adidoadine</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 mb-1">Contacts</p>
                                        <p>Tél : +228 91 35 93 98 / 90 22 78 55</p>
                                        <p>Email : contact@cceabt.org</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 mb-1">Statut Juridique</p>
                                        <p>Association à but non lucratif</p>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="flex items-center gap-3 text-2xl font-bold text-blue-900">
                                    <Shield className="text-blue-600" size={28} />
                                    2. Hébergement
                                </h2>
                                <p className="leading-relaxed">
                                    Ce site est hébergé sur les serveurs de la plateforme Vercel / Netlify (infrastructure Cloud mondiale).
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="flex items-center gap-3 text-2xl font-bold text-blue-900">
                                    <FileText className="text-blue-600" size={28} />
                                    3. Propriété Intellectuelle
                                </h2>
                                <p className="leading-relaxed">
                                    L'ensemble des contenus (textes, graphiques, logos, photos) présents sur ce site est la propriété exclusive du CCEABT, sauf mention contraire. Toute reproduction, même partielle, est strictement interdite sans autorisation préalable écrite du Secrétariat Exécutif du CCEABT.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="flex items-center gap-3 text-2xl font-bold text-blue-900">
                                    <Lock className="text-blue-600" size={28} />
                                    4. Responsabilité
                                </h2>
                                <p className="leading-relaxed">
                                    Le CCEABT s'efforce d'assurer l'exactitude des informations diffusées sur ce site au moment de leur mise en ligne. Toutefois, nous ne saurions être tenus responsables des erreurs ou omissions, ou des résultats qui pourraient être obtenus par l'usage de ces informations.
                                </p>
                            </section>

                        </div>
                    </div>

                    <div className="text-center mt-8 text-gray-500 text-sm">
                        Dernière mise à jour : Janvier 2026
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
