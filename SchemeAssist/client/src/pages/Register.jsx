import { useState } from "react";
import toast from "react-hot-toast";

import StatusBlock from "../components/StatusBlock";
import { registerUser } from "../services/API";

import "./Register.css";
import Button from "../components/ui/Button";
import Page from "../components/Page";

function Register() {
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess("");

    try {
      const res = await registerUser(name);

      toast.success("Registration successful");

      setSuccess(res.message);
      setName("");
    } catch (errMsg) {
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
    <div className="register-container">
      <h2>Create Account</h2>

      <StatusBlock loading={loading} error={error} />

      <form onSubmit={handleSubmit}>
        <div className="register-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            disabled={loading}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <Button className="register-button" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>

      {success && (
        <p className="register-message register-success">{success}</p>
      )}
    </div>
    </Page>
  );
}

export default Register;
