from fastapi import FastAPI, HTTPException
from supabase_client import supabase

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Backend is running successfully!"}

@app.post("/signup")
def signup(email: str, password: str):
    response = supabase.auth.sign_up({"email": email, "password": password})
    if response.user:
        return {"message": "User created successfully"}
    else:
        raise HTTPException(status_code=400, detail="Signup failed")

@app.post("/login")
def login(email: str, password: str):
    response = supabase.auth.sign_in_with_password({"email": email, "password": password})
    if response.session:
        return {"message": "Login successful"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")
