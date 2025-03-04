/**
 * SIGMA - Gestion des stocks
 * Ce fichier contient toutes les fonctions relatives à la gestion des stocks
 */

// Obtenir tous les articles du stock
function getAllStock() {
  return getAllData(CONFIG.SHEETS.STOCK);
}

// Obtenir les articles du stock avec pagination
function getStockPaginated(page, pageSize, filterType, searchTerm) {
  try {
    const allItems = getAllStock();
    let filteredItems = allItems;
    
    // Appliquer le filtre par type/catégorie si spécifié
    if (filterType && filterType !== 'Tous') {
      if (filterType === 'Stock critique') {
        // Filtre spécial pour les articles en stock critique
        filteredItems = filteredItems.filter(item => 
          Number(item.Quantité) <= Number(item["Seuil alerte"])
        );
      } else {
        // Filtre normal par catégorie
        filteredItems = filteredItems.filter(item => item.Catégorie === filterType);
      }
    }
    
    // Appliquer le filtre de recherche si spécifié
    if (searchTerm && searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase().trim();
      filteredItems = filteredItems.filter(item => {
        // Recherche dans plusieurs champs pour plus d'efficacité
        return (
          (item.Nom && item.Nom.toLowerCase().includes(term)) || 
          (item.Localisation && item.Localisation.toLowerCase().includes(term)) ||
          (item["Référence fournisseur"] && item["Référence fournisseur"].toLowerCase().includes(term))
        );
      });
    }
    
    // Calculer le nombre total de pages
    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / pageSize) || 1; // Au moins 1 page même si vide
    
    // S'assurer que la page demandée est valide
    const validPage = Math.max(1, Math.min(page, totalPages));
    
    // Extraire les éléments pour la page demandée
    const startIndex = (validPage - 1) * pageSize;
    const paginatedItems = filteredItems.slice(startIndex, startIndex + pageSize);
    
    return {
      items: paginatedItems,
      pagination: {
        currentPage: validPage,
        pageSize: pageSize,
        totalItems: totalItems,
        totalPages: totalPages
      }
    };
  } catch (e) {
    console.error(`Erreur lors de la pagination du stock: ${e.message}`);
    return {
      items: [],
      pagination: {
        currentPage: 1,
        pageSize: pageSize,
        totalItems: 0,
        totalPages: 1
      }
    };
  }
}

// Reste du fichier inchangé...
