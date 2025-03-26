import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCIzZfVGQuCsDENYqhaD1e-xg9nMqrPbzQ",
    authDomain: "e-commerce-a7cc8.firebaseapp.com",
    projectId: "e-commerce-a7cc8",
    storageBucket: "e-commerce-a7cc8.firebasestorage.app",
    messagingSenderId: "817498794448",
    appId: "1:817498794448:web:ec2c00ce951efbcd3ef1d5",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
