document.addEventListener("DOMContentLoaded", function () {
  // Select elements by their correct IDs and classes
  const autofillButton = document.querySelector(".autofill-button");
  const chatboxInput = document.getElementById("chatbox-input");
  const chatboxSend = document.getElementById("chatbox-send");
  const chatboxMessages = document.querySelector(".chatbot-conversation-container");
  const openSidebarButton = document.getElementById("open-sidebar-button");

  const responses = {
      "what is pan": "PAN (Permanent Account Number) is a 10-character alphanumeric identifier.",
      "what is assessment year": "The assessment year is the year following the financial year in which income is evaluated for tax purposes.",
      "how do i file taxes": "You can file taxes by logging into the Income Tax Portal, filling the relevant ITR form, and submitting it.",
  };

  // Autofill button functionality
  autofillButton.addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              files: ["scripts/autofill.js"],
          });
      });
  });

  // Function to add a message to the chatbox
  function addMessageToChatbox(message, fromUser = true) {
      const messageElement = document.createElement("div");
      messageElement.textContent = message;
      messageElement.style.padding = "5px";
      messageElement.style.marginBottom = "5px";
      messageElement.style.borderRadius = "5px";
      messageElement.style.display = "inline-block"; // Make it inline-block for proper alignment

      if (fromUser) {
          messageElement.style.backgroundColor = "#f1f1f1"; // User message background
          messageElement.style.textAlign = "right"; // User message alignment
      } else {
          messageElement.style.backgroundColor = "#d4edda"; // AI message background
          messageElement.style.textAlign = "left"; // AI message alignment
      }

      chatboxMessages.appendChild(messageElement); // Add message to the chatbox
      chatboxMessages.scrollTop = chatboxMessages.scrollHeight; // Scroll to the bottom
  }

  // Send button functionality
  chatboxSend.addEventListener("click", function () {
      const userInput = chatboxInput.value.toLowerCase().trim();
      if (userInput) {
          addMessageToChatbox(userInput); // Add user message

          const response = responses[userInput] || "Sorry, I don't have an answer for that. Please refer to the FAQ.";
          addMessageToChatbox(response, false); // Add AI response

          chatboxInput.value = ""; // Clear input after sending
      }
  });

  // Open in Sidebar button functionality
  openSidebarButton.addEventListener("click", function () {
      const chatHistory = chatboxMessages.innerHTML; // Capture chat history
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(
              tabs[0].id,
              {
                  action: "toggleSidebar",
                  popupMessages: chatboxMessages.innerHTML, // Send chat messages to the sidebar
              },
              function () {
                  window.close(); // Close the popup when the sidebar opens
              }
          );
      });
  });

  // Initialize message display
  const message = document.getElementById("message");
  message.textContent = "Click to Autofill Form"; // Optional: Display initial message
});
