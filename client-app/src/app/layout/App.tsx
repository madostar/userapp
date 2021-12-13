import React, { useEffect } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './../../App.css';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from './loadingcomponent';
import { Link } from 'react-router-dom';
import UserList from '../../feautures/userform/userlist';

function App() {

  const {userStore} = useStore();

  useEffect(() => {
    userStore.loadUsers();
  }, [userStore])

  if(userStore.loadingInitial) return(<LoadingComponent/>);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the User List</h1>
        <p>To add a new user, please click the following button</p>
        <Link style={{color: "white", background: "#ff6358", textDecoration: "none",borderRadius:"5px", padding:"7px",fontSize:"0.75em"}} to="/newuser">Add New User</Link>
        <br/>
            <small>Please refresh page if you don't see changes <br />or double lists after updating a user <br />(Sorry for the inconvinience)</small>
        <br/>
        <UserList users={userStore.modified}/>
      </header>
    </div>
  );
}

export default observer(App);
