// Définition des statuts des partenaires pour éviter les conflits d'intérêts
// Système hiérarchique : Statut > Catégorie

// Membres du Conseil d'Administration
export const CA_MEMBERS = [
  'La CDE - La Chaîne de l\'Espoir',
  'FIADI',
  'ODIAE',
  'ADESCO',
  'AJT',
  'CDD',
  'PADIE'
];

// Partenaires Techniques et Financiers (liste complète et définitive)
export const PTF_MEMBERS = [
  'pS-Eau',
  'Coalition Eau',
  'AFD',
  'SEDIF',
  'République Française',
  'AESEN',
  'Région Maritime Commune des Lacs 1',
  'SEVES',
  'PADIE',
  'Plan International Togo'
];

/**
 * Normalise un nom de partenaire pour la comparaison
 */
function normalizePartnerName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .replace(/^la\s+/i, '') // Supprimer "La" au début
    .replace(/^le\s+/i, '') // Supprimer "Le" au début
    .replace(/^les\s+/i, '') // Supprimer "Les" au début
    .replace(/\s*-\s*/g, ' ') // Remplacer les tirets par des espaces
    .replace(/\s+/g, ' ') // Normaliser les espaces
    .trim();
}

/**
 * Détermine le statut d'un partenaire
 */
export function getPartnerStatus(partnerName: string): 'CA' | 'PTF' | 'Other' {
  const normalizedName = normalizePartnerName(partnerName);

  // Exclusion explicite : CCDD ne fait PAS partie du CA
  if (normalizedName.includes('ccdd') || normalizedName === 'collectif des citoyens pour le developpement durable') {
    return 'Other';
  }

  // Force CDE / Chaine de l'Espoir en CA
  if (normalizedName.includes('cde') || (normalizedName.includes('chaine') && normalizedName.includes('espoir'))) {
    return 'CA';
  }

  // Vérifier si c'est un membre du CA
  for (const ca of CA_MEMBERS) {
    const normalizedCA = normalizePartnerName(ca);

    // Correspondance exacte
    if (normalizedName === normalizedCA) {
      return 'CA';
    }

    // Pour CDD, vérifier que ce n'est pas CCDD
    if (normalizedCA === 'cdd') {
      if (normalizedName.includes('cdd') && !normalizedName.includes('ccdd') &&
        (normalizedName.includes('communication') || normalizedName === 'cdd')) {
        return 'CA';
      }
      continue;
    }

    // Correspondance partielle
    if (normalizedName.includes(normalizedCA) || normalizedCA.includes(normalizedName)) {
      return 'CA';
    }

    // Vérifier aussi les acronymes et mots-clés pour Chaine de l'espoir
    if (normalizedCA.includes('chaine') && normalizedCA.includes('espoir')) {
      if (normalizedName.includes('chaine') && normalizedName.includes('espoir')) {
        return 'CA';
      }
      if (normalizedName.includes('cde') && normalizedName.includes('espoir')) {
        return 'CA';
      }
      if (normalizedName.includes('cde') && normalizedName.includes('chaine')) {
        return 'CA';
      }
    }
  }

  // Exclusion explicite : les ministères ne sont PAS des PTF
  if (normalizedName.includes('ministère') || normalizedName.includes('ministere') ||
    normalizedName.includes('autorité de régulation') || normalizedName.includes('autorite de regulation')) {
    return 'Other';
  }

  // Vérifier si c'est un PTF (les 10 noms exacts de la liste)
  for (const ptf of PTF_MEMBERS) {
    const normalizedPTF = normalizePartnerName(ptf);

    // Correspondance exacte
    if (normalizedName === normalizedPTF) {
      return 'PTF';
    }

    // Correspondances spécifiques pour chaque PTF
    if (ptf === 'pS-Eau' && (normalizedName.includes('pseau') || normalizedName.includes('ps-eau') || normalizedName.includes('ps eau'))) {
      return 'PTF';
    }
    if (ptf === 'Coalition Eau' && normalizedName.includes('coalition') && normalizedName.includes('eau')) {
      return 'PTF';
    }
    if (ptf === 'AFD' && (normalizedName === 'afd' || normalizedName.includes('agence francaise developpement'))) {
      return 'PTF';
    }
    if (ptf === 'SEDIF' && (normalizedName.includes('sedif') || normalizedName.includes('service public'))) {
      return 'PTF';
    }
    if (ptf === 'République Française' && (normalizedName.includes('republique francaise') || normalizedName.includes('republique française') || (normalizedName.includes('ambassade') && normalizedName.includes('france')))) {
      return 'PTF';
    }
    if (ptf === 'AESEN' && (normalizedName.includes('aesen') || normalizedName.includes('seine-normandie') || normalizedName.includes('seine normandie'))) {
      return 'PTF';
    }
    if (ptf === 'Région Maritime Commune des Lacs 1' && (normalizedName.includes('lacs 1') || normalizedName.includes('lacs1') || normalizedName.includes('region maritime') || normalizedName.includes('commune des lacs'))) {
      return 'PTF';
    }
    if (ptf === 'SEVES' && normalizedName.includes('seves')) {
      return 'PTF';
    }
    if (ptf === 'PADIE' && (normalizedName.includes('padie') || normalizedName.includes('pionniers'))) {
      return 'PTF';
    }
    if (ptf === 'Plan International Togo' && normalizedName.includes('plan international')) {
      return 'PTF';
    }
  }

  return 'Other';
}

/**
 * Ordre de priorité pour l'affichage
 * 1. Statut (CA > PTF > Other)
 * 2. Catégorie (National > International > Institutionnel)
 */
export function getPartnerDisplayOrder(
  status: 'CA' | 'PTF' | 'Other',
  category: string, // Changed from strict union to string to allow easier usage
  partnerName?: string
): number {
  // Priorité absolue pour PADIE
  if (partnerName && (partnerName.toLowerCase().includes('padie') || partnerName.toLowerCase().includes('pionniers'))) {
    return 0; // Priorité maximale (top of list)
  }

  // Priorité de statut (plus petit = plus prioritaire)
  const statusPriority = {
    'CA': 1,
    'PTF': 2,
    'Other': 3
  };

  // Priorité de catégorie (National avant International)
  // Use 'any' or index signature to allow string access
  const categoryPriority: Record<string, number> = {
    'National': 1,
    'International': 2,
    'Institutionnel': 3,
    'Technique': 4,
    'Financier': 5,
    'Positionnement': 6
  };

  // Combiner les priorités (statut * 100 + catégorie pour garantir l'ordre)
  const statusScore = statusPriority[status] || 99;

  // Si c'est un membre du CA, on respecte l'ordre précis de la liste CA_MEMBERS
  if (status === 'CA' && partnerName) {
    const normalizedName = normalizePartnerName(partnerName);
    const index = CA_MEMBERS.findIndex(caMember => {
      const normalizedCA = normalizePartnerName(caMember);
      return normalizedName === normalizedCA ||
        normalizedName.includes(normalizedCA) ||
        normalizedCA.includes(normalizedName);
    });

    if (index !== -1) {
      // On retourne 10 + index pour être sûr d'être avant les 100+ (catégories) tout en gardant l'ordre
      // PADIE sera 10 (ou 0 car géré au dessus), FIADI 11, etc.
      return 10 + index;
    }
  }

  const categoryScore = categoryPriority[category] || 99;
  return statusScore * 100 + categoryScore;
}
