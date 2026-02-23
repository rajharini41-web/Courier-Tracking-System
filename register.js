async function register() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://127.0.0.1:5000/api/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            password: password
        })

    });

    const data = await response.json();

    if (data.success) {

        document.getElementById("message").style.color = "green";
        document.getElementById("message").innerText = data.message;

    } else {

        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerText = data.message;

    }

}