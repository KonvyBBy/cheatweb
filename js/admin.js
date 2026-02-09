// Admin Panel JavaScript
const ADMIN_PASSWORD = 'KonvyIsKing123';
const STORAGE_KEY = 'astral_products';
const AUTH_KEY = 'astral_admin_auth';

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initializeDefaultProducts();
});

// Show notification
function showNotification(message, duration = 3000) {
    const toast = document.getElementById('notification-toast');
    const toastMessage = document.getElementById('toast-message');
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Check if user is authenticated
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem(AUTH_KEY) === 'true';
    
    if (isAuthenticated) {
        showAdminPanel();
    } else {
        showLoginScreen();
    }
}

// Show login screen
function showLoginScreen() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('admin-panel').style.display = 'none';
    
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', handleLogin);
}

// Show admin panel
function showAdminPanel() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'flex';
    
    initializeAdminPanel();
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const password = document.getElementById('admin-password').value;
    const errorElement = document.getElementById('login-error');
    
    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem(AUTH_KEY, 'true');
        showAdminPanel();
        showNotification('Welcome, Administrator! 👑');
    } else {
        errorElement.textContent = 'Invalid password. Access denied.';
        setTimeout(() => {
            errorElement.textContent = '';
        }, 3000);
    }
}

// Initialize admin panel
function initializeAdminPanel() {
    loadProducts();
    loadStatusPage();
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const tab = e.target.dataset.tab;
            if (tab) {
                e.preventDefault();
                switchTab(tab);
            }
        });
    });
    
    // Logout
    document.getElementById('logout-btn').addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem(AUTH_KEY);
        location.reload();
    });
    
    // Add product
    document.getElementById('add-product-btn').addEventListener('click', openAddProductModal);
    
    // Modal controls
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('cancel-modal').addEventListener('click', closeModal);
    
    // Product form
    document.getElementById('product-form').addEventListener('submit', handleProductSave);
}

// Switch tabs
function switchTab(tabName) {
    // Update nav links
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.tab === tabName) {
            link.classList.add('active');
        }
    });
    
    // Update tab content
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Initialize default products
function initializeDefaultProducts() {
    const existingProducts = localStorage.getItem(STORAGE_KEY);
    
    if (!existingProducts) {
        const defaultProducts = [
            {
                id: 1,
                name: 'Fortnite',
                badge: 'Popular',
                price: 29.99,
                period: '/month',
                features: [
                    'Aimbot with customizable FOV',
                    'ESP & Wallhacks',
                    'No Recoil & No Spread',
                    'Radar & Player Info',
                    'Auto-update system'
                ],
                description: 'Premium Fortnite cheat with advanced features',
                image: '',
                status: 'working',
                featured: false
            },
            {
                id: 2,
                name: 'Valorant',
                badge: 'Featured',
                price: 39.99,
                period: '/month',
                features: [
                    'Advanced Triggerbot',
                    'Bone Aimbot (Head/Body)',
                    'Agent ESP & Abilities',
                    'Recoil Control System',
                    'Stream-proof mode'
                ],
                description: 'Top-tier Valorant cheat for competitive play',
                image: '',
                status: 'working',
                featured: true
            },
            {
                id: 3,
                name: 'Apex Legends',
                badge: 'New',
                price: 34.99,
                period: '/month',
                features: [
                    'Smart Aimbot with prediction',
                    'Legend ESP & Health bars',
                    'Loot ESP with filters',
                    'Glow effects',
                    'Speed hack & fly mode'
                ],
                description: 'Advanced Apex Legends cheat suite',
                image: '',
                status: 'updating',
                featured: false
            },
            {
                id: 4,
                name: 'Warzone',
                badge: 'Updated',
                price: 32.99,
                period: '/month',
                features: [
                    'Full ESP suite',
                    'Advanced Aimbot',
                    '2D/3D Radar',
                    'Vehicle ESP',
                    'No fog & weather control'
                ],
                description: 'Comprehensive Warzone cheat package',
                image: '',
                status: 'working',
                featured: false
            }
        ];
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
    }
}

// Get all products
function getProducts() {
    const products = localStorage.getItem(STORAGE_KEY);
    return products ? JSON.parse(products) : [];
}

