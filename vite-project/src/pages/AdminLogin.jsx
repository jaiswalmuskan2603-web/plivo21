import { useState } from "react";

const ADMIN_CREDENTIALS = {
  email: "admin@gmail.com",
  password: "admin123",
};

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      setError("");
      onLogin();
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-96"
      >
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-3 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-600 text-sm mb-3">{error}</p>
        )}

        <button className="w-full bg-black text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
