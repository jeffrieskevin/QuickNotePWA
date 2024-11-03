document.addEventListener("DOMContentLoaded", () => {
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
});

function loadNotes() {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  const container = document.getElementById("notes-container");
  container.innerHTML = ""; // Clear existing notes

  notes.forEach((note) => {
    let noteElement = document.createElement("div");
    noteElement.className = "note";
    noteElement.innerHTML = `<p>${note.content}</p><small>${note.timestamp}</small>`;
    container.appendChild(noteElement);
  });
}

function addNote(content) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push({ content: content, timestamp: new Date().toLocaleString() });
  localStorage.setItem("notes", JSON.stringify(notes));
}


