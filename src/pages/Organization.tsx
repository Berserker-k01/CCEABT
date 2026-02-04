import { motion } from 'framer-motion';
import { Users, Target, Briefcase, Share2, ArrowRight, CheckCircle, MapPin, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TogoMap from '../components/TogoMap';

const OrgCard = ({ icon: Icon, title, role, color, description, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
    >
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 -mr-10 -mt-10 ${color.replace('text-', 'bg-')}`}></div>

        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm ${color.replace('text-', 'bg-').replace('600', '100')} ${color}`}>
            <Icon size={28} />
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <div className={`text-xs font-bold uppercase tracking-wider mb-4 ${color}`}>{role}</div>
        <p className="text-gray-600 leading-relaxed text-sm">
            {description}
        </p>
    </motion.div>
);

const Connector = () => (
    <div className="hidden md:flex flex-col items-center justify-center h-16 w-full">
        <div className="h-full w-0.5 bg-gray-300"></div>
        <ChevronDown className="text-gray-300 -mt-1" />
    </div>
);

export default function Organization() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20 relative">
            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-20 transform translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-[120px] opacity-20 transform -translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-6 border border-white/20">
                            Gouvernance Transparente
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            L'Architecture du <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">CCEABT</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            Une organisation pyramidale inversée, où la base décisionnelle est large et l'exécution ciblée, garantissant un impact réel sur le terrain.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Organigramme Visuel */}
            <section className="py-20 -mt-10 relative z-20 container mx-auto px-4">
                <div className="max-w-4xl mx-auto">

                    {/* Niveau 1: AG */}
                    <div id="ag" className="flex justify-center scroll-mt-32">
                        <OrgCard
                            icon={Users}
                            title="Assemblée Générale"
                            role="Organe Suprême"
                            color="text-blue-600"
                            description="Composée de tous les membres effectifs, elle définit la politique générale, adopte les statuts et élit les membres du Conseil d'Administration. C'est le cœur démocratique du réseau."
                            delay={0.1}
                        />
                    </div>

                    <Connector />

                    {/* Niveau 2: CA */}
                    <div id="ca" className="flex justify-center scroll-mt-32">
                        <OrgCard
                            icon={Target}
                            title="Conseil d'Administration"
                            role="Pilotage Stratégique"
                            color="text-green-600"
                            description="Constitué de 7 membres élus, il veille à l'application des décisions de l'AG, approuve les programmes et budgets, et supervise le Secrétariat Exécutif."
                            delay={0.3}
                        />
                    </div>

                    <Connector />

                    {/* Niveau 3: SE */}
                    <div id="se" className="flex justify-center scroll-mt-32">
                        <OrgCard
                            icon={Briefcase}
                            title="Secrétariat Exécutif"
                            role="Coordination Opérationnelle"
                            color="text-purple-600"
                            description="L'organe permanent chargé de la mise en œuvre quotidienne des activités, de la gestion des projets et de l'animation du réseau."
                            delay={0.5}
                        />
                    </div>

                    <Connector />

                    {/* Niveau 4: Plateformes - AVEC CARTE INTERACTIVE */}
                    <div id="platforms" className="pt-16 scroll-mt-32">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <span className="inline-block p-3 rounded-full bg-orange-100 text-orange-600 mb-4">
                                <Share2 size={32} />
                            </span>
                            <h3 className="text-3xl font-bold text-gray-800 mb-2">Ancrage Territorial</h3>
                            <p className="text-gray-500 max-w-2xl mx-auto">
                                6 Plateformes Régionales et plus de 30 points focaux pour une action au plus près des populations.
                            </p>
                        </motion.div>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Carte Interactive */}
                            <div>
                                <TogoMap onRegionSelect={(r: any) => console.log(r)} />
                            </div>

                            {/* Info Région */}
                            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 min-h-[400px] flex flex-col justify-center">
                                <h4 className="text-2xl font-bold text-gray-800 mb-6">Nos Plateformes</h4>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Le CCEABT est organisé en plateformes régionales autonomes qui coordonnent les activités des OSC membres dans leur zone respective. Sélectionnez une région sur la carte pour voir les détails.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">Couverture Nationale</div>
                                            <div className="text-sm text-gray-500">Présence dans les 5 régions économiques + Grand Lomé</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                            <Users size={24} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">Coordination Locale</div>
                                            <div className="text-sm text-gray-500">Un bureau exécutif régional élu par les membres locaux</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Détails Fonctionnels - Alternating Features */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto space-y-24">

                        {/* Feature 1 */}
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="md:w-1/2">
                                <motion.img
                                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
                                    alt="Meeting"
                                    className="rounded-3xl shadow-2xl"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                />
                            </div>
                            <div className="md:w-1/2">
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">Prise de décision collaborative</h3>
                                <p className="text-lg text-gray-600 mb-6">
                                    Au CCEABT, chaque voix compte. L'Assemblée Générale annuelle est le moment fort où tous nos membres définissent ensemble les orientations futures.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <CheckCircle className="text-green-500" size={20} />
                                        <span>Vote démocratique « un membre, une voix »</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <CheckCircle className="text-green-500" size={20} />
                                        <span>Transparence des rapports financiers</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                            <div className="md:w-1/2">
                                <motion.img
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
                                    alt="Teamwork"
                                    className="rounded-3xl shadow-2xl"
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                />
                            </div>
                            <div className="md:w-1/2">
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">Exécution Agile</h3>
                                <p className="text-lg text-gray-600 mb-6">
                                    Le Secrétariat Exécutif transforme la vision en action. Grâce à une équipe professionnelle dédiée, nous menons des projets complexes sur le terrain.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <CheckCircle className="text-purple-500" size={20} />
                                        <span>Gestion de projet professionnelle</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <CheckCircle className="text-purple-500" size={20} />
                                        <span>Suivi-évaluation rigoureux</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 bg-slate-900 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-8">Envie de rejoindre cette dynamique ?</h2>
                    <button
                        onClick={() => navigate('/join')}
                        className="inline-flex items-center gap-2 bg-blue-600 px-10 py-4 rounded-full font-bold hover:bg-blue-500 transition-all hover:scale-105"
                    >
                        Devenir membre
                        <ArrowRight size={20} />
                    </button>
                </div>
            </section>

            {/* MENU INNOVANT / DOCK VERTICAL LATÉRAL (GAUCHE) */}
            <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
                {[
                    { id: 'ag', label: "Assemblée Générale", icon: Users, color: 'text-blue-600 bg-blue-100' },
                    { id: 'ca', label: "Conseil d'Admin", icon: Target, color: 'text-green-600 bg-green-100' },
                    { id: 'se', label: "Secrétariat Exécutif", icon: Briefcase, color: 'text-purple-600 bg-purple-100' },
                    { id: 'platforms', label: "Plateformes", icon: Share2, color: 'text-orange-600 bg-orange-100' },
                ].map((item, index) => (
                    <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + (index * 0.1) }}
                        onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                        className="group relative flex items-center justify-start"
                    >
                        {/* Icon Button - Z-Index Higher */}
                        <div className={`p-3 rounded-full shadow-lg border-2 border-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 ${item.color} group-hover:ring-4 ring-white/30 relative z-20`}>
                            <item.icon size={20} />
                        </div>

                        {/* Tooltip Label (Appears on Hover on the RIGHT) */}
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            className="absolute left-14 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white px-3 py-1 rounded-lg shadow-md text-sm font-bold text-gray-700 whitespace-nowrap pointer-events-none border border-gray-100 z-10"
                        >
                            {item.label}
                        </motion.span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
