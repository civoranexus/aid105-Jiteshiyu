# SchemeAssist

SchemeAssist is a full-stack web application that recommends government schemes
to users based on their profile, using a machine learning model for relevance ranking.

## Architecture Overview

Frontend (React)
→ Backend (Node.js + Express)
→ ML Service (FastAPI + Scikit-learn)

## Recommendation Flow

1. User logs in
2. User submits profile details
3. Backend filters eligible schemes (rule-based)
4. ML service ranks eligible schemes
5. Frontend displays ranked schemes with explanations

## Why ML is Used

ML is used only to rank schemes by relevance.
All eligibility decisions are handled deterministically in the backend
to ensure correctness and explainability.

## Tech Stack

- Frontend: React, Axios
- Backend: Node.js, Express, MongoDB
- ML: Python, FastAPI, Scikit-learn

## Known Limitations

- No admin interface
- No document verification
- ML model trained on limited data
- Not production deployed

## How to Run Locally

1. Start ML service
2. Start backend
3. Start frontend
