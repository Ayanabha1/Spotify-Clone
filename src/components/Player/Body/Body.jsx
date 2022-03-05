import React, { useState, useEffect } from "react";
import "./body.css";
import Header from "../Header/Header";
import { useDataLayerValue } from "../../../Datalayer";
function Body() {
  const [{ user }] = useDataLayerValue();
  // console.log(user);
  const [greetMess, setGreetMess] = useState("");
  const today = new Date();

  function setGreetings() {
    const hr = today.getHours();
    if (hr > 4 && hr < 12) {
      setGreetMess("Good morning");
    } else if (hr > 12 && hr < 4) {
      setGreetMess("Good afternoon");
    } else {
      setGreetMess("Good evening");
    }
  }
  useEffect(() => {
    setGreetings();
  }, []);

  return (
    <div className="body">
      <Header userDetails={user} />

      <div className="main">
        <h1 className="greetings">{greetMess}</h1>
        {/* Recent playlists */}
      </div>
    </div>
  );
}

export default Body;
