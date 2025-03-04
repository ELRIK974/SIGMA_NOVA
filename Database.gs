/**
 * SIGMA - Fonctions d'accès à la base de données
 * Ce fichier contient toutes les fonctions pour lire et écrire dans les feuilles Google Sheets
 */

// Obtenir l'ID du classeur (spreadsheet) actif
function getSpreadsheetId() {
  return SpreadsheetApp.getActiveSpreadsheet().getId();
}

// Obtenir une feuille par son nom
function getSheetByName(sheetName) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
}

// Obtenir toutes les données d'une feuille (avec en-têtes)
function getAllData(sheetName) {
  const sheet = getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  
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
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  // Trouver l'index de la colonne d'identification
  const idColumnIndex = headers.indexOf(idColumnName);
  if (idColumnIndex === -1) return null;
  
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
