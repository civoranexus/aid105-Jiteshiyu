import joblib
import numpy as np

MODEL_VERSION = "v1"

model = joblib.load(f"model_{MODEL_VERSION}.pkl")
label_encoder = joblib.load(f"label_encoder_{MODEL_VERSION}.pkl")

FEATURE_ORDER = ["age", "income", "risk_score"]

def validate_inputs(age, income, risk_score):
    if age <= 0 or age > 100:
        raise ValueError("Invalid age")
    if income <= 0:
        raise ValueError("Invalid income")
    if risk_score not in [1, 2, 3]:
        raise ValueError("Risk score must be 1, 2, or 3")

def generate_reason(age, income, risk_score):
    reasons = []
    if income > 1000000:
        reasons.append("High income level")
    if risk_score == 3:
        reasons.append("High risk appetite")
    if age < 30:
        reasons.append("Long investment horizon")
    return reasons or ["Balanced profile"]

def predict(age: int, income: int, risk_score: int):
    validate_inputs(age, income, risk_score)

    features = np.array([[age, income, risk_score]])
    probabilities = model.predict_proba(features)[0]

    predicted_class = probabilities.argmax()
    confidence = float(probabilities[predicted_class])

    recommendation = label_encoder.inverse_transform([predicted_class])[0]

    return {
        "recommendation": recommendation,
        "confidence": round(confidence, 2),
        "reasons": generate_reason(age, income, risk_score),
        "model_version": MODEL_VERSION
    }
