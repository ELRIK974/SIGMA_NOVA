/**
 * SIGMA - Gestion des stocks
 * Ce fichier contient toutes les fonctions relatives à la gestion des stocks
 */

// Obtenir tous les articles du stock
function getAllStock() {
  return getAllData("Stock");
}

// Créer un nouvel article
function createStockItem(itemData) {
  // Ajouter un ID unique
  itemData.ID = generateUniqueId();
  
  // Ajouter l'article à la feuille
  return addRow("Stock", itemData);
}

// Obtenir un article par son ID
function getStockItemById(id) {
  const items = getAllStock();
  return items.find(item => item.ID === id);
}

// Mettre à jour la quantité d'un article
function updateStockQuantity(id, newQuantity) {
  return updateRow("Stock", "ID", id, { Quantité: newQuantity });
}

// Vérifier les articles dont le stock est inférieur au seuil d'alerte
function checkLowStockItems() {
  const items = getAllStock();
  return items.filter(item => item.Quantité < item["Seuil alerte"]);
}
