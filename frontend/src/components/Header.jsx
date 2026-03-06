import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { setToggele } from "../redux/mailSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logout Successfully");
    localStorage.removeItem("token");
    dispatch(removeUser());
    navigate("/");
  };

  const handleSidebar = () =>{
    dispatch(setToggele())
  }
  return (
    <div className="shadow-lg m-2 p-2">
      <div className="flex">
        <img
          alt="icon"
          className="h-10"
          onClick={handleSidebar}
          src="https://static.vecteezy.com/system/resources/previews/021/190/402/original/hamburger-menu-filled-icon-in-transparent-background-basic-app-and-web-ui-bold-line-icon-eps10-free-vector.jpg"
        />
        <div className="flex ml-135 mb-2">
          <h1 className="mt-1 font-semibold text-2xl">MailBox</h1>
          <img
            alt="logo"
            className="h-10 ml-2"
            src="https://as2.ftcdn.net/v2/jpg/04/76/40/09/1000_F_476400933_A4gKwXtlgQFslfSuDvbV35eQcBIDlYjw.jpg"
          />
        </div>
        {user && (
          <>
            <img
              alt="user-icon"
              className="h-10 ml-155"
              src="https://static.vecteezy.com/system/resources/previews/000/550/731/original/user-icon-vector.jpg"
            />
            <p
              className="mt-2 text-md cursor-pointer font-semibold"
              onClick={handleLogout}
            >
              Logout
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
