import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDERkWPbSkJ9Auzuj79meUDbxVJSy4u16w",
  authDomain: "course-schedule-74bc8.firebaseapp.com",
  projectId: "course-schedule-74bc8",
  storageBucket: "course-schedule-74bc8.appspot.com",
  messagingSenderId: "921745232863",
  appId: "1:921745232863:web:9eac5e16f4f3f836c3ea6a",
  measurementId: "G-V92B4T46TR"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth, app}