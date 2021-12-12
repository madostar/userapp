import React, { useEffect, useState } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './../../App.css';
import axios from 'axios';
import { User } from '../models/User';
import HomePage from '../../feautures/home/homepage';
import UserList from '../../feautures/userform/userlist';

function App() {

  //retrieving data from the API
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    let isMounted = true;
    
    //fetching from api with delay 1 sec
    setTimeout(() => {
      axios.get<User[]>('http://localhost:5000/api/users').then(response => {
        var data = response.data;

        //a list of fixed data from the api to fit the grid
        var modified : any = [];

        //pushing fixed data from the api to the list
        for (let i = 0; i < data.length; i++) {
        modified.push({
            Username: data[i].username,
            FullName: (data[i].firstName + " " + data[i].lastName),
            LastLogin: (
            new Date(data[i].lastLogin).getFullYear() + "-" + new Date(data[i].lastLogin).getMonth() + "-" + new Date(data[i].lastLogin).getDay() + " " + new Date(data[i].lastLogin).getHours() + ":" + new Date(data[i].lastLogin).getMinutes()
            ),
            Enabled: (data[i].enabled?"Yes" : "No")
        });
        
        }
        if (isMounted) setUsers(modified);
    })
    },1000)
    return () => { isMounted = false };
  }, [])

  
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
