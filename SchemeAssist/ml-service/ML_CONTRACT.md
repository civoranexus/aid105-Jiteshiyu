# ML Service Contract – SchemeAssist

## Responsibility
The ML service ranks eligible schemes based on user profile data.

## Input Schema
```json
{
  "user_profile": {
    "age": 25,
    "annual_income": 300000,
    "category": "OBC",
    "state": "UP",
    "education": "Graduate"
  },
  "eligible_schemes": [
    {
      "scheme_id": "SCHEME001",
      "features": {
        "min_income": 0,
        "max_income": 500000,
        "min_age": 18,
        "max_age": 35,
        "education_required": "Any"
      }
    }
  ]
}
