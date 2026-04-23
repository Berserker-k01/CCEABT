import { useState, useEffect } from 'react';
import { Lock, Save, Edit } from 'lucide-react';

export default function SecurityTab() {
  const [adminEmail, setAdminEmail] = useState('admin@cceabt.org');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [isEditingCredentials, setIsEditingCredentials] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('adminEmail') || 'admin@cceabt.org';
    const savedPassword = localStorage.getItem('adminPassword') || 'admin123';
    setAdminEmail(savedEmail);
    setAdminPassword(savedPassword);
  }, []);

  const saveCredentials = () => {
    localStorage.setItem('adminEmail', adminEmail);
    localStorage.setItem('adminPassword', adminPassword);
    setIsEditingCredentials(false);
    alert('Identifiants mis à jour avec succès !');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex flex-col justify-center items-center mb-6">
          <Lock size={32} />
        </div>
        <h2 className="text-3xl font-black text-gray-800 mb-2">Accès Administration</h2>
        <p className="text-gray-500 mb-8">Gérez vos informations de connexion au panneau de contrôle.</p>

        <div className="w-full bg-blue-50/50 rounded-2xl border border-blue-100 p-6 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
          
          {!isEditingCredentials ? (
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Identifiants actuels</p>
                <p className="text-xl font-bold text-gray-900">{adminEmail}</p>
              </div>
              <div className="flex justify-between items-end border-t border-blue-100/50 pt-4">
                <div>
                  <p className="text-gray-500 text-sm flex gap-2">Mot de passe : <span className="tracking-widest font-black">••••••••••••</span></p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 relative z-10">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nouvel Email</label>
                <input 
                  type="email" 
                  value={adminEmail} 
                  onChange={e => setAdminEmail(e.target.value)} 
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-medium" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nouveau Mot de passe</label>
                <input 
                  type="text" 
                  value={adminPassword} 
                  onChange={e => setAdminPassword(e.target.value)} 
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-medium" 
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 w-full flex gap-4">
          {!isEditingCredentials ? (
            <button 
              onClick={() => setIsEditingCredentials(true)} 
              className="w-full bg-white border-2 border-blue-100 text-blue-600 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
            >
              <Edit size={18} /> Modifier les informations
            </button>
          ) : (
            <>
              <button 
                onClick={saveCredentials} 
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
              >
                <Save size={18} /> Enregistrer
              </button>
              <button 
                onClick={() => setIsEditingCredentials(false)} 
                className="px-6 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                Annuler
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
