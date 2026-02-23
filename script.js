async function trackCourier() {

    const trackingNumber = document.getElementById("trackingNumber").value;

    if (!trackingNumber) {
        alert("Enter tracking number");
        return;
    }

    try {

        const response = await fetch(`http://127.0.0.1:5000/api/track/${trackingNumber}`);

        const data = await response.json();

        if (data.error) {
            document.getElementById("result").innerHTML = data.error;
            return;
        }

        let courier = data.courier[0];
        let updates = data.tracking_updates;

        let html = `
            <h3>Courier Details</h3>
            Tracking Number: ${courier.tracking_number} <br>
            Status: ${courier.status} <br><br>

            <h3>Tracking Updates</h3>
        `;

        updates.forEach(update => {
            html += `
                Location: ${update.location} <br>
                Status: ${update.status} <br>
                Time: ${update.update_time} <br><br>
            `;
        });

        document.getElementById("result").innerHTML = html;

    } catch (error) {

        document.getElementById("result").innerHTML =
            "Error connecting to backend";

    }

}