import React, { useEffect, useState } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './../../App.css';
import { User } from '../models/User';
import HomePage from '../../feautures/home/homepage';
import UserList from '../../feautures/userform/userlist';
import agent from '../api/agent';
import LoadingComponent from './loadingcomponent';

function App() {

  //retrieving data from the API
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    let isMounted = true;
    
    //fetching from api with delay 1 sec
    
      agent.Users.list().then(response => {
        var data = response;

        //a list of fixed data from the api to fit the grid
        var modified : any = [];

        //pushing fixed data from the api to the list
        for (let i = 0; i < data.length; i++) {
        modified.push({
            username: data[i].username,
            fullName: (data[i].firstName + " " + data[i].lastName),
            lastLogin: (
            new Date(
              data[i].lastLogin).getFullYear() +
               "-" + new Date(data[i].lastLogin).getMonth() +
                "-" + new Date(data[i].lastLogin).getDay() +
                 " " + ((new Date(data[i].lastLogin).getHours()+"").length<2?"0":"")+ new Date(data[i].lastLogin).getHours() +
                  ":" + ((new Date(data[i].lastLogin).getMinutes()+"").length<2?"0":"") + new Date(data[i].lastLogin).getMinutes()
            ),
            enabled: (data[i].enabled?"Yes" : "No")
        });
        
        }
        if (isMounted){
           setUsers(modified);
           setLoading(false);
        }
    
    })
    return () => { isMounted = false };
  }, [])

  if(loading) return(<LoadingComponent/>);

  return (
    <div className="App">
      <header className="App-header">
        <HomePage/>
        {/* <Link to={"/newuser"}>New User</Link> */}
        <br />
        <UserList users={users}/>
      </header>
    </div>
  );
}

export default App;
