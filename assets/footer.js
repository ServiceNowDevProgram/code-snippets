// Shared Footer Component
// This component renders a consistent footer across all pages

class Footer {
    constructor(isRootPage = true) {
        this.isRootPage = isRootPage;
        this.baseUrl = isRootPage ? '' : '../';
    }

    getCSS() {
        return `
        /* Footer */
        .footer {
            background: var(--bg-secondary);
            border-top: 1px solid var(--border-light);
            padding: 3rem 0 2rem;
        }

        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        .footer-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .footer-section h3 {
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--text-primary);
        }

        .footer-section ul {
            list-style: none;
        }

        .footer-section ul li {
            margin-bottom: 0.5rem;
        }

        .footer-section ul li a {
            color: var(--text-secondary);
            text-decoration: none;
            transition: color 0.2s ease;
        }

        .footer-section ul li a:hover {
            color: var(--primary-color);
        }

        .footer-bottom {
            border-top: 1px solid var(--border-light);
            padding-top: 2rem;
            text-align: center;
            color: var(--text-muted);
        }
        `;
    }

    getHTML() {
        const pagesPath = this.isRootPage ? 'pages/' : '';

        return `
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-grid">
                    <div class="footer-section">
                        <h3>ServiceNow Code Snippets</h3>
                        <ul>
                            <li><a href="${pagesPath}core-apis.html">Core ServiceNow APIs</a></li>
                            <li><a href="${pagesPath}server-side-components.html">Server-Side Components</a></li>
                            <li><a href="${pagesPath}client-side-components.html">Client-Side Components</a></li>
                            <li><a href="${pagesPath}modern-development.html">Modern Development</a></li>
                            <li><a href="${pagesPath}integration.html">Integration</a></li>
                            <li><a href="${pagesPath}specialized-areas.html">Specialized Areas</a></li>
                        </ul>
                    </div>

                    <div class="footer-section">
                        <h3>Community</h3>
                        <ul>
                            <li><a href="https://github.com/ServiceNowDevProgram/code-snippets" target="_blank">GitHub Repository</a></li>
                            <li><a href="https://github.com/ServiceNowDevProgram/code-snippets/blob/main/CONTRIBUTING.md" target="_blank">Contributing Guide</a></li>
                            <li><a href="https://github.com/ServiceNowDevProgram/code-snippets/issues" target="_blank">Report Issues</a></li>
                            <li><a href="https://sndevs.slack.com/" target="_blank">sndevs Slack</a></li>
                            <li><a href="https://github.com/ServiceNowDevProgram/code-snippets/blob/main/README.md" target="_blank">README</a></li>
                            <li><a href="https://github.com/ServiceNowDevProgram/Hacktoberfest" target="_blank">Hacktoberfest repo</a></li>
                        </ul>
                    </div>

                    <div class="footer-section">
                        <h3>ServiceNow</h3>
                        <ul>
                            <li><a href="https://developer.servicenow.com/" target="_blank">Developer Program</a></li>
                            <li><a href="https://docs.servicenow.com/" target="_blank">Documentation</a></li>
                            <li><a href="https://www.servicenow.com/community" target="_blank">Community</a></li>
                        </ul>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p>2025 - Hosted by the ServiceNow Developer Program</p>
                    <p>This repository is provided as-is, without warranties. Use at your own risk.</p>
                </div>
            </div>
        </footer>
        `;
    }

    render() {
        // Add CSS if not already added
        if (!document.getElementById('footer-styles')) {
            const style = document.createElement('style');
            style.id = 'footer-styles';
            style.textContent = this.getCSS();
            document.head.appendChild(style);
        }

        // Create footer element
        const footerContainer = document.createElement('div');
        footerContainer.innerHTML = this.getHTML();

        return footerContainer.firstElementChild;
    }

    // Static method to easily add footer to any page
    static addToPage(isRootPage = true) {
        const footer = new Footer(isRootPage);
        const footerElement = footer.render();

        // Add footer to the page
        document.body.appendChild(footerElement);

        return footerElement;
    }
}

// Auto-initialize if script is loaded with data-auto-init
document.addEventListener('DOMContentLoaded', function() {
    const script = document.querySelector('script[src*="footer.js"]');
    if (script && script.hasAttribute('data-auto-init')) {
        const isRootPage = script.getAttribute('data-root-page') === 'true';
        Footer.addToPage(isRootPage);
    }
});

// Make Footer available globally
window.Footer = Footer;