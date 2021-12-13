import React from "react";
import { Loader, LoaderType } from "@progress/kendo-react-indicators";



export default function LoadingComponent(){

    return(
        <div style={{margin: "25% 0", textAlign:'center', justifyContent:'center'}}>
            <Loader size="large" />
            <br />
            Loading Data
        </div>
        
    )
}