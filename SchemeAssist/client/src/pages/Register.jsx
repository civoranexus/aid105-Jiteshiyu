import { useState } from "react";
import { registerUser } from "../services/api";
import "../styles/Register.css";

function Register() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await registerUser(name);
      setSuccess(res.message);
      setName("");
    } catch (err) {
      setError("Registration failed. User may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <div className="register-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button className="register-button" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {error && <p className="register-message register-error">{error}</p>}
      {success && (
        <p className="register-message register-success">{success}</p>
      )}
    </div>
  );
}

export default Register;
