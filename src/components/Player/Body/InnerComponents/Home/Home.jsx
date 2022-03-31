import { PlayCircleFilled, PlayCircleOutline } from "@material-ui/icons";
import { green } from "@mui/material/colors";
import React, { useState, useEffect } from "react";
import { useDataLayerValue } from "../../../../../Datalayer";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [greetMess, setGreetMess] = useState("");
  const [{ playlists, categoryList, playlistId }, dispatch] =
    useDataLayerValue();
  const today = new Date();
  function setGreetings() {
    const hr = today.getHours();
    if (hr > 4 && hr < 12) {
      setGreetMess("Good morning");
    } else if (hr > 12 && hr < 16) {
      setGreetMess("Good afternoon");
    } else {
      setGreetMess("Good evening");
    }
  }
  useEffect(() => {
    setGreetings();
  }, []);

  function categoryClick(id) {
    dispatch({
      type: "SET_PLAYLIST_ID",
      playlistId: id,
    });
  }

  useEffect(() => {
    console.log(playlists);
  }, [playlists]);

  return (
    <div className="Home">
      <h1 className="greetings">{greetMess}</h1>

      {/* Playists */}
      <div className="playlist-tiles">
        {playlists?.items?.map((playlist) => (
          <Link to={`playlist/${playlist.id}`}>
            <div className="playlist-tile">
              <img src={playlist?.images[0]?.url} alt="" />

              <h4 className="playlist-name">{playlist?.name}</h4>
            </div>
          </Link>
        ))}
      </div>

      {/* Categories */}
      <div className="category-container">
        {categoryList?.map((categ) => (
          <div className="category-row">
            {categ?.playlists.items.length > 0 && (
              <>
                <h2>{categ?.name}</h2>
                <div className="category-tile-row">
                  {categ?.playlists.items.map((item) => (
                    <Link to={`playlist/${item.id}`}>
                      <div
                        className="category-tile"
                        onClick={() => {
                          categoryClick(item.id);
                        }}
                      >
                        <div className="tile-img-container">
                          <img src={item.images[0].url} alt="" />
                          <div className="cat-ic">
                            <img src="./Images/playIcon.png" alt="" />
                          </div>
                        </div>
                        <p>{item.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
