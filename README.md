# Poid-ZA Portfolio

A modern, interactive portfolio showcasing engineering projects and capabilities. Built with performance, accessibility, and beautiful design in mind.

## ✨ Features

- **🌓 Dark/Light Mode** — Toggle between themes with persistent storage
- **📱 Mobile Responsive** — Seamless experience on all devices
- **🎨 Modern Design** — Glassmorphism, smooth animations, gradient effects
- **⚡ Performance Optimized** — Fast load times, smooth scrolling
- **🔍 SEO Friendly** — Proper meta tags, structured data
- **♿ Accessible** — WCAG compliant, semantic HTML
- **🎯 Scroll Animations** — GSAP-powered transitions
- **🌐 Three.js Background** — Interactive 3D scene

## 📁 Project Structure

```
portfolio-website/
├── index.html          # Main page (single-page app)
├── script.js           # Interactive features & animations
├── style.css           # (embedded in HTML)
├── manifest.json       # PWA configuration
├── service-worker.js   # Progressive Web App support
├── README.md          # This file
├── favicon-512x512.png # Favicon
└── logo.png           # Logo assets
```

## 🚀 Features Overview

### Navigation
- Fixed sticky header with smooth scroll links
- Mobile hamburger menu
- Active link highlighting
- Theme toggle button

### Sections

#### Hero
- Animated gradient text
- Three.js 3D background
- Call-to-action buttons
- Floating particles effect

#### About
- Professional introduction
- Skills grid (2x2 layout)
- Responsive design
- Quick facts about expertise

#### Projects
- Showcase of featured work
- Project cards with descriptions
- GitHub links
- Responsive grid layout
- Links to:
  - **CHIMERA** - Trading Bot (Binance)
  - **Portfolio** - This website
  - **DevOps Toolkit** - Infrastructure templates

#### Capabilities
- Core competencies display
- 6 key areas of expertise
- Technology badges
- Icon-based organization

#### Contact
- Social links (GitHub, Twitter/X, Email)
- Professional call-to-action
- Easy reach-out section

#### Footer
- Copyright notice
- Quick links
- GitHub profile link

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3 (CSS Variables)
- **Animation**: GSAP, ScrollTrigger, Three.js
- **Interactivity**: Vanilla JavaScript
- **Performance**: Optimized CDN links, minimal dependencies
- **Responsive**: Mobile-first CSS Grid/Flexbox
- **PWA**: Service Worker, Web Manifest

## 🎨 Design System

### Colors
- **Primary**: `#4ecdc4` (Teal)
- **Secondary**: `#45b7d1` (Blue)
- **Accent**: `#ff6b6b` (Red)
- **Dark**: `#0a0a0a`
- **Darker**: `#1a1a2e`
- **Surface**: `#16213e`

### Typography
- Font Family: Inter, system fonts
- Smooth scaling with clamp()
- Accessible font sizes

### Spacing
- Consistent rem-based spacing
- 2rem padding on major sections
- 1rem gaps in grids

## 🔧 Installation & Setup

### Local Development

```bash
# Clone the repository
git clone https://github.com/Poid-ZA/Poid-ZA.github.io.git
cd Poid-ZA.github.io

# No build process needed! Just open in browser
open index.html

# Or use a local server (recommended)
python3 -m http.server 8000
# Visit http://localhost:8000
```

### GitHub Pages Deployment

This site is automatically deployed to:
```
https://poid-za.github.io/
```

Push to `main` branch to auto-deploy.

## 📋 Customization

### Update Personal Information

Edit `index.html`:

```html
<!-- Navigation Logo -->
<a href="#" class="nav-logo">
    <span>🐉</span> YOUR_NAME
</a>

<!-- Hero Section -->
<h1>Your Main Title</h1>
<p>Your Subtitle</p>

<!-- About Section -->
<p>Your bio here...</p>

<!-- Contact Links -->
<a href="https://github.com/YOUR_GITHUB" class="contact-link">GitHub</a>
<a href="mailto:your@email.com" class="contact-link">Email</a>
```

### Add Projects

Add a new project card in the Projects section:

```html
<div class="project-card">
    <div class="project-header">
        <div class="project-icon">🔧</div>
        <h3 class="project-title">Project Name</h3>
        <p class="project-desc">Short description</p>
    </div>
    <div class="project-body">
        <ul class="project-features">
            <li>Feature 1</li>
            <li>Feature 2</li>
        </ul>
        <a href="https://github.com/..." class="project-link" target="_blank">
            View on GitHub →
        </a>
    </div>
</div>
```

### Customize Colors

Edit CSS variables in the `<style>` tag:

```css
:root {
    --primary: #4ecdc4;     /* Main color */
    --secondary: #45b7d1;   /* Accent */
    --accent: #ff6b6b;      /* Highlights */
    /* ... */
}
```

Or for light mode:

```css
body.light-mode {
    --primary: #0099ff;
    /* ... */
}
```

## 🌐 Browser Support

- Chrome/Brave (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Optimization

- Responsive grid (1 column on mobile)
- Touch-friendly buttons
- Hamburger menu for navigation
- Optimized font sizes (clamp)
- Proper viewport meta tag

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Color contrast compliant
- Keyboard navigable
- Focus indicators
- Alt text for images

## 🚀 Performance Tips

- Uses CDN for external libraries
- Minimal custom CSS
- Hardware-accelerated animations
- Lazy-loaded images (browser native)
- Service worker for offline support

### Lighthouse Scores

Target metrics:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## 📝 SEO

- Descriptive page title
- Meta description
- Open Graph tags
- Structured markup ready
- Sitemap compatible
- Mobile-friendly

## 🔐 Privacy & Security

- No external tracking
- No analytics by default
- No cookies stored
- HTTPS enforced on GitHub Pages
- Third-party libraries vetted

## 🤝 Contributing

Want to improve this portfolio?

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🙏 Credits

- **Animations**: GSAP, Three.js
- **Icons**: Unicode emojis
- **Fonts**: System font stack
- **Design**: Modern web design best practices

## 📞 Contact

- **GitHub**: [@Poid-ZA](https://github.com/Poid-ZA)
- **Twitter/X**: [@poid_za](https://twitter.com/poid_za)
- **Email**: contact@poid-za.dev

## 🎯 Roadmap

- [ ] Blog section
- [ ] Project case studies
- [ ] Team section
- [ ] Testimonials carousel
- [ ] Newsletter signup
- [ ] Analytics (optional)
- [ ] Multi-language support

---

**Last Updated**: 2026-02-21  
**Version**: 2.0 (Enhanced)  
**Status**: ✅ Production Ready
