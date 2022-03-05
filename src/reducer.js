export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  token: null,
  loggedin: false,
};

const reducer = (state, action) => {
  // Action -> type , [payload]
  // console.log(action);

  switch (action.type) {
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

    default:
      return state;
  }
};

export default reducer;
