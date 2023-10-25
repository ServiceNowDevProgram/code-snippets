// Detecting Online/Offline Status
function DetectingOnlineStatus() {
  if (navigator.onLine) {
    return true;
  } else {
    return false;
  }
}
