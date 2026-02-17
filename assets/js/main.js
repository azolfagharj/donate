/**
 * Copy text to clipboard
 * @param {string} elementId - ID of element containing text to copy
 * @param {HTMLElement} button - Button element that was clicked
 */
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

/**
 * Fallback copy method for older browsers
 * @param {string} text - Text to copy
 * @param {HTMLElement} button - Button element
 */
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
        const currentLang = localStorage.getItem('selectedLanguage') || 'fa';
        const errorMessages = {
            'fa': 'کپی نشد. لطفاً دستی کپی کنید.',
            'en': 'Copy failed. Please copy manually.'
        };
        const errorMsg = errorMessages[currentLang] || errorMessages['en'];
        alert(errorMsg);
    }

    document.body.removeChild(textarea);
}

/**
 * Show copied feedback on button
 * @param {HTMLElement} button - Button element
 */
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
