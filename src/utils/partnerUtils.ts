// Mapping des noms de partenaires avec leurs variations possibles
// Gère les variations d'orthographe, les formats de fichiers, et les noms alternatifs
export const partnerNameMapping: Record<string, string[]> = {
  // Conseil d'administration
  'PADI': ['padi', 'padie', 'p-a-d-i', 'padi-togo', 'padi-tg'],
  'Chaine de l\'espoir': [
    'chaine-de-lespoir', 
    'chaine-espoir', 
    'chainedelespoir', 
    'chaine-de-l-espoir',
    'chaine-espoir-togo',
    'chainedelespoir-togo'
  ],
  'FIADI': ['fiadi', 'f-i-a-d-i', 'fiadi-togo', 'fiadi-tg'],
  'ODIAE': ['odiae', 'o-d-i-a-e', 'odiae-togo', 'odiae-tg'],
  'ADESCO': ['adesco', 'a-d-e-s-c-o', 'adesco-togo', 'adesco-tg'],
  'AJT': ['ajt', 'a-j-t', 'ajt-togo', 'ajt-tg'],
  'CDD': ['cdd', 'c-d-d', 'cdd-togo', 'cdd-tg'],
  
  // PTF
  'AESEN': ['aesen', 'a-e-s-e-n', 'aesen-togo', 'aesen-tg'],
  'AFD': [
    'afd', 
    'a-f-d', 
    'agence-francaise-developpement',
    'afd-togo',
    'afd-france',
    'agence-francaise-developpement-togo'
  ],
  'UE': [
    'ue', 
    'u-e', 
    'union-europeenne', 
    'european-union', 
    'eu',
    'ue-togo',
    'union-europeenne-togo',
    'european-commission'
  ],
  'PSEAU': ['pseau', 'p-s-e-a-u', 'pseau-togo', 'pseau-tg'],
  'Coalition Eau': [
    'coalition-eau', 
    'coalitioneau', 
    'coalition-eau-france',
    'coalition-eau-togo',
    'coalitioneau-france'
  ],
  'SWA': [
    'swa', 
    's-w-a', 
    'sanitation-water-alliance',
    'swa-alliance',
    'sanitation-water-for-all'
  ],
  'AAFEA': ['aafea', 'a-a-f-e-a', 'aafea-togo', 'aafea-tg'],
  'ENDWATERPOVERTY': [
    'endwaterpoverty', 
    'end-water-poverty', 
    'ewp',
    'end-water-poverty-togo',
    'ewp-togo'
  ],
  'Ambassade de France au Togo': [
    'ambassade-france-togo', 
    'ambassade-france', 
    'france-togo', 
    'ambassade-fr-togo',
    'ambassade-france-lome',
    'ambassade-france-au-togo',
    'french-embassy-togo'
  ],
  'GENDA Water Alliance': [
    'genda-water-alliance', 
    'genda', 
    'genda-alliance',
    'genda-water',
    'genda-alliance-togo'
  ],
  'Plan International Togo': [
    'plan-international-togo', 
    'plan-togo', 
    'plan-international',
    'plan-international-tg',
    'plan-togo-country'
  ],
  'SEVES': ['seves', 's-e-v-e-s', 'seves-togo', 'seves-tg'],
  'CAWST': ['cawst', 'c-a-w-s-t', 'cawst-togo', 'cawst-tg']
};

// Extensions d'images à essayer
const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];

/**
 * Génère toutes les variations possibles d'un nom de fichier pour un partenaire
 */
export function generateImagePaths(partnerName: string): string[] {
  const basePaths = ['/images/partners/', '/images/'];
  const variations = partnerNameMapping[partnerName] || [];
  
  // Ajouter la variation standard (nom normalisé)
  const standardVariation = partnerName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .replace(/\s+/g, '-')
    .replace(/'/g, '')
    .replace(/[^a-z0-9-]/g, '');
  
  const allVariations = [standardVariation, ...variations];
  
  // Générer tous les chemins possibles avec toutes les extensions et tous les dossiers
  const paths: string[] = [];
  
  basePaths.forEach(basePath => {
    allVariations.forEach(variation => {
      imageExtensions.forEach(ext => {
        paths.push(`${basePath}${variation}${ext}`);
        // Ajouter aussi la version avec majuscule initiale
        const capitalized = variation.charAt(0).toUpperCase() + variation.slice(1);
        paths.push(`${basePath}${capitalized}${ext}`);
      });
    });
  });
  
  // Supprimer les doublons tout en préservant l'ordre
  return Array.from(new Set(paths));
}

/**
 * Trouve le premier chemin d'image valide pour un partenaire
 */
export function findPartnerImage(partnerName: string): string | null {
  const paths = generateImagePaths(partnerName);
  // On retourne le premier chemin (le plus probable)
  // Le composant React testera si l'image existe
  return paths[0] || null;
}
