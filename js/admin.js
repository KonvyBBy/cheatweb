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
    
    // Add duration button
    document.getElementById('add-duration-btn').addEventListener('click', addDurationField);
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
                featured: false,
                durations: [
                    { label: '1 Day', days: 1, price: 4.99 },
                    { label: '1 Week', days: 7, price: 14.99 },
                    { label: '1 Month', days: 30, price: 29.99 },
                    { label: '3 Months', days: 90, price: 74.99 }
                ]
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
                featured: true,
                durations: [
                    { label: '1 Day', days: 1, price: 5.99 },
                    { label: '1 Week', days: 7, price: 19.99 },
                    { label: '1 Month', days: 30, price: 39.99 },
                    { label: '3 Months', days: 90, price: 99.99 }
                ]
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
                featured: false,
                durations: [
                    { label: '1 Day', days: 1, price: 4.99 },
                    { label: '1 Week', days: 7, price: 17.49 },
                    { label: '1 Month', days: 30, price: 34.99 },
                    { label: '3 Months', days: 90, price: 84.99 }
                ]
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
                featured: false,
                durations: [
                    { label: '1 Day', days: 1, price: 4.99 },
                    { label: '1 Week', days: 7, price: 16.49 },
                    { label: '1 Month', days: 30, price: 32.99 },
                    { label: '3 Months', days: 90, price: 79.99 }
                ]
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
    loadDurations([]);
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
        
        // Load durations
        loadDurations(product.durations || []);
        
        document.getElementById('product-modal').classList.add('show');
    }
}

// Load durations into form
function loadDurations(durations) {
    const container = document.getElementById('durations-list');
    container.innerHTML = '';
    
    if (durations.length === 0) {
        // Add default durations
        durations = [
            { label: '1 Day', days: 1, price: 4.99 },
            { label: '1 Week', days: 7, price: 14.99 },
            { label: '1 Month', days: 30, price: 29.99 },
            { label: '3 Months', days: 90, price: 74.99 }
        ];
    }
    
    durations.forEach((duration, index) => {
        addDurationField(duration, index);
    });
}

// Add duration field
function addDurationField(duration = null, index = null) {
    const container = document.getElementById('durations-list');
    const durationIndex = index !== null ? index : container.children.length;
    
    const durationDiv = document.createElement('div');
    durationDiv.className = 'duration-field';
    durationDiv.innerHTML = `
        <div class="duration-field-row">
            <input type="text" 
                   class="duration-label-input" 
                   placeholder="Label (e.g., 1 Month)" 
                   value="${duration ? duration.label : ''}"
                   required>
            <input type="number" 
                   class="duration-days-input" 
                   placeholder="Days" 
                   value="${duration ? duration.days : ''}"
                   min="1"
                   required>
            <input type="number" 
                   class="duration-price-input" 
                   placeholder="Price" 
                   value="${duration ? duration.price : ''}"
                   step="0.01"
                   min="0"
                   required>
            <button type="button" class="btn-remove-duration" onclick="removeDurationField(this)">×</button>
        </div>
    `;
    
    container.appendChild(durationDiv);
}

// Remove duration field
function removeDurationField(button) {
    const durationField = button.closest('.duration-field');
    durationField.remove();
}

