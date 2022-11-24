import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyBOL84NnNyrKEm6TnvyRRCpbKYVp6Npkfs',
    authDomain: 'muso-ni.firebaseapp.com',
    projectId: 'muso-ni',
    storageBucket: 'muso-ni.appspot.com',
    messagingSenderId: '319486862974',
    appId: '1:319486862974:web:f3191b9a901432b65b1a2f'
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {
    projectFirestore,
    timestamp,
    projectAuth
}