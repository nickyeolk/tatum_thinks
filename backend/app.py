import os
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import tiktoken
import pymupdf4llm
import requests
from typing import List

# Load environment variables from .env file
load_dotenv()

# Define the request body model for type checking and validation
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

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

@app.post("/api/chat")
async def chat(chat_request: ChatRequest):
    """
    Handles chat requests from the frontend.
    """
    try:
        url = "https://api.openai.com/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        # Define your custom system prompt here
        system_prompt = {"role": "system", "content": "You are a shy puppy. Answer concisely and clearly but always start barking in the end."}
        # Insert system prompt at the start of the messages list
        messages = [system_prompt] + [msg.dict() for msg in chat_request.messages]
        data = {
            "model": "o4-mini-2025-04-16",
            "messages": messages
        }
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        completion = response.json()
        bot_response = completion["choices"][0]["message"]["content"]
        return {"response": bot_response}
    except Exception as e:
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail="An internal server error occurred")

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Endpoint to upload PDF/Excel files.
    """
    try:
        # Save the uploaded file to a temporary location (or process as needed)
        file_location = f"temp_{file.filename}"
        with open(file_location, "wb") as f:
            f.write(await file.read())
        # You can add logic here to process the file (PDF/Excel)
        if file.filename.endswith('.pdf'):
            doc = pymupdf4llm.to_markdown(file_location)
            encoding = tiktoken.get_encoding("o200k_base")
            returnstr = f"File '{file.filename}' consumes {len(encoding.encode(doc))} tokens. uploaded successfully."
        elif file.filename.endswith('.xlsx'):
            # Example: Handle Excel files (you can use pandas or openpyxl here)
            print(f"Excel file '{file.filename}' uploaded successfully.")
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type. Please upload a PDF or Excel file.")
        # Clean up the temporary file
        os.remove(file_location)
        return {"message": returnstr}
    except Exception as e:
        print(f"File upload error: {e}")
        raise HTTPException(status_code=500, detail="File upload failed.")