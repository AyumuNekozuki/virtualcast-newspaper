import firebase from 'firebase/app'
import firestore from 'firebase/firestore'
import storage from 'firebase/storage'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyC0IHYaMM7BAlNt6aYrW7URnGWrfs5AlzQ",
      authDomain: "virtualcast-newspaper.firebaseapp.com",
      projectId: "virtualcast-newspaper",
      storageBucket: "virtualcast-newspaper.appspot.com",
      messagingSenderId: "807682455880",
      appId: "1:807682455880:web:e4e8a4b50bf94ba3475b7d",
      measurementId: "G-T446LZ02QS"
    }
  )
}

export default firebase