import React from "react";
import {Route,Link} from "react-router-dom"


export default function NavBar(props){
    //nav bar organizes all the links
    return(
        <div className="navLinks">
            <h1 className="title"> Spotify Stats</h1>
            <p><Link activeStyle={{color:'black'}} style={{ color:'white', textDecoration: 'none' }} to="/home">Recomendations</Link></p>
            <p><Link  activeStyle={{color:'black'}} style={{ color:'white', textDecoration: 'none' }}to="/searchPanel">Search</Link></p>
            <p><Link  activeStyle={{color:'black'}} style={{ color:'white', textDecoration: 'none' }}to="/playlist">Playlist</Link></p>

            <button className="logOut" onClick={props.logOut}>LogOut</button>
        </div>
       

    )
}