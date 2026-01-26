from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from inference import rank_schemes

app = FastAPI(title="SchemeAssist ML Service")

class UserProfile(BaseModel):
    age: int
    annual_income: int
    category: str
    state: str
    education: str

class SchemeInput(BaseModel):
    scheme_id: str
    features: Dict

class PredictionRequest(BaseModel):
    user_profile: UserProfile
    eligible_schemes: List[SchemeInput]

@app.post("/predict")
def predict(request: PredictionRequest):
    try:
        ranked = rank_schemes(
            user_profile=request.user_profile.dict(),
            eligible_schemes=[s.dict() for s in request.eligible_schemes]
        )

        return {"ranked_schemes": ranked}

    except Exception as e:
        raise HTTPException(status_code=500, detail="Prediction failed")
