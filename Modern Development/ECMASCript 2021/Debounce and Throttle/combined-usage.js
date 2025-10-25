// Search with debounce - waits for user to stop typing
class SearchBox {
    constructor(inputSelector, onSearch) {
        this.input = document.querySelector(inputSelector);
        this.onSearch = onSearch;
        this.debouncedSearch = debounce((query) => {
            if (query.length > 2) this.onSearch(query);
        }, 300);
        this.input.addEventListener('input', e => this.debouncedSearch(e.target.value));
    }
}

// Auto-save form after user stops typing
class AutoSaveForm {
    constructor(formSelector, saveUrl) {
        this.form = document.querySelector(formSelector);
        this.saveUrl = saveUrl;
        this.debouncedSave = debounce(() => this.save(), 1000);
        this.form.addEventListener('input', () => this.debouncedSave());
    }
    
    async save() {
        const data = new FormData(this.form);
        try {
            await fetch(this.saveUrl, {
                method: 'POST',
                body: new URLSearchParams(data)
            });
            console.log('Saved');
        } catch (e) {
            console.error('Save failed', e);
        }
    }
}

// Handle window resize with throttle
class ResponsiveLayout {
    constructor() {
        this.throttledResize = throttle(() => this.handleResize(), 500);
        window.addEventListener('resize', this.throttledResize);
    }
    
    handleResize() {
        const width = window.innerWidth;
        if (width < 768) {
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }
    }
}

// Scroll detection with throttle
class ScrollHandler {
    constructor() {
        this.throttledScroll = throttle(() => {
            const pos = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            if (pos + window.innerHeight >= docHeight - 100) {
                this.loadMore();
            }
        }, 300);
        window.addEventListener('scroll', this.throttledScroll);
    }
    
    loadMore() {
        console.log('Load more content');
    }
}
