// Wallet Addresses Configuration
const WALLET_ADDRESSES = {
    sheba: 'IR300560082480001011908001',
    card: '6219861038866918',
    btc: 'bc1qwrek0v3kvrpfnc2pcclxappkxkznprta79k9f5',
    eth: '0x19d114f44fa79777d9a27c2521ba49d5ebae0497',
    usdt: '0x19d114f44fa79777d9a27c2521ba49d5ebae0497',
    sol: '9bzttgcTup5UZC4rad3Hzq6SF4Y7P3a7i4ZJ9zTJe1r'
};

const QR_CODE_PATHS = {
    btc: 'assets/img/qr/btc.png',
    eth: 'assets/img/qr/eth.png',
    usdt: 'assets/img/qr/usdt.png',
    sol: 'assets/img/qr/sol.png'
};

function getWalletAddress(crypto) {
    return WALLET_ADDRESSES[crypto] || '';
}

function updateWalletAddresses() {
    const addressElements = document.querySelectorAll('[data-crypto], [data-wallet]');
    addressElements.forEach(el => {
        const walletType = el.getAttribute('data-crypto') || el.getAttribute('data-wallet');
        if (WALLET_ADDRESSES[walletType]) {
            el.textContent = WALLET_ADDRESSES[walletType];
        }
    });

    // Load QR code images immediately
    const qrImages = document.querySelectorAll('[data-qr]');
    const placeholderQR = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect fill=\'%23f8fafc\' width=\'100\' height=\'100\'/%3E%3Ctext x=\'50\' y=\'55\' text-anchor=\'middle\' font-size=\'10\' fill=\'%2394a3b8\'%3EQR Code%3C/text%3E%3C/svg%3E';

    qrImages.forEach(img => {
        const cryptoType = img.getAttribute('data-qr');
        if (QR_CODE_PATHS[cryptoType]) {
            img.src = QR_CODE_PATHS[cryptoType];
            img.onerror = function() {
                this.src = placeholderQR;
            };
        } else {
            img.src = placeholderQR;
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateWalletAddresses);
} else {
    updateWalletAddresses();
}

function copyToClipboard(elementId, button) {
    const text = document.getElementById(elementId).innerText;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
            showCopied(button);
        }).catch(function() {
            fallbackCopy(text, button);
        });
    } else {
        fallbackCopy(text, button);
    }
}

function fallbackCopy(text, button) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        showCopied(button);
    } catch (err) {
        const currentLang = getCachedLanguage() || 'fa';
        const errorMessages = {
            'fa': 'کپی نشد. لطفاً دستی کپی کنید.',
            'en': 'Copy failed. Please copy manually.'
        };
        const errorMsg = errorMessages[currentLang] || errorMessages['en'];
        alert(errorMsg);
    }

    document.body.removeChild(textarea);
}

function showCopied(button) {
    const originalHTML = button.innerHTML;
    const copiedText = typeof getCopyMessage === 'function' ? getCopyMessage() : 'Copied!';

    button.innerHTML = '<span class="icon">✓</span> ' + copiedText;
    button.classList.add('copied');

    setTimeout(function() {
        button.innerHTML = originalHTML;
        button.classList.remove('copied');
    }, 2000);
}

const languageConfig = {
    'fa': { lang: 'fa', dir: 'rtl', title: 'حمایت مالی' },
    'en': { lang: 'en', dir: 'ltr', title: 'Donate' }
};

const copyMessages = {
    'fa': 'کپی شد!',
    'en': 'Copied!'
};

// Cache for frequently used selectors and values
const cache = {
    langContent: null,
    langSwitcher: null,
    languageTitle: null,
    languageSubtitle: null,
    selectedLanguage: null
};

// Cache localStorage value
function getCachedLanguage() {
    if (cache.selectedLanguage === null) {
        cache.selectedLanguage = localStorage.getItem('selectedLanguage');
    }
    return cache.selectedLanguage;
}

function setCachedLanguage(lang) {
    cache.selectedLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
}

