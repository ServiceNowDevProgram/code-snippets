// Demo client script showing how to use SnToast
// Place in a Client Script (onLoad or onChange) or run from browser console

function onLoad() {
  // Example: success toast
  SnToast.showToast('success', 'Record saved successfully', { duration: 3000 });

  // Example: error toast after a simulated async operation
  setTimeout(function() {
    SnToast.showToast('error', 'Failed to sync with external system', { duration: 5000 });
  }, 1200);
}
