import React from "react";
import "./body.css";
import Header from "../Header/Header";
import { useDataLayerValue } from "../../../Datalayer";
function Body() {
  const [{ user }] = useDataLayerValue();
  // console.log(user);

  return (
    <div className="body">
      <Header userDetails={user} />
    </div>
  );
}

export default Body;
