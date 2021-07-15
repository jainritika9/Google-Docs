import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCY4cn90mkYeD9DMMX4UPnR_fRXYxMk6Ik",
    authDomain: "docs-13f51.firebaseapp.com",
    projectId: "docs-13f51",
    storageBucket: "docs-13f51.appspot.com",
    messagingSenderId: "1047310866309",
    appId: "1:1047310866309:web:dc61dfed20ac85c8c416ec"
  };

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();

export {db};