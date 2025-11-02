import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged in:", userCredential.user);

        // redirect to homepage
        window.location.href = "/homepage";
    } catch (err) {
        alert("Login failed: " + err.message);
    }
});
