import {
  DiscFull,
  FavoriteBorderOutlined,
  HearingOutlined,
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

function Footer() {
  return (
    <div className="footer">
      <div className="footer-left">
        <img
          src="https://images.unsplash.com/photo-1646295669545-7ba5d48858f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt=""
          className="footer-album-logo"
        />
        <div className="footer-album-details">
          <div className="album-info">
            <p>Yeahhhhhhhhhhhhhhhhhhhhhhhhhh!</p>
            <p>R3X</p>
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
          <PlayCircleFilledWhiteRounded
            fontSize="large"
            className="footer-icons footer-play-icon"
          />
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
        <DevicesIcon className="footer-icons" />
        <VolumeUpOutlined className="footer-icons" />
        <input type="range" min="0" max="100" step="10" defaultValue="50" />
        <ExpandLessIcon className="footer-icons" />
      </div>
    </div>
  );
}

export default Footer;
