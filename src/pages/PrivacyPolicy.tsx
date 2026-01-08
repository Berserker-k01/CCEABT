import { motion } from 'framer-motion';
import { Eye, ShieldCheck, Database, Bell } from 'lucide-react';

export default function PrivacyPolicy() {

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Politique de Confidentialité</h1>
                        <div className="h-1.5 w-24 bg-green-600 mx-auto rounded-full"></div>
                        <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
                            Le CCEABT accorde une importance capitale à la protection de vos données personnelles et à votre vie privée.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="p-8 md:p-12 space-y-12 text-gray-700">

                            <section className="space-y-4">
                                <h2 className="flex items-center gap-3 text-2xl font-bold text-green-900">
                                    <Database className="text-green-600" size={28} />
                                    1. Collecte des Données
                                </h2>
                                <p className="leading-relaxed">
                                    Nous collectons uniquement les données que vous nous transmettez volontairement via :
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Les formulaires de contact (Nom, Email, Message)</li>
                                    <li>Les formulaires d'adhésion (Coordonnées professionnelles)</li>
                                    <li>Le portail partenaire (Rapports techniques, Liens Google Drive)</li>
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="flex items-center gap-3 text-2xl font-bold text-green-900">
                                    <Eye className="text-green-600" size={28} />
                                    2. Utilisation des Données
                                </h2>
                                <p className="leading-relaxed">
                                    Vos informations sont utilisées exclusivement pour :
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Répondre à vos demandes d'information</li>
                                    <li>Traiter votre demande d'adhésion au réseau CCEABT</li>
                                    <li>Suivre et compiler les indicateurs WASH pour le plaidoyer national</li>
                                </ul>
                                <p className="font-bold text-green-700 bg-green-50 p-4 rounded-xl">
                                    Le CCEABT s'engage à ne jamais vendre ou partager vos données à des tiers à des fins commerciales.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="flex items-center gap-3 text-2xl font-bold text-green-900">
                                    <ShieldCheck className="text-green-600" size={28} />
                                    3. Stockage et Sécurité
                                </h2>
                                <p className="leading-relaxed">
                                    Nous avons opté pour une approche moderne et sécurisée : les fichiers techniques lourds sont hébergés via des services externes sécurisés (Google Drive), limitant ainsi l'exposition des données sur nos serveurs locaux.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="flex items-center gap-3 text-2xl font-bold text-green-900">
                                    <Bell className="text-green-600" size={28} />
                                    4. Vos Droits
                                </h2>
                                <p className="leading-relaxed">
                                    Conformément aux réglementations en vigueur, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ce droit, contactez-nous par email à : <span className="font-bold text-blue-600">info@cceabt.org</span>.
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
