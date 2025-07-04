import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import openai

# Load environment variables from .env file
load_dotenv()

# Define the request body model for type checking and validation
class ChatRequest(BaseModel):
    message: str

app = FastAPI()

# Define allowed origins for CORS
origins = [
    "http://localhost:3000",
]

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set the OpenAI API key
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY environment variable not set")
openai.api_key = api_key

@app.post("/api/chat")
async def chat(chat_request: ChatRequest):
    """
    Handles chat requests from the frontend.
    """
    try:
        # --- OpenAI API Call ---
        # This is a basic example. You'll want to expand this to manage
        # conversation history for a true chatbot experience.
        completion = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": chat_request.message}]
        )
        
        bot_response = completion.choices[0].message.content
        return {"response": bot_response}
    except Exception as e:
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail="An internal server error occurred")