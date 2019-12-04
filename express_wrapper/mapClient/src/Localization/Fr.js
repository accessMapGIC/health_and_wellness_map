let catStrings = {
    default: 'Choissisez une Catégorie',
    mentalHealth: 'Santé Mentale & Conseils',
    medCare: 'Soins Médicale',
    peerSupp: 'Soutiens de Pairs',
    relax: 'Détente et Loisirs',
    wellness: 'Ressources de Bien-Être',
    helperText: 'Choisissez une Catégorie Primaire qui correspond avec une sous catégorie ci-dessous.'
}

let subCatStrings = {
    default: 'Choisissez une Sous Catégorie',
    academic: 'Académique',
    career: 'Carrière',
    clinic: 'Clinique',
    clsc: 'CLSC',
    counsellor: 'Conseiller',
    cultural: 'Culturel',
    dentistry: 'Dentisterie',
    emotional: 'Émotionnel',
    financial: 'Financier',
    hospital: 'Hôpitale',
    pharmacy: 'Pharmacie',
    physical: 'Physique',
    physiotherapy: 'Physiothérapy',
    psychologist: 'Psychologue',
    spiritual: 'Spirituel',
    social: 'Social',
    superClinic: 'Super-Clinique',
    helperText: 'Choisissez une sous catégorie / type de service'
}

let keywordStrings = {
  suggest: 'ex. Prise de sang',
  abortion: "Services d'avortement",
  acupuncture: 'Acupuncture',
  bloodTest: 'Prise de sang',
  counselling: 'Conseil', //Not working...
  contraception: 'la Contraception',
  consult: 'Consultation',
  cardiology: 'Cardiologie',
  dental: 'Dentisterie',
  diabetes: 'Test de diabète',
  diagnostic: 'Services diagnostic',
  ecg: 'ECG',
  emg: 'EMG',
  family: 'Médecine familiale',
  lab: 'Laboratoire',
  masso: 'Massothérapie',
  nurse: 'Consultation infirmière',
  physio: 'Physiothérapie',
  physician: 'Médecin',
  psychologist: 'Psychologist',
  pharmacy: 'Pharmacie',
  streptest: 'Test de streptocoques',
  travel: 'Consultation de santé de voyage',
  urine: "Test d'urine",
  vacc: 'Vaccination',
}

let insStrings = {
    default: "Choisissez votre couverture d'assurance",
    intl: 'Assurance Maladie Internationale',
    mcss: 'MCSS',
    oop: 'Hors de Province',
    pgss: 'PGSS',
    ramq: 'RAMQ',
    ssmu: 'SSMU',
    helperText: "Nous mettons actuellement à jours ces donées. À venir bientôt!"
}

let langStrings = {
  default: 'Choissisez une Langue',
  en: 'Anglais',
  fr: 'Français',
  ch: 'Chinois',
  sp: 'Espanol',
  helperText: "Nous mettons actuellement à jours ces donées. À venir bientôt!"
}

let sidebarStrings = {
lfStitle: 'Carte des Resources de Santé et Bien-Être',
insHead: 'Assurance',
langHead: 'Langue',
submit: 'Recherche',
rtStitle: 'Résultas',
rtSbutton: 'Nouvelle Recherche',
rossyCred: 'La Carte des Resources de Bien Être a été rendu possible grâce à un don génereux de la Fondation Rossy.',
formSuggest: 'Proposer une Ressource - ',
formFeedback: 'Commentaires '
}

let cardStrings = {
unknown: "Pas d'heurs d'ouverture",
closed: 'Fermé',
open: 'Ouverte',
sun: 'Dimance',
mon: 'Lundi',
tue: 'Mardi',
wed: 'Mercredi',
thu: 'Jeudi',
fri: 'Vendredi',
sat: 'Samedi',
link: 'Lien pour leur site web',
notes: 'Notes'
}

let tabStrings = {
cat: 'Catégorie', key: 'Mot Clé'
}

let openStrings = {
open: 'Ouvert'
}

let mapboxStrings = {
dir: 'Obtenir des directions'
}

let serviceSuggestionStrings = {
  haveSuggestion: 'Avez une suggestion?',
  editSuggestion: 'Modifier votre suggestion',
  serviceName: 'Nom du service',
  primCategory: 'Catégorie primaire',
  subcat: 'Sous catégorie',
  insurance: 'Assurance',
  lang: 'Langs parlé',
  address: 'Adresse',
  lat: 'Latitude',
  lon: 'Longitude',
  transit: 'Transit',
  website: 'Website',
  phoneNumber : 'Numéro de téléphone',
  emergencyNumber: "Numéro d/'urgence",
  dropIn: 'Drop In',
  service: 'Entrez les services:',
  service_fr: 'Entrez les services(FR):',
  note: 'Remarques',
  note_fr: 'Remarques(FR)',
  enterBusinessHour: "Entrez les heures d'ouverture:",
  sunTime: 'Dimanche',
  monTime: 'Lundi',
  tueTime: 'Mardi',
  wedTime: 'Mercredi',
  thuTime: 'Jeudi',
  friTime: 'Vendredi',
  satTime: 'Samedi',
  cancel: 'ANNULER',
  submit: 'SOUMETTRE',
  suggestSuccessful : "Suggérez le service avec succès",
  requireName: "Remplissez le nom du service",
  requireAddress : "Remplissez l'adresse",
  hourFormat: "Les heures d'ouverture doivent respecter le format HH: mm-HH: mm"
}

let reportErrorStrings = {
  reportError:'Signaler une erreur',
  email: 'Votre courriel',
  content: 'Contenu',
  cancel: 'ANNULER',
  submit: 'SOUMETTRE',
  reportSuccessful: "Signaler avec succès",
  requireEmail: "Le courriel ne peut pas être vide",
  requireContent: "Le contenu ne peut pas être vide"
}

export default {
    catStrings,
    subCatStrings,
    insStrings,
    langStrings,
    sidebarStrings,
    cardStrings,
    tabStrings,
    openStrings,
    mapboxStrings,
    keywordStrings,
    serviceSuggestionStrings,
    reportErrorStrings
};
