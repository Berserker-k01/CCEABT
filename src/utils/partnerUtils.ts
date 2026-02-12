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
  'CDD': ['cdd', 'c-d-d', 'collectif-citoyens-developpement-durable', 'communication-developpement-durable'],
  'OCDI': ['ocdi', 'caritas', 'ocdi-caritas', 'ocdi-lom'],
  'EAA': ['eaa', 'eau-assainissement-afrique'],
  'COLOMBE': ['colombe'],
  'ATAPE': ['atape', 'ong-atape'],
  'PADIE': ['padie', 'p-a-d-i-e', 'pionniers-en-action'],

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

// Mapping direct des URLs des logos (priorité haute)
// Ces URLs sont utilisées directement pour un chargement immédiat
// 
// Logos documentés :
// - CDD: Triangle jaune avec "CDD" en vert (Communication Développement Durable)
// - SEVES: Logo avec forme blanche et texte "SEVES" sur fond bleu-gris foncé
// - Plan International: Logo avec forme bleue et texte "PLAN INTERNATIONAL"
// - END WATER POVERTY: Logo avec main noire et goutte d'eau bleue
// - AAFEA: Logo avec formes bleues ressemblant à des gouttes d'eau
// - UE: Drapeau européen avec étoiles dorées sur fond bleu
// - AFD: Logo avec cercle dégradé bleu-rouge et texte "AFD"
export const partnerLogoUrls: Record<string, string> = {
  // Conseil d'administration
  'PADI': '/partners/image1.png',
  'PADIE': '/partners/image1.png',
  'PADIE - Pionniers en Action pour le Développempent Intégré à l’Environnement': '/partners/image1.png',
  'Chaine de l\'espoir': '/partners/image31.jpeg',
  'Chaîne de l\'Espoir': '/partners/image31.jpeg',
  'La Chaîne de l\'Espoir': '/partners/image31.jpeg',
  'La CDE - La Chaîne de l\'Espoir': '/partners/image31.jpeg',
  'FIADI': '/partners/image10.png',
  'ONG FIADI': '/partners/image10.png',
  'ONG FIADI - Femmes Initiatives et Actions pour un Développement Intégral': '/partners/image10.png',
  'ODIAE': '/partners/image12.jpg',
  'ODIAE - Organisation pour le Développement et l\'Incitation à l\'Auto-Emploi': '/partners/image12.jpg',
  'ADESCO': '/partners/image17.jpg',
  'ADESCO - Appui au Développement Social et Communautaire': '/partners/image17.jpg',
  'AJT': '/partners/image23.png',
  'AJT - Action Jeune Togo': '/partners/image23.png',
  'CDD': '/partners/image26.jpeg',
  'CDD - Communication pour un Développement Durable': '/partners/image26.jpeg',

  // PTF
  'AESEN': '/partners/aesn.png',
  'AFD': 'https://www.afd.fr/sites/afd/files/logo_0.png',
  'AFD - Agence Française de Développement': 'https://www.afd.fr/sites/afd/files/logo_0.png',
  'UE': '/partners/ue.png',
  'Union Européenne': '/partners/ue.png',
  'PSEAU': '/partners/pseau.png',
  'pS-Eau': '/partners/pseau.png',
  'Coalition Eau': '/partners/coalition-eau.png',
  'SWA': '/partners/swa.jpg',
  'SWA - Sanitation and Water for All': '/partners/swa.jpg',
  'AAFEA': '/partners/aafea.png',
  'ENDWATERPOVERTY': '/partners/endwaterpoverty.png',
  'Ambassade de France au Togo': '/partners/ambassade-france.png',
  'GENDA Water Alliance': '/partners/genda.jpg',
  'Plan International Togo': '/partners/plan-international.png',
  'SEVES': '/partners/seves.png',
  'SEVES - Systèmes Economiquement Viables pour l\'Eau aux Suds': '/partners/seves.png',
  'CAWST': '/partners/cawst.png',
  'OCDI': '/partners/image2.jpeg',
  'OCDI/CARITAS Lomé': '/partners/image2.jpeg',
  'EAA': '/partners/image8.png',
  'EAA - Eau Assainissement pour l\'Afrique': '/partners/image8.png',

  // National members without logos (display premium icon)
  'APSS - Association Promotion de la Salubrité Pour la Santé': '',
  'CARD - Comité d\'Action pour la Recherche et le Developpement': '',
  'CRT-RC - Croix-Rouge Togolaise / Région Centrale': '',
  'E-D - Environnement et Développement': '',
  'RAID - Recherche et Appuis aux Initiatives de Développement': '',
  'RP/RC - Réseau Phast Région Centrale': '',
  'CAP-EJR - Complexe Agro-pastoral Echo des Jeunes Ruraux': '',
  'CEAPIC - Centre d\'Etudes et d\'Action pour la Promotion des Initiatives': '',
  'JARC - Jeunesse Agricole Rurale Catholique': '',
  'ONG JVS - ONG Le Jourdain-Vie et Santé': '',
  'ONG ATAPE - Association Togolaise pour l\'Assainissement et la Protection de l\'Environnement': '',
  'OVAD-AP - Organisation des Volontaires Acteurs de Développement - Action Plus': '',
  'GIRCAFEM - Groupe International pour le Renforcement des Capacités Féminines': '',
  'GIRCAFEM - Groupe International pour le Renforcement des Capacités Féminines': '',
  'CCDD - Collectif des citoyens pour le développement durable': '',
  'COLOMBE': ''
};

// Extensions d'images à essayer
const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];

/**
 * Génère toutes les variations possibles d'un nom de fichier pour un partenaire
 */
export function generateImagePaths(partnerName: string): string[] {
  const basePaths = ['/partners/', '/images/partners/', '/images/'];
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
 * Priorité : URL directe (si non vide) > fichiers locaux
 */
export function findPartnerImage(partnerName: string): string | null {
  // D'abord vérifier si on a une URL directe (et qu'elle n'est pas vide)
  const directUrl = partnerLogoUrls[partnerName];
  if (directUrl === '') return null; // Explicitly marked as no logo
  if (directUrl && directUrl.trim() !== '') {
    return directUrl;
  }

  // Sinon, chercher dans les fichiers locaux
  const paths = generateImagePaths(partnerName);
  // On retourne le premier chemin (le plus probable)
  // Le composant React testera si l'image existe
  return paths[0] || null;
}
