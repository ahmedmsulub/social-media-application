import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBTpOciBtRw81NfmXn0o0gGLZJvj-xZz-o',
  authDomain: 'chatt-app-2d833.firebaseapp.com',
  databaseURL: 'https://chatt-app-2d833.firebaseio.com',
  projectId: 'chatt-app-2d833',
  storageBucket: 'chatt-app-2d833.appspot.com',
  messagingSenderId: '65162891817',
  appId: '1:65162891817:web:8ed6bfaf9634163dc44238',
  measurementId: 'G-HJMT86NLBM'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;
