import React from "react";
import Inbox from "./Inbox";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {user ? (
        <Inbox />
      ) : (
        <div className="flex flex-col justify-center items-center w-full -mt-20">
          <div className="text-6xl mb-4">📤</div>

          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome to MailBox
          </h1>

          <p className="text-gray-500 text-lg mb-6">
            Access your secure mailbox instantly
          </p>
          <Link to="/login">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all">
              Please Login to Continue
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
