import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";


// firebaseアクセス設定
const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

// firebaseを初期化
const app = initializeApp(firebaseConfig);

// firebase認証を初期化
const auth = getAuth(app);

// Google認証設定
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };