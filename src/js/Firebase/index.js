import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyACBqHEn7RxHPovdYM6aQT-qw5bKnGZMEE",
  authDomain: "nrhorowitz-pirateshop.firebaseapp.com",
  databaseURL: "https://nrhorowitz-pirateshop.firebaseio.com",
  projectId: "nrhorowitz-pirateshop",
  storageBucket: "nrhorowitz-pirateshop.appspot.com",
  messagingSenderId: "1092062410005",
  appId: "1:1092062410005:web:e4e6d261556b2fb558e51c",
  measurementId: "G-9GMR1RCN44"
};
firebase.initializeApp(firebaseConfig);

export default firebase;