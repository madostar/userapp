import React from "react";
import { GridFilterChangeEvent, Grid, GridColumn, GridRowProps} from "@progress/kendo-react-grid";
import { CompositeFilterDescriptor, filterBy } from "@progress/kendo-data-query";
import { NavLink } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { UserMod } from "../../app/models/UserMod";

interface Props{
    users: UserMod[]
}
const initialFilter: CompositeFilterDescriptor = {
    logic: "and",
    filters: [],
  };



export default function UserList({users}: Props){
    
    const {userStore} = useStore();

    //Kendo grid filter
    const [filter, setFilter] = React.useState(initialFilter);

    const rowRender = (
      trElement: React.ReactElement<HTMLTableRowElement>,
      props: GridRowProps
    ) => {
      const enabled = props.dataItem.enabled;
      const green = { backgroundColor: "#fafafa" };
      const red = { backgroundColor: "rgb(243, 23, 0, 0.32)" };
      const trProps: any = { style: (enabled==="Yes") ? green : red };
      return React.cloneElement(
        trElement,
        { ...trProps },
        trElement.props.children
      );
    };

    return(
        <Grid
          style={{ margin: "4em 20em 1em 20em"}}
          data={filterBy(users, filter)}
          pageable={true}
          sortable={true}
          filterable={true}
          filter={filter}
          rowRender={rowRender}
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
                <NavLink onClick={() => userStore.selectUser(users[props.dataIndex].id)} style={{color: "white", background: "#ff6358", textDecoration: "none", borderRadius:"5px", padding:"7px",}} to={`/edituser/${users[props.dataIndex].id}`}>Details</NavLink>
              </td>
            )}
          />
        </Grid>
    )
}