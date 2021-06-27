firebase.initializeApp({
  apiKey: 'AIzaSyDxUMa12epLxdwV7UQlsOEiQ_WKl6AGWg8',
  projectId: 'virtualcast-newspaper',
  storageBucket: 'virtualcast-newspaper.appspot.com'
});

const db = firebase.firestore();
const storage = firebase.storage();
const storageRef = storage.ref();