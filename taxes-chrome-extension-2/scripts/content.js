function createSidebar(popupMessages = []) {
  if (document.getElementById("my-extension-sidebar")) {
    return; // Sidebar already exists
  }

  const sidebar = document.createElement("div");
  sidebar.id = "my-extension-sidebar";
  sidebar.style.position = "fixed";
  sidebar.style.top = "0";
  sidebar.style.right = "0";
  sidebar.style.width = "360px"; // Match popup width
  sidebar.style.height = "100%";
  sidebar.style.backgroundColor = "var(--dark-bg)"; // Dark background from styles
  sidebar.style.zIndex = "10000";
  sidebar.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.3)";
  sidebar.style.padding = "1em";
  sidebar.style.borderLeft = "1px solid #ccc";

  sidebar.innerHTML = `
    <div class="chatbot-container">
      <div class="chatbot-header">
        <h3 class="form-chat-assistant">Form Filling Assistant</h3>
        <button id="close-sidebar" class="autofill-button" style="background: red; color: white; border: none; padding: 5px 10px; cursor: pointer;">Close</button>
      </div>
      <div class="chatbot-conversation-container" id="sidebar-chatbox-messages" style="height: 250px; overflow-y: auto; margin: 1em 0; background-color: #f4f4f9; border: 1px solid #ccc; border-radius: var(--border-rad-lg);"></div>
      <div class="chatbot-input-container">
        <input type="text" id="sidebar-chatbox-input" placeholder="Ask a question..." style="width: 100%; padding: 1em; color: var(--light-text); border: 1px solid #586e88; border-radius: var(--border-rad-lg);"/>
        <button id="sidebar-chatbox-send" style="padding: 1em; background-color: var(--dark-bg); color: var(--light-text); border: 1px solid #586e88; border-radius: var(--border-rad-lg); cursor: pointer;">Send</button>
      </div>
    </div>
  `;

  document.body.appendChild(sidebar);

  const sidebarInput = document.getElementById("sidebar-chatbox-input");
  const sidebarSend = document.getElementById("sidebar-chatbox-send");
  const sidebarMessages = document.getElementById("sidebar-chatbox-messages");

  // Load popup chat messages into the sidebar
  popupMessages.forEach((msg) => {
    addMessageToSidebar(msg.text, msg.fromUser);
  });

  sidebarSend.addEventListener("click", function () {
    const userInput = sidebarInput.value.toLowerCase().trim();
    if (!userInput) return;

    addMessageToSidebar(userInput, true);
    const response = getResponse(userInput); // Use your response logic here
    addMessageToSidebar(response, false);

    sidebarInput.value = ""; // Clear input
  });

  // Close the sidebar when clicking the close button
  document
    .getElementById("close-sidebar")
    .addEventListener("click", function () {
      document.getElementById("my-extension-sidebar").remove();
    });

  function addMessageToSidebar(message, fromUser) {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageElement.style.marginBottom = "5px";
    messageElement.style.padding = "5px";
    messageElement.style.borderRadius = "var(--border-rad-lg)";
    messageElement.style.backgroundColor = fromUser ? "#2f4f4f" : "#334959"; // Match speech bubble colors
    messageElement.style.color = "var(--light-text)";
    messageElement.style.textAlign = fromUser ? "right" : "left";
    sidebarMessages.appendChild(messageElement);
    sidebarMessages.scrollTop = sidebarMessages.scrollHeight; // Scroll to bottom
  }
}

// Function to return response based on user input
function getResponse(userInput) {
  const responses = {
    "what is pan":
      "PAN (Permanent Account Number) is a 10-character alphanumeric identifier.",
    "what is assessment year":
      "The assessment year is the year following the financial year in which income is evaluated for tax purposes.",
    "how do i file taxes":
      "You can file taxes by logging into the Income Tax Portal, filling the relevant ITR form, and submitting it.",
  };
  return responses[userInput] || "Sorry, I don't have an answer for that.";
}

// Listen for messages from the popup to toggle the sidebar and pass chat messages
chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === "toggleSidebar") {
    createSidebar(message.popupMessages); // Pass popup messages to sidebar
  }
});
