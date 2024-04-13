import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0QkacLNyWRduCIkA91buLbGVSLXj1UWE",
  authDomain: "walletwarden-55b75.firebaseapp.com",
  projectId: "walletwarden-55b75",
  storageBucket: "walletwarden-55b75.appspot.com",
  messagingSenderId: "337527014485",
  appId: "1:337527014485:web:a1e2fbfac88ca54e4fc0dc",
  measurementId: "G-6ZLM5QBTXL"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export { firebaseConfig};
