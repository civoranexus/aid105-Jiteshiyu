# API Contract – SchemeAssist

## Authentication
- JWT-based authentication
- All recommendation endpoints are protected

## Endpoint: POST /api/recommendations

### Request Body
```json
{
  "age": 25,
  "annual_income": 300000,
  "category": "OBC",
  "state": "UP",
  "education": "Graduate"
}
