// Minimal storage helpers for localStorage / sessionStorage
function createStorage(storage, prefix = '') {
  const key = k => prefix + k;
  return {
    set(k, v) {
      try { storage.setItem(key(k), JSON.stringify(v)); } catch (e) { /* ignore */ }
    },
    get(k) {
      try { const v = storage.getItem(key(k)); return v ? JSON.parse(v) : null; } catch (e) { return null; }
    },
    remove(k) {
      try { storage.removeItem(key(k)); } catch (e) { }
    },
    clear() {
      try { if (!prefix) storage.clear(); else {
        // remove keys that start with prefix
        for (let i = storage.length - 1; i >= 0; i--) {
          const k = storage.key(i); if (k && k.indexOf(prefix) === 0) storage.removeItem(k);
        }
      }} catch (e) {}
    },
    keys() {
      const out = [];
      for (let i = 0; i < storage.length; i++) {
        const k = storage.key(i); if (k && (!prefix || k.indexOf(prefix) === 0)) out.push(prefix ? k.slice(prefix.length) : k);
      }
      return out;
    }
  };
}

const localStore = (prefix) => createStorage(window.localStorage, prefix);
const sessionStore = (prefix) => createStorage(window.sessionStorage, prefix);

// Export for Node/test environments (if needed)
if (typeof module !== 'undefined' && module.exports) module.exports = { createStorage, localStore, sessionStore };
