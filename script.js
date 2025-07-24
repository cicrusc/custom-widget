// Sistema di traduzioni con bandiere
const languageFlags = {
  it: "🇮🇹",
  en: "🇬🇧", 
  es: "🇪🇸",
  fr: "🇫🇷",
  de: "🇩🇪",
  pt: "🇵🇹",
  ru: "🇷🇺",
  nl: "🇳🇱",
  ca: "🏴"
};

const languageNames = {
  it: "Italiano",
  en: "English",
  es: "Español", 
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
  ru: "Русский",
  nl: "Nederlands",
  ca: "Català"
};

const translations = {
  it: {
    checkinLabel: "Data di arrivo",
    checkoutLabel: "Data di partenza", 
    guestsLabel: "Numero di ospiti",
    buttonText: "Prenota ora",
    buttonLoading: "Caricamento...",
    errorPastDate: "La data non può essere nel passato",
    errorCheckoutBeforeCheckin: "La data di partenza deve essere dopo l'arrivo",
    errorInvalidGuests: "Inserisci un numero di ospiti valido",
    errorMissingDates: "Seleziona le date di arrivo e partenza"
  },
  en: {
    checkinLabel: "Check-in Date",
    checkoutLabel: "Check-out Date",
    guestsLabel: "Number of Guests", 
    buttonText: "Book Now",
    buttonLoading: "Loading...",
    errorPastDate: "Date cannot be in the past",
    errorCheckoutBeforeCheckin: "Check-out date must be after check-in",
    errorInvalidGuests: "Please enter a valid number of guests",
    errorMissingDates: "Please select check-in and check-out dates"
  },
  es: {
    checkinLabel: "Fecha de llegada",
    checkoutLabel: "Fecha de salida",
    guestsLabel: "Número de huéspedes",
    buttonText: "Reservar ahora", 
    buttonLoading: "Cargando...",
    errorPastDate: "La fecha no puede ser en el pasado",
    errorCheckoutBeforeCheckin: "La fecha de salida debe ser después de la llegada",
    errorInvalidGuests: "Introduce un número válido de huéspedes",
    errorMissingDates: "Selecciona las fechas de llegada y salida"
  },
  fr: {
    checkinLabel: "Date d'arrivée",
    checkoutLabel: "Date de départ",
    guestsLabel: "Nombre d'invités",
    buttonText: "Réserver maintenant",
    buttonLoading: "Chargement...",
    errorPastDate: "La date ne peut pas être dans le passé",
    errorCheckoutBeforeCheckin: "La date de départ doit être après l'arrivée",
    errorInvalidGuests: "Veuillez saisir un nombre d'invités valide",
    errorMissingDates: "Veuillez sélectionner les dates d'arrivée et de départ"
  },
  de: {
    checkinLabel: "Anreisedatum",
    checkoutLabel: "Abreisedatum", 
    guestsLabel: "Anzahl Gäste",
    buttonText: "Jetzt buchen",
    buttonLoading: "Laden...",
    errorPastDate: "Das Datum kann nicht in der Vergangenheit liegen",
    errorCheckoutBeforeCheckin: "Das Abreisedatum muss nach dem Anreisedatum liegen",
    errorInvalidGuests: "Bitte geben Sie eine gültige Anzahl von Gästen ein",
    errorMissingDates: "Bitte wählen Sie An- und Abreisedaten"
  },
  pt: {
    checkinLabel: "Data de Check-in",
    checkoutLabel: "Data de Check-out",
    guestsLabel: "Número de Hóspedes",
    buttonText: "Reserve Agora",
    buttonLoading: "Carregando...",
    errorPastDate: "A data não pode ser no passado",
    errorCheckoutBeforeCheckin: "A data de check-out deve ser depois do check-in",
    errorInvalidGuests: "Por favor, insira um número válido de hóspedes",
    errorMissingDates: "Por favor, selecione as datas de check-in e check-out"
  },
  ru: {
    checkinLabel: "Дата заезда",
    checkoutLabel: "Дата выезда",
    guestsLabel: "Количество гостей",
    buttonText: "Забронировать",
    buttonLoading: "Загрузка...",
    errorPastDate: "Дата не может быть в прошлом",
    errorCheckoutBeforeCheckin: "Дата выезда должна быть после даты заезда",
    errorInvalidGuests: "Пожалуйста, введите действительное количество гостей",
    errorMissingDates: "Пожалуйста, выберите даты заезда и выезда"
  },
  nl: {
    checkinLabel: "Check-in datum",
    checkoutLabel: "Check-out datum",
    guestsLabel: "Aantal gasten",
    buttonText: "Boek nu",
    buttonLoading: "Laden...",
    errorPastDate: "Datum kan niet in het verleden zijn",
    errorCheckoutBeforeCheckin: "Check-out datum moet na check-in datum zijn",
    errorInvalidGuests: "Voer een geldig aantal gasten in",
    errorMissingDates: "Selecteer aankomst- en vertrekdatum"
  },
  ca: {
    checkinLabel: "Data d'arribada",
    checkoutLabel: "Data de sortida",
    guestsLabel: "Nombre de convidats",
    buttonText: "Reserva ara",
    buttonLoading: "Carregant...",
    errorPastDate: "La data no pot ser en el passat",
    errorCheckoutBeforeCheckin: "La data de sortida ha de ser posterior a l'arribada",
    errorInvalidGuests: "Si us plau, introduïu un nombre vàlid de convidats",
    errorMissingDates: "Seleccioneu les dates d'arribada i sortida"
  }
};

