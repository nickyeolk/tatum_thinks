# Full-Stack Chatbot Application

This project is a simple chatbot application with a React.js frontend and a Python (Flask) backend that integrates with the OpenAI API.

## Project Structure

- `/frontend`: Contains the React application.
- `/backend`: Contains the Flask API server.

## Prerequisites

- Node.js and npm (or yarn)
- Python 3.x and pip
- An OpenAI API key

## Setup

### 1. Backend Setup

First, set up your OpenAI API key.

1.  Navigate to the `backend` directory: `cd backend`
2.  Create a `.env` file by copying the example: `cp .env.example .env` (or create it manually).
3.  Add your OpenAI API key to the `.env` file: `OPENAI_API_KEY="YOUR_API_KEY_HERE"`
4.  Create a virtual environment: `python -m venv venv`
5.  Activate the virtual environment:
    -   macOS/Linux: `source venv/bin/activate`
    -   Windows: `venv\Scripts\activate`
6.  Install the required Python packages: `pip install -r requirements.txt`

### 2. Frontend Setup

1.  Navigate to the `frontend` directory: `cd ../frontend`
2.  Install the required Node.js packages: `npm install`

## Running the Application

You need to run both the backend and frontend servers simultaneously in separate terminal windows.

1.  **Start the Backend Server:**
    -   In your first terminal (inside the `backend` directory with the virtual environment activated): `uvicorn app:app --reload --port 5001`

2.  **Start the Frontend Development Server:**
    -   In your second terminal (inside the `frontend` directory): `npm start`

The React application will open in your browser at `http://localhost:3000` and will be able to communicate with the backend API running on `http://localhost:5001`.