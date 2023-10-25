// Access information about the user's browser
function BrowserInformation() {
  const browserName = navigator.userAgent;
  const browserLanguage = navigator.language;
  const isMobile = /Mobile/.test(navigator.userAgent);

  return {
    name: browserName,
    language: browserLanguage,
    isMobile: isMobile,
  };
}
