// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBd3CpeEgaW7nJxS2rDJqHr5PtDabo1D4I",
  authDomain: "food-review-8210d.firebaseapp.com",
  projectId: "food-review-8210d",
  storageBucket: "food-review-8210d.appspot.com",
  messagingSenderId: "867161941179",
  appId: "1:867161941179:web:2db47b66b50e7d3d0c359e",
  measurementId: "G-YBF432SDLJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;
// const analytics = getAnalytics(app);
