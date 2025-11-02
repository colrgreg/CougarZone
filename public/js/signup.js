import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Account created:", userCredential.user);

        window.location.href = "/login";
    } catch (err) {
        alert("Sign-up failed: " + err.message);
    }
});
