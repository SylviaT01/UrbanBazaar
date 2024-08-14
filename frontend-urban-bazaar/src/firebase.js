// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBxekPl793y_8-bHjA7pq1E-ynfexryaG4",
  authDomain: "urbanbazaar-d63f1.firebaseapp.com",
  projectId: "urbanbazaar-d63f1",
  storageBucket: "urbanbazaar-d63f1.appspot.com",
  messagingSenderId: "757742304215",
  appId: "1:757742304215:web:c4dcdd15196fea0fa22992",
  measurementId: "G-924VS2RJKS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