// Funzioni utility
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function darkenColor(hex, percent) {
  const num = parseInt(hex.replace("#",""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// Funzione per auto-rilevare la lingua
function detectLanguage() {
  if (WIDGET_CONFIG.language !== "auto" && translations[WIDGET_CONFIG.language]) {
    return WIDGET_CONFIG.language;
  }
  
  const htmlLang = document.documentElement.lang;
  if (htmlLang) {
    const langCode = htmlLang.substring(0, 2).toLowerCase();
    if (translations[langCode]) return langCode;
  }
  
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang) {
    const langCode = browserLang.substring(0, 2).toLowerCase();
    if (translations[langCode]) return langCode;
  }
  
  if (navigator.languages) {
    for (let lang of navigator.languages) {
      const langCode = lang.substring(0, 2).toLowerCase();
      if (translations[langCode]) return langCode;
    }
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang') || urlParams.get('language');
  if (urlLang && translations[urlLang]) return urlLang;
  
  const pathLang = window.location.pathname.split('/')[1];
  if (pathLang && pathLang.length === 2 && translations[pathLang]) {
    return pathLang;
  }
  
  return WIDGET_CONFIG.fallbackLanguage;
}

// Applicazione configurazione CSS
function applyConfig() {
  const root = document.documentElement;
  const rgb = hexToRgb(WIDGET_CONFIG.primaryColor);
  
  root.style.setProperty('--widget-primary-color', WIDGET_CONFIG.primaryColor);
  root.style.setProperty('--widget-darker-primary-color', WIDGET_CONFIG.hoverColor || darkenColor(WIDGET_CONFIG.primaryColor, 5));
  root.style.setProperty('--widget-darkest-primary-color', WIDGET_CONFIG.activeColor || darkenColor(WIDGET_CONFIG.primaryColor, 10));
  root.style.setProperty('--widget-primary-color-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  root.style.setProperty('--widget-font-family', WIDGET_CONFIG.fontFamily);
  root.style.setProperty('--widget-background', WIDGET_CONFIG.backgroundColor);
  root.style.setProperty('--widget-input-background', WIDGET_CONFIG.inputBackground);
  root.style.setProperty('--widget-border-color', WIDGET_CONFIG.borderColor);
  root.style.setProperty('--widget-text-color', WIDGET_CONFIG.textColor);
  root.style.setProperty('--widget-border-radius', WIDGET_CONFIG.borderRadius);
  root.style.setProperty('--widget-shadow', WIDGET_CONFIG.boxShadow);
}

// Gestione selettore lingua
function initLanguageSelector(currentLang) {
  const dropdown = document.getElementById('languageDropdown');
  const button = document.getElementById('languageButton');
  const menu = document.getElementById('languageMenu');
  const currentFlag = document.getElementById('currentFlag');
  
  // Imposta bandiera corrente
  currentFlag.textContent = languageFlags[currentLang];
  
  // Evidenzia opzione corrente
  document.querySelectorAll('.language-option').forEach(option => {
    option.classList.remove('active');
    if (option.dataset.lang === currentLang) {
      option.classList.add('active');
    }
  });
  
  // Toggle dropdown
  button.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });
  
  // Selezione lingua
  document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', function() {
      const newLang = this.dataset.lang;
      if (newLang !== currentLang) {
        changeLanguage(newLang);
      }
      dropdown.classList.remove('open');
    });
  });
  
  // Chiudi dropdown cliccando fuori
  document.addEventListener('click', function() {
    dropdown.classList.remove('open');
  });
  
  // Previeni chiusura cliccando sul menu
  menu.addEventListener('click', function(e) {
    e.stopPropagation();
  });
}

