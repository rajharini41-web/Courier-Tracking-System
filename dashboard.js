// get user
const user = JSON.parse(localStorage.getItem("user"));

// redirect if not logged in
if (!user) {
    window.location.href = "login.html";
}

// show welcome
document.getElementById("welcome").innerText =
    "Welcome, " + user.name;


// logout function
function logout() {

    localStorage.removeItem("user");

    window.location.href = "login.html";
}


// track courier function
async function trackCourier() {

    const trackingNumber =
        document.getElementById("trackingNumber").value;

    if (!trackingNumber) {

        alert("Please enter tracking number");
        return;
    }

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/api/track/" + trackingNumber
        );

        const data = await response.json();

        console.log(data); // debug

        if (data.error) {

            document.getElementById("result").innerHTML =
                data.error;

            return;
        }

        let courier = data.courier[0];

        let updates = data.tracking_updates;

        let html =
            "<b>Tracking Number:</b> " + courier.tracking_number + "<br>" +
            "<b>Status:</b> " + courier.status + "<br><br>";

        html += "<b>Tracking Updates:</b><br>";

        updates.forEach(update => {

            html +=
                "Location: " + update.location + "<br>" +
                "Status: " + update.status + "<br><br>";
        });

        document.getElementById("result").innerHTML = html;

    }
    catch (error) {

        document.getElementById("result").innerHTML =
            "Error connecting to backend";

        console.log(error);
    }
}