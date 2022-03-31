import React, { useState, useEffect } from "react";
import "./body.css";
import Header from "../Header/Header";
import { useDataLayerValue } from "../../../Datalayer";
import { Route, Routes } from "react-router";
import Home from "./InnerComponents/Home/Home";
import Playlist from "../Playlist/Playlist";
function Body() {
  const [{ user, primaryColor }, dispatch] = useDataLayerValue();
  // console.log(user);

  useEffect(() => {
    dispatch({
      type: "SET_PRIMARY_COLOR",
      primaryColor: "rgb(20, 64, 89)",
    });
  }, []);

  return (
    <div
      className="body"
      style={{
        background: `linear-gradient(${primaryColor}, rgb(0, 0, 0, 1))`,
      }}
    >
      <Header userDetails={user} />
      <div className="main">
        {/* Recent playlists */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlist/:id" element={<Playlist />} />
        </Routes>
      </div>
    </div>
  );
}

export default Body;
