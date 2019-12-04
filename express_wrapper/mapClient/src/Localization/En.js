let catStrings = {
  default: 'Choose a Category',
  mentalHealth: 'Counselling & Mental Health',
  medCare: 'Medical Care',
  peerSupp: 'Peer Support',
  relax: 'Relaxation & Recreation',
  wellness: 'Wellness Resources',
  helperText: 'Select a Primary Category that corresponds with a subcategory below.'
}

let subCatStrings = {
  default: 'Choose a Subcategory',
  academic: 'Academic',
  career: 'Career',
  clinic: 'Clinic',
  clsc: 'CLSC',
  counsellor: 'Counsellor',
  cultural: 'Cultural',
  dentistry: 'Dentistry',
  emotional: 'Emotional',
  financial: 'Financial',
  hospital: 'Hospital',
  pharmacy: 'Pharmacy',
  physical: 'Physical',
  physiotherapy: 'Physiotherapy',
  psychologist: 'Psychologist',
  spiritual: 'Spiritual',
  social: 'Social',
  superClinic: 'Super-Clinic',
  helperText: 'Select a subcategory / service type'
}

let keywordStrings = {
  suggest: 'i.e. blood test',
  abortion: 'Abortion services',
  acupuncture: 'Acupuncture',
  bloodTest: 'Blood test',
  counselling: 'Counselling', //Not working...
  contraception: 'Contraception',
  consult: 'Consultation',
  cardiology: 'Cardiology',
  dental: 'Dentistry',
  diabetes: 'Diabetes testing',
  diagnostic: 'Diagnostic services',
  ecg: 'ECG',
  emg: 'EMG',
  family: 'Family medicine',
  lab: 'Laboratory',
  masso: 'Massotherapy',
  nurse: 'Nurse consultation',
  physio: 'Physiotherapy',
  physician: 'Physician',
  psychologist: 'Psychologist',
  pharmacy: 'Pharmacy',
  streptest: 'Streptest',
  travel: 'Travel health consultation',
  urine: 'Urine test',
  vacc: 'Vaccination',
}

let insStrings = {
  default: 'Select your Insurance coverage',
  intl: 'International Health Insurance',
  mcss: 'MCSS',
  oop: 'Out of Province',
  pgss: 'PGSS',
  ramq: 'RAMQ',
  ssmu: 'SSMU',
  helperText: 'We are currently updating this data. Coming soon!'
}

let langStrings = {
  default: 'Select a Language',
  en: 'English',
  fr: 'French',
  ch: 'Mandarin',
  sp: 'Spanish',
  helperText: 'We are currently updating this data. Coming soon!'
}

let sidebarStrings = {
  lfStitle: 'Health & Wellness Resource Map',
  insHead: 'Insurance',
  langHead: 'Language',
  submit: 'Search',
  rtStitle: 'Results',
  rtSbutton: 'new Search Query',
  rossyCred: 'The Wellness Resource Map was made possible thanks to a generous gift by the Rossy Foundation.',
  formSuggest: 'Suggest a Resource - ',
  formFeedback: 'Feedback '
}

let cardStrings = {
  unknown: 'No opening hours',
  closed: 'Closed',
  open: 'Open Now',
  sun: 'Sunday',
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  link: 'Link to their website',
  notes: 'Notes'
}

let tabStrings = {
  cat: 'By Category', key: 'By Keyword'
}

let openStrings = {
  open: 'Open Now'
}

let mapboxStrings = {
  dir: 'Get directions'
}

let serviceSuggestionStrings = {
  haveSuggestion: 'Have a suggestion?',
  editSuggestion: 'Edit your suggestion',
  serviceName: 'Service Name',
  primCategory: 'Primary Category',
  subcat: 'Subcategory',
  insurance: 'Insurance',
  lang: 'Langs spoken',
  address: 'Address',
  lat: 'Latitude',
  lon: 'Longitude',
  transit: 'Transit',
  website: 'Website',
  phoneNumber : 'Phone Number',
  emergencyNumber: 'Emergency Number',
  dropIn: 'Drop In',
  service: 'Enter the services:',
  service_fr: 'Enter the services(FR):',
  note: 'Notes',
  note_fr: 'Notes(FR)',
  enterBusinessHour: 'Enter the Business Hours:',
  sunTime: 'Sun',
  monTime: 'Mon',
  tueTime: 'Tue',
  wedTime: 'Wed',
  thuTime: 'Thu',
  friTime: 'Fri',
  satTime: 'Sat',
  cancel: 'CANCEL',
  submit: 'SUBMIT',
  suggestSuccessful : "Suggest Service successfully",
  requireName: "Please fill out the service name",
  requireAddress : "Please fill out the address",
  hourFormat: "Business hours must follow the format HH:mm-HH:mm"
}

let reportErrorStrings = {
  reportError:'Report an error',
  email: 'Your email',
  content: 'Content',
  cancel: 'CANCEL',
  submit: 'SUBMIT',
  reportSuccessful: "Report Successfully",
  requireEmail:"Email cannot be blank",
  requireContent: "Content cannot be blank"
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
