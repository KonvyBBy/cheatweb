// Astral Cheats - JavaScript for Interactivity and Animations

// ==================== Utility Functions ====================

// Show notification toast
function showNotification(message, duration = 3000) {
    const toast = document.getElementById('notification-toast');
    const toastMessage = document.getElementById('toast-message');
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Animate counter
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target % 1 === 0 ? target.toLocaleString() : target.toFixed(1);
            clearInterval(timer);
        } else {
            element.textContent = current % 1 === 0 ? Math.floor(current).toLocaleString() : current.toFixed(1);
        }
    }, 16);
}

// ==================== Particle Background ====================

class ParticleBackground {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.connectionDistance = 150;
        
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(168, 85, 247, 0.6)';
            this.ctx.fill();
            
            // Create glow effect
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.radius * 3
            );
            gradient.addColorStop(0, 'rgba(168, 85, 247, 0.3)');
            gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        });
        
        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectionDistance) {
                    const opacity = (1 - distance / this.connectionDistance) * 0.3;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
        });
    }
    
    animate() {
        this.drawParticles();
        this.updateParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// ==================== Cursor Glow Effect ====================

class CursorGlow {
    constructor() {
        this.glow = document.getElementById('cursor-glow');
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.glow.style.left = e.clientX + 'px';
            this.glow.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mouseenter', () => {
            this.glow.style.opacity = '0.3';
        });
        
        document.addEventListener('mouseleave', () => {
            this.glow.style.opacity = '0';
        });
    }
}

// ==================== Scroll Animations ====================

class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in-up');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.elements.forEach(element => observer.observe(element));
    }
}

// ==================== Navbar Scroll Effect ====================

class NavbarScroll {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

// ==================== Smooth Scroll Navigation ====================

class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ==================== Animated Counters ====================

class AnimatedCounters {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.animated = false;
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animated = true;
                    this.counters.forEach(counter => {
                        const label = counter.nextElementSibling?.textContent;
                        let target;
                        
                        // For Active Users, use dynamic calculation
                        if (label === 'Active Users') {
                            target = getActiveUsers();
                        } else {
                            target = parseFloat(counter.dataset.target);
                        }
                        
                        animateCounter(counter, target, 2000);
                    });
                }
            });
        }, {
            threshold: 0.5
        });
        
        if (this.counters.length > 0) {
            observer.observe(this.counters[0]);
        }
    }
}

// ==================== Copy to Clipboard ====================

class CopyToClipboard {
    constructor() {
        this.copyElements = document.querySelectorAll('.copy-discord');
        this.init();
    }
    
    init() {
        this.copyElements.forEach(element => {
            element.addEventListener('click', () => {
                const text = element.dataset.clipboard;
                navigator.clipboard.writeText(text).then(() => {
                    showNotification('Discord ID copied to clipboard!');
                }).catch(() => {
                    showNotification('Failed to copy Discord ID');
                });
            });
        });
    }
}

// ==================== Typing Animation ====================

class TypingAnimation {
    constructor() {
        this.element = document.querySelector('.typing-text');
        this.text = 'Astral Cheats';
        this.speed = 150;
        this.init();
    }
    
    init() {
        if (!this.element) return;
        
        this.element.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < this.text.length) {
                this.element.textContent += this.text.charAt(i);
                i++;
                setTimeout(typeWriter, this.speed);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
}

// ==================== Button Ripple Effect ====================

class ButtonRipple {
    constructor() {
        this.buttons = document.querySelectorAll('.btn');
        this.init();
    }
    
    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    transform: translate(-50%, -50%);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
        
        // Add ripple animation to CSS
        if (!document.getElementById('ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        width: 300px;
                        height: 300px;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// ==================== Dynamic Time-based Greeting ====================

function showTimeBasedGreeting() {
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour >= 5 && hour < 12) {
        greeting = 'Good morning! Welcome to Astral Cheats ☀️';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Good afternoon! Welcome to Astral Cheats 🌤️';
    } else if (hour >= 18 && hour < 22) {
        greeting = 'Good evening! Welcome to Astral Cheats 🌙';
    } else {
        greeting = 'Welcome to Astral Cheats - Dominate the night! 🌟';
    }
    
    setTimeout(() => {
        showNotification(greeting, 4000);
    }, 1000);
}

// ==================== Parallax Effect ====================

class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.init();
    }
    
