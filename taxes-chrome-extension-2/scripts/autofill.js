// Example autofill data

// Create a tooltip for form guidance
function createTooltip(text, element) {
  let tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.innerHTML = text;
  tooltip.style.position = 'absolute';
  tooltip.style.backgroundColor = '#333';
  tooltip.style.color = '#fff';
  tooltip.style.padding = '5px';
  tooltip.style.borderRadius = '5px';
  tooltip.style.fontSize = '12px';
  tooltip.style.top = `${element.getBoundingClientRect().top - 30}px`;
  tooltip.style.left = `${element.getBoundingClientRect().left}px`;

  document.body.appendChild(tooltip);

  // Remove tooltip on mouseout
  element.addEventListener('mouseout', () => {
    tooltip.remove();
  });
}

// Example usage: Show a tooltip for PAN field
document.addEventListener('DOMContentLoaded', function() {
  const panField = document.querySelector('input[id="panInputField"]');
  if (panField) {
    panField.addEventListener('mouseover', () => {
      createTooltip("Enter your 10-digit Permanent Account Number (PAN).", panField);
    });
  }

  const nameField = document.querySelector('input[id="nameInputField"]');
  if (nameField) {
    nameField.addEventListener('mouseover', () => {
      createTooltip("Enter your full legal name as per your tax documents.", nameField);
    });
  }

  // Add more tooltips for other fields as needed
});


const formData = {
  panInputField: "ABCDE1234F",
  nameInputField: "John Doe",
  dobInputField: "1990-01-01",
  financialYearInputField: "2023-2024",
  incomeInputField: "500000",
  taxPaidInputField: "25000",
  assessmentYearInputField: "2024-2025",
  bankAccountInputField: "1234567890",
};
console.log("Autofill script running...");
const fillForm = () => {
  // Find form fields and set their values
  const panInputFieldElement = document.querySelector(
    'input[name="panInputField"]'
  );
  console.log(panInputFieldElement);
  const nameInputFieldElement = document.querySelector(
    'input[name="nameInputField"]'
  );
  const dobInputFieldElement = document.querySelector(
    'input[name="dobInputField"]'
  );
  const financialYearInputFieldElement = document.querySelector(
    'select[name="financialYearInputField"]'
  );
  const incomeInputFieldElement = document.querySelector(
    'input[name="incomeInputField"]'
  );
  const taxPaidInputFieldElement = document.querySelector(
    'input[name="taxPaidInputField"]'
  );
  const assessmentYearInputFieldElement = document.querySelector(
    'select[name="assessmentYearInputField"]'
  );
  const bankAccountInputFieldElement = document.querySelector(
    'input[name="bankAccountInputField"]'
  );

  // Autofill form fields with data
  if (panInputFieldElement) panInputFieldElement.value = formData.panInputField;
  if (nameInputFieldElement)
    nameInputFieldElement.value = formData.nameInputField;
  if (dobInputFieldElement) dobInputFieldElement.value = formData.dobInputField;
  if (financialYearInputFieldElement)
    financialYearInputFieldElement.value = formData.financialYearInputField;
  if (incomeInputFieldElement)
    incomeInputFieldElement.value = formData.incomeInputField;
  if (taxPaidInputFieldElement)
    taxPaidInputFieldElement.value = formData.taxPaidInputField;
  if (assessmentYearInputFieldElement)
    assessmentYearInputFieldElement.value = formData.assessmentYearInputField;
  if (bankAccountInputFieldElement)
    bankAccountInputFieldElement.value = formData.bankAccountInputField;
};

// Trigger the function to fill the form
fillForm();
