import { configureStore } from "@reduxjs/toolkit";
import adminReducer from './reducer'
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key :'root',
    storage,
  }

  const presistedReducer = persistReducer(persistConfig,adminReducer)

  export const store =  configureStore({
    reducer: {
     admin : presistedReducer 
    }   
  });

  export let persistor = persistStore(store)