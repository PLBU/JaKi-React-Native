import * as firebase from 'firebase'
import '@firebase/auth'
import '@firebase/functions'

var firebaseConfig = {
  apiKey: "AIzaSyCU6R07hJMMHQyIdq8fHwZr-QrppXX66D8",
  authDomain: "jaki-8237b.firebaseapp.com",
  databaseURL: "https://jaki-8237b.firebaseio.com",
  projectId: "jaki-8237b",
  storageBucket: "jaki-8237b.appspot.com",
  messagingSenderId: "859410368729",
  appId: "1:859410368729:web:a17d924a78d7df7b5656c8",
  measurementId: "G-ECYZJDKYWQ",
}

firebase.initializeApp(firebaseConfig)

export default firebase