    init() {
        if (!this.hero) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            this.hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
}

// ==================== Product Card Hover Effects ====================

class ProductCardEffects {
    constructor() {
        this.cards = document.querySelectorAll('.product-card, .feature-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.4s ease';
            });
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `
                    translateY(-10px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.02)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
}

// ==================== Product Management ====================

const STORAGE_KEY = 'astral_products';
let currentProduct = null;

// Get active users - synchronized across all browsers for the session
function getActiveUsers() {
    const SESSION_KEY = 'astral_active_users';
    
    // Check if we already have a count for this session
    let activeUsers = sessionStorage.getItem(SESSION_KEY);
    
    if (!activeUsers) {
        // Generate new count based on Chicago time
        const chicagoTime = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"});
        const hour = new Date(chicagoTime).getHours();
        
        // Night hours (10 PM - 6 AM): 120-135 users
        // Day hours (6 AM - 10 PM): 145-160 users
        let baseCount;
        if (hour >= 22 || hour < 6) {
            baseCount = Math.floor(Math.random() * (135 - 120 + 1)) + 120;
        } else {
            baseCount = Math.floor(Math.random() * (160 - 145 + 1)) + 145;
        }
        
        // Store in sessionStorage for consistency
        sessionStorage.setItem(SESSION_KEY, baseCount.toString());
        activeUsers = baseCount;
    } else {
        activeUsers = parseInt(activeUsers);
    }
    
    return activeUsers;
}

// Load products from localStorage
function getProducts() {
    const products = localStorage.getItem(STORAGE_KEY);
    return products ? JSON.parse(products) : [];
}

// Get status color class
function getStatusClass(status) {
    const statusMap = {
        'working': 'status-working',
        'caution': 'status-caution',
        'updating': 'status-updating',
        'offline': 'status-offline'
    };
    return statusMap[status] || 'status-working';
}

// Get status text
function getStatusText(status) {
    const statusMap = {
        'working': '✓ Working',
        'caution': '⚠ Caution',
        'updating': '🔄 Updating',
        'offline': '✗ Offline'
    };
    return statusMap[status] || 'Unknown';
}

// Get default product image
function getDefaultImage(productName) {
    // Using placeholder images with product name
    return `https://via.placeholder.com/400x250/1a1a24/a855f7?text=${encodeURIComponent(productName)}`;
}

// Load and display products
function loadProducts() {
    const products = getProducts();
    const container = document.getElementById('products-grid');
    
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-muted); grid-column: 1/-1;">No products available yet.</p>';
        return;
    }
    
