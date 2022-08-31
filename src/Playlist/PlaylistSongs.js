import React, { useEffect } from "react";


export default function PlaylistSongs(props){

    //sends id of song removed to Playlist so it will be removed there
    function removeSong(){
        props.deleteSong(props.id)
    }

    const[hover,setHover]=React.useState(false)



    

    const styles={
        border: !hover? "white solid 2px":"rgb(17, 162, 17) solid 2px"

        
       
    };


    //playing audio stuff

    const myRef = React.useRef();

    const startAudio = () => {
        setHover(true)
        if(props.previewUrl){
            myRef.current.play();
        }
       
        console.log("play");


     };

    const pauseAudio = () => {
        setHover(false)
        console.log("pause");
        myRef.current.pause();
     };


    return(
    <div style={styles} className="searchedSong">
            <audio ref={myRef} src={props.previewUrl}/>
            <div className="searchAlbum">
                <img onMouseEnter={startAudio} onMouseLeave={pauseAudio} className="searchAlbumPic" src={props.image}/>
                <div className="searchSongInfo">
                    <h3>{props.name}</h3>
                    <p>{props.album}</p>
                    <p>by {props.artist}</p>
                </div>
                
            </div>
            <button onClick={removeSong} className="addSong">Remove Song</button>
        </div>
    )
}