// Cambia lingua del widget
function changeLanguage(newLang) {
  // Aggiorna traduzioni
  document.querySelector('label[for="checkin"]').textContent = translations[newLang].checkinLabel;
  document.querySelector('label[for="checkout"]').textContent = translations[newLang].checkoutLabel;
  document.querySelector('label[for="guests"]').textContent = translations[newLang].guestsLabel;
  document.getElementById('guestsText').textContent = translations[newLang].guestsLabel;
  document.getElementById('bookingBtn').textContent = translations[newLang].buttonText;
  
  // Aggiorna bandiera
  document.getElementById('currentFlag').textContent = languageFlags[newLang];
  
  // Aggiorna opzione attiva
  document.querySelectorAll('.language-option').forEach(option => {
    option.classList.remove('active');
    if (option.dataset.lang === newLang) {
      option.classList.add('active');
    }
  });
  
  // Aggiorna lingua calendario
  setCalendarLanguage(newLang);
  
  // Salva preferenza (opzionale)
  try {
    localStorage.setItem('widget-language', newLang);
  } catch (e) {
    // Ignore localStorage errors
  }
  
  // Aggiorna variabile globale
  window.currentWidgetLanguage = newLang;
}

// Gestione counter ospiti
function initGuestsCounter() {
  const display = document.getElementById('guestsDisplay');
  const hiddenInput = document.getElementById('guests');
  const decrementBtn = document.getElementById('guestsDecrement');
  const incrementBtn = document.getElementById('guestsIncrement');
  
  let guestCount = WIDGET_CONFIG.defaultGuests;
  
  function updateDisplay() {
    display.textContent = guestCount;
    hiddenInput.value = guestCount;
    
    // Disabilita pulsante - se necessario
    decrementBtn.disabled = guestCount <= 1;
    
    // Nascondi errori quando si cambia valore
    hideError('guests');
  }
  
  decrementBtn.addEventListener('click', function() {
    if (guestCount > 1) {
      guestCount--;
      updateDisplay();
    }
  });
  
  incrementBtn.addEventListener('click', function() {
    if (guestCount < 20) { // Limite massimo ragionevole
      guestCount++;
      updateDisplay();
    }
  });
  
  // Inizializza display
  updateDisplay();
}

function handleMobileLayout() {
  const widget = document.getElementById('bookingWidget');
  
  if (WIDGET_CONFIG.fullScreenOnMobile && window.innerWidth <= WIDGET_CONFIG.mobileBreakpoint) {
    widget.classList.add('mobile-fullscreen');
  } else {
    widget.classList.remove('mobile-fullscreen');
  }
}

// Imposta lingua del calendario nativo
function setCalendarLanguage(lang) {
  // Imposta la lingua per l'HTML
  document.documentElement.lang = lang;
  
  // Per i browser che supportano questa funzionalità
  if (document.documentElement.setAttribute) {
    document.documentElement.setAttribute('lang', lang);
  }
}

// Validazione
function showError(fieldId, message) {
  const errorElement = document.getElementById(fieldId + 'Error');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
}

function hideError(fieldId) {
  const errorElement = document.getElementById(fieldId + 'Error');
  if (errorElement) {
    errorElement.style.display = 'none';
  }
}

function validateForm(lang) {
  let isValid = true;
  const today = new Date().toISOString().split('T')[0];
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const guests = parseInt(document.getElementById('guests').value);
  
  // Reset errori
  hideError('checkin');
  hideError('checkout');
  hideError('guests');
  
  // Validazione date
  if (!checkin || !checkout) {
    showError('checkin', translations[lang].errorMissingDates);
    isValid = false;
  } else {
    if (checkin < today) {
      showError('checkin', translations[lang].errorPastDate);
      isValid = false;
    }
    
    if (checkout <= checkin) {
      showError('checkout', translations[lang].errorCheckoutBeforeCheckin);
      isValid = false;
    }
  }
  
  // Validazione ospiti
  if (!guests || guests < 1) {
    showError('guests', translations[lang].errorInvalidGuests);
    isValid = false;
  }
  
  return isValid;
}

