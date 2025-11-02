console.log("Signup JS loaded!"); 

import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created!");
        window.location.href = "/login";
    } catch (err) {
        alert(err.message);
    }
});
