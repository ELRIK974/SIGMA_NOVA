/**
 * SIGMA - Gestion des stocks
 * Ce fichier contient toutes les fonctions relatives à la gestion des stocks
 */

// Obtenir tous les articles du stock
function getAllStock() {
  return getAllData("Stock");
}

// Obtenir les articles du stock avec pagination
function getStockPaginated(page, pageSize, filterType, searchTerm) {
  const allItems = getAllStock();
  let filteredItems = allItems;
  
  // Appliquer le filtre par type/catégorie si spécifié
  if (filterType && filterType !== 'Tous') {
    filteredItems = filteredItems.filter(item => item.Catégorie === filterType);
  }
  
  // Appliquer le filtre de recherche si spécifié
  if (searchTerm && searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase().trim();
    filteredItems = filteredItems.filter(item => 
      item.Nom.toLowerCase().includes(term) || 
      (item.Localisation && item.Localisation.toLowerCase().includes(term))
    );
  }
  
  // Calculer le nombre total de pages
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  
  // Extraire les éléments pour la page demandée
  const startIndex = (page - 1) * pageSize;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + pageSize);
  
  return {
    items: paginatedItems,
    pagination: {
      currentPage: page,
      pageSize: pageSize,
      totalItems: totalItems,
      totalPages: totalPages
    }
  };
}

// Créer un nouvel article
function createStockItem(itemData) {
  // Ajouter un ID unique
  itemData.ID = generateUniqueId();
  
  // Convertir les champs numériques
  if (itemData.Quantité) itemData.Quantité = Number(itemData.Quantité);
  if (itemData["Seuil alerte"]) itemData["Seuil alerte"] = Number(itemData["Seuil alerte"]);
  
  // Ajouter l'article à la feuille
  return addRow("Stock", itemData);
}

// Obtenir un article par son ID
function getStockItemById(id) {
  const items = getAllStock();
  return items.find(item => item.ID === id);
}

// Mettre à jour un article
function updateStockItem(id, itemData) {
  // Convertir les champs numériques
  if (itemData.Quantité) itemData.Quantité = Number(itemData.Quantité);
  if (itemData["Seuil alerte"]) itemData["Seuil alerte"] = Number(itemData["Seuil alerte"]);
  
  return updateRow("Stock", "ID", id, itemData);
}

// Supprimer un article
function deleteStockItem(id) {
  return deleteRow("Stock", "ID", id);
}

// Vérifier les articles dont le stock est inférieur au seuil d'alerte
function checkLowStockItems() {
  const items = getAllStock();
  return items.filter(item => Number(item.Quantité) <= Number(item["Seuil alerte"]));
}

// Exporter les données du stock au format CSV
function exportStockToCSV() {
  const items = getAllStock();
  
  // Définir les en-têtes
  const headers = ["ID", "Nom", "Catégorie", "Quantité", "Seuil alerte", "Localisation", "Référence fournisseur"];
  
  // Créer les lignes CSV
  let csvContent = headers.join(",") + "\n";
  
  items.forEach(item => {
    const row = [
      item.ID || "",
      item.Nom || "",
      item.Catégorie || "",
      item.Quantité || "",
      item["Seuil alerte"] || "",
      item.Localisation || "",
      item["Référence fournisseur"] || ""
    ].map(cell => `"${cell}"`).join(",");
    
    csvContent += row + "\n";
  });
  
  return csvContent;
}

// Obtenir les catégories uniques d'articles
function getUniqueStockCategories() {
  const items = getAllStock();
  const categories = new Set();
  
  items.forEach(item => {
    if (item.Catégorie) {
      categories.add(item.Catégorie);
    }
  });
  
  return Array.from(categories);
}

// Obtenir les localisations uniques des articles
function getUniqueStockLocations() {
  const items = getAllStock();
  const locations = new Set();
  
  items.forEach(item => {
    if (item.Localisation) {
      locations.add(item.Localisation);
    }
  });
  
  return Array.from(locations);
}
