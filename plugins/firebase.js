import firebase from 'firebase/app'
import firestore from 'firebase/firestore'
import storage from 'firebase/storage'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "***",
      authDomain: "virtualcast-newspaper.firebaseapp.com",
      projectId: "virtualcast-newspaper",
      storageBucket: "virtualcast-newspaper.appspot.com",
      messagingSenderId: "***",
      appId: "***",
      measurementId: "G-***"
    }
  )
}

export default firebase