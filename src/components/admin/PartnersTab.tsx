import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { getPartnerStatus } from '../../utils/partnerStatus';
import { Save, Plus, Trash2, Edit, Building2, Users } from 'lucide-react';

export default function PartnersTab() {
  const { partners, addPartner, updatePartner, deletePartner } = useData();

  const [partnerForm, setPartnerForm] = useState({ name: '', type: 'Technique' as const, description: '', website: '', email: '', password: '', logo: '' });
  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null);
  const [activePartnerCategory, setActivePartnerCategory] = useState<'National' | 'International' | 'Institutionnel' | 'Technique'>('National');

  const handleAddPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.name) return;

    if (editingPartnerId) {
      updatePartner(editingPartnerId, partnerForm);
      setEditingPartnerId(null);
      alert('Partenaire mis à jour !');
    } else {
      addPartner(partnerForm);
      alert('Partenaire ajouté !');
    }

    setPartnerForm({ name: '', type: 'Technique', description: '', website: '', email: '', password: '', logo: '' });
  };

  const startEditingPartner = (partner: any) => {
    setEditingPartnerId(partner.id);
    setPartnerForm({
      name: partner.name,
      type: partner.type,
      description: partner.description || '',
      website: partner.website || '',
      email: partner.email || '',
      password: partner.password || '',
      logo: partner.logo || ''
    });
  };

  const cancelEditingPartner = () => {
    setEditingPartnerId(null);
    setPartnerForm({ name: '', type: 'Technique', description: '', website: '', email: '', password: '', logo: '' });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Formulaire */}
      <div className="h-fit space-y-6">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-black text-gray-800 mb-6">
            {editingPartnerId ? 'Modifier le partenaire' : 'Ajouter un partenaire'}
          </h2>
          
          <form onSubmit={handleAddPartner} className="space-y-5">
            {editingPartnerId && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl text-sm text-yellow-800 mb-2 flex justify-between items-center font-medium">
                <span>Mode édition activé</span>
                <button type="button" onClick={cancelEditingPartner} className="underline font-bold text-yellow-900 border border-yellow-300 px-3 py-1 rounded-lg hover:bg-yellow-100 transition-colors">Annuler</button>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nom de l'organisation</label>
              <input type="text" value={partnerForm.name} onChange={e => setPartnerForm({ ...partnerForm, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none font-medium transition-all" required />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Catégorie</label>
              <select value={partnerForm.type} onChange={e => setPartnerForm({ ...partnerForm, type: e.target.value as any })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none font-medium transition-all">
                <option value="Technique">Partenaire Technique</option>
                <option value="Financier">Partenaire Financier</option>
                <option value="Institutionnel">Partenaire Institutionnel</option>
                <option value="International">ONG Internationale</option>
                <option value="National">ONG Nationale</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea value={partnerForm.description} onChange={e => setPartnerForm({ ...partnerForm, description: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none font-medium transition-all" rows={3}></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Site Web</label>
              <input type="text" value={partnerForm.website} onChange={e => setPartnerForm({ ...partnerForm, website: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none font-medium transition-all" placeholder="https://" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="col-span-2"><p className="text-xs font-black text-gray-500 uppercase tracking-wider">Accès Réseau (Optionnel)</p></div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                <input type="email" value={partnerForm.email} onChange={e => setPartnerForm({ ...partnerForm, email: e.target.value })} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Mot de passe</label>
                <input type="text" value={partnerForm.password} onChange={e => setPartnerForm({ ...partnerForm, password: e.target.value })} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-medium" />
              </div>
            </div>
            
            <button type="submit" className={`w-full ${editingPartnerId ? 'bg-green-600 hover:bg-green-700 shadow-green-600/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'} text-white py-4 rounded-xl transition-all font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg mt-4`}>
              {editingPartnerId ? <><Save size={20} /> Mettre à jour</> : <><Plus size={20} /> Ajouter à l'annuaire</>}
            </button>
          </form>
        </div>
      </div>

      {/* Liste */}
      <div>
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-black text-gray-800 mb-6">Annuaire</h2>

          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { id: 'National', label: 'ONG Nationales' },
              { id: 'International', label: 'ONG Inter.' },
              { id: 'Institutionnel', label: 'Institutionnel' },
              { id: 'Technique', label: 'PTF' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActivePartnerCategory(cat.id as any)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activePartnerCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {(() => {
              const cat = [
                { id: 'National', label: 'ONG Nationales' },
                { id: 'International', label: 'ONG Internationales' },
                { id: 'Institutionnel', label: 'Partenaires Institutionnels' },
                { id: 'Technique', label: 'Partenaires Techniques & Financiers' }
              ].find(c => c.id === activePartnerCategory);

              if (!cat) return null;

              const filteredPartners = partners
                .filter(p => {
                  if (cat.id === 'Technique') {
                    return getPartnerStatus(p.name) === 'PTF';
                  }
                  return p.type === cat.id;
                })
                .sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }));

              return (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                    {cat.label} ({filteredPartners.length})
                  </h3>
                  
                  <div className="grid gap-4">
                    {filteredPartners.map(item => (
                      <div key={item.id} className="border border-gray-100 rounded-2xl p-4 flex gap-4 bg-gray-50 shadow-sm hover:shadow-md hover:bg-white border-transparent hover:border-gray-200 transition-all items-center group">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm text-gray-400 flex items-center justify-center shrink-0 group-hover:text-blue-600 group-hover:scale-110 transition-all">
                          {cat.id === 'Institutionnel' ? <Building2 size={24} /> : <Users size={24} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 leading-tight truncate">{item.name}</h3>
                          {item.email && (
                            <div className="flex gap-2 mt-2">
                              <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded uppercase tracking-wider">Accès activé</span>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button onClick={() => startEditingPartner(item)} className="text-blue-500 hover:bg-blue-50 p-2.5 rounded-xl transition-colors bg-white shadow-sm border border-gray-100">
                            <Edit size={18} />
                          </button>
                          <button onClick={() => deletePartner(item.id)} className="text-red-500 hover:bg-red-50 p-2.5 rounded-xl transition-colors bg-white shadow-sm border border-gray-100">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {filteredPartners.length === 0 && (
                      <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200">
                        <p className="text-sm text-gray-400 font-medium">Aucun partenaire enregistré dans cette catégorie.</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
