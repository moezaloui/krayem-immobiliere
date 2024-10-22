import { useContext, useState } from "react";
 // Import context
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { UserContext } from "../../lib/userContext";

function Login() {
  const { setUser } = useContext(UserContext); // Use the setUser function from context
  const [formData, setFormData] = useState({ email: "", pwd: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const apiUrl = import.meta.env.NEXT_PUBLIC_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `https://real-estate-server-side-flame.vercel.app/auth/user/login`,
        formData
      );

      if (response.status === 200 && response.data.user) {
        const user = response.data.user;
        // Save user in localStorage
        localStorage.setItem("user", JSON.stringify(user));
        // Update user in global context
        setUser(user);
        navigate("/profile");
      } else {
        setError(true);
      }
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="email"
            id="email"
            type="text"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="pwd"
            id="pwd"
            type="password"
            placeholder="Password"
            value={formData.pwd}
            onChange={handleChange}
          />
          <button disabled={loading}>
            {loading ? "Processing" : "Login"}
          </button>
          <p>{error.response?.data?.message}</p>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
