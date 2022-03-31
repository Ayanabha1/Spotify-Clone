import SpotifyWebApi from "spotify-web-api-js";
const spotify = new SpotifyWebApi();

export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  token: null,
  loggedin: false,
  spotify: spotify,
  primaryColor: "rgb(20, 64, 89)",
};

const reducer = (state, action) => {
  // Action -> type , [payload]
  // console.log(action);

  switch (action.type) {
    case "SET_PRIMARY_COLOR":
      return {
        ...state,
        primaryColor: action.primaryColor,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_LOGIN_STATUS":
      return {
        ...state,
        loggedin: action.loggedin,
      };
    case "SET_CURRENT_PLAYBACK_STATE":
      return {
        ...state,
        playbackState: action.playbackState,
      };
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.categories,
      };
    case "SET_CATEGORY_LIST":
      return {
        ...state,
        categoryList: action.categoryList,
      };
    case "SET_PLAYLIST_ID":
      return {
        ...state,
        playlistId: action.playlistId,
      };

    default:
      return state;
  }
};

export default reducer;
