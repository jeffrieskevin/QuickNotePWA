document.addEventListener("DOMContentLoaded", () => {
    loadNotes();
  
    document.getElementById("refresh-btn").addEventListener("click", () => {
      loadNotes();
    });
  });
  
  function loadNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    const container = document.getElementById("notes-container");
    container.innerHTML = ""; // Clear existing notes
  
    notes.forEach((note, index) => {
      let noteElement = document.createElement("div");
      noteElement.className = "note";
      noteElement.innerHTML = `<p>${note.content}</p><small>${note.timestamp}</small>`;
      container.appendChild(noteElement);
    });
  }
  
  // A placeholder function to simulate adding a note (will be replaced by Twilio integration)
  function addNote(content) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({ content: content, timestamp: new Date().toLocaleString() });
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('ServiceWorker registration successful:', registration);
        }).catch((error) => {
          console.log('ServiceWorker registration failed:', error);
        });
    });
  }
  

