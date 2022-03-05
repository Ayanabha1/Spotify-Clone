import {
  AccountCircleOutlined,
  AccountCircleRounded,
  ArrowBackIosOutlined,
  ArrowDownward,
  ArrowForwardIosOutlined,
  ArrowLeftOutlined,
  KeyboardArrowDownOutlined,
  KeyboardArrowDownRounded,
  KeyboardArrowUpOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useDataLayerValue } from "../../../Datalayer";
import "./header.css";

function Header() {
  const [{ user, token }, dispatch] = useDataLayerValue();
  const [drClicked, setDrClicked] = useState(false);
  // console.log(user);

  const logout = () => {
    dispatch({
      type: "SET_LOGIN_STATUS",
      loggedin: false,
    });
  };

  return (
    <div className="header">
      <div className="header-left">
        <ArrowBackIosOutlined className="header-icon arrow-icon" />
        <ArrowForwardIosOutlined className="header-icon arrow-icon" />
      </div>
      <div
        className="header-right"
        onClick={() => {
          setDrClicked((state) => !state);
        }}
      >
        <div className="header-profile-container">
          {user?.images ? (
            <img src={user.images[0].url} alt="" className="user-profile-img" />
          ) : (
            <AccountCircleRounded
              className="header-profile-icon"
              fontSize="large"
            />
          )}
        </div>
        <p>{user?.display_name}</p>

        {!drClicked ? (
          <KeyboardArrowDownOutlined />
        ) : (
          <KeyboardArrowUpOutlined />
        )}

        <div
          className={`header-right-expand ${
            drClicked && "header-right-expand-show"
          }`}
        >
          <p className="header-menu-option">Account</p>
          <p className="header-menu-option">Profile</p>
          <p className="header-menu-option">Private Sessions</p>
          <p className="header-menu-option">Settings</p>
          <p className="header-menu-option">Profile</p>
          <hr />
          <span className="header-menu-option" onClick={() => logout()}>
            Logout
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
