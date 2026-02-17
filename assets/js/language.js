/**
 * Language management system
 */

// Language configuration
const languageConfig = {
    'fa': { lang: 'fa', dir: 'rtl', title: 'حمایت مالی' },
    'en': { lang: 'en', dir: 'ltr', title: 'Donate' }
};

// Copy messages for each language
const copyMessages = {
    'fa': 'کپی شد!',
    'en': 'Copied!'
};

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
});

/**
 * Initialize language based on saved preference or browser language
 */
function initializeLanguage() {
    const savedLang = localStorage.getItem('selectedLanguage');

    if (savedLang && languageConfig[savedLang]) {
        // Language already selected, show main content
        setLanguage(savedLang);
    } else {
        // First visit, show language selector
        showLanguageSelector();
    }
}

/**
 * Show language selector screen
 */
function showLanguageSelector() {
    const selector = document.getElementById('language-selector');
    const mainContent = document.getElementById('main-content');

    if (selector && mainContent) {
        selector.style.display = 'flex';
        mainContent.style.display = 'none';
    }
}

/**
 * Select language and hide selector
 * @param {string} lang - Language code
 */
function selectLanguage(lang) {
    if (!languageConfig[lang]) {
        console.error('Unknown language:', lang);
        return;
    }

    localStorage.setItem('selectedLanguage', lang);
    setLanguage(lang);

    // Hide selector and show main content
    const selector = document.getElementById('language-selector');
    const mainContent = document.getElementById('main-content');

    if (selector && mainContent) {
        selector.style.display = 'none';
        mainContent.style.display = 'block';
    }
}

/**
 * Set language and update page content
 * @param {string} lang - Language code
 */
function setLanguage(lang) {
    if (!languageConfig[lang]) {
        console.error('Unknown language:', lang);
        return;
    }

    const config = languageConfig[lang];

    // Update HTML attributes
    const html = document.documentElement;
    html.setAttribute('lang', config.lang);
    html.setAttribute('dir', config.dir);

    // Update page title
    document.title = config.title;

    // Show/hide language-specific content
    const allContent = document.querySelectorAll('.lang-content');
    allContent.forEach(function(content) {
        if (content.getAttribute('data-lang') === lang) {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    });

    // Update language switcher button text
    const langSwitcher = document.querySelector('.lang-switcher');
    if (langSwitcher) {
        const spans = langSwitcher.querySelectorAll('[data-lang]');
        spans.forEach(function(span) {
            if (span.getAttribute('data-lang') === lang) {
                span.style.display = 'inline';
            } else {
                span.style.display = 'none';
            }
        });
    }
}

/**
 * Get copy message for current language
 * @returns {string} Copy message
 */
function getCopyMessage() {
    const currentLang = localStorage.getItem('selectedLanguage') || 'fa';
    return copyMessages[currentLang] || copyMessages['en'];
}
