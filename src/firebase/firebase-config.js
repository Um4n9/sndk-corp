// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzhrkpjckp5CCFMs70xk1Fnznr8a2Vqok",
  authDomain: "task-world-ceec7.firebaseapp.com",
  projectId: "task-world-ceec7",
  storageBucket: "task-world-ceec7.appspot.com",
  messagingSenderId: "153326876862",
  appId: "1:153326876862:web:b5e61474c7f402890606ef",
  measurementId: "G-X4Q9VK02B0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
