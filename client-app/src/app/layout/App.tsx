import React, { useEffect, useState } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './../../App.css';
import axios from 'axios';
import { Button } from "@progress/kendo-react-buttons";
import { Link } from "react-router-dom";
import {filterBy,CompositeFilterDescriptor} from "@progress/kendo-data-query";
import { GridFilterChangeEvent, Grid, GridColumn } from '@progress/kendo-react-grid';
import { User } from '../models/User';

const initialFilter: CompositeFilterDescriptor = {
  logic: "and",
  filters: [],
};

function App() {

  //Kendo grid filter
  const [filter, setFilter] = React.useState(initialFilter);

  //retrieving data from the API
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    let isMounted = true;
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
    return () => { isMounted = false };
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the User List</h1>
        <p>To add a new user please click on the following button</p>
        <Button primary={true}>Add User</Button>
        {/* <Link to={"/newuser"}>New User</Link> */}
        <br />
        <Grid
          style={{background: "blue"}}
          data={filterBy(users, filter)}
          filterable={true}
          filter={filter}
          onFilterChange={(e: GridFilterChangeEvent) => setFilter(e.filter)}
          >
          <GridColumn field="Username" title='Username'/>
          <GridColumn field="FullName" title='Full Name' filterable={false}/>
          <GridColumn field="LastLogin" title='Last Login' filterable={false}/>
          <GridColumn field="Enabled" filterable={false}/>
        </Grid>
      </header>
    </div>
  );
}

export default App;
