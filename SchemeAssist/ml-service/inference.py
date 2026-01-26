import pickle
import numpy as np

with open("model.pkl", "rb") as f:
    model = pickle.load(f)

def rank_schemes(user_profile, eligible_schemes):
    """
    user_profile: dict
    eligible_schemes: list of dicts
    """

    results = []

    for scheme in eligible_schemes:
        features = np.array([
            user_profile["age"],
            user_profile["annual_income"]
        ]).reshape(1, -1)

        score = float(model.predict_proba(features)[0][1])

        results.append({
            "scheme_id": scheme["scheme_id"],
            "score": round(score, 2),
            "explanation": "Matches income and age profile"
        })

    results.sort(key=lambda x: x["score"], reverse=True)

    return results
