from flask import Flask, request, jsonify
from flask_cors import CORS
from db import supabase

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend is running successfully!"

# -------------------------------
# 1. Get All Couriers
# -------------------------------
@app.route("/api/couriers", methods=["GET"])
def get_couriers():
    response = supabase.table("couriers").select("*").execute()
    return jsonify(response.data)

@app.route("/api/login", methods=["POST"])
def login():

    data = request.json
    email = data.get("email")
    password = data.get("password")

    response = supabase.table("users") \
        .select("*") \
        .eq("email", email) \
        .eq("password", password) \
        .execute()

    if response.data:
        return jsonify({
            "success": True,
            "user": response.data[0]
        })
    else:
        return jsonify({
            "success": False,
            "message": "Invalid email or password"
        })

@app.route("/api/register", methods=["POST"])
def register():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")
    role = "customer"

    # check if email already exists
    existing = supabase.table("users") \
        .select("*") \
        .eq("email", email) \
        .execute()

    if existing.data:
        return jsonify({
            "success": False,
            "message": "Email already registered"
        })

    # insert new user
    response = supabase.table("users").insert({
        "name": name,
        "email": email,
        "phone": phone,
        "password": password,
        "role": role
    }).execute()

    return jsonify({
        "success": True,
        "message": "Registration successful"
    })

@app.route("/api/track/<tracking_number>", methods=["GET"])
def track_courier(tracking_number):

    courier = supabase.table("couriers") \
        .select("*") \
        .eq("tracking_number", tracking_number) \
        .execute()

    if not courier.data:
        return jsonify({"error": "Tracking number not found"})

    updates = supabase.table("tracking_updates") \
        .select("*") \
        .eq("courier_id", courier.data[0]["id"]) \
        .execute()

    return jsonify({
        "courier": courier.data,
        "tracking_updates": updates.data
    })

# -------------------------------
# 2. Create Courier
# -------------------------------
@app.route("/api/couriers", methods=["POST"])
def create_courier():
    data = request.json
    response = supabase.table("couriers").insert(data).execute()
    return jsonify(response.data)



# -------------------------------
# 4. Get All Users
# -------------------------------
@app.route("/api/users", methods=["GET"])
def get_users():
    response = supabase.table("users").select("*").execute()
    return jsonify(response.data)


# -------------------------------
# 5. Create User
# -------------------------------
@app.route("/api/users", methods=["POST"])
def create_user():
    data = request.json
    response = supabase.table("users").insert(data).execute()
    return jsonify(response.data)


if __name__ == "__main__":
    app.run(debug=True)