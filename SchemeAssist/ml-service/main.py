from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import logging

from inference import rank_schemes

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("schemeassist-ml")

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
        logger.info("Received prediction request")

        ranked = rank_schemes(
            user_profile=request.user_profile.dict(),
            eligible_schemes=[s.dict() for s in request.eligible_schemes]
        )

        return {
            "status": "success",
            "ranked_schemes": ranked
        }

    except KeyError as e:
        logger.error(f"Missing key error: {str(e)}")
        raise HTTPException(
            status_code=400,
            detail=f"Bad input: {str(e)}"
        )

    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(
            status_code=422,
            detail=f"Validation failed: {str(e)}"
        )

    except RuntimeError as e:
        logger.error(f"Model runtime error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Model execution failed"
        )

    except Exception as e:
        logger.exception("Unexpected prediction failure")
        raise HTTPException(
            status_code=503,
            detail="Recommendation service unavailable"
        )
