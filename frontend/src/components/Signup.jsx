import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSignup = async (event) => {
    event.preventDefault();
    if (!email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }
    if (password != confirmPassword) {
      alert("Password and confirm password are not same");
      return;
    }
    const newUser = { email, password, confirmPassword };
    try {
      const response = await axios.post(
        "https://mailbox-full-stack-mern-email-app.onrender.com/user/signup",
        newUser,
      );
      alert("User Successfully registered");
      dispatch(addUser({
        id: response.data.id,
        email: response.data.email,
        token: response.data.token
      }));
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.id,
          email: response.data.email,
          token: response.data.token,
        }),
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.email);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <div className="m-5 p-5 shadow-lg border border-gray-300 w-6/12 ml-80">
      <h1 className="font-bold text-center text-2xl">SignUp</h1>
      <hr className="mt-5" />
      <form
        className="text-center m-4 font-semibold text-lg"
        onSubmit={handleSignup}
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
        <div>
          <h1>Confirm Password: </h1>
          <input
            className="border border-gray-300 rounded-lg"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mt-5 p-2 border border-gray-400 bg-blue-600 text-white rounded-lg"
        >
          Signup
        </button>
      </form>
      <Link to='/login'>
        <button type="button" className="text-center m-4 px-2 font-semibold text-lg ml-64 border border-gray-400 rounded-lg text-white bg-green-700">
          Already have an account ? Login
        </button>
      </Link>
    </div>
  );
};

export default Signup;
