import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { firebaseConfig } from "../config.js";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

async function getUser(user) {
    const res = await getDoc(doc(db, user.path));
    return res.data();
}

const allMatchesDOM = document.querySelector("#all");
async function loadAllMatches() {
    const querySnapshot = await getDocs(collection(db, "matches"));
    let matches = [];
    await querySnapshot.forEach(async (document) => {
        const data = await document.data();
        let userA = await getUser(data.userA);
        let userB = await getUser(data.userB);
        let matchDOM = `
        <div class="match">
            <a href="../match?id=${document.id}">
                <div style="background-color: ${userA.color}">
                    <p>${userA.username}</p>
                </div>
                <div style="background-color: ${userB.color}">
                    <p>${userB.username}</p>
                </div>
            </a>
        </div>
        `;
        allMatchesDOM.insertAdjacentHTML("afterbegin", matchDOM);
    });
}

window.onload = async () => {
    loadAllMatches();
}