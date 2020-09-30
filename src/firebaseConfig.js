import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyCBkasX-A-12hYExLHTMQGKHCq1Jn6IRCk",
	authDomain: "travel-guru-5b372.firebaseapp.com",
	databaseURL: "https://travel-guru-5b372.firebaseio.com",
	projectId: "travel-guru-5b372",
	storageBucket: "travel-guru-5b372.appspot.com",
	messagingSenderId: "761320373858",
	appId: "1:761320373858:web:6bd3264a4c709df7061b3b",
	measurementId: "G-Z9EJ78E7JH",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const createFbAuth = new firebase.auth.FacebookAuthProvider();
const createGoogleAuth = new firebase.auth.GoogleAuthProvider();

export { db, auth, createFbAuth, createGoogleAuth };
