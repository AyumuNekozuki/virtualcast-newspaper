import firebase from 'firebase/app';
import auth from 'firebase/auth';
import firestore from 'firebase/firestore';
import storage from 'firebase/storage';
import analytics from 'firebase/analytics';

const fb_config = {
  apiKey: "AIzaSyDxUMa12epLxdwV7UQlsOEiQ_WKl6AGWg8",
  authDomain: "virtualcast-newspaper.firebaseapp.com",
  projectId: "virtualcast-newspaper",
  storageBucket: "virtualcast-newspaper.appspot.com",
  messagingSenderId: "807682455880",
  appId: "1:807682455880:web:e4e8a4b50bf94ba3475b7d",
  measurementId: "G-T446LZ02QS"
}

if(!firebase.apps.length) {
  firebase.initializeApp(fb_config);
  firebase.analytics();
}else{
  firebase.app();
}

export default firebase