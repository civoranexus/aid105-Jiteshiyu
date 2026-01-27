import { useState } from "react";
import api from "../services/api";
import RecommendationList from "../components/RecommendationList";
import "./Recommendations.css";

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
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recommendations-container">
      <h2>Find Recommended Schemes</h2>

      <form className="recommendation-form" onSubmit={handleSubmit}>
        <input
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />
        <input
          name="annual_income"
          placeholder="Annual Income"
          value={form.annual_income}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          required
        />
        <input
          name="education"
          placeholder="Education"
          value={form.education}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Recommendations"}
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}

      <RecommendationList recommendations={recommendations} />
    </div>
  );
};

export default Recommendations;
