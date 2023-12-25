// // store.js
// import { configureStore } from "@reduxjs/toolkit";
// import { api } from "./api";
// import { useDispatch, useSelector } from "react-redux";

// export const store = configureStore({
//   reducer: {
//     [api.reducerPath]: api.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(api.middleware),
// });

// export const { dispatch, getState } = store;

// export const useAppDispatch = () => useDispatch();
// export const useAppSelector = (selector) => useSelector(selector);


// store.js
import { configureStore } from '@reduxjs/toolkit';
import { userServices } from './services/users';

export const store = configureStore({
  reducer: {
    [userServices.reducerPath]: userServices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userServices.middleware),
});
