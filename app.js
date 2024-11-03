// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  setUsername();
  loadNotes();

  // Event Listener for Add Note Button
  document.getElementById("add-note-btn").addEventListener("click", () => {
    const noteContent = document.getElementById("new-note").value.trim();
    const project = document.getElementById("note-project").value;
    if (noteContent && project) {
      addNote(noteContent, project);
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

  // Event Listener for Saving Username
  document.getElementById("save-username-btn").addEventListener("click", () => {
    const usernameInput = document.getElementById("username-input").value.trim();
    if (usernameInput) {
      localStorage.setItem("username", usernameInput);
      setUsername();
      document.getElementById("username-input").value = '';
    }
  });
});

// Function to set the username from LocalStorage
function setUsername() {
  const storedUsername = localStorage.getItem("username") || "User";
  document.getElementById("username").textContent = storedUsername;
}
// Function to display notes
function displayNotes(notes) {
  const container = document.getElementById("notes-container");
  container.innerHTML = ""; // Clear existing notes

  if (notes.length === 0) {
    container.innerHTML = "<p>No notes available. Start adding some!</p>";
    return;
  }

  notes.forEach((note, index) => {
    let noteElement = document.createElement("div");
    noteElement.className = "note";
    noteElement.setAttribute('data-project', note.project);
    noteElement.innerHTML = `
      <button class="delete-btn" data-index="${index}">&times;</button>
      <p>${note.content}</p>
      <small>${note.timestamp} | ${note.project}</small>
    `;

    // Add event listener for delete button
    noteElement.querySelector('.delete-btn').addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this note?')) {
        deleteNote(index);
      }
    });

    container.appendChild(noteElement);
  });
}

// Function to add a new note via Backend
async function addNote(content, project) {
  try {
    const response = await fetch('https://quicknote-backend.herokuapp.com/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: content, project: project })
    });

    if (response.ok) {
      console.log('Note added successfully');
    } else {
      console.error('Failed to add note');
      // Optionally, fallback to LocalStorage
      fallbackAddNote(content, project);
    }
  } catch (error) {
    console.error('Error adding note:', error);
    // Optionally, fallback to LocalStorage
    fallbackAddNote(content, project);
  }
}

// Fallback function to add note to LocalStorage if backend fails
function fallbackAddNote(content, project) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  const timestamp = new Date().toLocaleString();
  notes.push({ content: content, timestamp: timestamp, project: project });
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to delete a note
async function deleteNote(index) {
  try {
    // Fetch all notes from backend
    const response = await fetch('https://quicknote-backend.herokuapp.com/notes');
    let notes = await response.json();

    // Remove the note at the specified index
    notes.splice(index, 1);

    // Update the backend notes
    const updateResponse = await fetch('https://quicknote-backend.herokuapp.com/notes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ notes: notes })
    });

    if (updateResponse.ok) {
      console.log('Note deleted successfully');
      loadNotes();
    } else {
      console.error('Failed to delete note');
    }
  } catch (error) {
    console.error('Error deleting note:', error);
    // Optionally, handle deletion from LocalStorage if backend fails
  }
}

// Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope:', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}


// Function to load notes from Backend
async function loadNotes() {
  try {
    const response = await fetch('https://quicknote-backend.herokuapp.com/notes');
    const notes = await response.json();
    displayNotes(notes);
  } catch (error) {
    console.error('Error loading notes:', error);
    // Fallback to LocalStorage if backend fails
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    displayNotes(notes);
  }
}

// Function to display notes
function displayNotes(notes) {
  const container = document.getElementById("notes-container");
  container.innerHTML = ""; // Clear existing notes

  if (notes.length === 0) {
    container.innerHTML = "<p>No notes available. Start adding some!</p>";
    return;
  }

  notes.forEach((note, index) => {
    let noteElement = document.createElement("div");
    noteElement.className = "note";
    noteElement.setAttribute('data-project', note.project);
    noteElement.innerHTML = `
      <button class="delete-btn" data-index="${index}">&times;</button>
      <p>${note.content}</p>
      <small>${note.timestamp} | ${note.project}</small>
    `;

    // Add event listener for delete button
    noteElement.querySelector('.delete-btn').addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this note?')) {
        deleteNote(index);
      }
    });

    container.appendChild(noteElement);
  });
}

// Function to add a new note via Backend
async function addNote(content, project) {
  try {
    const response = await fetch('https://quicknote-backend.herokuapp.com/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: content, project: project })
    });

    if (response.ok) {
      console.log('Note added successfully');
    } else {
      console.error('Failed to add note');
      // Optionally, fallback to LocalStorage
      fallbackAddNote(content, project);
    }
  } catch (error) {
    console.error('Error adding note:', error);
    // Optionally, fallback to LocalStorage
    fallbackAddNote(content, project);
  }
}

// Fallback function to add note to LocalStorage if backend fails
function fallbackAddNote(content, project) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  const timestamp = new Date().toLocaleString();
  notes.push({ content: content, timestamp: timestamp, project: project });
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to delete a note
async function deleteNote(index) {
  try {
    // Fetch all notes from backend
    const response = await fetch('https://quicknote-backend.herokuapp.com/notes');
    let notes = await response.json();

    // Remove the note at the specified index
    notes.splice(index, 1);

    // Update the backend notes
    const updateResponse = await fetch('https://quicknote-backend.herokuapp.com/notes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ notes: notes })
    });

    if (updateResponse.ok) {
      console.log('Note deleted successfully');
      loadNotes();
    } else {
      console.error('Failed to delete note');
    }
  } catch (error) {
    console.error('Error deleting note:', error);
    // Optionally, handle deletion from LocalStorage if backend fails
  }
}

// Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope:', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}

