/* <button class="middle none center rounded-lg bg-sky-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" data-ripple-light="true">
    <i class="bi bi-lock-fill"></i> Lock
</button>
<button class="middle none center rounded-lg bg-sky-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" data-ripple-light="true">
    <i class="bi bi-unlock-fill"></i> Unlock
</button> */


// Import the functions you need from the SDKs you need
import { addLogEntry } from "./addLogEntry.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getDatabase, ref, set, onValue,get } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAu5dX42fNVhnuUKgTuyGb5XY_pEHMg8Fo",
    authDomain: "remote-door-project.firebaseapp.com",
    databaseURL: "https://remote-door-project-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "remote-door-project",
    storageBucket: "remote-door-project.appspot.com",
    messagingSenderId: "236878520482",
    appId: "1:236878520482:web:9c3ad97275eb272c8437fb",
    measurementId: "G-R6LCPWP7W1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Create a reference to the 'door_state' data in the database
const doorStateRef = ref(db, 'door_state');
// Select the lock button
const toggleButton = document.getElementById('toggleBtn');


// Add an event listener to the lock button
toggleButton.addEventListener('click', () => {
    // Get the current door state
    get(doorStateRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const doorState = snapshot.val();
  
          // Toggle the door state
          if (doorState === 'locked') {
            set(doorStateRef, 'unlocked');
            addLogEntry('Door unlocked');
          } else {
            set(doorStateRef, 'locked');
            addLogEntry('Door locked');
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });


// Listen for changes to the 'door_state' data
onValue(doorStateRef, (snapshot) => {
    const doorState = snapshot.val();
  
    // Update the button text based on the 'door_state' data
    if (doorState === 'locked') {
      toggleButton.innerHTML = '<i class="bi bi-lock-fill"></i> Unlock';
    } else {
      toggleButton.innerHTML = '<i class="bi bi-lock-fill"></i> Lock';
    }
  });