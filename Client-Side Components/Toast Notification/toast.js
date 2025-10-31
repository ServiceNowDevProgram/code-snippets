
(function(){
  if (window.SnToast) return;

  // Create container and attach to body when needed
  function ensureContainer() {
    var id = 'sn-toast-container';
    var c = document.getElementById(id);
    if (!c) {
      c = document.createElement('div');
      c.id = id;
      c.style.position = 'fixed';
      c.style.top = '12px';
      c.style.right = '12px';
      c.style.zIndex = '99999';
      c.style.display = 'flex';
      c.style.flexDirection = 'column';
      c.style.alignItems = 'flex-end';
      document.body.appendChild(c);
    }
    return c;
  }

  function buildToast(message, type) {
    var t = document.createElement('div');
    t.className = 'sn-toast';
    t.textContent = message || '';
    t.style.minWidth = '160px';
    t.style.maxWidth = '420px';
    t.style.padding = '10px 14px';
    t.style.marginTop = '8px';
    t.style.borderRadius = '8px';
    t.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)';
    t.style.fontSize = '13px';
    t.style.lineHeight = '1.2';
    t.style.color = '#fff';
    t.style.opacity = '1';
    t.style.transition = 'opacity 0.3s ease, transform 0.25s ease';
    t.style.transform = 'translateY(0)';
    // background based on type
    var bg = '#2ecc71'; // success
    if (type === 'error') bg = '#e74c3c';
    else if (type === 'warning') bg = '#f39c12';
    else if (type === 'info') bg = '#3498db';
    t.style.background = bg;
    return t;
  }

  window.SnToast = {
    showToast: function(type, message, opts) {
      try {
        if (typeof type !== 'string') { message = type; type = 'info'; }
        opts = opts || {};
        var duration = (typeof opts.duration === 'number') ? opts.duration : 3500;
        var container = ensureContainer();
        var toast = buildToast(message, type);
        container.appendChild(toast);

        // Auto-dismiss
        setTimeout(function() {
          toast.style.opacity = '0';
          toast.style.transform = 'translateY(-6px)';
          setTimeout(function(){ 
            if (toast && toast.parentNode) toast.parentNode.removeChild(toast); 
          }, 300);
        }, duration);
      } catch (e) {
        /* fallback to default g_form messages if available */
        if (window.g_form && g_form.addInfoMessage) {
          g_form.addInfoMessage(message);
        } else {
          console.error('SnToast error:', e);
        }
      }
    }
  };
})();
