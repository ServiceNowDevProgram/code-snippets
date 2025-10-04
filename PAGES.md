# GitHub Pages Site Documentation

This document describes the GitHub Pages implementation for the ServiceNow Code Snippets repository.

## Overview

The GitHub Pages site provides a beautiful, user-friendly interface for browsing the ServiceNow code snippets collection. It features:

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with ServiceNow branding
- **Category Navigation**: Organized browsing by the 6 main categories
- **Search Functionality**: Find specific snippets quickly
- **Syntax Highlighting**: Beautiful code presentation with Prism.js
- **Dark Mode Support**: Automatic dark/light mode based on user preferences
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation and screen reader support

## Site Structure

```
/
├── index.html              # Main landing page
├── core-apis.html          # Core ServiceNow APIs category page
├── sitemap.xml            # SEO sitemap
├── _config.yml            # Jekyll configuration
├── assets/
│   ├── css/
│   │   └── custom.css     # Additional styling and utilities
│   ├── js/
│   │   └── site.js        # Site functionality and interactions
│   └── images/            # Site images and assets
└── .github/
    └── workflows/
        └── pages.yml      # GitHub Pages deployment workflow
```

## Features

### Design System

The site uses a comprehensive design system with:

- **Color Palette**: ServiceNow-inspired blues and greens
- **Typography**: Inter font for readability, JetBrains Mono for code
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable cards, buttons, and navigation elements
- **Responsive Grid**: CSS Grid and Flexbox for layouts

### Category Pages

Each of the 6 main categories has:

- **Overview Page**: Description and subcategory listing
- **GitHub Integration**: Direct links to repository folders
- **Featured Examples**: Highlighted code snippets
- **Statistics**: Snippet counts and contribution metrics

### Search Implementation

The search functionality includes:

- **Real-time Search**: As-you-type filtering
- **Category Search**: Search within specific categories
- **Fuzzy Matching**: Flexible search terms
- **Result Highlighting**: Matched terms highlighted in results

### Performance Optimizations

- **CDN Assets**: External libraries loaded from CDN
- **Minified CSS/JS**: Optimized asset delivery
- **Image Optimization**: Responsive images with lazy loading
- **Caching**: Appropriate cache headers for static assets

## Development

### Local Development

To run the site locally:

```bash
# Install Jekyll and dependencies
gem install jekyll bundler
bundle install

# Serve the site locally
bundle exec jekyll serve

# Site will be available at http://localhost:4000
```

### File Organization

- **HTML Files**: Main pages in the root directory
- **Assets**: CSS, JS, and images in the `/assets` directory
- **Configuration**: Jekyll config in `_config.yml`
- **Workflows**: GitHub Actions in `.github/workflows/`

### Making Changes

1. **Content Updates**: Edit HTML files directly
2. **Styling Changes**: Modify CSS files in `/assets/css/`
3. **Functionality**: Update JavaScript in `/assets/js/`
4. **Configuration**: Update `_config.yml` for Jekyll settings

### Deployment

The site automatically deploys via GitHub Actions when:

- Changes are pushed to the `main` branch
- Pull requests are merged
- Manual workflow dispatch is triggered

The deployment process:

1. **Build**: Jekyll builds the static site
2. **Deploy**: GitHub Pages hosts the built site
3. **URL**: Available at `https://servicenowdevprogram.github.io/code-snippets/`

## Customization

### Adding New Categories

To add a new category:

1. **Create Category Page**: New HTML file (e.g., `new-category.html`)
2. **Update Navigation**: Add links in `index.html`
3. **Update Site.js**: Add category to the categories object
4. **Update Sitemap**: Add new URLs to `sitemap.xml`

### Modifying Design

The design system is built with CSS custom properties (variables):

```css
:root {
    --primary-color: #1a73e8;     /* ServiceNow blue */
    --secondary-color: #34a853;   /* ServiceNow green */
    --bg-primary: #ffffff;        /* Background color */
    --text-primary: #202124;      /* Text color */
    /* ... more variables */
}
```

Change these variables to customize the entire site's appearance.

### Adding Features

Common feature additions:

1. **New Components**: Create reusable CSS classes
2. **JavaScript Functionality**: Add to `site.js` or create new modules
3. **External Integrations**: GitHub API calls, analytics, etc.
4. **Search Enhancements**: Integrate with external search services

## SEO and Analytics

### SEO Features

- **Meta Tags**: Comprehensive meta descriptions and titles
- **Structured Data**: JSON-LD for search engines
- **Sitemap**: XML sitemap for search indexing
- **Open Graph**: Social media sharing optimization
- **Performance**: Fast loading times and mobile optimization

### Analytics Integration

The site is prepared for analytics integration:

- **Google Analytics**: Add tracking code to templates
- **GitHub Insights**: Track repository interactions
- **Search Analytics**: Monitor search query patterns

## Accessibility

The site follows WCAG 2.1 guidelines:

- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Minimum 4.5:1 contrast ratios
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects user motion preferences

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Legacy Support**: IE11+ (with graceful degradation)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet

## Contributing to the Site

To contribute improvements to the GitHub Pages site:

1. **Fork the Repository**: Create your own fork
2. **Create Feature Branch**: Work on a dedicated branch
3. **Test Changes**: Verify locally before submitting
4. **Submit PR**: Include description of changes
5. **Review Process**: Site changes require maintainer review

## Troubleshooting

### Common Issues

1. **Build Failures**: Check Jekyll syntax and dependencies
2. **Missing Assets**: Verify file paths and asset organization
3. **Broken Links**: Update internal links when moving files
4. **Mobile Issues**: Test responsive design on various devices

### Getting Help

- **Repository Issues**: Report bugs on GitHub
- **Documentation**: Check Jekyll and GitHub Pages docs
- **Community**: Ask questions on ServiceNow Developer Community

## Future Enhancements

Planned improvements:

- **Advanced Search**: Full-text search across code content
- **User Contributions**: Submit snippets directly through the site
- **Interactive Examples**: Live code execution and testing
- **API Integration**: Real-time data from GitHub API
- **Multilingual Support**: Internationalization for global users

---

This GitHub Pages site transforms the ServiceNow Code Snippets repository into a beautiful, functional web application that makes it easy for developers to discover and use ServiceNow code examples.