import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login/Login";
import { useEffect, useState } from "react";
import { getTokenFromUrl } from "./components/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./components/Player/Player/Player";
import { useDataLayerValue } from "./Datalayer";
import { Redirect } from "react-router-dom";

function App() {
  const [{ user, token, loggedin }, dispatch] = useDataLayerValue();
  const spotify = new SpotifyWebApi();

  // Functions to login and logout

  const login = async () => {
    const hash = getTokenFromUrl();
    const _token = localStorage.getItem("SPOTIFY_TOKEN") || hash.access_token;
    window.location.hash = "";

    if (_token) {
      spotify.setAccessToken(_token);
      localStorage.setItem("SPOTIFY_TOKEN", _token);
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      dispatch({
        type: "SET_LOGIN_STATUS",
        loggedin: true,
      });
    }
  };

  const logout = () => {
    if (token) {
      localStorage.removeItem("SPOTIFY_TOKEN");
      dispatch({
        type: "SET_TOKEN",
        token: null,
      });
      window.location.reload();
    }
  };

  // Function to get the playlists and all

  const fetchSpotifyDetails = () => {
    // Get User Details
    spotify.getMe().then((_user) => {
      // console.log(_user);
      dispatch({
        type: "SET_USER",
        user: _user,
      });
    });

    // Get User Playlists
    spotify.getUserPlaylists().then((playlists) => {
      dispatch({
        type: "SET_PLAYLISTS",
        playlists,
      });
    });

    // Get User Album List
    // spotify
    //   .getMySavedAlbums(token)
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });
  };

  // Function to get the current state of spotify

  function getCurrentState() {
    spotify.getMyCurrentPlaybackState().then((data) => {
      console.log(data);
      dispatch({
        type: "SET_CURRENT_PLAYBACK_STATE",
        playbackState: data,
      });
    });

    // setInterval(() => {
    //   getCurrentState();
    // }, 1000);
  }

  useEffect(() => {
    fetchSpotifyDetails();
  }, [loggedin]);

  useEffect(() => {
    login();
    getCurrentState();
    // setInterval(() => {
    //
    // }, 1000);
  }, []);

  useEffect(() => {
    if (!loggedin) {
      logout();
    }
  }, [loggedin]);

  useEffect(() => {
    if (loggedin) {
    }
  }, [loggedin, dispatch]);

  return (
    <div className="App">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
