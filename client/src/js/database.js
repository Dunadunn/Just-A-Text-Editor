// Create a request to open the indexedDB database
let db;
const request = indexedDB.open('textEditor', 1);

// Create an object store, `notes`, then establish transaction rules
request.onupgradeneeded = function(event) {
  const db = event.target.result;
  db.createObjectStore('notes', { autoIncrement: true });
};

// Handle any errors with our indexedDB database
request.onerror = function(event) {
  console.log(`Whoops! ${event.target.errorCode}`);
};

// On database open success, define database interactions
request.onsuccess = function(event) {
  db = event.target.result;

  // Check if app is online before reading from the db
  if (navigator.onLine) {
    //read from database
  }
};

// functions to interact with the IndexedDB

function saveNote(noteContent) {
  const transaction = db.transaction(['notes'], 'readwrite');
  const notesObjectStore = transaction.objectStore('notes');
  notesObjectStore.add(noteContent);
}

function getLatestNote() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['notes'], 'readonly');
    const notesObjectStore = transaction.objectStore('notes');
    const getLastNote = notesObjectStore.openCursor(null, 'prev');

    getLastNote.onsuccess = function(event) {
      const cursor = event.target.result;
      if (cursor) {
        resolve(cursor.value);
      } else {
        resolve(null);
      }
    };

    getLastNote.onerror = function(event) {
      reject(`Error fetching last note: ${event.target.errorCode}`);
    };
  });
}

// Export the functions to be used in other files
export { saveNote, getLatestNote };
