import React, { useEffect } from "react";

export default function SearchedSongs(props){
    const name=props.name;
    const image=props.image;
    const artist=props.artist;
    const album=props.album;
    const id=props.id;
    const previewUrl=props.previewUrl;
    const[clicked,setClicked] = React.useState()
    const[hover,setHover]=React.useState(false)

    //toggles
    useEffect(()=>{
        if(alreadyAdd()){
            setClicked(true)
        }
        else{
            setClicked(false)

        }
    })


    //style for add button
    const styles ={
        backgroundColor: clicked? "rgb(160, 50, 17)" : "rgb(17, 162, 17)",
        border: clicked? "rgb(160, 50, 17) solid 2px":"rgb(17, 162, 17) solid 2px"
       
    };

    //style for overall box
    const styles2 ={
        border: !hover? "white solid 2px":"rgb(17, 162, 17) solid 2px"
    };

    

    //check if song in playlist tab
    function alreadyAdd(){
        for(let i=0;i<props.inPlaylist.length;i++){
            if(props.inPlaylist[i].id===id){
                return true
            }
        }
        return false;
    }
    
    //sends or unsends song to playlist
    function addToHome(){
        if(!clicked){
            const newObj={name:props.name,
                image:props.image,
                artist:props.artist,
                album:props.album,
                id:props.id,
                previewUrl:previewUrl}
            props.addSong(newObj)
        }
        else{
            setClicked(false)
            props.removeSong(id)
        }
        
    }

    //playing song preview stuff, sometimes preview is null so nothing plays
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
        <div style ={styles2}className="searchedSong">
                  <audio ref={myRef} src={previewUrl}/>
            <div className="searchAlbum">
                <img onMouseEnter={startAudio} onMouseLeave={pauseAudio} className="searchAlbumPic" src={image}/>
                <div className="searchSongInfo">
                    <h3>{name}</h3>
                    <p>{album}</p>
                    <p>by {artist}</p>
                </div>
                
            </div>
            <button onClick={addToHome} style={styles} className="addSong">Add Song</button>
        </div>
    )
}