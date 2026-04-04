import { AUTH_STORAGE_KEYS } from "../../utility/constants";
import { createSlice } from "@reduxjs/toolkit";
import { getUserInfoFromToken, isTokenExpired } from "../../utility/JWTutil";

const getInitialAuthState = () => {
  const storedToken = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
  const storedUser = localStorage.getItem(AUTH_STORAGE_KEYS.USER);

  //clear invalid tokens first

  if (
    !storedToken ||
    storedToken === "undefined" ||
    storedToken === "null" ||
    isTokenExpired(storedToken)
  ) {
    localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER);

    return {
      token: null,
      user: null,
      isAuthenticated: false,
    };
  }

  let user = null;
  if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
    try {
      user = JSON.parse(storedToken);
    } catch {
      //if user data is corrupted, extract it from token
      user = getUserInfoFromToken(storedToken);
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user));
      }
    }
  }

  return {
    token: storedToken,
    user,
    isAuthenticated: !!storedToken && !!user,
  };
};

//Finally create a slice now

const authSlice = createSlice({
  name: "auth",
  initialState: { ...getInitialAuthState() },
  reducers: {

    //Frst reducer to set Auth state as logged in
    setAuth: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = !!(user && token);

      if (token) localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, token);
      if (user)
        localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user));
    },

    //Second reducer to logout
    logout: (state) => {
        localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
        localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        
    }
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
