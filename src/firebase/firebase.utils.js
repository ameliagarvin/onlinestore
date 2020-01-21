import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  
    apiKey: "AIzaSyCfwoBqumdeRf71-tp3mbyXycND63Y_dI0",
    authDomain: "onlinestore-db-a8475.firebaseapp.com",
    databaseURL: "https://onlinestore-db-a8475.firebaseio.com",
    projectId: "onlinestore-db-a8475",
    storageBucket: "onlinestore-db-a8475.appspot.com",
    messagingSenderId: "852361307556",
    appId: "1:852361307556:web:5bba28ffe9aad5b4170d31",
    measurementId: "G-ZXEGC2CN4X"
  
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};



firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;