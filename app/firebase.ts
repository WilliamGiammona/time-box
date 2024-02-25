// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyB_AfucglOgc5qX8YUMZa_a944lwjUU00E',
    authDomain: 'timebox-ef566.firebaseapp.com',
    projectId: 'timebox-ef566',
    storageBucket: 'timebox-ef566.appspot.com',
    messagingSenderId: '715285531794',
    appId: '1:715285531794:web:e39f69f7a0f43f8c7cea4b',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