// Helper function to safely update display styles after CSS is loaded
function safeDisplayUpdate(callback) {
    if (document.readyState === 'complete') {
        requestAnimationFrame(callback);
    } else {
        window.addEventListener('load', function() {
            requestAnimationFrame(callback);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    safeDisplayUpdate(function() {
        initializeLanguage();
    });
});

function initializeLanguage() {
    const savedLang = getCachedLanguage();

    if (savedLang && languageConfig[savedLang]) {
        setLanguage(savedLang);
    } else {
        // Show language selector first, then set default language
        // This ensures both languages are always visible in the selector
        showLanguageSelector();
        const browserLang = navigator.language || navigator.userLanguage;
        const defaultLang = browserLang.startsWith('fa') ? 'fa' : 'en';
        setLanguage(defaultLang);
    }
}

function showLanguageSelector() {
    requestAnimationFrame(function() {
        const selector = document.getElementById('language-selector');
        const mainContent = document.getElementById('main-content');

        if (selector && mainContent) {
            selector.style.display = 'flex';
            mainContent.style.display = 'none';

            const languageTitleSpans = document.querySelectorAll('.language-title [data-lang]');
            languageTitleSpans.forEach(function(span) {
                span.style.display = 'inline';
            });

            const languageSubtitleSpans = document.querySelectorAll('.language-subtitle [data-lang]');
            languageSubtitleSpans.forEach(function(span) {
                span.style.display = 'block';
            });
        }
    });
}

function selectLanguage(lang) {
    if (!languageConfig[lang]) {
        console.error('Unknown language:', lang);
        return;
    }

    setCachedLanguage(lang);
    setLanguage(lang);

    requestAnimationFrame(function() {
        const selector = document.getElementById('language-selector');
        const mainContent = document.getElementById('main-content');

        if (selector && mainContent) {
            selector.style.display = 'none';
            mainContent.style.display = 'block';
        }
    });
}

function setLanguage(lang) {
    if (!languageConfig[lang]) {
        console.error('Unknown language:', lang);
        return;
    }

    const config = languageConfig[lang];
    const html = document.documentElement;
    html.setAttribute('lang', config.lang);
    html.setAttribute('dir', config.dir);
    document.title = config.title;

    // Use requestAnimationFrame to avoid layout shifts before CSS is loaded
    requestAnimationFrame(function() {
        // Cache and reuse selectors
        if (!cache.langContent) {
            cache.langContent = document.querySelectorAll('.lang-content');
        }
        cache.langContent.forEach(function(content) {
            if (content.getAttribute('data-lang') === lang) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });

        if (!cache.langSwitcher) {
            cache.langSwitcher = document.querySelector('.lang-switcher');
        }
        if (cache.langSwitcher) {
            const spans = cache.langSwitcher.querySelectorAll('[data-lang]');
            spans.forEach(function(span) {
                if (span.getAttribute('data-lang') === lang) {
                    span.style.display = 'inline';
                } else {
                    span.style.display = 'none';
                }
            });
        }

        const selector = document.getElementById('language-selector');
        if (selector && selector.style.display === 'flex') {
            if (!cache.languageTitle) {
                cache.languageTitle = document.querySelectorAll('.language-title [data-lang]');
            }
            cache.languageTitle.forEach(function(span) {
                span.style.display = 'inline';
            });

            if (!cache.languageSubtitle) {
                cache.languageSubtitle = document.querySelectorAll('.language-subtitle [data-lang]');
            }
            cache.languageSubtitle.forEach(function(span) {
                span.style.display = 'block';
            });
        } else {
            if (!cache.languageTitle) {
                cache.languageTitle = document.querySelectorAll('.language-title [data-lang]');
            }
            cache.languageTitle.forEach(function(span) {
                if (span.getAttribute('data-lang') === lang) {
                    span.style.display = 'inline';
                } else {
                    span.style.display = 'none';
                }
            });

            if (!cache.languageSubtitle) {
                cache.languageSubtitle = document.querySelectorAll('.language-subtitle [data-lang]');
            }
            cache.languageSubtitle.forEach(function(span) {
                if (span.getAttribute('data-lang') === lang) {
                    span.style.display = 'block';
                } else {
                    span.style.display = 'none';
                }
            });
        }
    });
}

function getCopyMessage() {
    const currentLang = getCachedLanguage() || 'fa';
    return copyMessages[currentLang] || copyMessages['en'];
}
