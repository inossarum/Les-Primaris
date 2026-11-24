import {initializeApp} from "firebase/app";
import {
    GoogleAuthProvider,
    browserLocalPersistence,
    initializeAuth,
} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "les-primaris-a5b4f.firebaseapp.com",
    projectId: "les-primaris-a5b4f",
    storageBucket: "les-primaris-a5b4f.appspot.com",
    messagingSenderId: "770869244221",
    appId: "1:770869244221:web:65c2350c1307d7aa245554",
    measurementId: "G-5BEV8KPL9K",
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: [browserLocalPersistence],
});
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);

// Never allow public Firestore reads and writes. Configure restrictive rules
// and enforce authorization with Firebase Authentication and Firestore Rules.