// Get durations from form
function getDurationsFromForm() {
    const durations = [];
    const durationFields = document.querySelectorAll('.duration-field');
    
    durationFields.forEach(field => {
        const label = field.querySelector('.duration-label-input').value;
        const days = parseInt(field.querySelector('.duration-days-input').value);
        const price = parseFloat(field.querySelector('.duration-price-input').value);
        
        if (label && days && price >= 0) {
            durations.push({ label, days, price });
        }
    });
    
    return durations;
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
        featured: document.getElementById('product-featured').checked,
        durations: getDurationsFromForm()
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
window.removeDurationField = removeDurationField;

// ==================== Category Management ====================

const CATEGORIES_KEY = 'astral_categories';
let currentCategory = null;

// Get categories
function getCategories() {
    const categories = localStorage.getItem(CATEGORIES_KEY);
    return categories ? JSON.parse(categories) : [];
}

// Save categories
function saveCategories(categories) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

// Load categories list
function loadCategoriesList() {
    const categories = getCategories();
    const container = document.getElementById('categories-list');
    
    if (!container) return;
    
    if (categories.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No categories yet. Click "+ Add Category" to create one.</p>';
        return;
    }
    
    container.innerHTML = categories.map(category => `
        <div class="category-item">
            <div class="category-info">
                <h3>${category.name}</h3>
                <p>${category.description || 'No description'}</p>
            </div>
            <div class="category-actions">
                <button class="btn btn-secondary btn-small" onclick="editCategory('${category.id}')">Edit</button>
                <button class="btn btn-danger btn-small" onclick="deleteCategory('${category.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

// Open category modal
function openCategoryModal(categoryId = null) {
    const modal = document.getElementById('category-modal');
    const title = document.getElementById('category-modal-title');
    const form = document.getElementById('category-form');
    
    if (categoryId) {
        // Edit mode
        const categories = getCategories();
        const category = categories.find(c => c.id === categoryId);
        if (!category) return;
        
        title.textContent = 'Edit Category';
        document.getElementById('category-id').value = category.id;
        document.getElementById('category-name').value = category.name;
        document.getElementById('category-description').value = category.description || '';
        currentCategory = category;
    } else {
        // Add mode
        title.textContent = 'Add Category';
        form.reset();
        document.getElementById('category-id').value = '';
        currentCategory = null;
    }
    
    modal.style.display = 'flex';
}

// Close category modal
function closeCategoryModal() {
    document.getElementById('category-modal').style.display = 'none';
    document.getElementById('category-form').reset();
    currentCategory = null;
}

// Edit category
function editCategory(categoryId) {
    openCategoryModal(categoryId);
}

// Delete category
function deleteCategory(categoryId) {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    let categories = getCategories();
    categories = categories.filter(c => c.id !== categoryId);
    saveCategories(categories);
    
    // Remove category from all products
    let products = getProducts();
    products = products.map(product => {
        if (product.categories && product.categories.includes(categoryId)) {
            product.categories = product.categories.filter(c => c !== categoryId);
        }
        return product;
    });
    saveProducts(products);
    
    loadCategoriesList();
    showNotification('Category deleted successfully');
}

// Handle category form submit
function handleCategorySubmit(e) {
    e.preventDefault();
    
    const categoryId = document.getElementById('category-id').value;
    const name = document.getElementById('category-name').value.trim();
    const description = document.getElementById('category-description').value.trim();
    
    let categories = getCategories();
    
    if (categoryId) {
        // Edit existing category
        const index = categories.findIndex(c => c.id === categoryId);
        if (index !== -1) {
            categories[index] = {
                ...categories[index],
                name,
                description
            };
        }
    } else {
        // Add new category
        const newCategory = {
            id: 'cat_' + Date.now(),
            name,
            description
        };
        categories.push(newCategory);
    }
    
    saveCategories(categories);
    loadCategoriesList();
    closeCategoryModal();
    showNotification(categoryId ? 'Category updated successfully' : 'Category added successfully');
}

// ==================== Enhanced Product Features Management ====================

let currentFeatures = [];

// Load features list in modal
function loadFeaturesList(features) {
    currentFeatures = features || [];
    const container = document.getElementById('features-list-container');
    
    if (!container) return;
    
    if (currentFeatures.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem;">No features added yet.</p>';
        return;
    }
    
    container.innerHTML = currentFeatures.map((feature, index) => `
        <div class="feature-item">
            <span class="feature-text">${feature}</span>
            <button type="button" class="btn-remove-feature" onclick="removeFeature(${index})" title="Remove feature">×</button>
        </div>
    `).join('');
}

// Add feature
function addFeature() {
    const input = document.getElementById('new-feature-input');
    const feature = input.value.trim();
    
    if (!feature) {
        showNotification('Please enter a feature', 2000);
        return;
    }
    
    currentFeatures.push(feature);
    loadFeaturesList(currentFeatures);
    input.value = '';
    input.focus();
}

// Remove feature
function removeFeature(index) {
    currentFeatures.splice(index, 1);
    loadFeaturesList(currentFeatures);
}

// Load category checkboxes in product modal
function loadCategoryCheckboxes(productCategories = []) {
    const container = document.getElementById('product-categories');
    const categories = getCategories();
    
    if (!container) return;
    
    if (categories.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem;">No categories available. Create categories first.</p>';
        return;
    }
    
    container.innerHTML = categories.map(category => `
        <label class="category-checkbox">
            <input type="checkbox" value="${category.id}" ${productCategories.includes(category.id) ? 'checked' : ''}>
            <span>${category.name}</span>
        </label>
    `).join('');
}

// Get selected categories
function getSelectedCategories() {
    const checkboxes = document.querySelectorAll('#product-categories input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// ==================== Enhanced Product Management ====================

// Override the original openProductModal to use new features system
const originalOpenProductModal = openProductModal;
function openProductModal(productId = null) {
    const modal = document.getElementById('product-modal');
    const title = document.getElementById('modal-title');
    const form = document.getElementById('product-form');
    
    if (productId) {
        const products = getProducts();
        const product = products.find(p => p.id == productId);
        if (!product) return;
        
        title.textContent = 'Edit Product';
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-badge').value = product.badge || '';
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-period').value = product.period || '';
        document.getElementById('product-description').value = product.description || '';
        document.getElementById('product-image').value = product.image || '';
        document.getElementById('product-status').value = product.status;
        document.getElementById('product-featured').checked = product.featured || false;
        
        // Load features
        loadFeaturesList(product.features || []);
        
        // Load categories
        loadCategoryCheckboxes(product.categories || []);
        
        // Load durations
        loadDurationsInForm(product.durations || []);
        
        currentProduct = product;
    } else {
        title.textContent = 'Add Product';
        form.reset();
        document.getElementById('product-id').value = '';
        currentFeatures = [];
        loadFeaturesList([]);
        loadCategoryCheckboxes([]);
        loadDurationsInForm([]);
        currentProduct = null;
    }
    
    modal.style.display = 'flex';
}

// Override handleProductSubmit to use new features system
const originalHandleProductSubmit = handleProductSubmit;
function handleProductSubmit(e) {
    e.preventDefault();
    
    if (currentFeatures.length === 0) {
        showNotification('Please add at least one feature', 3000);
        return;
    }
    
    const productId = document.getElementById('product-id').value;
    const name = document.getElementById('product-name').value;
    const badge = document.getElementById('product-badge').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const period = document.getElementById('product-period').value;
    const description = document.getElementById('product-description').value;
    const image = document.getElementById('product-image').value;
    const status = document.getElementById('product-status').value;
    const featured = document.getElementById('product-featured').checked;
    const categories = getSelectedCategories();
    
    let products = getProducts();
    
    if (productId) {
        // Edit existing product
        const index = products.findIndex(p => p.id == productId);
        if (index !== -1) {
            products[index] = {
                ...products[index],
                name,
                badge,
                price,
                period,
                features: currentFeatures,
                description,
                image,
                status,
                featured,
                categories,
                durations: currentDurations
            };
        }
    } else {
        // Add new product
        const newProduct = {
            id: Date.now(),
            name,
            badge,
            price,
            period,
            features: currentFeatures,
            description,
            image,
            status,
            featured,
            categories,
            durations: currentDurations
        };
        products.push(newProduct);
    }
    
    saveProducts(products);
    loadProductsList();
    closeProductModal();
    showNotification(productId ? 'Product updated successfully' : 'Product added successfully');
}

// ==================== Initialize Enhanced Admin Features ====================

// Add event listeners for new features
document.addEventListener('DOMContentLoaded', () => {
    // Category management
    const addCategoryBtn = document.getElementById('add-category-btn');
    if (addCategoryBtn) {
        addCategoryBtn.addEventListener('click', () => openCategoryModal());
    }
    
    const closeCategoryBtn = document.getElementById('close-category-modal');
    if (closeCategoryBtn) {
        closeCategoryBtn.addEventListener('click', closeCategoryModal);
    }
    
    const cancelCategoryBtn = document.getElementById('cancel-category-modal');
    if (cancelCategoryBtn) {
        cancelCategoryBtn.addEventListener('click', closeCategoryModal);
    }
    
    const categoryForm = document.getElementById('category-form');
    if (categoryForm) {
        categoryForm.addEventListener('submit', handleCategorySubmit);
    }
    
    // Features management
    const addFeatureBtn = document.getElementById('add-feature-btn');
    if (addFeatureBtn) {
        addFeatureBtn.addEventListener('click', addFeature);
    }
    
    const newFeatureInput = document.getElementById('new-feature-input');
    if (newFeatureInput) {
        newFeatureInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addFeature();
            }
        });
    }
    
    // Update tab switching to include categories tab
    document.querySelectorAll('.admin-nav-link[data-tab]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = link.dataset.tab;
            
            // Update active link
            document.querySelectorAll('.admin-nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Update active tab
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.getElementById(`${tab}-tab`).classList.add('active');
            
            // Load data for the tab
            if (tab === 'categories') {
                loadCategoriesList();
            } else if (tab === 'products') {
                loadProductsList();
            } else if (tab === 'status') {
                loadStatusList();
            }
        });
    });
});

// Make functions globally accessible
window.editCategory = editCategory;
window.deleteCategory = deleteCategory;
window.removeFeature = removeFeature;
window.openProductModal = openProductModal;
window.handleProductSubmit = handleProductSubmit;

