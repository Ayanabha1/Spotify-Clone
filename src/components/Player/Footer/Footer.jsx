import {
  DiscFull,
  FavoriteBorderOutlined,
  HearingOutlined,
  PauseCircleFilledOutlined,
  PauseCircleFilledRounded,
  PlayCircleFilledWhiteRounded,
  PlaylistAdd,
  Shuffle,
  VolumeUp,
  VolumeUpOutlined,
} from "@material-ui/icons";
import React from "react";
import "./footer.css";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import DevicesIcon from "@material-ui/icons/Devices";
import VolumeMuteOutlinedIcon from "@material-ui/icons/VolumeMuteOutlined";
import RepeatOutlinedIcon from "@material-ui/icons/RepeatOutlined";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { useDataLayerValue } from "../../../Datalayer";

function Footer() {
  const [{ playbackState }] = useDataLayerValue();

  console.log(playbackState);
  return (
    <div className="footer">
      <div className="footer-main">
        <div className="footer-left">
          <img
            src={playbackState?.item?.album?.images[0]?.url}
            alt=""
            className="footer-album-logo"
          />
          <div className="footer-album-details">
            <div className="album-info">
              <p>{playbackState?.item?.name}</p>
              <p>{playbackState?.item?.album?.artists[0]?.name}</p>
            </div>
            <div className="album-options">
              <FavoriteBorderOutlined className="footer-icons" />
            </div>
          </div>
        </div>
        <div className="footer-center">
          <div className="footer-center-top">
            <ShuffleIcon className="footer-icons" />
            <SkipPreviousIcon className="footer-icons" />
            {playbackState?.is_playing ? (
              <PauseCircleFilledOutlined
                fontSize="large"
                className="footer-icons footer-play-icon"
              />
            ) : (
              <PlayCircleFilledWhiteRounded
                fontSize="large"
                className="footer-icons footer-play-icon"
              />
            )}

            <SkipNextIcon className="footer-icons" />
            <RepeatOutlinedIcon className="footer-icons" />
          </div>
          <div className="footer-center-bottom">
            <span>0:00</span>
            <input type="range" min="0" max="100" step="10" defaultValue="50" />
            <span>3:00</span>
          </div>
        </div>
        <div className="footer-right">
          <PlaylistAdd className="footer-icons" />
          <QueueMusicIcon className="footer-icons" />
          <DevicesIcon
            className={`footer-icons ${
              playbackState?.is_playing && "footer-icons-green"
            }`}
          />
          <VolumeUpOutlined className="footer-icons" />
          <input type="range" min="0" max="100" step="10" defaultValue="50" />
          <ExpandLessIcon className="footer-icons" />
        </div>
      </div>

      <div
        className={`current-device ${
          playbackState?.is_playing && "current-device-show"
        }`}
      ></div>
    </div>
  );
}

export default Footer;
