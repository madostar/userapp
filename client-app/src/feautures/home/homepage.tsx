import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
    

    return(
        <div>
            <h1>Welcome to the User List</h1>
            <p>To add a new user please click on the following button</p>
            <Link style={{color: "white", background: "#ff6358", textDecoration: "none", padding:"5px",fontSize:"0.75em"}} to="/newuser">Add New User</Link>
        </div>
    )
}