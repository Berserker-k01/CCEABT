import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CreditCard, Smartphone } from 'lucide-react';

interface DonationModalProps {
    onClose: () => void;
}

type PaymentMethod = 'mixx' | 'flooz' | 'visa';

export default function DonationModal({ onClose }: DonationModalProps) {
    const [amount, setAmount] = useState<string>('');
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
    const [phoneNumber, setPhoneNumber] = useState('');

    const handlePayment = () => {
        // Simulate payment process
        alert('Redirection vers la passerelle de paiement...');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden z-50"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 text-white text-center relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-bold mb-2">Faire un don</h2>
                        <p className="text-blue-100 max-w-sm mx-auto text-sm">
                            Choisissez votre mode de paiement sécurisé
                        </p>
                    </div>

                    {/* Body */}
                    <div className="p-8">
                        {/* Step 1: Select Payment Method */}
                        <div className="mb-8">
                            <label className="block text-gray-700 font-bold mb-4 text-lg">Choisissez un moyen de paiement :</label>
                            <div className="grid grid-cols-3 gap-4">
                                <button
                                    onClick={() => setSelectedMethod('mixx')}
                                    className={`flex flex-col items-center p-4 border-2 rounded-xl transition-all ${selectedMethod === 'mixx'
                                            ? 'border-blue-600 bg-blue-50/50 scale-105 shadow-md'
                                            : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="h-10 w-10 mb-2 flex items-center justify-center bg-red-100 rounded-full text-red-600">
                                        <Smartphone size={24} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">Mixx by Yas</span>
                                </button>

                                <button
                                    onClick={() => setSelectedMethod('flooz')}
                                    className={`flex flex-col items-center p-4 border-2 rounded-xl transition-all ${selectedMethod === 'flooz'
                                            ? 'border-blue-600 bg-blue-50/50 scale-105 shadow-md'
                                            : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="h-10 w-10 mb-2 flex items-center justify-center bg-blue-100 rounded-full text-blue-600">
                                        <Smartphone size={24} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">Flooz</span>
                                </button>

                                <button
                                    onClick={() => setSelectedMethod('visa')}
                                    className={`flex flex-col items-center p-4 border-2 rounded-xl transition-all ${selectedMethod === 'visa'
                                            ? 'border-blue-600 bg-blue-50/50 scale-105 shadow-md'
                                            : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="h-10 w-10 mb-2 flex items-center justify-center bg-purple-100 rounded-full text-purple-600">
                                        <CreditCard size={24} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">Carte Visa</span>
                                </button>
                            </div>
                        </div>

                        {/* Step 2: Dynamic Form Fields */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 min-h-[160px] flex flex-col justify-center">
                            {!selectedMethod ? (
                                <div className="text-center text-gray-500 py-4">
                                    <CreditCard className="mx-auto mb-3 opacity-30" size={48} />
                                    <p>Veuillez sélectionner une option ci-dessus pour continuer.</p>
                                </div>
                            ) : selectedMethod === 'visa' ? (
                                // FORMULAIRE VISA (Avec Montant)
                                <div className="space-y-4 animate-fade-in">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Montant du don (FCFA)</label>
                                        <input
                                            type="number"
                                            placeholder="Ex: 5000"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-0 outline-none font-medium text-lg"
                                        />
                                    </div>
                                    <button
                                        onClick={handlePayment}
                                        className="w-full bg-blue-900 text-white py-4 rounded-lg font-bold hover:bg-blue-800 transition-colors shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <CreditCard size={20} />
                                        Accéder au paiement sécurisé {amount ? `(${amount} FCFA)` : ''}
                                    </button>
                                </div>
                            ) : (
                                // FORMULAIRE MOBILE MONEY (Sans Montant)
                                <div className="space-y-4 animate-fade-in">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Votre numéro {selectedMethod === 'mixx' ? 'Moov/Yas (Mixx)' : 'Moov (Flooz)'}
                                        </label>
                                        <input
                                            type="tel"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="90 00 00 00"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-mono text-lg tracking-wide focus:border-blue-500 focus:ring-0 outline-none"
                                        />
                                        <p className="text-xs text-gray-500 mt-2">
                                            Vous recevrez une notification sur votre téléphone pour valider le paiement.
                                        </p>
                                    </div>
                                    <button
                                        onClick={handlePayment}
                                        className={`w-full py-4 rounded-lg font-bold text-white shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 ${selectedMethod === 'mixx' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-700 hover:bg-blue-800'
                                            }`}>
                                        <Smartphone size={20} />
                                        Initier le don avec {selectedMethod === 'mixx' ? 'Mixx' : 'Flooz'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
