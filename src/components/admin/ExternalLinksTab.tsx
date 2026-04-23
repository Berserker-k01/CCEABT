import { useData } from '../../context/DataContext';

export default function ExternalLinksTab() {
  const { driveUrl, setDriveUrl } = useData();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-black text-gray-800 mb-6">Liens Externes</h2>
        
        <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Drive" className="w-10 h-10" />
            <h3 className="text-lg font-black text-blue-900 uppercase tracking-widest">Archive Documentaire Globale</h3>
          </div>
          
          <p className="text-blue-800 mb-6 font-medium leading-relaxed max-w-xl relative z-10">
            Ce lien est le point d'entrée principal vers votre bibliothèque Drive. Il permet aux visiteurs d'accéder à <strong>l'ensemble de vos dossiers</strong> d'un seul clic.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 relative z-10">
            <input
              type="text"
              placeholder="Collez le lien du dossier Google Drive ici..."
              value={driveUrl}
              onChange={(e) => setDriveUrl(e.target.value)}
              className="flex-1 px-5 py-4 border border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none bg-white font-medium shadow-sm"
            />
            <button
              onClick={() => alert('Lien global sauvegardé dans le système !')}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-200 whitespace-nowrap"
            >
              Enregistrer
            </button>
          </div>
        </div>

        <div className="bg-white border-2 border-dashed border-gray-200 p-8 rounded-2xl">
          <h4 className="font-black text-gray-800 mb-6 flex items-center gap-3 text-lg">
            <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">?</span>
            Comment rendre le Drive accessible à tous ?
          </h4>
          <div className="space-y-4">
            {[
              "Allez sur votre Google Drive",
              "Faites un clic droit sur votre dossier 'RESSOURCES'",
              "Cliquez sur 'Partager'",
              "Sous 'Accès général', changez 'Limité' par 'Tous les utilisateurs disposant du lien'",
              "Vérifiez que le rôle est bien 'Lecteur'",
              "Copiez le lien et collez-le ci-dessus !"
            ].map((step, i) => (
              <div key={i} className="flex gap-4 text-sm md:text-base text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <span className="font-black text-blue-600 bg-white w-6 h-6 flex items-center justify-center rounded-full shadow-sm shrink-0">{i + 1}</span>
                <p className="font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
