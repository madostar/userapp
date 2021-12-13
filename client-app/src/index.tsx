import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/index.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './feautures/home/notfound';
import NewUser from './feautures/userform/newuser';
import EditUser from './feautures/userform/edituser';
import { StoreContext, store } from './app/stores/store';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Router>
      {/* <App/> */}
      <Routes>
              <Route path="/" element={<App />} / >
              <Route path='*' element={<NotFound />}/>
              
              <Route path="newuser" element={<NewUser />} />
              <Route path="edituser/:userid" element={<EditUser/>} >
              {/* <Route path='edituser/*' element={<NotFound />}/> */}
                {/* <Route path=":userid" element={<EditUser />}/> */}
              </Route>
            </Routes>
    </Router>
  </StoreContext.Provider>
 ,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
