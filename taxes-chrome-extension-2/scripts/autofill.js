// Example autofill data
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
