import { useState } from "react";
import toast from "react-hot-toast";

import api from "../services/API";
import StatusBlock from "../components/StatusBlock";
import RecommendationList from "../components/RecommendationList";

import "./Recommendations.css";
import Button from "../components/ui/Button";

import { CATEGORIES } from "../constants/categories";
import { EDUCATION_LEVELS } from "../constants/educationLevels";
import { STATES } from "../constants/states";
import Page from "../components/Page";

const Recommendations = () => {
  const [form, setForm] = useState({
    age: "",
    annual_income: "",
    category: "",
    state: "",
    education: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [recommendations, setRecommendations] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
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

      toast.success("Recommendations loaded");
    } catch (errMsg) {
      setError(errMsg);

      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
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
      toast.error("Please fill all fields");
      return;
    }

    fetchRecommendations();
  };

  return (
    <Page>
    <div className="recommendations-container">
      <h2>Find Recommended Schemes</h2>

      <StatusBlock
        loading={loading}
        error={error}
        onRetry={fetchRecommendations}
      />

      <form className="recommendation-form" onSubmit={handleSubmit}>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          disabled={loading}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="annual_income"
          placeholder="Annual Income (₹)"
          value={form.annual_income}
          disabled={loading}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={form.category}
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
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

        <Button type="submit" disabled={loading}>
          {loading ? "Finding Schemes..." : "Get Recommendations"}
        </Button>
      </form>

      <RecommendationList recommendations={recommendations} />
    </div>
    </Page>
  );
};

export default Recommendations;
