import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { firebaseConfig } from './Config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });

export { auth, firestore };

export const signInWithGoogle = () => signInWithPopup(auth, GoogleProvider);

export const handleUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const { uid, email, displayName } = userAuth; // Extract necessary user information

  if (!uid) {
    console.error('User UID is missing.');
    return;
  }

  // Create a data object to be merged into the user document
  const userData = {
    displayName,
    email,
    // Other properties from additionalData
    ...additionalData,
  };

  const userRef = doc(firestore, 'users', uid);

  try {
    await setDoc(userRef, userData, { merge: true });
    console.log('User profile updated successfully.');
  } catch (error) {
    console.error('Error updating user profile:', error);
  }
};
