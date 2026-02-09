# Astral Cheats Website 🎮

A stunning, modern website for Astral Cheats featuring a cyberpunk-inspired purple theme with glowing neon effects, smooth animations, and an advanced admin panel.

## 🌟 Features

### User-Facing Features
- **Stunning Purple Theme**: Deep purples, blacks, and dark grays with glowing neon effects
- **Animated Hero Section**: Dynamic typing animation, floating elements, and particle background
- **Feature Showcase**: 4 feature cards with hover animations and icon effects
- **Product Grid**: 4 game products (Fortnite, Valorant, Apex Legends, Warzone) with detailed information
- **Trust Section**: Animated statistics counters and security badges
- **Status Page**: Real-time product status display with color-coded indicators
- **Responsive Design**: Mobile-first approach with breakpoints for all screen sizes
- **Interactive Elements**: Notification toasts, smooth scrolling, cursor glow effects

### Admin Features
- **Password Protected**: Admin access with password: `KonvyIsKing123`
- **Product Management**: Add, edit, and delete products
- **Status Control**: Set product status (Working, Caution, Updating, Offline)
- **Real-time Updates**: Changes reflect immediately on the main site
- **Status Page Management**: Update product statuses with color-coded system:
  - 🟢 Green: Working/Updated
  - 🟠 Orange: Working but use at own risk
  - 🔵 Blue: Updating
  - 🔴 Red: Offline

## 📁 File Structure

```
/
├── index.html          # Main landing page
├── admin.html          # Admin panel (password protected)
├── status.html         # Public status page
├── css/
│   ├── styles.css      # Main stylesheet with purple theme
│   └── admin.css       # Admin panel styles
├── js/
│   ├── script.js       # Main JavaScript with animations
│   ├── admin.js        # Admin panel functionality
│   └── status.js       # Status page functionality
└── README.md           # This file
```

## 🚀 Quick Start

### 1. Open the Website
Simply open `index.html` in a modern web browser (Chrome, Firefox, Edge, Safari).

### 2. Access Admin Panel
1. Navigate to `/admin.html` or click the admin link
2. Enter password: `KonvyIsKing123`
3. Manage products, prices, descriptions, and status

### 3. View Status Page
Navigate to `/status.html` to see real-time product status updates.

## 🎨 Design Elements

### Color Palette
- **Primary Purple**: `#a855f7`, `#9333ea`, `#7e22ce`
- **Accent Purple/Pink**: `#d946ef`, `#c026d3`
- **Background**: `#0a0a0f`, `#14141a`, `#1a1a24`
- **Text**: `#e0e0e0`, `#ffffff`

### Animations
- Particle background using HTML5 Canvas
- Pulsing glow effects on buttons and text
- Floating elements in hero section
- Fade-in animations on scroll (Intersection Observer)
- Typing animation for hero headline
- Smooth hover transitions (0.3s ease)
- 3D card tilt effects on hover
- Animated counters for statistics

### Effects
- Box shadows with purple glow
- Text shadows for neon effect
- Border gradients
- Backdrop blur (glassmorphism)
- Cursor-following glow effect
- Ripple effects on button clicks

## 💻 Admin Panel Usage

### Managing Products

1. **Add Product**:
   - Click "+ Add Product" button
   - Fill in product details (name, price, features, etc.)
   - Set status and save

2. **Edit Product**:
   - Click "Edit" on any product card
   - Modify details in the modal
   - Save changes

3. **Delete Product**:
   - Click "Delete" on any product card
   - Confirm deletion

4. **Update Status**:
   - Go to "Status Page" tab
   - Click status buttons to update product status
   - Changes reflect immediately on status page

### Product Fields
- **Name**: Product/game name
- **Badge**: Label like "Popular", "New", "Featured"
- **Price**: Dollar amount (supports decimals)
- **Period**: Billing period (/month, /week, /year, or one-time)
- **Features**: List of features (one per line)
- **Description**: Optional product description
- **Image URL**: Optional product image
- **Status**: Working, Caution, Updating, or Offline
- **Featured**: Mark as featured product

## 🔒 Data Storage

All product data is stored in the browser's `localStorage`. This means:
- ✅ No server required
- ✅ Data persists between sessions
- ✅ Changes are immediate
- ⚠️ Data is per-browser (clearing browser data will reset)
- ⚠️ Not shared across devices

To deploy with a backend, replace localStorage calls with API requests.

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px (single column layouts)
- **Tablet**: 768px - 1024px (2 column grids)
- **Desktop**: > 1024px (full layout with all features)

## 🌐 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)
- ⚠️ IE11 (limited support, some animations may not work)

## ⚡ Performance

- Vanilla JavaScript (no framework overhead)
- Optimized animations using CSS transforms
- Intersection Observer for efficient scroll animations
- RequestAnimationFrame for smooth canvas animations
- Minimal dependencies

## 🎯 SEO & Accessibility

- Semantic HTML5 elements
- Meta tags for SEO
- Alt text on all images (when added)
- ARIA labels for interactive elements
- Keyboard navigation support
- Reduced motion support (prefers-reduced-motion)

## 🛠️ Customization

### Change Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
    --primary-purple: #a855f7;
    --accent-purple: #d946ef;
    /* ... more variables ... */
}
```

### Change Admin Password
Edit `js/admin.js`:
```javascript
const ADMIN_PASSWORD = 'KonvyIsKing123'; // Change this
```

### Add More Products
Use the admin panel or manually edit the default products in `js/admin.js` (initializeDefaultProducts function).

## 📋 Future Enhancements

Potential improvements:
- Backend API integration
- User authentication system
- Payment gateway integration
- Product analytics dashboard
- Email notifications
- Multi-language support
- Dark/light mode toggle
- Advanced search and filtering

## 📄 License

This project is for demonstration purposes. Modify and use as needed.

## 🤝 Support

For issues or questions, please contact the administrator.

---

**Made with 💜 by Astral Cheats Team**

*Dominate Your Game* 🎮✨
