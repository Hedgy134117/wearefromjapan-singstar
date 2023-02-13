import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { firebaseConfig } from "./config.js";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const signupForm = document.querySelector("#signup-form");
signupForm.onsubmit = (e) => {
    e.preventDefault();
    let data = new FormData(signupForm);
    let email = data.get("username") + "@singstar.com";
    let password = data.get("password");
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log("signed up");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
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
            displaySignedIn(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
};

const signedIn = document.querySelector("#signed-in");
function displaySignedIn(user) {
    signedIn.style.display = "block";
    signedIn.querySelector("p").innerText = user.email;

    signedIn.querySelector("button").addEventListener("click", () => {
        signOut(auth).then(() => {
            signedIn.style.display = "none";
        }).catch((error) => {
            console.log(error);
        });
    })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        displaySignedIn(user);
    } else {
        console.log("signed out");
    }
});