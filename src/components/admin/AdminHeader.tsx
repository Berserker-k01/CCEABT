import { LogOut, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminHeaderProps {
  onLogout: () => void;
}

export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0a0f1d] text-white py-6 px-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
      {/* Left section */}
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
          <Globe size={28} className="text-white" />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight font-display uppercase">PANNEAU D'ADMINISTRATION</h1>
            <span className="bg-blue-600 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded shadow-sm tracking-wider uppercase hidden sm:block">SUPERADMIN</span>
          </div>
          <p className="text-gray-400 text-xs md:text-sm tracking-widest font-semibold uppercase mt-1">Gestionnaire de contenu CCEABT</p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6">
        <button 
          onClick={() => navigate('/')} 
          className="text-gray-400 hover:text-white text-xs font-bold tracking-widest uppercase transition-colors hidden md:block"
        >
          VISIONNER LE SITE
        </button>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-red-600/90 text-white px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-red-500 transition-all shadow-lg shadow-red-600/20"
        >
          <LogOut size={18} /> Déconnexion
        </button>
      </div>
    </div>
  );
}
