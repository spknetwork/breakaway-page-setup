import React from "react";
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.scss";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
      </PersistGate>
  </Provider>
  </React.StrictMode>
);
