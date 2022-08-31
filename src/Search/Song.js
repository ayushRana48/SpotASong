import React from "react";
import axios from 'axios';




export default function Song(props){

    //check if Song is hovered on
    const[hover,setHover]=React.useState(false)

    const styles ={
        border: props.current===props.id || hover? "white solid 2px":"none"
    }

    //this is where we get the audio features, pass this information to <Search> which passes to <App> which passes to <Stat>,
    //not the most efficient but it works will change later
    async function displayInfo(){
     
        const {data} = await axios.get("https://api.spotify.com/v1/audio-features/" + props.id,{
            headers:{
                Authorization:`Bearer ${props.token}`
            },
            params:{
                q:"audio-features"
            }
        })
        props.toggleSelected(true);
        props.select({name:props.name, artist:props.artist,id:props.id,popularity:props.popularity, image:props.image, album:props.album, url:props.url, year:props.year,energy:data.energy,
             danceability:data.danceability, loudness:data.loudness, tempo:data.tempo, valence:data.valence,speechiness:data.speechiness,acousticness:data.acousticness,})
        console.log(data)
    
   


    }

    //change font size depending on how long name and artist are
    const fontStyles = () =>{
        const x =props.name+props.artist
        const y= x.split(" ");

        if(y.length>8 && y.length<13 ){
            if(props.isSelected){
                return 0.8;
            }
            else{
                return 0.9
            }
        }

        else if(y.length>12 ){
            if(props.isSelected){
                return 0.7;
            }
            else{
                return 0.8
            }
        }
       
       else{
        if(props.isSelected){
            return 1;
        }
        else{
            return 1
        }
       }

    }

    const fontSize={
        fontSize:fontStyles()+"vw"
    }
    console.log(props.isSelected)

    const width={
        width:props.isSelected?"20vw":"30vw"
       
    }

    //audio stuff, did not use because when search a lot of preview URLs show up as nill so about 1/2 nothing plays
    const myRef = React.useRef();

    const startAudio = () => {
        console.log(props.previewUrl)
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
        <div style={width} className="song">
                    <audio ref={myRef} src={props.previewUrl}/>

            <h3 style={fontSize}>{props.name}, {props.artist}</h3>
            <img style={styles}  onClick={displayInfo} className="album-cover" src={props.image}/>
        </div>
    )
}


