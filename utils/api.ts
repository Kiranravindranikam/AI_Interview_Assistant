// utils/api.ts
export const API_BASE = "http://127.0.0.1:8000"; // Your FastAPI URL

export async function signup(email: string, password: string) {
    const res = await fetch(`${API_BASE}/signup?email=${email}&password=${password}`, {
        method: "POST",
    });
    return res.json();
}

export async function signin(email: string, password: string) {
    const res = await fetch(`${API_BASE}/signin?email=${email}&password=${password}`, {
        method: "POST",
    });
    return res.json();
}
