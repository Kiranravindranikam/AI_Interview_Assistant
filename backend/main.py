from fastapi import FastAPI
from supabase import create_client
from supabase_client import supabase
from fastapi.middleware.cors import CORSMiddleware
import bcrypt  # <-- Added for password hashing

import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Backend is running successfully!"}

# -----------------------------
# SIGNUP with password hashing
# -----------------------------
@app.post("/signup")
def signup(email: str, password: str):
    try:
        # Hash the password before saving
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        data = {"email": email, "password": hashed_password}
        response = supabase.table("users").insert(data).execute()
        print("DEBUG:", response)
        return {"message": "User created", "data": response.data}
    except Exception as e:
        print("ERROR:", e)
        return {"error": str(e)}

# -----------------------------
# SIGNIN with support for old plain-text & new bcrypt hashed passwords
# -----------------------------
@app.post("/signin")
def signin(email: str, password: str):
    try:
        # Fetch user by email
        response = supabase.table("users").select("*").eq("email", email).execute()
        if not response.data:
            return {"error": "User not found"}
        
        user = response.data[0]
        stored_password = user["password"]

        # If stored password is bcrypt hashed
        if stored_password.startswith("$2b$"):
            if not bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):
                return {"error": "Invalid password"}
        else:
            # Legacy plain-text password match
            if stored_password != password:
                return {"error": "Invalid password"}
        
        return {"message": "Login successful", "user": {"email": user["email"]}}
    except Exception as e:
        print("ERROR:", e)
        return {"error": str(e)}
