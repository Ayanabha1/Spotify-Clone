import {
  AddCircleSharp,
  FavoriteBorderOutlined,
  FiberManualRecord,
  MoreHorizRounded,
  PlayArrow,
  PlayCircleFilled,
  PlayCircleFilledOutlined,
  PlayCircleOutlineTwoTone,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDataLayerValue } from "../../../Datalayer";
import "./playlist.css";
import PlayIcon from "./Assets/playIcon.png";

function Playlist() {
  const [{ spotify }, dispatch] = useDataLayerValue();
  const [playlistInfo, setPlaylistInfo] = useState();
  const [mouseOn, setMouseOn] = useState(-1);

  const getPlaylist = () => {
    dispatch({
      type: "SET_PRIMARY_COLOR",
      primaryColor: "rgb(98,122,145)",
    });
    const playlistId = window.location.pathname.split("playlist/")[1];
    spotify
      .getPlaylist(`${playlistId}`)
      .then((data) => setPlaylistInfo(data))
      .catch((err) => console.log(err));
  };

  const capital = (text) => {
    return text?.toUpperCase();
  };

  const numFormatter = (num) => {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  };
  const timeFormatter = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const mouseOnRow = (i) => {
    setMouseOn(i);
  };
  const dateString = (date) => {
    const newDate = new Date(date);
    return newDate.toDateString();
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  return (
    <div className="Playlist">
      <div className="playlist-top-container">
        <div className="playlist-img">
          <img src={playlistInfo?.images[0].url} alt="" />
        </div>
        <div className="playlist-info">
          <h3>{capital(playlistInfo?.type)}</h3>
          <h1 className="playlist-info-name">{playlistInfo?.name}</h1>
          <p className="playlist-desc">{playlistInfo?.description}</p>
          <div className="playlist-extra-details">
            <p>{playlistInfo?.owner.display_name}</p>
            <div className="ped-sep"></div>
            <p>{numFormatter(playlistInfo?.followers.total)} followers</p>
            <div className="ped-sep"></div>
            <p>{playlistInfo?.tracks.items.length} songs</p>
          </div>
        </div>
      </div>

      <div className="playlist-bottom-container">
        <div className="playlist-controls">
          <img src={PlayIcon} alt="" />

          <FavoriteBorderOutlined
            fontSize="large"
            style={{ marginRight: "20px" }}
          />
          <MoreHorizRounded />
        </div>

        <div className="tracks-container">
          <table>
            <thead>
              <th>#</th>
              <th>TITLE</th>
              <th>ALBUM</th>
              <th>DATE ADDED</th>
              <th>
                {" "}
                <MoreHorizRounded />{" "}
              </th>
            </thead>
            <tbody
              onMouseLeave={() => {
                setMouseOn(-1);
              }}
            >
              {playlistInfo?.tracks.items.map((item, i) => (
                <tr
                  onMouseOver={() => {
                    mouseOnRow(i);
                  }}
                >
                  <td>
                    {i === mouseOn ? <PlayArrow fontSize="small" /> : i + 1}
                  </td>
                  <td>
                    <img
                      src={item.track.album.images[0]?.url}
                      alt={item.track.name}
                    />{" "}
                    {item.track.name}
                  </td>
                  <td>{item.track.album.name}</td>
                  <td>{dateString(item.added_at)}</td>
                  <td>{timeFormatter(item.track.duration_ms)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Playlist;
