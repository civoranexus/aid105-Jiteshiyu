import pickle
import numpy as np
import os

MODEL_PATH = "model.pkl"

def load_model():
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model file not found: {MODEL_PATH}")

    try:
        with open(MODEL_PATH, "rb") as f:
            return pickle.load(f)
    except Exception as e:
        raise RuntimeError(f"Failed to load model.pkl: {str(e)}")


model = load_model()

def rank_schemes(user_profile, eligible_schemes):
    """
    user_profile: dict
    eligible_schemes: list of dicts
    """

    if not isinstance(user_profile, dict):
        raise ValueError("user_profile must be a dictionary")

    if not isinstance(eligible_schemes, list):
        raise ValueError("eligible_schemes must be a list")

    required_keys = ["age", "annual_income"]
    for key in required_keys:
        if key not in user_profile:
            raise KeyError(f"Missing required field in user_profile: {key}")

    results = []

    for scheme in eligible_schemes:
        if "scheme_id" not in scheme:
            raise KeyError("Each scheme must contain scheme_id")

        try:
            features = np.array([
                user_profile["age"],
                user_profile["annual_income"]
            ]).reshape(1, -1)

            if not hasattr(model, "predict_proba"):
                raise AttributeError("Model does not support predict_proba")

            score = float(model.predict_proba(features)[0][1])

            results.append({
                "scheme_id": scheme["scheme_id"],
                "score": round(score, 2),
                "explanation": "Matches income and age profile"
            })

        except Exception as e:
            results.append({
                "scheme_id": scheme["scheme_id"],
                "score": 0.0,
                "explanation": f"Prediction failed: {str(e)}"
            })

    results.sort(key=lambda x: x["score"], reverse=True)

    return results
