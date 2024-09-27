import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

// Import your slice reducers
import { postReducers } from "../slices/postSlice";
import { authReducers } from "../slices/authSlice";

// const rootReducer = combineReducers({
//   auth: authReducers,
//   post: postReducers,
// });

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducers);

export const store = configureStore({
  reducer: { auth: persistedReducer, post: postReducers },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