// Save products
function saveProducts(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// Load products into admin panel
function loadProducts() {
    const products = getProducts();
    const container = document.getElementById('products-list');
    
    if (products.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No products yet. Add your first product!</p>';
        return;
    }
    
    container.innerHTML = products.map(product => `
        <div class="product-item">
            <div class="product-status-indicator status-${product.status}">
                ${getStatusIcon(product.status)}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-meta">
                    <span class="product-price">$${product.price}${product.period}</span>
                    ${product.badge ? `<span class="product-badge-display">${product.badge}</span>` : ''}
                    <span class="product-status-text status-${product.status}">${getStatusLabel(product.status)}</span>
                    ${product.featured ? '<span class="product-badge-display">⭐ Featured</span>' : ''}
                </div>
                <p class="product-features-preview">${product.features.length} features</p>
            </div>
            <div class="product-actions">
                <button class="btn btn-small btn-edit" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn btn-small btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Load status page
function loadStatusPage() {
    const products = getProducts();
    const container = document.getElementById('status-list');
    
    if (products.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No products to display status for.</p>';
        return;
    }
    
    container.innerHTML = products.map(product => `
        <div class="status-item">
            <div class="status-header">
                <h3>${product.name}</h3>
                <div class="status-controls">
                    <button class="status-btn status-btn-working ${product.status === 'working' ? 'active' : ''}" 
                            onclick="updateProductStatus(${product.id}, 'working')">
                        ✓ Working
                    </button>
                    <button class="status-btn status-btn-caution ${product.status === 'caution' ? 'active' : ''}" 
                            onclick="updateProductStatus(${product.id}, 'caution')">
                        ⚠ Caution
                    </button>
                    <button class="status-btn status-btn-updating ${product.status === 'updating' ? 'active' : ''}" 
                            onclick="updateProductStatus(${product.id}, 'updating')">
                        🔄 Updating
                    </button>
                    <button class="status-btn status-btn-offline ${product.status === 'offline' ? 'active' : ''}" 
                            onclick="updateProductStatus(${product.id}, 'offline')">
                        ✗ Offline
                    </button>
                </div>
            </div>
        </div>
    `).join('');
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

// Get status label
function getStatusLabel(status) {
    const labels = {
        working: 'Working',
        caution: 'Use at Own Risk',
        updating: 'Updating',
        offline: 'Offline'
    };
    return labels[status] || 'Unknown';
}

// Update product status
function updateProductStatus(productId, newStatus) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (product) {
        product.status = newStatus;
        saveProducts(products);
        loadStatusPage();
        showNotification(`Status updated: ${product.name} is now ${getStatusLabel(newStatus)}`);
    }
}

// Open add product modal
function openAddProductModal() {
    document.getElementById('modal-title').textContent = 'Add New Product';
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
    document.getElementById('product-modal').classList.add('show');
}

// Edit product
function editProduct(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (product) {
        document.getElementById('modal-title').textContent = 'Edit Product';
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-badge').value = product.badge || '';
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-period').value = product.period;
        document.getElementById('product-features').value = product.features.join('\n');
        document.getElementById('product-description').value = product.description || '';
        document.getElementById('product-image').value = product.image || '';
        document.getElementById('product-status').value = product.status;
        document.getElementById('product-featured').checked = product.featured || false;
        
        document.getElementById('product-modal').classList.add('show');
    }
}

// Delete product
function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        let products = getProducts();
        products = products.filter(p => p.id !== productId);
        saveProducts(products);
        loadProducts();
        loadStatusPage();
        showNotification('Product deleted successfully');
    }
}

// Close modal
function closeModal() {
    document.getElementById('product-modal').classList.remove('show');
}

// Handle product save
function handleProductSave(e) {
    e.preventDefault();
    
    const productId = document.getElementById('product-id').value;
    const products = getProducts();
    
    const productData = {
        id: productId ? parseInt(productId) : Date.now(),
        name: document.getElementById('product-name').value,
        badge: document.getElementById('product-badge').value,
        price: parseFloat(document.getElementById('product-price').value),
        period: document.getElementById('product-period').value,
        features: document.getElementById('product-features').value.split('\n').filter(f => f.trim()),
        description: document.getElementById('product-description').value,
        image: document.getElementById('product-image').value,
        status: document.getElementById('product-status').value,
        featured: document.getElementById('product-featured').checked
    };
    
    if (productId) {
        // Update existing product
        const index = products.findIndex(p => p.id === parseInt(productId));
        if (index !== -1) {
            products[index] = productData;
        }
    } else {
        // Add new product
        products.push(productData);
    }
    
    saveProducts(products);
    loadProducts();
    loadStatusPage();
    closeModal();
    showNotification(productId ? 'Product updated successfully' : 'Product added successfully');
}

// Make functions globally accessible
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.updateProductStatus = updateProductStatus;
