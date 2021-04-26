import firebase from 'firebase';

const firebaseConfig = 
{
  apiKey: "AIzaSyACB-zGIQO7U_2XHf6MCdw_72yFqm7rbf8",
  authDomain: "instagram-clone-react-e28fb.firebaseapp.com",
  databaseURL:"https://instagram-clone-react-e28fb.firebase.io.com",
  projectId: "instagram-clone-react-e28fb",
  storageBucket: "instagram-clone-react-e28fb.appspot.com",
  messagingSenderId: "676521379020",
  appId: "1:676521379020:web:bc4df636aabd440c9fee69"

};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};

// export default db;