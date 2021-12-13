import React, { useEffect, useState } from "react";
import { GridFilterChangeEvent, Grid, GridColumn} from "@progress/kendo-react-grid";
import { User } from "../../app/models/User";
import { CompositeFilterDescriptor, filterBy, process } from "@progress/kendo-data-query";
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
          style={{ maxWidth:"75%"}}
          data={filterBy(users, filter)}
          pageable={true}
          sortable={true}
          filterable={true}
          filter={filter}
          onFilterChange={(e: GridFilterChangeEvent) => setFilter(e.filter)}
          >
          <GridColumn field="username" title='Username'/>
          <GridColumn field="fullName" title='Full Name' filterable={false}/>
          <GridColumn field="lastLogin" title='Last Login' filterable={false}/>
          <GridColumn field="enabled" title='Enabled' filterable={false}/>
          <GridColumn
            field="Edit user info"
            filterable={false}
            cell={(props) => (
              <td style={{textAlign: "center"}}>
                <NavLink style={{color: "white", background: "#ff6358", textDecoration: "none", padding:"5px"}} to={`/edituser/${users[props.dataIndex].username}`}>Edit</NavLink>
              </td>
            )}
          />
        </Grid>
    )
}