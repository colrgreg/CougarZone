console.log("Signup JS loaded!"); 

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await firebase.auth().createUserWithEmailAndPassword(firebase.auth(), email, password);
        alert("Account created!");
        window.location.href = "/login";
    } catch (err) {
        alert(err.message);
    }
});
