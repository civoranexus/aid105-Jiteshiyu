import { useState } from "react";
import toast from "react-hot-toast";

import StatusBlock from "../components/StatusBlock";
import { loginUser } from "../services/API";
import Button from "../components/ui/Button";

import "./Login.css";
import Page from "../components/Page";

function Login() {
  const [email, setEmail] = useState("testuser@example.com");
  const [password, setPassword] = useState("password123");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess("");

    try {
      const res = await loginUser(email, password);

      toast.success("Login successful");

      setSuccess(res.message);
    } catch (errMsg) {
      setError(errMsg);

      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
    <div className="login-container">
      <h2>Login</h2>

      <StatusBlock loading={loading} error={error} />

      <form onSubmit={handleSubmit}>
        <div className="login-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      {success && <p className="login-message login-success">{success}</p>}
    </div>
    </Page>
  );
}

export default Login;
