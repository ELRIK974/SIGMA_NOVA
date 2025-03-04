/**
 * SIGMA - Gestion des emprunts
 * Ce fichier contient toutes les fonctions relatives à la gestion des emprunts
 */

// Obtenir tous les emprunts
function getAllEmprunts() {
  return getAllData("Emprunts");
}

// Créer un nouvel emprunt
function createEmprunt(empruntData) {
  // Ajouter des champs automatiques
  empruntData.ID = generateUniqueId();
  empruntData.Statut = "Pas prêt";
  empruntData["Date création"] = new Date().toLocaleDateString("fr-FR");
  
  // Ajouter l'emprunt à la feuille
  return addRow("Emprunts", empruntData);
}

// Obtenir un emprunt par son ID
function getEmpruntById(id) {
  const emprunts = getAllEmprunts();
  return emprunts.find(emp => emp.ID === id);
}

// Mettre à jour le statut d'un emprunt
function updateEmpruntStatus(id, newStatus) {
  return updateRow("Emprunts", "ID", id, { Statut: newStatus });
}

// Supprimer un emprunt (réservé aux administrateurs)
function deleteEmprunt(id) {
  return deleteRow("Emprunts", "ID", id);
}
