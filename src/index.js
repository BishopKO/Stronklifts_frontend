import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import Root from "./views/root";
import "../src/index.css";

import data from "../src/data/data";

import EditTraining from "../src/views/EditTraining";

ReactDOM.render(
  <React.StrictMode>
    <Root/>
    {/*<EditTraining data={data}/>*/}
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
