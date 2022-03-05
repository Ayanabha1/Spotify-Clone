import React from "react";
import "./player.css";
import Sidebar from "../Sidebar/Sidebar";
import Body from "../Body/Body";
import Footer from "../Footer/Footer";

function Player() {
  return (
    // <div><h1>Welcome to spotify</h1></div>
    <div className="player">
      <div className="player-body">
        <Sidebar />
        <Body />
      </div>

      <Footer />
    </div>
  );
}

export default Player;
