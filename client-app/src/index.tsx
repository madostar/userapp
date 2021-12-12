import React from 'react';
import ReactDOM from 'react-dom';
import { render } from "react-dom";
import './app/layout/index.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewUser from './feautures/userform/newuser';
import $ from "jquery"
import EditUser from './feautures/userform/edituser';


// ReactDOM.render(
//     <App />,
//   document.getElementById('root')
// );

const rootElement = document.getElementById("root");
render(
  <React.StrictMode>
    <Router>
      {/* <App/> */}

      <Routes>
        <Route path="/" element={<App />} / >
        <Route path="newuser" element={<NewUser />} />
        <Route path="edituser/:userid" element={<EditUser />} >
          {/* <Route path=":userid" element={<EditUser />}/> */}
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
