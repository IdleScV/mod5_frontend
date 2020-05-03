import app from 'firebase/app';
//* Allows for user authentication + authorization
import 'firebase/auth';
//* Allows for firebase database usage
import 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyAMzjFxpZFjYDuTWlhKlv-GaAiXyFqF0do',
	authDomain: 'mod5-timeline.firebaseapp.com',
	databaseURL: 'https://mod5-timeline.firebaseio.com',
	projectId: 'mod5-timeline',
	storageBucket: 'mod5-timeline.appspot.com',
	messagingSenderId: '246229182004',
	appId: '1:246229182004:web:3ff8c57c55db525b204c61',
	measurementId: 'G-5D69TSH040'
};

class Firebase {
	constructor() {
		app.initializeApp(firebaseConfig);

		this.auth = app.auth();
		this.db = app.database();
	}

	// *** Auth API ***

	doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

	doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

	doSignOut = () => this.auth.signOut();

	doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

	doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);
	// * User API
	user = (uid) => this.db.ref(`users/${uid}`);
	users = () => this.db.ref('users');
}

export default Firebase;
