import React, { useEffect, useState } from "react";
import { GridFilterChangeEvent, Grid, GridColumn} from "@progress/kendo-react-grid";
import { User } from "../../app/models/User";
import { CompositeFilterDescriptor, filterBy } from "@progress/kendo-data-query";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";

interface Props{
    users: User[]
}
const initialFilter: CompositeFilterDescriptor = {
    logic: "and",
    filters: [],
  };



export default function UserList({users}: Props){
    
    

    //Kendo grid filter
    const [filter, setFilter] = React.useState(initialFilter);
    
    return(
        <Grid
          style={{background: "blue", maxWidth:"75%"}}
          data={filterBy(users, filter)}
          sortable={true}
          filterable={true}
          filter={filter}
          onFilterChange={(e: GridFilterChangeEvent) => setFilter(e.filter)}
          >
          <GridColumn field="Username" title='Username'/>
          <GridColumn field="FullName" title='Full Name' filterable={false}/>
          <GridColumn field="LastLogin" title='Last Login' filterable={false}/>
          <GridColumn field="Enabled" filterable={false}/>
          <GridColumn
            field="Edit user info"
            filterable={false}
            cell={() => (
              <td>
                {users.map(user => (<NavLink style={{color: "white", background: "#ff6358", textDecoration: "none", padding:"5px"}} to={`/invoices/${user.id}`}>Edit</NavLink>))}
              </td>
            )}
          />
        </Grid>
    )
}