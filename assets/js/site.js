/**
 * ServiceNow Code Snippets Site JavaScript
 * Handles dynamic content loading, search, and navigation
 */

class CodeSnippetsSite {
    constructor() {
        this.categories = {
            'core-servicenow-apis': {
                title: 'Core ServiceNow APIs',
                description: 'Essential ServiceNow JavaScript APIs and classes',
                icon: 'fas fa-code',
                subcategories: [
                    'GlideRecord', 'GlideAjax', 'GlideSystem', 'GlideDate', 
                    'GlideDateTime', 'GlideElement', 'GlideFilter', 'GlideAggregate',
                    'GlideHTTPRequest', 'GlideModal', 'GlideQuery', 'GlideTableDescriptor'
                ]
            },
            'server-side-components': {
                title: 'Server-Side Components',
                description: 'Server-executed code and components',
                icon: 'fas fa-server',
                subcategories: [
                    'Background Scripts', 'Business Rules', 'Script Includes',
                    'Script Actions', 'Scheduled Jobs', 'Transform Map Scripts',
                    'Server Side', 'Inbound Actions', 'Processors'
                ]
            },
            'client-side-components': {
                title: 'Client-Side Components',
                description: 'Browser-executed code and UI components',
                icon: 'fas fa-desktop',
                subcategories: [
                    'Client Scripts', 'Catalog Client Script', 'UI Actions',
                    'UI Scripts', 'UI Pages', 'UI Macros', 'UX Client Scripts',
                    'UX Client Script Include', 'UX Data Broker Transform'
                ]
            },
            'modern-development': {
                title: 'Modern Development',
                description: 'Modern ServiceNow frameworks and approaches',
                icon: 'fas fa-rocket',
                subcategories: [
                    'Service Portal', 'Service Portal Widgets', 'NOW Experience',
                    'GraphQL', 'ECMASCript 2021'
                ]
            },
            'integration': {
                title: 'Integration',
                description: 'External systems and data exchange',
                icon: 'fas fa-plug',
                subcategories: [
                    'Integration', 'RESTMessageV2', 'Import Set API',
                    'Scripted REST Api', 'Mail Scripts', 'MIDServer', 'Attachments'
                ]
            },
            'specialized-areas': {
                title: 'Specialized Areas',
                description: 'Domain-specific functionality',
                icon: 'fas fa-cogs',
                subcategories: [
                    'CMDB', 'ITOM', 'Performance Analytics', 'ATF Steps',
                    'Agile Development', 'Advanced Conditions', 'Browser Bookmarklets',
                    'Browser Utilities', 'Dynamic Filters', 'Fix scripts',
                    'Flow Actions', 'Formula Builder', 'Notifications',
                    'On-Call Calendar', 'Record Producer', 'Regular Expressions', 'Styles'
                ]
            }
        };

        this.init();
    }

    init() {
        this.setupSearch();
        this.setupNavigation();
        this.loadAnalytics();
    }

