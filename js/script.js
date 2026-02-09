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
                        const target = parseFloat(counter.dataset.target);
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
    
    // Show time-based greeting
    showTimeBasedGreeting();
    
    // Add loading animation completion
    document.body.classList.add('loaded');
    
    // Log initialization
    console.log('%c🚀 Astral Cheats', 'color: #a855f7; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px rgba(168, 85, 247, 0.6);');
    console.log('%cWebsite initialized successfully!', 'color: #d946ef; font-size: 14px;');
});

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
