import { useState } from "react";
import api from "../services/api";
import RecommendationList from "../components/RecommendationList";
import "./Recommendations.css";

import { CATEGORIES } from "../constants/categories";
import { EDUCATION_LEVELS } from "../constants/educationLevels";
import { STATES } from "../constants/states";

const Recommendations = () => {
  const [form, setForm] = useState({
    age: "",
    annual_income: "",
    category: "",
    state: "",
    education: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recommendations, setRecommendations] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.age ||
      !form.annual_income ||
      !form.category ||
      !form.state ||
      !form.education
    ) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");
    setRecommendations(null);

    try {
      const res = await api.post("/recommendations", {
        age: Number(form.age),
        annual_income: Number(form.annual_income),
        category: form.category,
        state: form.state,
        education: form.education,
      });

      setRecommendations(res.data.recommendations);
    } catch (err) {
      setError(
        err.response?.data?.message || "Service temporarily unavailable"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recommendations-container">
      <h2>Find Recommended Schemes</h2>

      <form className="recommendation-form" onSubmit={handleSubmit}>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="annual_income"
          placeholder="Annual Income (₹)"
          value={form.annual_income}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          name="education"
          value={form.education}
          onChange={handleChange}
          required
        >
          <option value="">Select Education</option>
          {EDUCATION_LEVELS.map((edu) => (
            <option key={edu} value={edu}>
              {edu}
            </option>
          ))}
        </select>

        <select
          name="state"
          value={form.state}
          onChange={handleChange}
          required
        >
          <option value="">Select State</option>
          {STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Finding Schemes..." : "Get Recommendations"}
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}

      <RecommendationList recommendations={recommendations} />
    </div>
  );
};

export default Recommendations;
