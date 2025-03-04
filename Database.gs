/**
 * SIGMA - Fonctions d'accès à la base de données
 * Ce fichier contient toutes les fonctions pour lire et écrire dans les feuilles Google Sheets
 */

// ID du classeur Google Sheets utilisé comme base de données
// L'ID se trouve dans l'URL de votre Google Sheets entre /d/ et /edit
// Exemple : https://docs.google.com/spreadsheets/d/VOTRE_ID_ICI/edit
const SPREADSHEET_ID = '1hdj86LiRWY7K1vIHYh0NwIM8M_HKEy7P9SGezhDC70M'; // ⚠️ REMPLACEZ PAR VOTRE ID DE GOOGLE SHEETS

// Obtenir le classeur (spreadsheet)
function getSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

// Obtenir une feuille par son nom
function getSheetByName(sheetName) {
  return getSpreadsheet().getSheetByName(sheetName);
}

// Obtenir toutes les données d'une feuille (avec en-têtes)
function getAllData(sheetName) {
  const sheet = getSheetByName(sheetName);
  
  // Vérifier si la feuille existe
  if (!sheet) {
    console.error(`La feuille "${sheetName}" n'existe pas.`);
    return [];
  }
  
  const data = sheet.getDataRange().getValues();
  
  // Vérifier s'il y a des données (au moins la ligne d'en-tête)
  if (data.length === 0) {
    return [];
  }
  
  // Transformer les données en objets avec les en-têtes comme clés
  const headers = data[0];
  const rows = data.slice(1);
  
  return rows.map(row => {
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });
}

// Ajouter une ligne de données dans une feuille
function addRow(sheetName, rowData) {
  const sheet = getSheetByName(sheetName);
  
  // Vérifier si la feuille existe
  if (!sheet) {
    console.error(`La feuille "${sheetName}" n'existe pas.`);
    return null;
  }
  
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  // Créer un tableau dans le même ordre que les en-têtes
  const rowArray = headers.map(header => rowData[header] || '');
  
  // Ajouter la ligne
  sheet.appendRow(rowArray);
  return rowData;
}

// Mettre à jour une ligne en utilisant un ID ou une autre colonne comme identifiant
function updateRow(sheetName, idColumnName, idValue, updatedData) {
  const sheet = getSheetByName(sheetName);
  
  // Vérifier si la feuille existe
  if (!sheet) {
    console.error(`La feuille "${sheetName}" n'existe pas.`);
    return false;
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  // Trouver l'index de la colonne d'identification
  const idColumnIndex = headers.indexOf(idColumnName);
  if (idColumnIndex === -1) return false;
  
  // Chercher la ligne correspondante
  for (let i = 1; i < data.length; i++) {
    if (data[i][idColumnIndex] == idValue) {
      // Créer un tableau de valeurs mises à jour
      const updatedRow = headers.map((header, j) => {
        return updatedData.hasOwnProperty(header) ? updatedData[header] : data[i][j];
      });
      
      // Mettre à jour la ligne
      sheet.getRange(i + 1, 1, 1, headers.length).setValues([updatedRow]);
      return true;
    }
  }
  
  return false; // Ligne non trouvée
}

// Supprimer une ligne par ID
function deleteRow(sheetName, idColumnName, idValue) {
  const sheet = getSheetByName(sheetName);
  
  // Vérifier si la feuille existe
  if (!sheet) {
    console.error(`La feuille "${sheetName}" n'existe pas.`);
    return false;
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  // Trouver l'index de la colonne d'identification
  const idColumnIndex = headers.indexOf(idColumnName);
  if (idColumnIndex === -1) return false;
  
  // Chercher la ligne correspondante
  for (let i = 1; i < data.length; i++) {
    if (data[i][idColumnIndex] == idValue) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
  
  return false; // Ligne non trouvée
}

// Fonction pour générer un ID unique
function generateUniqueId() {
  return Utilities.getUuid();
}
