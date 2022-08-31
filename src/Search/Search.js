import {useEffect, useState} from "react";
import axios from 'axios';
import Song from "./Song";


function Search(props) {

    //what is being typed as search query
    const[search,setSearch]=useState("")
    //the songs that are found when searched
    const[songs,setSongs]=useState([])

    //the id of the song selected
    const[selectedID,setSelectedID]= useState("");



    async function selectSong(x){
        //change selected Id
        setSelectedID(x.id)
        //say selected is true, this is used to reset search screen when search page is left
        props.toggleSelected(true)
        console.log(x)

            //change Major Info and Minor Info in Home, since Search not connected to Stats need to pass info to App to get Stats to render
           props.changeInfo({name:x.name, id:x.id, artist:x.artist,popularity:x.popularity, image:x.image,album:x.album.name, year:x.album.release_date, url:x.url},
            {danceability:x.danceability, energy:x.energy, loudness:x.loudness, tempo:x.tempo, valence:x.valence,acousticness:x.acousticness,speechiness:x.speechiness})
    }

    //Spotify Api search for song with token from APp
    const searchSong = async (e) => {
        setSelectedID("")
        e.preventDefault()
        try{
        const {data} = await axios.get("https://api.spotify.com/v1/search",{
            headers:{
                Authorization:`Bearer ${props.token}`
            },
            params:{
                q:search,
                type:"track"
            }
        })

        const temp=[];
        //only get top 6 songs
        for(let i=0; i<6;i++){
            temp[i]=data.tracks.items[i]
        }
        console.log(temp)
        setSongs(temp)
    }
    catch(err){
        console.log(err)
    }
    }

    //map the songs to <Song>, used for display and signalling which <Song> is slected
    function songsListt(){
        if(songs[0]){
            let newArr=[]
            for(let i=0; i<songs.length;i++){
                const x=songs[i];
                newArr.push(<Song isSelected = {props.isSelected} toggleSelected={props.toggleSelected} num={i} select={selectSong} current={selectedID} token = {props.token} image={x.album.images[0].url} album={x.album} year={x.release_date} name={x.name} id={x.id} artist = {x.artists[0].name} previewUrl={x.preview_url} popularity={x.popularity}/>)
            }
            return newArr
        }
        else{
            return []
        }
    }

    //this is what's displayed
    const songList = songsListt()



    return(
        <div className="searchComp"> 
            <div>
                <form className="search" onSubmit={searchSong}>
                    <input className="searchText" type="text" onChange={e=>setSearch(e.target.value)} placeholder="search song"></input>
                    <button className="searchButton" type={"submit"}>Search</button>
                 </form>
                <div className="songs">
                    {songList}
                </div>                    
            </div>
        </div>
    )
    
}

export default Search;