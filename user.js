// Function to load and display copywriting from local storage
function loadCopywriting() {
  // Retrieve data from local storage
  let copyList = JSON.parse(localStorage.getItem('copyList')) || [];

  // Get the copywriting grid container
  const copywritingGrid = document.getElementById('copywritingGrid');

  // Clear any existing content
  copywritingGrid.innerHTML = '';

  // Loop through the copywriting list and create cards for each item
  copyList.forEach(copyData => {
      const card = document.createElement('div');
      card.classList.add('copy-card');

      // Create the content, preserving line breaks
      const content = `
          <h3>${copyData.subject}</h3>
          <h4>${copyData.title}</h4>
          <p>${copyData.copywriting.replace(/\n/g, '<br>')}</p>
          <button onclick="copyToClipboard(this)">Copy</button>
          <div class="copied-notice">Copied to clipboard</div>
      `;
      card.innerHTML = content;

      // Append the card to the grid
      copywritingGrid.appendChild(card);
  });
}

// Function to copy text to clipboard
function copyToClipboard(button) {
  const copyText = button.previousElementSibling.innerHTML;
  const textarea = document.createElement('textarea');
  textarea.innerHTML = copyText.replace(/<br>/g, '\n');
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  // Display "Copied to clipboard" message
  const notice = button.nextElementSibling;
  notice.style.opacity = 1;
  setTimeout(() => {
      notice.style.opacity = 0;
  }, 2000);
}

// Load copywriting when the page loads
window.onload = loadCopywriting;
