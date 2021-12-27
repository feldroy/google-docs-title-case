/* What should the add-on do after it is installed */
function onInstall() {
  onOpen();
}

/* What should the add-on do when a document is opened */
function onOpen() {
  DocumentApp.getUi()
    .createAddonMenu() // Add a new option in the Google Docs Add-ons Menu
    .addItem("Title Case", "TitleCaseHeader")
    .addToUi(); // Run the showSidebar function when someone clicks the menu
}

function toTitleCase(str) {
  "use strict";
  var smallWords =
    /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i;
  var alphanumericPattern = /([A-Za-z0-9\u00C0-\u00FF])/;
  var wordSeparators = /([ :–—-])/;

  return str
    .split(wordSeparators)
    .map(function (current, index, array) {
      if (
        /* Check for small words */
        current.search(smallWords) > -1 &&
        /* Skip first and last word */
        index !== 0 &&
        index !== array.length - 1 &&
        /* Ignore title end and subtitle start */
        array[index - 3] !== ":" &&
        array[index + 1] !== ":" &&
        /* Ignore small words that start a hyphenated phrase */
        (array[index + 1] !== "-" ||
          (array[index - 1] === "-" && array[index + 1] === "-"))
      ) {
        return current.toLowerCase();
      }

      /* Ignore intentional capitalization */
      if (current.substr(1).search(/[A-Z]|\../) > -1) {
        return current;
      }

      /* Ignore URLs */
      if (array[index + 1] === ":" && array[index + 2] !== "") {
        return current;
      }

      /* keywords to be ignored */

      var wordsToBeIgnored = [
        "hellodjango",
        "createsuperuser",
        "runserver",
        "startproject",
        "settings.py",
        "my_statement",
        "everycheese",
      ];
      for (var i = 0; i < wordsToBeIgnored.length; ++i) {
        if (current === wordsToBeIgnored[i]) {
          console.log("this also working");
          return current;
        }
      }

      /* Capitalize the first letter */
      return current.replace(alphanumericPattern, function (match) {
        return match.toUpperCase();
      });
    })
    .join("");
}

function TitleCaseHeader() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var numChildren = body.getNumChildren();
  var pars = body.getParagraphs();

  var heading1 = DocumentApp.ParagraphHeading.HEADING1;
  var heading2 = DocumentApp.ParagraphHeading.HEADING2;
  var heading3 = DocumentApp.ParagraphHeading.HEADING3;
  var heading4 = DocumentApp.ParagraphHeading.HEADING4;
  var heading5 = DocumentApp.ParagraphHeading.HEADING5;
  var heading6 = DocumentApp.ParagraphHeading.HEADING6;
  var searchType = DocumentApp.ElementType.PARAGRAPH;
  var searchResult = null;
  var comicNeue = DocumentApp.FontFamily.COMIC_SANS_MS;

  while ((searchResult = body.findElement(searchType, searchResult))) {
    var par = searchResult.getElement().asParagraph();
    if (
      par.getHeading() == heading1 ||
      par.getHeading() == heading2 ||
      par.getHeading() == heading3 ||
      par.getHeading() == heading4 ||
      par.getHeading() == heading5 ||
      par.getHeading() == heading6
    ) {
      // Found one, update
      console.log(par.getText());
      var titleCaseText = toTitleCase(par.getText());
      if (titleCaseText == "") {
        continue;
      }
      par.setText(titleCaseText);
      par
        .editAsText()
        .setFontFamily(0, par.editAsText().getText().length - 1, "Comic Neue");
      console.log(titleCaseText);

      switch (par.getHeading()) {
        case heading1:
          par.editAsText().setFontSize(24);
          break;
        case heading2:
          par.editAsText().setFontSize(17);
          break;
        case heading3:
          par.editAsText().setFontSize(13);
          break;
      }

      par.editAsText().setBold(true);
      par.editAsText().setForegroundColor("#373d49");
    }
  }
}
