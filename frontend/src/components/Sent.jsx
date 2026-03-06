import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSent } from "../redux/mailSlice";
import { Link } from "react-router-dom";

const Sent = () => {
  const sentBox = useSelector((store) => store.mail.sent);
  const dispatch = useDispatch();
  const fetchSentMail = async () => {
    try {
      const response = await axios.get("http://localhost:8000/mail/sent", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(setSent(response.data));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSentMail();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/mail/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const updatedList = sentBox.filter((m) => m._id != id);
      dispatch(setSent(updatedList));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full px-5">
      {sentBox.length === 0 ? (
        <p className="flex justify-center font-medium text-2xl">
          No Mail Found
        </p>
      ) : (
        sentBox.map((mail) => {
          return (
            <div
              className="flex 
            justify-center 
            mt-5 
            border
             border-gray-200 
             shadow-lg 
             w-full 
             py-3 
            rounded-lg
             hover:bg-gray-300"
              key={mail._id}
            >
              <Link to={`/mail/${mail._id}`}>
                <p>{mail.to}</p>
              </Link>
              <button
                className="bg-red-600 border border-black text-white ml-60 px-5"
                onClick={() => handleDelete(mail._id)}
              >
                Delete
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Sent;
