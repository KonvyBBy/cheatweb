// Status Page JavaScript
const STORAGE_KEY = 'astral_products';

// Load and display status
document.addEventListener('DOMContentLoaded', () => {
    loadStatus();
    updateTimestamp();
    
    // Auto-refresh every 30 seconds
    setInterval(() => {
        loadStatus();
        updateTimestamp();
    }, 30000);
});

// Get status descriptions
function getStatusDescription(status) {
    const descriptions = {
        working: 'All features are working perfectly. Safe to use.',
        caution: 'Product is functional but may have minor issues. Use at your own risk.',
        updating: 'Currently being updated with new features or fixes. May be temporarily unavailable.',
        offline: 'Product is currently offline for maintenance or updates.'
    };
    return descriptions[status] || 'Status unknown';
}

// Get status icon
function getStatusIcon(status) {
    const icons = {
        working: '✓',
        caution: '⚠',
        updating: '🔄',
        offline: '✗'
    };
    return icons[status] || '?';
}

// Get status text
function getStatusText(status) {
    const texts = {
        working: 'Operational',
        caution: 'Limited - Use at Own Risk',
        updating: 'Under Maintenance',
        offline: 'Offline'
    };
    return texts[status] || 'Unknown';
}

// Load status from localStorage
function loadStatus() {
    const products = getProducts();
    const container = document.getElementById('status-grid');
    
    if (products.length === 0) {
        container.innerHTML = `
            <div class="status-card">
                <div class="status-content">
                    <p style="text-align: center; color: var(--text-muted);">No products available. Check back soon!</p>
                </div>
            </div>
        `;
        return;
    }
    
    // Generate status cards
    container.innerHTML = products.map((product, index) => `
        <div class="status-card fade-in-up" data-delay="${index}">
            <div class="status-indicator-large status-${product.status}">
                ${getStatusIcon(product.status)}
            </div>
            <div class="status-content">
                <h3>${product.name}</h3>
                <span class="status-label status-${product.status}">${getStatusText(product.status)}</span>
                <p class="status-description">${getStatusDescription(product.status)}</p>
            </div>
        </div>
    `).join('');
    
    // Update overall status
    updateOverallStatus(products);
    
    // Trigger fade-in animations
    setTimeout(() => {
        document.querySelectorAll('.fade-in-up').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100);
        });
    }, 100);
}

// Update overall status
function updateOverallStatus(products) {
    const statusElement = document.getElementById('overall-status-text');
    
    // Count statuses
    const statusCounts = products.reduce((acc, product) => {
        acc[product.status] = (acc[product.status] || 0) + 1;
        return acc;
    }, {});
    
    // Determine overall status
    if (statusCounts.offline > 0) {
        statusElement.className = 'status-label status-offline';
        statusElement.textContent = `${statusCounts.offline} Product(s) Offline`;
    } else if (statusCounts.updating > 0) {
        statusElement.className = 'status-label status-updating';
        statusElement.textContent = `${statusCounts.updating} Product(s) Under Maintenance`;
    } else if (statusCounts.caution > 0) {
        statusElement.className = 'status-label status-caution';
        statusElement.textContent = `${statusCounts.caution} Product(s) with Caution`;
    } else {
        statusElement.className = 'status-label status-working';
        statusElement.textContent = 'All Systems Operational ✓';
    }
}

// Get products from localStorage
function getProducts() {
    const products = localStorage.getItem(STORAGE_KEY);
    return products ? JSON.parse(products) : [];
}

// Update timestamp
function updateTimestamp() {
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    document.getElementById('update-time').textContent = timeString;
}
