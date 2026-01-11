from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from inference import predict

app = FastAPI(title="ML Recommendation Service")

class UserInput(BaseModel):
    age: int = Field(..., example=30)
    income: int = Field(..., example=700000)
    risk_score: int = Field(..., example=2)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict")
def get_prediction(data: UserInput):
    try:
        result = predict(
            age=data.age,
            income=data.income,
            risk_score=data.risk_score
        )
        return {
            "success": True,
            "data": result
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Internal ML service error"
        )
