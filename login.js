async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://127.0.0.1:5000/api/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    const data = await response.json();

    if (data.success) {

        // ✅ Save user in browser
        localStorage.setItem("user", JSON.stringify(data.user));

        // redirect to dashboard
        window.location.href = "dashboard.html";

    } else {

        document.getElementById("message").innerText =
            data.message;
    }
}