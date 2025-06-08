document.addEventListener("DOMContentLoaded", function () {
  const langSwitcher = document.getElementById("languageSwitcher");

  // English-to-German filename map
  const pageMap = {
    "index.html": "index-de.html",
    "about-us.html": "about-us-de.html",
    "SpanishAR.html": "SpanishAR-de.html",
    "the-spanish-way-about.html": "the-spanish-way-about-de.html",
    "the-spanish-way-route.html": "the-spanish-way-route-de.html",
    "the-spanish-way-interactive-map.html": "the-spanish-way-interactive-map-de.html",
    "the-spanish-way-castle-vischering.html": "the-spanish-way-castle-vischering-de.html",
    "the-spanish-way-cologne": "the-spanish-way-cologne-de.html",
    "the-spanish-way-haus-bodelschwingh": "the-spanish-way-haus-bodelschwingh-de.html",
    "the-spanish-way-haus-kemnade": "the-spanish-way-haus-kemnade-de.html",
  };

  // Invert the mapping
  const reversePageMap = Object.fromEntries(
    Object.entries(pageMap).map(([en, de]) => [de, en])
  );

  const currentPath = window.location.pathname;
  const pathParts = currentPath.split('/');
  const currentFile = pathParts[pathParts.length - 1];
  const inGerman = pathParts.includes("de");

  langSwitcher.value = inGerman ? "de" : "en";

  langSwitcher.addEventListener("change", function () {
    const targetLang = this.value;

    let newRelativePath;
    if (targetLang === "de" && !inGerman) {
      // Going from EN to DE
      const deFile = pageMap[currentFile];
      if (deFile) {
        newRelativePath = `de/${deFile}`;
      }
    } else if (targetLang === "en" && inGerman) {
      // Going from DE to EN
      const deFile = currentFile;
      const enFile = reversePageMap[deFile];
      if (enFile) {
        // Move one directory up from /de/
        newRelativePath = `../${enFile}`;
      }
    }

    if (newRelativePath) {
      window.location.href = newRelativePath;
    }
  });
});
