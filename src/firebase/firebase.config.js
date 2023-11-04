
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYgszQVdsvN3ErnruzXCrR4Z-u4UX5mtA",
  authDomain: "brandshop-ece48.firebaseapp.com",
  projectId: "brandshop-ece48",
  storageBucket: "brandshop-ece48.appspot.com",
  messagingSenderId: "603350919753",
  appId: "1:603350919753:web:fab5477d9e35acb3ac2d98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;