// This script runs when the popup is opened
document.addEventListener("DOMContentLoaded", function () {
  // Example: handling a button click in the popup
  const autofillButton = document.getElementById("autofillButton");

  autofillButton.addEventListener("click", function () {
    // Send a message to the background script to autofill the form
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["scripts/autofill.js"], // The content script to autofill the form
      });
    });
  });

  // Example: Display some dynamic text in the popup
  const message = document.getElementById("message");
  message.textContent = "Click to Autofill Form";
});
