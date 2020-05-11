import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
	apiKey: 'AIzaSyAMzjFxpZFjYDuTWlhKlv-GaAiXyFqF0do',
	authDomain: 'mod5-timeline.firebaseapp.com',
	databaseURL: 'https://mod5-timeline.firebaseio.com',
	projectId: 'mod5-timeline',
	storageBucket: 'mod5-timeline.appspot.com',
	messagingSenderId: '246229182004',
	appId: '1:246229182004:web:3ff8c57c55db525b204c61',
	measurementId: 'G-5D69TSH040'
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
	auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
	if (!user) return;
	const userRef = firestore.doc(`users/${user.uid}`);
	const snapshot = await userRef.get();
	if (!snapshot.exists) {
		const { email, displayName, photoURL } = user;
		try {
			await userRef.set({
				displayName,
				email,
				photoURL,
				...additionalData
			});
		} catch (error) {
			console.error('Error creating user document', error);
		}
	}
	return getUserDocument(user.uid);
};
const getUserDocument = async (uid) => {
	if (!uid) return null;
	try {
		const userDocument = await firestore.doc(`users/${uid}`).get();
		return {
			uid,
			...userDocument.data()
		};
	} catch (error) {
		console.error('Error fetching user', error);
	}
};
