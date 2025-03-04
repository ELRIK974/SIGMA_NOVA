/**
 * SIGMA - Fonctions utilitaires
 * Ce fichier contient des fonctions d'aide et d'utilitaires généraux
 */

// Fonction pour formater une date
function formatDate(date) {
  if (!date) return '';
  
  // Si c'est déjà une chaîne au format "JJ/MM/AAAA", on la retourne directement
  if (typeof date === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    return date;
  }
  
  // Sinon on convertit en objet Date et on formate
  const d = new Date(date);
  return `${padZero(d.getDate())}/${padZero(d.getMonth() + 1)}/${d.getFullYear()}`;
}

// Ajouter un zéro devant les nombres < 10
function padZero(num) {
  return num < 10 ? `0${num}` : num;
}

// Fonction pour envoyer un email d'alerte
function sendEmailAlert(recipient, subject, body) {
  try {
    GmailApp.sendEmail(recipient, subject, body);
    return true;
  } catch (e) {
    console.error('Erreur lors de l\'envoi d\'email:', e);
    return false;
  }
}

// Comparaison de dates (utile pour vérifier les retards)
function isDatePassed(dateStr) {
  if (!dateStr) return false;
  
  // Convertir la date au format JJ/MM/AAAA en objet Date
  const parts = dateStr.split('/');
  const date = new Date(parts[2], parts[1] - 1, parts[0]);
  
  return date < new Date();
}

// Obtenir la date du jour au format JJ/MM/AAAA
function getTodayFormatted() {
  return formatDate(new Date());
}
