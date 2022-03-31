import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login/Login";
import { useEffect, useState } from "react";
import { getTokenFromUrl } from "./components/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./components/Player/Player/Player";
import { useDataLayerValue } from "./Datalayer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [{ user, token, loggedin, spotify, categories }, dispatch] =
    useDataLayerValue();
  // const spotify = new SpotifyWebApi();

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

  const fetchSpotifyDetails = async () => {
    // Get User Details
    await spotify.getMe().then((_user) => {
      // console.log(_user);
      dispatch({
        type: "SET_USER",
        user: _user,
      });
    });

    // Get User Playlists
    spotify.getUserPlaylists().then((playlists) => {
      // console.log(playlists);
      dispatch({
        type: "SET_PLAYLISTS",
        playlists,
      });
    });

    // Get several categories

    spotify
      .getCategories({ limit: 10, country: "IN" })
      .then((data) => {
        console.log(data);
        dispatch({
          type: "SET_CATEGORIES",
          categories: data.categories,
        });
      })
      .catch((err) => console.log(err.response));
  };

  // Get category
  async function getCategoryItems() {
    let categList = [];
    await categories.items.forEach(async (category) => {
      await spotify
        .getCategoryPlaylists(`${category.id}`)
        .then((data) =>
          categList.push({ name: category.name, playlists: data.playlists })
        )
        .catch((err) => console.log(err));
    });
    dispatch({
      type: "SET_CATEGORY_LIST",
      categoryList: categList,
    });
  }

  useEffect(() => {
    // console.log(categories);
    getCategoryItems();
  }, [categories]);

  // Function to get the current state of spotify

  async function getCurrentState() {
    spotify.getMyCurrentPlaybackState().then(async (data) => {
      // console.log(data);
      await dispatch({
        type: "SET_CURRENT_PLAYBACK_STATE",
        playbackState: data,
      });
    });

    // setInterval(() => {
    //   getCurrentState();
    // }, 5000);
  }

  useEffect(() => {
    async function _fetchSpotifyDetails() {
      await fetchSpotifyDetails();
    }
    _fetchSpotifyDetails();
  }, [loggedin]);

  useEffect(() => {
    login();
    async function _getCurrentState() {
      await getCurrentState();
    }

    _getCurrentState();
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
    <Router>
      <div className="App">
        {token ? <Player spotify={spotify} /> : <Login />}
      </div>
    </Router>
  );
}

export default App;
