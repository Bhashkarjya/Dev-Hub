// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//Config settings for Firebase
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDdtMYpCj61l7UrjjZWBaWuN6lnbQo6cys",
    authDomain: "slack-clone-app-58d2e.firebaseapp.com",
    projectId: "slack-clone-app-58d2e",
    storageBucket: "slack-clone-app-58d2e.appspot.com",
    messagingSenderId: "1035806409305",
    appId: "1:1035806409305:web:16dbbeb1bd3afd50ba2748",
    measurementId: "G-LBKW7RVRG5"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider, db};
