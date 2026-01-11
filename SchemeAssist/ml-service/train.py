import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from datetime import datetime
import json

data = {
    "age": [22, 30, 45, 28, 50, 40, 35, 60, 27, 48],
    "income": [200000, 600000, 1200000, 500000, 1500000,
               900000, 750000, 1800000, 400000, 1100000],
    "risk_score": [1, 2, 3, 2, 3, 1, 2, 3, 1, 3],
    "recommendation": [
        "Low Risk", "Balanced", "High Growth", "Balanced",
        "High Growth", "Low Risk", "Balanced", "High Growth",
        "Low Risk", "High Growth"
    ]
}

df = pd.DataFrame(data)

required_columns = {"age", "income", "risk_score", "recommendation"}
if not required_columns.issubset(df.columns):
    raise ValueError("Dataset missing required columns")

label_encoder = LabelEncoder()
df["target"] = label_encoder.fit_transform(df["recommendation"])

X = df[["age", "income", "risk_score"]]
y = df["target"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestClassifier(
    n_estimators=150,
    max_depth=6,
    min_samples_split=2,
    random_state=42
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)

print(f"Model accuracy: {accuracy:.2f}")

version = "v1"
joblib.dump(model, f"model_{version}.pkl")
joblib.dump(label_encoder, f"label_encoder_{version}.pkl")

metadata = {
    "model_version": version,
    "trained_on": datetime.utcnow().isoformat(),
    "features": list(X.columns),
    "accuracy": accuracy
}

with open(f"metadata_{version}.json", "w") as f:
    json.dump(metadata, f, indent=2)

print("Training complete. Artifacts saved.")
