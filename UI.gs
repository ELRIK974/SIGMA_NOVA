/**
 * SIGMA - Fonctions liées à l'interface utilisateur
 * Ce fichier contient les fonctions appelées depuis le front-end
 */

// Obtenir les données pour l'onglet "Résumé"
function getDashboardData() {
  const data = {
    alertesStock: getAlertesStock(),
    materielManquant: getMaterielManquant(),
    empruntsNonRevenus: getEmpruntsNonRevenus(),
    prochainsEmprunts: getProchainsEmprunts(),
    modulesNonOperationnels: getModulesNonOperationnels(),
    materielNonOperationnel: getMaterielNonOperationnel(),
    empruntsEnAttente: getEmpruntsEnAttente()
  };
  
  return data;
}

// Fonction temporaire pour l'onglet "Résumé" (sera développée plus tard)
function getAlertesStock() {
  // Temporairement, retourner des données fictives
  return [
    { materiel: "Tablettes Android", stock: 2, seuil: 5, localisation: "Armoire A" },
    { materiel: "Câbles HDMI", stock: 3, seuil: 10, localisation: "Tiroir B" }
  ];
}

// Fonction temporaire pour le matériel manquant
function getMaterielManquant() {
  return [
    { materiel: "Adaptateur DisplayPort", quantite: 1, urgence: "Haute" },
    { materiel: "Batterie externe", quantite: 2, urgence: "Moyenne" }
  ];
}

// Fonction temporaire pour les emprunts non revenus
function getEmpruntsNonRevenus() {
  return [
    { 
      nom: "Animation Astronomie", 
      lieu: "Collège Jean Moulin",
      dateDepart: "01/02/2025",
      dateRetour: "15/02/2025",
      secteur: "Astronomie",
      emprunteur: "Marie Dupont"
    }
  ];
}

// Fonction temporaire pour les prochains emprunts
function getProchainsEmprunts() {
  return [
    { 
      nom: "Atelier Robotique", 
      dateDepart: "10/03/2025",
      etat: "Pas prêt"
    }
  ];
}

// Fonction temporaire pour les modules non opérationnels
function getModulesNonOperationnels() {
  return [
    { 
      code: "ASTRO-01", 
      nom: "Module Observation Lunaire",
      probleme: "Manque oculaire 10mm"
    }
  ];
}

// Fonction temporaire pour le matériel non opérationnel
function getMaterielNonOperationnel() {
  return [
    { 
      nom: "Télescope 150/750", 
      probleme: "Pied instable",
      statut: "En réparation"
    }
  ];
}

// Fonction temporaire pour les emprunts en attente
function getEmpruntsEnAttente() {
  return [
    { 
      nom: "Exposition Biodiversité", 
      dateRetour: "28/02/2025",
      statut: "Non inventorié, Non facturé"
    }
  ];
}

// Fonction pour récupérer le contenu HTML d'une page spécifique
// Cette fonction doit être au niveau racine, pas à l'intérieur d'une autre fonction!
function getPageContent(pageName) {
  switch(pageName) {
    case 'dashboard':
      return HtmlService.createHtmlOutputFromFile('dashboardUI').getContent();
    case 'emprunts':
      return HtmlService.createHtmlOutputFromFile('empruntsUI').getContent();
    case 'stock':
      return HtmlService.createHtmlOutputFromFile('stockUI').getContent();
    case 'modules':
      return HtmlService.createHtmlOutputFromFile('modulesUI').getContent();
    case 'livraisons':
      return HtmlService.createHtmlOutputFromFile('livraisonsUI').getContent();
    case 'options':
      return HtmlService.createHtmlOutputFromFile('optionsUI').getContent();
    default:
      // Par défaut, retourner la page dashboard
      return HtmlService.createHtmlOutputFromFile('dashboardUI').getContent();
  }
}
