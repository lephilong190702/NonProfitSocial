import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.jsx";
import "./index.css";
import { store } from "./app/store.js";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
  // <React.StrictMode>
  //   <Provider store={store}>
  //     <App />
  //   </Provider>
  // </React.StrictMode>
)