    container.innerHTML = products.map((product, index) => {
        const imageUrl = product.image || getDefaultImage(product.name);
        const lowestPrice = product.durations && product.durations.length > 0 
            ? Math.min(...product.durations.map(d => d.price))
            : product.price || 0;
        
        return `
            <div class="product-card-new fade-in-up" data-delay="${index}" data-product-id="${product.id}">
                ${product.badge ? `<div class="product-badge-new ${product.featured ? 'featured-badge' : ''}">${product.badge}</div>` : ''}
                <div class="product-card-image">
                    <img src="${imageUrl}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-card-content">
                    <h3 class="product-card-title">${product.name}</h3>
                    <div class="product-card-status ${getStatusClass(product.status)}">
                        ${getStatusText(product.status)}
                    </div>
                    <div class="product-card-price">
                        <span class="price-label">Starting at</span>
                        <span class="price-amount">$${lowestPrice.toFixed(2)}</span>
                    </div>
                    <button class="btn btn-product-new" onclick="openProductModal(${product.id})">
                        View Details
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    // Trigger animations
    setTimeout(() => {
        document.querySelectorAll('.fade-in-up').forEach((el, index) => {
            setTimeout(() => el.classList.add('visible'), index * 100);
        });
    }, 100);
}

// Open product details modal
function openProductModal(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    currentProduct = product;
    const modal = document.getElementById('product-details-modal');
    const imageUrl = product.image || getDefaultImage(product.name);
    
    // Populate modal content
    document.getElementById('modal-product-image').src = imageUrl;
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-badge').textContent = product.badge || '';
    document.getElementById('modal-product-status').className = `product-modal-status ${getStatusClass(product.status)}`;
    document.getElementById('modal-product-status').textContent = getStatusText(product.status);
    document.getElementById('modal-product-rating').textContent = '4.8';
    document.getElementById('modal-product-description').textContent = product.description || 'Premium gaming cheat with advanced features.';
    
    // Load features
    const featuresList = document.getElementById('modal-product-features');
    featuresList.innerHTML = product.features.map(f => `<li>${f}</li>`).join('');
    
    // Load duration options
    loadDurationOptions(product);
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Load duration options
function loadDurationOptions(product) {
    const container = document.getElementById('duration-options');
    const durations = product.durations || [
        { label: '1 Day', days: 1, price: product.price * 0.1 },
        { label: '1 Week', days: 7, price: product.price * 0.5 },
        { label: '1 Month', days: 30, price: product.price },
        { label: '3 Months', days: 90, price: product.price * 2.5 }
    ];
    
    container.innerHTML = durations.map((duration, index) => {
        const discount = index > 0 ? Math.round((1 - (duration.price / (product.price * (duration.days / 30)))) * 100) : 0;
        return `
            <div class="duration-option" onclick="selectDuration(${index})">
                <div class="duration-header">
                    <span class="duration-label">${duration.label}</span>
                    ${discount > 0 ? `<span class="duration-discount">-${discount}%</span>` : ''}
                </div>
                <div class="duration-price">$${duration.price.toFixed(2)}</div>
            </div>
        `;
    }).join('');
}

// Select duration
function selectDuration(index) {
    const product = currentProduct;
    if (!product) return;
    
    const durations = product.durations || [
        { label: '1 Day', days: 1, price: product.price * 0.1 },
        { label: '1 Week', days: 7, price: product.price * 0.5 },
        { label: '1 Month', days: 30, price: product.price },
        { label: '3 Months', days: 90, price: product.price * 2.5 }
    ];
    
    const selectedDuration = durations[index];
    
    // Update UI
    document.querySelectorAll('.duration-option').forEach((opt, i) => {
        if (i === index) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }
    });
    
    // Update price display
    document.getElementById('selected-price').textContent = `$${selectedDuration.price.toFixed(2)}`;
    document.getElementById('purchase-btn').disabled = false;
}

// Close product modal
function closeProductModal() {
    const modal = document.getElementById('product-details-modal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    currentProduct = null;
}

// Purchase handler
function handlePurchase() {
    showNotification('Purchase feature coming soon! Check back later.');
}

// ==================== Discount Popup ====================

function showDiscountPopup() {
    const hasSeenPopup = sessionStorage.getItem('discount_popup_seen');
    
    if (!hasSeenPopup) {
        setTimeout(() => {
            const popup = document.getElementById('discount-popup');
            popup.classList.add('show');
            sessionStorage.setItem('discount_popup_seen', 'true');
        }, 2000); // Show after 2 seconds
    }
}

function closeDiscountPopup() {
    const popup = document.getElementById('discount-popup');
    popup.classList.remove('show');
}

function copyDiscountCode() {
    const code = document.getElementById('discount-code-text').textContent;
    navigator.clipboard.writeText(code).then(() => {
        showNotification('Discount code copied! 🎉');
    }).catch(() => {
        showNotification('Failed to copy code');
    });
}

// ==================== Initialize All ====================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    new ParticleBackground();
    new CursorGlow();
    new ScrollAnimations();
    new NavbarScroll();
    new SmoothScroll();
    new AnimatedCounters();
    new CopyToClipboard();
    new TypingAnimation();
    new ButtonRipple();
    new ParallaxEffect();
    new ProductCardEffects();
    
    // Load products
    loadProducts();
    
    // Show discount popup
    showDiscountPopup();
    
    // Setup modal event listeners
    const closeModalBtn = document.getElementById('close-product-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeProductModal);
    }
    
    const modalOverlay = document.querySelector('.product-modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeProductModal);
    }
    
    const purchaseBtn = document.getElementById('purchase-btn');
    if (purchaseBtn) {
        purchaseBtn.addEventListener('click', handlePurchase);
    }
    
    // Setup discount popup event listeners
    const closeDiscountBtn = document.getElementById('close-discount-popup');
    if (closeDiscountBtn) {
        closeDiscountBtn.addEventListener('click', closeDiscountPopup);
    }
    
    const copyCodeBtn = document.getElementById('copy-discount-code');
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', copyDiscountCode);
    }
    
    // Show time-based greeting
    showTimeBasedGreeting();
    
    // Add loading animation completion
    document.body.classList.add('loaded');
    
    // Log initialization
    console.log('%c🚀 Astral Cheats', 'color: #a855f7; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px rgba(168, 85, 247, 0.6);');
    console.log('%cWebsite initialized successfully!', 'color: #d946ef; font-size: 14px;');
});

// Make functions globally accessible
window.openProductModal = openProductModal;
window.selectDuration = selectDuration;

// ==================== Performance Optimization ====================

// Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - 80;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
}

// ==================== Category Management ====================

const CATEGORIES_KEY = 'astral_categories';
let currentCategory = 'all';
let allProducts = [];

// Get categories from localStorage
function getCategories() {
    const categories = localStorage.getItem(CATEGORIES_KEY);
    return categories ? JSON.parse(categories) : [];
}

// Save categories to localStorage
function saveCategories(categories) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

// Load category tabs
function loadCategoryTabs() {
    const categories = getCategories();
    const tabsContainer = document.getElementById('category-tabs');
    
    if (!tabsContainer) return;
    
    // Clear existing tabs except "All Products"
    const allTab = tabsContainer.querySelector('[data-category="all"]');
    tabsContainer.innerHTML = '';
    tabsContainer.appendChild(allTab);
    
    // Add category tabs
    categories.forEach(category => {
        const tab = document.createElement('button');
        tab.className = 'category-tab';
        tab.setAttribute('data-category', category.id);
        tab.textContent = category.name;
        tab.addEventListener('click', () => filterByCategory(category.id));
        tabsContainer.appendChild(tab);
    });
    
    // Add click handler to "All Products" tab
    allTab.addEventListener('click', () => filterByCategory('all'));
}

// Filter products by category
function filterByCategory(categoryId) {
    currentCategory = categoryId;
    
    // Update active tab
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-category="${categoryId}"]`).classList.add('active');
    
    // Filter and display products
    const products = getProducts();
    let filteredProducts = products;
    
    if (categoryId !== 'all') {
        filteredProducts = products.filter(product => 
            product.categories && product.categories.includes(categoryId)
        );
    }
    
    displayFilteredProducts(filteredProducts);
}

// Display filtered products
function displayFilteredProducts(products) {
    const container = document.getElementById('products-grid');
    
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-muted); grid-column: 1/-1;">No products found in this category.</p>';
        return;
    }
    
    container.innerHTML = products.map((product, index) => {
        const imageUrl = product.image || getDefaultImage(product.name);
        const statusClass = getStatusClass(product.status);
        const statusText = getStatusText(product.status);
        
        return `
            <div class="product-card fade-in-up" data-delay="${index}">
                <div class="product-badge ${product.featured ? 'featured' : ''}">${product.badge || 'Premium'}</div>
                <div class="product-image">
                    <img src="${imageUrl}" alt="${product.name}">
                    <div class="product-overlay">
                        <button class="btn btn-primary" onclick="openProductModal(${product.id})">
                            View Details
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-status ${statusClass}">
                        <span class="status-indicator"></span>
                        <span>${statusText}</span>
                    </div>
                    <p class="product-description">${product.description || 'Premium gaming cheat'}</p>
                    <div class="product-features-preview">
                        ${product.features.slice(0, 3).map(f => `<span class="feature-tag">✓ ${f}</span>`).join('')}
                    </div>
                    <div class="product-footer">
                        <div class="product-price">
                            <span class="price">${product.price ? '$' + product.price : 'Custom'}</span>
                            ${product.period ? `<span class="period">${product.period}</span>` : ''}
                        </div>
                        <button class="btn btn-secondary btn-small" onclick="openProductModal(${product.id})">
                            Details
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Trigger animations
    setTimeout(() => {
        document.querySelectorAll('.fade-in-up').forEach((el, index) => {
            setTimeout(() => el.classList.add('visible'), index * 100);
        });
    }, 100);
}

// ==================== Mobile Menu Toggle ====================

function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');
            });
        });
    }
}

// ==================== Support Link Handler ====================

function initSupportLink() {
    const supportLink = document.getElementById('support-link');
    if (supportLink) {
        supportLink.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Support: Join our Discord server for assistance!', 4000);
        });
    }
}

// ==================== Search Button Handler ====================

function initSearchButton() {
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            showNotification('Search feature coming soon!', 3000);
        });
    }
}

// ==================== Cart Button Handler ====================

function initCartButton() {
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            showNotification('Shopping cart feature coming soon!', 3000);
        });
    }
}

// ==================== Initialize Enhanced Features ====================

// Update the existing DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', () => {
    // Load category tabs
    loadCategoryTabs();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize new button handlers
    initSupportLink();
    initSearchButton();
    initCartButton();
});

