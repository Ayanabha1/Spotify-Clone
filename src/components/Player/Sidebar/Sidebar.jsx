import React, { useEffect } from "react";
import "./sidebar.css";
import SidebarOption from "./SidebarOption/SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useDataLayerValue } from "../../../Datalayer";
import AddBoxIcon from "@material-ui/icons/AddBox";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";

function Sidebar() {
  const [{ playlists }, dispatch] = useDataLayerValue();

  return (
    <div className="sidebar">
      <Link to="/">
        <img
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          alt=""
          className="sidebar-logo"
        />
      </Link>
      <div className="sidebarOptions-container">
        <Link to="/">
          <SidebarOption title="Home" Icon={HomeIcon} />
        </Link>
        <SidebarOption title="Search" Icon={SearchIcon} />
        <SidebarOption title="Your Library" Icon={LibraryMusicIcon} />
      </div>
      <div className="sidebarOptions-container">
        <SidebarOption title="Create Playlist" Icon={AddBoxIcon} />
        <SidebarOption title="Liked Songs" Icon={FavoriteIcon} />
      </div>
      <hr />

      {playlists?.items?.map((list, i) => {
        return (
          <Link to={`playlist/${list.id}`}>
            <SidebarOption title={list.name} key={i} />
          </Link>
        );
      })}
    </div>
  );
}

export default Sidebar;
