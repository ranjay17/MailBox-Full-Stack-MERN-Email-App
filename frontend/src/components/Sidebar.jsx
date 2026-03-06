import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const isOpen = useSelector((store) => store.mail.isSideOpen);
  const user = useSelector((store)=>store.user);

  const navigate = useNavigate();

  const handleComposeMail = () => {
    navigate("/compose");
  };

  if (!isOpen) return null;
  if(!user) return null;

  return (
    <div className="m-3 ml-5 w-48 rounded-xl shadow-xl bg-white p-4 border border-gray-200">
      <div
        className="flex items-center gap-2 bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition"
        onClick={handleComposeMail}
      >
        <img
          alt="icon"
          className="h-5"
          src="https://cdn.pixabay.com/photo/2017/06/06/00/33/edit-icon-2375785_1280.png"
        />
        <span>Compose</span>
      </div>
      <div className="mt-6 text-left space-y-3">
        <Link to="/">
          <p className="cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2">
            <span className="text-lg">🏠</span>
            <span>Home</span>
          </p>
        </Link>
        <Link to='/inbox'>
          <p className="cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100">
            📥 Inbox
          </p>
        </Link>
        <Link to="/sent">
          <p className="cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100">
            📤 Sent
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
