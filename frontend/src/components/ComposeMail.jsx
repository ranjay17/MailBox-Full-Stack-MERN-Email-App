import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addSentMail } from "../redux/mailSlice";

const ComposeMail = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSendMail = async(event) =>{
    event.preventDefault();
    try {
        const newMail = {
            from: localStorage.getItem('email'),
            to, 
            subject,
            body
        };
        const response = await axios.post("http://localhost:8000/mail/compose", newMail, {
            headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
        });
        alert("Mail Send")
        dispatch(addSentMail(response.data.mail))
        navigate('/')
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className="max-w-xl mx-auto mt-10 p-5 shadow-lg rounded-xl">
      <h1 className="font-semibold text-2xl text-center">Compose Mail</h1>

      <form className="mt-8" onSubmit={handleSendMail}>
        <div className="flex items-center gap-3">
          <label className="w-12">From:</label>
          <input
            className="border border-gray-300 rounded-lg flex-1 p-2"
            type="email"
            value={localStorage.getItem('email')}
            readOnly
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="w-12">To:</label>
          <input
            className="border border-gray-300 rounded-lg flex-1 p-2"
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <input
            type="text"
            className="border border-gray-300 rounded-lg w-full p-2"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <textarea
            className="border border-gray-300 rounded-lg w-full p-2 h-40"
            placeholder="Email body..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Send Mail
        </button>
      </form>
    </div>
  );
};

export default ComposeMail;
