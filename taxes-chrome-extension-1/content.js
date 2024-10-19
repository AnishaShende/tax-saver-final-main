document.addEventListener("mouseup", function () {
  let selectedText = window.getSelection().toString().trim();

  if (selectedText.length > 0) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedText}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const meaning = data[0].meanings[0].definitions[0].definition;
          showPopup(selectedText, meaning);
        } else {
          showPopup(selectedText, "No definition found");
        }
      })
      .catch((err) => console.log(err));
  }
});

function showPopup(selectedText, meaning) {
  const popup = document.createElement("div");
  popup.style.position = "absolute";
  popup.style.background = "yellow";
  popup.style.border = "1px solid black";
  popup.style.padding = "10px";
  popup.style.zIndex = 1000;
  popup.innerHTML = `<strong>${selectedText}:</strong> ${meaning}`;
  document.body.appendChild(popup);

  // Set the position of the popup
  const { top, left } = window
    .getSelection()
    .getRangeAt(0)
    .getBoundingClientRect();
  popup.style.top = `${top + window.scrollY + 10}px`;
  popup.style.left = `${left + window.scrollX + 10}px`;

  // Remove popup after 5 seconds
  setTimeout(() => popup.remove(), 5000);
}
