// Wallet Addresses Configuration
// Edit these addresses with your real wallet addresses

const WALLET_ADDRESSES = {
    // Bank Accounts
    sheba: 'IR300560082480001011908001',
    card: '6219861038866918',

    // Crypto Wallets
    btc: 'bc1qwrek0v3kvrpfnc2pcclxappkxkznprta79k9f5',
    eth: '0x19d114f44fa79777d9a27c2521ba49d5ebae0497',
    usdt: '0x19d114f44fa79777d9a27c2521ba49d5ebae0497',
    sol: '9bzttgcTup5UZC4rad3Hzq6SF4Y7P3a7i4ZJ9zTJe1r'
};

// QR Code Image Paths
// Edit these paths with your QR code image file paths
const QR_CODE_PATHS = {
    btc: 'assets/img/qr/btc.png',
    eth: 'assets/img/qr/eth.png',
    usdt: 'assets/img/qr/usdt.png',
    sol: 'assets/img/qr/sol.png'
};

// Function to get wallet address
function getWalletAddress(crypto) {
    return WALLET_ADDRESSES[crypto] || '';
}

// Update all wallet addresses in the page
function updateWalletAddresses() {
    // Find all elements with data-crypto or data-wallet attribute
    const addressElements = document.querySelectorAll('[data-crypto], [data-wallet]');

    addressElements.forEach(el => {
        const walletType = el.getAttribute('data-crypto') || el.getAttribute('data-wallet');
        if (WALLET_ADDRESSES[walletType]) {
            el.textContent = WALLET_ADDRESSES[walletType];
        }
    });

    // Update QR code images
    const qrImages = document.querySelectorAll('[data-qr]');
    const placeholderQR = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect fill=\'%23f8fafc\' width=\'100\' height=\'100\'/%3E%3Ctext x=\'50\' y=\'55\' text-anchor=\'middle\' font-size=\'10\' fill=\'%2394a3b8\'%3EQR Code%3C/text%3E%3C/svg%3E';

    qrImages.forEach(img => {
        const cryptoType = img.getAttribute('data-qr');
        if (QR_CODE_PATHS[cryptoType]) {
            img.src = QR_CODE_PATHS[cryptoType];
            // Fallback if image fails to load
            img.onerror = function() {
                this.src = placeholderQR;
            };
        } else {
            img.src = placeholderQR;
        }
    });
}

// Run when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateWalletAddresses);
} else {
    updateWalletAddresses();
}
