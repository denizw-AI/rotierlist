import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
    getAuth,
    setPersistence,
    browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCHHyWpppPDpOE2kRTjxLxCKzG_ZciimYA",
    authDomain: "rotierlist.firebaseapp.com",
    projectId: "rotierlist",
    storageBucket: "rotierlist.firebasestorage.app",
    messagingSenderId: "871029721096",
    appId: "1:871029721096:web:66423c83edaf208c43a9bd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.error("Persistence error:", error);
});

export { app, auth };
