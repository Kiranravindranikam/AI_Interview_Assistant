from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

print("DEBUG: SUPABASE_URL =", SUPABASE_URL)
print("DEBUG: SUPABASE_KEY =", SUPABASE_KEY[:8] + "..." if SUPABASE_KEY else "None")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

