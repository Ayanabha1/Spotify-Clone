import {
  ComputerTwoTone,
  DiscFull,
  FavoriteBorderOutlined,
  HearingOutlined,
  PauseCircleFilledOutlined,
  PauseCircleFilledRounded,
  PhoneIphoneOutlined,
  PhoneIphoneTwoTone,
  PlayCircleFilledWhiteRounded,
  PlaylistAdd,
  Shuffle,
  VolumeUp,
  VolumeUpOutlined,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
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
import { Slider } from "material-ui-slider/es5/src";

function Footer() {
  const [songProgress, setSongProgress] = useState("0:00");
  const [songDuration, setSongDuration] = useState("");

  const changeTimeFormat = (min, sec) => {
    let sec_res = sec.toString();
    if (sec < 10) {
      // sec = "0" + sec;
      let temp = "0";
      sec = sec.toString();
      sec_res = temp.concat(sec);
    }

    return sec_res;
  };

  const getSongProgress = () => {
    const progress_in_ms = playbackState?.progress_ms;
    const min_temp = Math.floor(progress_in_ms / 1000 / 60);
    const sec_temp = Math.floor((progress_in_ms / 1000) % 60);

    let sec = changeTimeFormat(min_temp, sec_temp);
    if (!min_temp) {
      setSongProgress("0:00");
    } else {
      setSongProgress(`${min_temp}:${sec}`);
    }
  };
  const getSongDuration = () => {
    const duration_in_ms = playbackState?.item?.duration_ms;
    const min_temp = Math.floor(duration_in_ms / 1000 / 60);
    const sec_temp = Math.floor((duration_in_ms / 1000) % 60);

    let sec = changeTimeFormat(min_temp, sec_temp);
    if (!min_temp) {
      setSongDuration("0:00");
    } else {
      setSongDuration(`${min_temp}:${sec}`);
    }
  };

  const [{ playbackState }] = useDataLayerValue();
  // console.log(playbackState);

  useEffect(() => {
    getSongProgress();
    getSongDuration();
  }, [playbackState]);

  return (
    <div className="footer">
      <div className="footer-main">
        <div className="footer-left">
          {playbackState ? (
            <div className="footer-left-container">
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
          ) : (
            ""
          )}
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
            <span>{`${songProgress}`}</span>
            <div className="footer-slider-container">
              <Slider
                min={0}
                max={playbackState?.item?.duration_ms}
                value={playbackState?.progress_ms}
                className="footer-slider"
              />
            </div>
            <span>{`${songDuration}`}</span>
          </div>
        </div>
        <div className="footer-right">
          {playbackState ? (
            <div className="footer-right-container">
              <QueueMusicIcon className="footer-icons" />

              {playbackState?.is_playing ? (
                playbackState?.device?.type === "Smartphone" ? (
                  <PhoneIphoneOutlined
                    className={`footer-icons ${
                      playbackState?.is_playing && "footer-icons-green"
                    }`}
                  />
                ) : (
                  <DevicesIcon
                    className={`footer-icons ${
                      playbackState?.is_playing && "footer-icons-green"
                    }`}
                  />
                )
              ) : (
                <DevicesIcon className="footer-icons" />
              )}
              <VolumeUpOutlined className="footer-icons" />
              <div className="footer-slider-container">
                <Slider
                  min={0}
                  max={100}
                  value={playbackState?.device?.volume_percent}
                  className="footer-slider"
                  sx={{
                    color: "#1DB954",
                  }}
                />
              </div>

              <ExpandLessIcon className="footer-icons" />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div
        className={`current-device ${
          playbackState?.is_playing && "current-device-show"
        }`}
      >
        <VolumeUpOutlined className="current-device-icon" fontSize="small" />
        <p>{`Listening on ${playbackState?.device?.name}`}</p>
      </div>
    </div>
  );
}

export default Footer;
