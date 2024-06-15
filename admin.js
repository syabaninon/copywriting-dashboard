// Function to add copywriting to local storage
function addCopywriting() {
  const subject = document.getElementById('subject').value;
  const title = document.getElementById('title').value;
  const copywriting = document.getElementById('copywriting').value;

  // Create an object for the copywriting
  const copyData = {
      subject: subject,
      title: title,
      copywriting: copywriting
  };

  // Retrieve existing data from local storage
  let copyList = JSON.parse(localStorage.getItem('copyList')) || [];

  // Add new copywriting to the list
  copyList.push(copyData);

  // Save the updated list back to local storage
  localStorage.setItem('copyList', JSON.stringify(copyList));

  // Clear the form fields
  document.getElementById('copywritingForm').reset();

  // Update the subject list
  updateSubjectList();
}

// Function to update the subject list
function updateSubjectList() {
  // Retrieve data from local storage
  let copyList = JSON.parse(localStorage.getItem('copyList')) || [];

  // Get the subject list container
  const subjectList = document.getElementById('subjectList');

  // Clear any existing content
  subjectList.innerHTML = '';

  // Loop through the copywriting list and create list items for each subject
  copyList.forEach((copyData, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = copyData.subject;
      listItem.onclick = () => editCopywriting(index);
      subjectList.appendChild(listItem);
  });
}

// Function to edit copywriting
function editCopywriting(index) {
  // Retrieve data from local storage
  let copyList = JSON.parse(localStorage.getItem('copyList')) || [];

  // Get the copywriting data
  const copyData = copyList[index];

  // Fill the form fields with the copywriting data
  document.getElementById('subject').value = copyData.subject;
  document.getElementById('title').value = copyData.title;
  document.getElementById('copywriting').value = copyData.copywriting;

  // Remove the old copywriting data
  copyList.splice(index, 1);

  // Save the updated list back to local storage
  localStorage.setItem('copyList', JSON.stringify(copyList));

  // Update the subject list
  updateSubjectList();
}

// Load the subject list when the page loads
window.onload = updateSubjectList;
