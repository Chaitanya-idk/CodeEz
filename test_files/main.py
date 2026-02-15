from fastapi import FastAPI
import psycopg2
from psycopg2.extras import RealDictCursor

app = FastAPI()

# Database Connection Details
DB_CONFIG = {
    "dbname": "CodeEz",
    "user": "postgres",
    "password": "*****", 
    "host": "localhost",
    "port": "5432"
}

@app.get("/questions")
def get_all_questions():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("SELECT * FROM sts3007_t;")
        questions = cursor.fetchall()
        
        cursor.close()
        conn.close()
        return questions
    except Exception as e:
        return {"error": str(e)}

@app.get("/")
def home():
    return {"message": "STS3007 API is Live!"}