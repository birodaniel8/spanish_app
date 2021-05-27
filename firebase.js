import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4jkPdOB7_9wIKAIzgNa1aG0NhbyXhGls",
  authDomain: "spanish-app-57e1a.firebaseapp.com",
  projectId: "spanish-app-57e1a",
  storageBucket: "spanish-app-57e1a.appspot.com",
  messagingSenderId: "150252719296",
  appId: "1:150252719296:web:8e01bf7c03504e91797125"
};

let app;

// Initialize app if not already initialized:
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

// The database and authentication components are used:
const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
