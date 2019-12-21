//initialize firebase
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAb2Jf5qmAVRa2p1WqUDEuQ3cSMGZqAq34",
  authDomain: "tfhs-library-system.firebaseapp.com",
  databaseURL: "https://tfhs-library-system.firebaseio.com",
  projectId: "tfhs-library-system",
  storageBucket: "tfhs-library-system.appspot.com",
  messagingSenderId: "1039003252199",
  appId: "1:1039003252199:web:1f03898f29b13521e67942",
  measurementId: "G-708CP9K90Z"
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
