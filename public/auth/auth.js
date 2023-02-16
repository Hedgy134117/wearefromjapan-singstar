import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { firebaseConfig } from "../config.js";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signupForm = document.querySelector("#signup-form");
signupForm.onsubmit = (e) => {
    e.preventDefault();
    let data = new FormData(signupForm);
    let email = data.get("username") + "@singstar.com";
    let password = data.get("password");
    let color = data.get("color");
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            console.log("signed up");

            try {
                const userDoc = await addDoc(collection(db, "users"), {
                    "username": email.replace("@singstar.com", ""),
                    "color": color,
                    "recordings": [""]
                });
            } catch (e) {
                console.log(e);
            }

            alert("you may now sign in");
            // redirectToHome();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
};

const signinForm = document.querySelector("#signin-form");
signinForm.onsubmit = (e) => {
    e.preventDefault();
    let data = new FormData(signinForm);
    let email = data.get("username") + "@singstar.com";
    let password = data.get("password");
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            redirectToHome();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
};

function redirectToHome() {
    window.location.replace("../home/");
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // redirectToHome();
    } else {
        console.log("signed out");
    }
});