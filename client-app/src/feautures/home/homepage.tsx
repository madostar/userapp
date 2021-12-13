import { toJS } from "mobx";
import React, { useEffect} from "react";
import { Link } from "react-router-dom";
import LoadingComponent from "../../app/layout/loadingcomponent";
import { useStore } from "../../app/stores/store";
import UserList from "../userform/userlist";

export default function HomePage() {
  
  const {userStore} = useStore();

  console.log(userStore.loadingInitial)
  useEffect(() => {
    userStore.loadUsers();
  }, [userStore])
  console.log(userStore.loadingInitial)
  if(userStore.loadingInitial) return(<LoadingComponent/>);
  console.log(userStore.loadingInitial)
    return(
        <div>
            <h1>Welcome to the User List</h1>
            <p>To add a new user, please click the following button</p>
            <br/>
            <p>Please refresh page if you don't see the update (Sorry for the inconvinience)</p>
            <Link style={{color: "white", background: "#ff6358", textDecoration: "none",borderRadius:"5px", padding:"7px",fontSize:"0.75em"}} to="/newuser">Add New User</Link>
            
            <br />
            <UserList users={toJS(userStore.modified)}/>
        </div>
    )
}