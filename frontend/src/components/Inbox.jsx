import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setInbox } from "../redux/mailSlice";
import { Link } from "react-router-dom";

const Inbox = () => {
  const inbox = useSelector((store) => store.mail.inbox);
  const dispatch = useDispatch();
  const fetchEmail = async () => {
    try {
      const response = await axios.get(
        "https://mailbox-full-stack-mern-email-app.onrender.com/mail/inbox",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      dispatch(setInbox(response.data));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkedAsRead = async (id) => {
    try {
      await axios.put(
        `https://mailbox-full-stack-mern-email-app.onrender.com/mail/read/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      fetchEmail();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async(id) =>{
    try {
      await axios.delete(
        `https://mailbox-full-stack-mern-email-app.onrender.com/mail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const updatedList = inbox.filter((m)=>m._id != id);
      dispatch(setInbox(updatedList))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchEmail();
  }, []);

  
  return (
    <div className="w-full px-4">
      {inbox.length === 0 ? (
        <p className="flex justify-center font-medium text-2xl">No Mail Found</p>
      ) : (
        inbox.map((mail) => {
          return (
            <div
              className=" flex 
            items-center 
            justify-center 
            mt-5 
            border 
            border-gray-200 
            w-full 
            shadow-lg 
            py-3 
            rounded-lg
             hover:bg-gray-300"
              key={mail._id}
            >
              <Link
                to={`/mail/${mail._id}`}
                onClick={() => handleMarkedAsRead(mail._id)}
              >
                <p className="font-semibold cursor-pointer">
                  {!mail.isRead && <span className="text-blue-500">🔵 </span>}
                  {mail.from}
                </p>
              </Link>
              <button 
              className="bg-red-600 border border-black text-white ml-60 px-5"
              onClick={()=>handleDelete(mail._id)}
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

export default Inbox;
