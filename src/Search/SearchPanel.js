import React from "react";


export default function SearchPanel(props){

    React.useEffect(()=>{props.setPage("SearchPanel")},[])
    console.log(props.isSelected + "select")
    const x=props.search

    //used to split search and stats
    return(       
        <div className="searchPanel">
             {props.search}
             {props.isSelected && props.stats}
            
        </div>
    )

    
        
    
}