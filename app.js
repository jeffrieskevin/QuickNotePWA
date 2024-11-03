// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  setUsername();
  loadNotes();

  // Event Listener for Add Note Button
  document.getElementById("add-note-btn").addEventListener("click", () => {
    const noteContent = document.getElementById("new-note").value.trim();
    if (noteContent) {
      addNote(noteContent);
      document.getElementById("new-note").value = ''; // Clear textarea after adding
      loadNotes();
    }
  });

  // Event Listeners for Project Filtering
  const projectItems = document.querySelectorAll(".project-list li");
  projectItems.forEach(item => {
    item.addEventListener("click", () => {
      const project = item.getAttribute("data-project");
      filterNotes(project);
    });
  });
});

// Function to set the username (Placeholder for now)
function setUsername() {
  // You can later extend this to allow users to set their name
  const username = "User";
  document.getElementById("username").textContent = username;
}

// Function to load notes from LocalStorage
function loadNotes() {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  displayNotes(notes);
}

// Function to display notes
function displayNotes(notes) {
  const container = document.getElementById("notes-container");
  container.innerHTML = ""; // Clear existing notes

  notes.forEach((note, index) => {
    let noteElement = document.createElement("div");
    noteElement.className = "note";
    noteElement.innerHTML = `
      <p>${note.content}</p>
      <small>${note.timestamp}</small>
    `;
    container.appendChild(noteElement);
  });
}

// Function to add a new note
function addNote(content) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  const timestamp = new Date().toLocaleString();
  notes.push({ content: content, timestamp: timestamp });
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to filter notes by project
function filterNotes(project) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  let filteredNotes = notes.filter(note => note.project === project);
  displayNotes(filteredNotes);
}


