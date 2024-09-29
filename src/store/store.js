import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import videoReducer from "../features/videoSlice";
import userReducer from "../features/userSlice";
import channelReducer from "../features/channelSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    video: videoReducer,
    user: userReducer,
    channel: channelReducer,
  },
});

export default store;
