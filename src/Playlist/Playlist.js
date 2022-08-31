import React, { useEffect } from "react";
import PlaylistSongs from "./PlaylistSongs";
import axios from "axios";
import finalSongList from "../SongData/finalSongList";
import $ from 'jquery'; 

export default function Playlist(props){
    //name of the playlist
    const[playlistName,setPlaylistName]=React.useState("")
    //songs to be exported, from toPlaylist variable in App
    const[songs,setSongs]=React.useState(props.inPlaylist)
    const[playlistId,setPlayListId]=React.useState()


    //update the songs every time a song is added or removed from toPlaylist. props.inPlaylist same as toPlaylist in App
    useEffect(()=>{
        setSongs(props.inPlaylist)
    },[props.inPlaylist])


    //deletes song from toPlaylist(App) based on Id passed up. Used in Playlist Songs
    function deleteSong(songId){
        let newList=[]
        for(let i=0;i<songs.length;i++){
            if(songs[i].id===songId){

            }
            else{
                newList.push(songs[i])
            }
        }
        props.changePlaylist(newList)

    }
    console.log(songs)

    //maps songs to Playlist Songs
    const songList= songs.map(x =><PlaylistSongs deleteSong={deleteSong} name={x.name} id={x.id} album={x.album} artist={x.artist} image={x.image} previewUrl={x.previewUrl}/>)

    //gets Username
    async function getMe(){
        const {data} = await axios.get(" https://api.spotify.com/v1/me",{
            headers:{
                Authorization:`Bearer ${props.token}`
            },
            params:{
            }
        })
        return data.id
    }

    //meant to make playlist but at of 8/31/22 not working, keep getting 401 error don't know why :( very frustrating
    async function makePlaylist(){
        console.log(props.token)
        console.log("make Play")
        setPlaylistName("")
        const myId= await getMe()
        console.log(myId)
        const token=props.token
        let name;

        if(playlistName){
            name=playlistName
        }
        else{
            name="Flub's list"
        }

        const urlPlay="https://api.spotify.com/v1/users/"+myId+"/playlists"
        let id2;
        //reset playlist when songs are exported bc songs now in spotify acct so should not be in web APP
        $.ajax({
            url: urlPlay,
            method: "POST",
            data: JSON.stringify({
              name:name
            }),
            headers: {
              'Authorization': 'Bearer ' + props.token,
              'Content-Type': 'application/json'
            },
            success: function(response) {
              console.log(response);
              setPlayListId(response.id);
              id2=response.id     
              populatePlaylist(id2)         
            }
          })
     }

     async function populatePlaylist(id){
        const songList=songs;
        props.changePlaylist([])
        console.log("populate playlist")
        console.log(id + "playlist")
        try{
        for(let i=0;i<songList.length;i++){
            
            const songId=songList[i].id
            const x="spotify:track:"+songId
            console.log(x)

            console.log(songId)
            const playlistUrl="https://api.spotify.com/v1/playlists/"+id+"/tracks"
            $.ajax({
                url: playlistUrl,
                method: "POST",
                data:JSON.stringify({
                    uris:[x]
                  }),
                headers: {
                  'Authorization': 'Bearer ' + props.token,
                  'Content-Type': 'application/json'
                },
                success: function(response) {
                  console.log(response);
                }
              });
        }}
        catch(err){
            console.log(err)
        }
     }




     //utility method used to change song Library
    async function combine(){
        console.log(finalSongList.songs.length)
        // console.log(genre.genres.length)
        // console.log(artistId.artistId.length)
        // console.log(previewUrl.url.length)

        let arr=[]
    
            for(let i=0;i<finalSongList.songs.length;i++){
                // const newObj={...finalSongList.songs[i],previewUrl:previewUrl.url[i]}
                // arr.push(newObj)
                
            }
            
        console.log(arr)
    
        
    }
    

    return(
        <div>
                <input className="playlistName" value ={playlistName} type="text" onChange={e=>setPlaylistName(e.target.value)} placeholder="Playlist Name"></input>

            <div className="testOverFlow">
                <div className="searchSongGrid">
                    {songs.length? songList:<h1 className="noSong">No Songs Added</h1>}

                </div>
           </div>
           <button onClick={makePlaylist} className="searchSong">Generate Playlist</button>
        </div>
        
    )
}