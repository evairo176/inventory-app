import { configureStore } from "@reduxjs/toolkit";
import pointOfSale from "./slices/point-of-sale";

const store = configureStore({
  reducer: {
    pos: pointOfSale,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
