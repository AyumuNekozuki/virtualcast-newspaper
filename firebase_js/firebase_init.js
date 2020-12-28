firebase.initializeApp({
  apiKey: 'AIzaSyC0IHYaMM7BAlNt6aYrW7URnGWrfs5AlzQ',
  projectId: 'virtualcast-newspaper',
  storageBucket: 'virtualcast-newspaper.appspot.com'
});

const db = firebase.firestore();
const storage = firebase.storage();
const storageRef = storage.ref();