// Impostazione date minime
function setMinDates() {
  const today = new Date().toISOString().split('T')[0];
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');
  
  checkinInput.min = today;
  
  checkinInput.addEventListener('change', function() {
    const checkinDate = new Date(this.value);
    checkinDate.setDate(checkinDate.getDate() + 1);
    checkoutInput.min = checkinDate.toISOString().split('T')[0];
    
    // Reset checkout se precedente a nuovo checkin
    if (checkoutInput.value && checkoutInput.value <= this.value) {
      checkoutInput.value = '';
    }
  });
}

// Generazione URL secondo la struttura corretta per BookOnline.pro
function generateBookingUrl(checkin, checkout, guests, lang) {
  return `https://bookonline.pro/${lang}/properties/${WIDGET_CONFIG.propertyId}?guests=${guests}&startDate=${checkin}&endDate=${checkout}`;
}

// Redirect a bookonline.pro
function redirectToBooking(checkin, checkout, guests, lang) {
  const url = generateBookingUrl(checkin, checkout, guests, lang);
  
  if (WIDGET_CONFIG.openInNewTab) {
    window.open(url, '_blank');
  } else {
    window.location.href = url;
  }
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', function() {
  // Prova a recuperare lingua salvata
  let savedLang = null;
  try {
    savedLang = localStorage.getItem('widget-language');
  } catch (e) {
    // Ignore localStorage errors
  }
  
  const currentLang = (savedLang && translations[savedLang]) ? savedLang : detectLanguage();
  window.currentWidgetLanguage = currentLang;
  
  // Applica configurazione
  applyConfig();
  handleMobileLayout();
  setMinDates();
  setCalendarLanguage(currentLang);
  
  // Inizializza componenti
  initLanguageSelector(currentLang);
  initGuestsCounter();
  
  // Applica traduzioni iniziali
  changeLanguage(currentLang);
  
  // Gestione resize per mobile
  window.addEventListener('resize', handleMobileLayout);
  
  // Event listeners per gestione calendario
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');
  
  // Variabili per gestire stati
  let isCalendarOpening = false;
  let lastTouchTime = 0;
  
  // Funzione per gestire click sui campi data
  function handleDateInputClick(input, e) {
    const now = Date.now();
    
    // Previeni doppi click/touch rapidi
    if (now - lastTouchTime < 300) {
      e.preventDefault();
      return;
    }
    lastTouchTime = now;
    
    // Se il calendario sta già aprendo, non fare nulla
    if (isCalendarOpening) {
      return;
    }
    
    isCalendarOpening = true;
    
    // Focus sull'input
    input.focus();
    
    // Apri calendario dopo breve delay
    setTimeout(() => {
      try {
        if (input.showPicker && typeof input.showPicker === 'function') {
          input.showPicker();
        }
      } catch (error) {
        // Fallback silenzioso se showPicker non funziona
        console.debug('showPicker not available, using native behavior');
      }
      
      // Reset flag dopo delay
      setTimeout(() => {
        isCalendarOpening = false;
      }, 500);
    }, 50);
  }
  
  // Event listeners per click
  checkinInput.addEventListener('click', function(e) {
    handleDateInputClick(this, e);
  });
  
  checkoutInput.addEventListener('click', function(e) {
    handleDateInputClick(this, e);
  });
  
  // Event listeners per touch (solo mobile)
  if ('ontouchstart' in window) {
    checkinInput.addEventListener('touchend', function(e) {
      e.preventDefault();
      handleDateInputClick(this, e);
    });
    
    checkoutInput.addEventListener('touchend', function(e) {
      e.preventDefault();
      handleDateInputClick(this, e);
    });
  }
  
  // Event listeners per gestire cambio valori
  checkinInput.addEventListener('input', function() {
    hideError('checkin');
  });
  
  checkoutInput.addEventListener('input', function() {
    hideError('checkout');
  });
  
  // Event listener bottone prenotazione
  document.getElementById('bookingBtn').addEventListener('click', function() {
    const currentLang = window.currentWidgetLanguage;
    if (validateForm(currentLang)) {
      const checkin = document.getElementById('checkin').value;
      const checkout = document.getElementById('checkout').value;
      const guests = parseInt(document.getElementById('guests').value);
      
      // Mostra loading
      const button = this;
      const originalText = button.textContent;
      button.textContent = translations[currentLang].buttonLoading;
      button.classList.add('loading');
      
      // Simula breve delay per UX
      setTimeout(() => {
        redirectToBooking(checkin, checkout, guests, currentLang);
        
        // Reset button dopo redirect
        setTimeout(() => {
          button.textContent = originalText;
          button.classList.remove('loading');
        }, 1000);
      }, 300);
    }
  });
  
  // Clear errori quando l'utente modifica i campi (guests gestito nel counter)
});