import React from "react";

export default function Genre(props){
    const styles ={
        //current?  backgroundColor:"FFFFD4" :backgroundColor: "#D4D4FF"
        backgroundColor: props.current===props.name ? "rgb(160, 50, 17)" : "rgb(17, 162, 17)",
        border: props.current===props.name ? "white solid 1.8px":"none"

        
       
    };
    //sets current category in home

    return(
        <div> <button className="categoryClick" onClick={props.click} style={styles} 
        >{props.name}</button> </div>
   );

}