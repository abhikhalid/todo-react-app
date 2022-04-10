import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCw5ML0BzkyUeRG4lkuSqFDdEFhYw3sIkU",
  authDomain: "todo-app2-e26ad.firebaseapp.com",
  projectId: "todo-app2-e26ad",
  storageBucket: "todo-app2-e26ad.appspot.com",
  messagingSenderId: "877294977319",
  appId: "1:877294977319:web:f207cf7bb87576cf00e902"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;