    setupSearch() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.performSearch(e.target.value);
                }, 300);
            });
        }
    }

    performSearch(query) {
        if (!query || query.length < 2) {
            this.clearSearchResults();
            return;
        }

        // Simple search implementation
        // In a real implementation, this would use a search index or GitHub API
        const results = this.searchCategories(query.toLowerCase());
        this.displaySearchResults(results);
    }

    searchCategories(query) {
        const results = [];
        
        Object.entries(this.categories).forEach(([key, category]) => {
            // Search in category title and description
            if (category.title.toLowerCase().includes(query) || 
                category.description.toLowerCase().includes(query)) {
                results.push({
                    type: 'category',
                    key: key,
                    title: category.title,
                    description: category.description,
                    icon: category.icon
                });
            }

            // Search in subcategories
            category.subcategories.forEach(subcategory => {
                if (subcategory.toLowerCase().includes(query)) {
                    results.push({
                        type: 'subcategory',
                        category: category.title,
                        title: subcategory,
                        path: `${category.title}/${subcategory}`
                    });
                }
            });
        });

        return results;
    }

    displaySearchResults(results) {
        // This would create a search results overlay
        console.log('Search results:', results);
        
        // For now, just log the results
        // In a full implementation, this would show a dropdown or overlay
        if (results.length > 0) {
            console.log(`Found ${results.length} results`);
        } else {
            console.log('No results found');
        }
    }

    clearSearchResults() {
        // Clear any search result displays
        console.log('Clearing search results');
    }

    setupNavigation() {
        // Add click handlers for category cards
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const onclick = card.getAttribute('onclick');
                if (onclick && onclick.includes('navigateToCategory')) {
                    const categoryMatch = onclick.match(/navigateToCategory\('([^']+)'/);
                    if (categoryMatch) {
                        this.navigateToCategory(categoryMatch[1]);
                    }
                }
            });
        });
    }

    navigateToCategory(categoryKey) {
        const category = this.categories[categoryKey];
        if (category) {
            // For GitHub Pages, navigate to the category page
            const categoryMap = {
                'core-servicenow-apis': 'Core%20ServiceNow%20APIs',
                'server-side-components': 'Server-Side%20Components',
                'client-side-components': 'Client-Side%20Components',
                'modern-development': 'Modern%20Development',
                'integration': 'Integration',
                'specialized-areas': 'Specialized%20Areas'
            };
            
            const githubUrl = `https://github.com/ServiceNowDevProgram/code-snippets/tree/main/${categoryMap[categoryKey]}`;
            window.open(githubUrl, '_blank');
        }
    }

    loadAnalytics() {
        // Simple analytics tracking
        this.trackPageView();
        this.updateStats();
    }

    trackPageView() {
        // Track page view (placeholder for real analytics)
        console.log('Page view tracked:', {
            page: window.location.pathname,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        });
    }

    updateStats() {
        // Update dynamic statistics
        const totalSnippets = document.getElementById('total-snippets');
        const totalContributors = document.getElementById('total-contributors');

        if (totalSnippets) {
            // These could be fetched from GitHub API
            setTimeout(() => {
                totalSnippets.textContent = '950+';
            }, 1000);
        }

        if (totalContributors) {
            setTimeout(() => {
                totalContributors.textContent = 'Community';
            }, 1200);
        }
    }

    // Utility methods
    static createElementWithClasses(tag, classes, content = '') {
        const element = document.createElement(tag);
        if (classes) {
            element.className = classes;
        }
        if (content) {
            element.textContent = content;
        }
        return element;
    }

    static formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// GitHub API helper class
class GitHubAPI {
    constructor() {
        this.baseUrl = 'https://api.github.com';
        this.repo = 'ServiceNowDevProgram/code-snippets';
    }

    async getRepoStats() {
        try {
            const response = await fetch(`${this.baseUrl}/repos/${this.repo}`);
            const data = await response.json();
            return {
                stars: data.stargazers_count,
                forks: data.forks_count,
                size: data.size,
                language: data.language,
                updatedAt: data.updated_at
            };
        } catch (error) {
            console.error('Error fetching repo stats:', error);
            return null;
        }
    }

    async getContributors() {
        try {
            const response = await fetch(`${this.baseUrl}/repos/${this.repo}/contributors`);
            const data = await response.json();
            return data.map(contributor => ({
                login: contributor.login,
                contributions: contributor.contributions,
                avatar: contributor.avatar_url,
                profile: contributor.html_url
            }));
        } catch (error) {
            console.error('Error fetching contributors:', error);
            return [];
        }
    }

    async getDirectoryContents(path = '') {
        try {
            const response = await fetch(`${this.baseUrl}/repos/${this.repo}/contents/${path}`);
            const data = await response.json();
            return data.filter(item => item.type === 'dir').map(dir => ({
                name: dir.name,
                path: dir.path,
                type: dir.type
            }));
        } catch (error) {
            console.error('Error fetching directory contents:', error);
            return [];
        }
    }
}

// Initialize the site when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.codeSnippetsSite = new CodeSnippetsSite();
    window.githubAPI = new GitHubAPI();
    
    // Initialize any additional features
    initializeFeatures();
});

function initializeFeatures() {
    // Dark mode toggle (if implemented)
    initializeDarkMode();
    
    // Smooth scrolling
    initializeSmoothScrolling();
    
    // External link handling
    initializeExternalLinks();
}

function initializeDarkMode() {
    // Placeholder for dark mode toggle
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    prefersDark.addEventListener('change', (e) => {
        console.log('Color scheme changed to:', e.matches ? 'dark' : 'light');
        // Update theme if needed
    });
}

function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CodeSnippetsSite, GitHubAPI };
}