function runImportNow(scopeName) {
  if (gs.tableExists("sys_language")) {
    var gr = new GlideRecord("sys_language");
    gr.addActiveQuery();
    gr.query();

    while (gr.next()) {
      var lName = gr.name.toLowerCase();

      if (lName !== "english") {
        if (lName.contains(" - ")) lName = lName.replace(" - ", /-/g);
        else if (lName.contains(" ")) lName = lName.replaceAll(" ", "_");

        var tl = new global.TranslationLoader();
        tl.languageAbbreviation = tl.getLanguageAbbreviation0("com.snc.i18n." + lName);

        tl.loadTranslationsFromAppPlugin(scopeName);
        gs.info("Completed loading application language files for: " + scopeName + " " + lName);
      }
    }
  }
}
