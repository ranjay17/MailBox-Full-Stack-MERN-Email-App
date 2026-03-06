import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../redux/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = async(event) =>{
    event.preventDefault();
    if(!email || !password){
      alert("Allfields are required")
      return
    }
    try {
      const response = await axios.post("http://localhost:8000/user/login", {email,password});
      alert("Login Successfull")
      dispatch(addUser({
              id: response.data.id,
              email: response.data.email,
              token: response.data.token
            }));
            localStorage.setItem("user", JSON.stringify({
              id: response.data.id,
              email: response.data.email,
              token: response.data.token,
            }))
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.email);
      navigate('/')
    } catch (error) {
      console.log(error)
    }
    setEmail("");
    setPassword("");
  }
  return (
    <div className="m-5 p-5 shadow-lg border border-gray-300 w-6/12 ml-80">
      <h1 className="font-bold text-center text-2xl">Login</h1>
      <hr className="mt-5" />
      <form
        className="text-center m-4 font-semibold text-lg"
        onSubmit={handleLogin}
      >
        <div>
          <h1>Email: </h1>
          <input
            className="border border-gray-300 rounded-lg"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <h1>Password: </h1>
          <input
            className="border border-gray-300 rounded-lg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mt-5 p-2 border border-gray-400 bg-blue-600 text-white rounded-lg"
        >
          Login
        </button>
      </form>
      <Link to="/signup">
        <button className="text-center m-4 px-2 font-semibold text-lg ml-64 border border-gray-400 rounded-lg text-white bg-green-700">
          Don't have an account ? Signup
        </button>
      </Link>
    </div>
  );
};

export default Login;
