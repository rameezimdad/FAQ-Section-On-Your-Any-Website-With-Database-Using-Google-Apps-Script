function doGet() {
  var output = HtmlService.createHtmlOutputFromFile('index');
  output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return output;
}

function getFAQDataFromSheet() {
 var sheetId = "//// PASTE YOUR GOOGLE SHEET ID ////";
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName("FAQ");
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var range = sheet.getRange("B2:" + sheet.getRange(lastRow, lastColumn).getA1Notation());
  var values = range.getValues();
  
  var FAQData = [];
  values.forEach(function(row) {
    var question = row[0];
    var answer = [];
    for (var i = 1; i < row.length; i++) {
      if (row[i] !== "") {
        answer.push(row[i]);
      } else {
        break; // Stop adding points if an empty cell is encountered
      }
    }
    FAQData.push({ question: question, answer: answer });
  });
  
  return FAQData;
}
