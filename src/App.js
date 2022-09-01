import {useEffect, useState} from "react";
import Stats from "./Search/Stats";
import {Route,Routes} from "react-router-dom"
import Search from "./Search/Search";
import Home from "./Reccomended/Home"
import NavBar from "./Navbar";
import SearchPanel from "./Search/SearchPanel";
import Playlist from "./Playlist/Playlist"


function App() {
    const CLIENT_ID="fdc4fdb38bf7423690bf14eed615589e"
    const REDIRECT_URI="http://localhost:3000/"
    const AUTH_ENDPOINT="https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPES="playlist-modify-private playlist-modify-public user-read-private"



    //token Used
    const[token,setToken]=useState("")
    //info for selected song in Search tab such as album, name, artist
    const[majorInfo,setMajorInfo]=useState({})
    //audio features for selected song in Search tab
    const[microInfo,setMicroInfo]=useState({})
    //says which song is selected in Search tab
    const[isSelected,setIsSelected]=useState(false);
    //copies the data from search tab
    const[copy,setCopy]=useState();

    //current tab
    const[currentPage,setCurrentPage]=useState([])
    //songs from reccomended page
    const[fromReccomended,setFromReccomended]=useState([])
    //songs sent to playlist plage
    const[toPlaylist,setToPlaylist]=useState([]);




    //initializing toPlaylist for refresh
    useEffect(()=>{
        if(JSON.parse(window.sessionStorage.getItem("playlistSongss")) && JSON.parse(window.sessionStorage.getItem("playlistSongss")).length>0 ){
            console.log(JSON.parse(window.sessionStorage.getItem("playlistSongss")))
            setToPlaylist(JSON.parse(window.sessionStorage.getItem("playlistSongss")))
            console.log(toPlaylist)
        }
    },[])

    //getting token from url
    useEffect(()=>{
        const hash=window.location.hash
        let token =window.localStorage.getItem("token")
        setToken(token)

        
        if(hash){
            let temp=hash;

            temp= temp.split('&');

            temp=temp[0];
            temp=temp.split("=")

            temp=temp[1];
            window.location.hash=""
            window.localStorage.setItem("token",temp)
            setToken(temp)
        }
       
    },[])

    //adding songs from reccomended to To playlist, from reccomended resets every time page switched
    useEffect(()=>{
        if(fromReccomended[fromReccomended.length-1]){
            setToPlaylist(x=>[...x,fromReccomended[fromReccomended.length-1]])

        }
    },[fromReccomended])

    //saves playlist Songs to session everytime toPlatlist changes
    useEffect(()=>{
        window.sessionStorage.setItem("playlistSongss",JSON.stringify(toPlaylist))

    },[toPlaylist])
    console.log(toPlaylist)


    //changes the sonf selected in search tab
    function toggleSelected(x){
        setIsSelected(x)
    }

    //gets the copy of song data from stats
    function getCopy(x){   
        setCopy(x)
        console.log(copy)
    }
    

    //since there is no link between search tab and stats page search needs to pass info up to App then App passes down to stats
    function changeInfo(x,y){
        console.log(x)
        //aritst,album,name
        setMajorInfo(x)
        //audio features
        setMicroInfo(y)
    }



    //log out remove token
    function logOut(){
        setToken("")
        window.localStorage.removeItem("token")
    }

    //set current page, not used much
    function setPage(newPage){
        setCurrentPage(oldArray => [...oldArray, newPage])
    }

    //utiltity methods to see if song or genre in list
    function myContainsSong(arr, elem){
        for(let i=0;i<arr.length;i++){
            if(arr[i].id===elem.id){
                return true
            }
        }
        return false;
    }


    function myContainsGenre(arr, elem){
        for(let i=0;i<arr.length;i++){
            if(arr[i].toLowerCase()==elem.toLowerCase()){
                return true
            }
            if(elem.toLowerCase().includes(arr[0].toLowerCase()) || elem.toLowerCase().includes(arr[1].toLowerCase())){
                return true;
            }
        }
        return false;
    }

    //add songs to reccomended used in Home component
    function addFromRecomended(newSongs){
        setFromReccomended(newSongs)
    }

    //change to Playlist used to remove stuff from to Playlist
    function changePlaylist(x){
        setToPlaylist(x)
    }


 
    const search =<Search isSelected={isSelected} setPage={setPage} toggleSelected={toggleSelected} changeInfo={changeInfo} token={token} logOut={logOut}/>

    const stats=<Stats getCopy={getCopy} toggleSelected={toggleSelected} majorInfo={majorInfo} microInfo={microInfo} />

    const playlist=<Playlist token={token} changePlaylist={changePlaylist} inPlaylist={toPlaylist}/>


    const recomended=<Home token={token} changePlaylist={changePlaylist} inPlaylist={toPlaylist} addFromRecomended={addFromRecomended} copy={copy} toggleSelected={toggleSelected} currentPage ={currentPage} setPage={setPage}/>

    return(
        <div> 
            {console.log(token)}
            {!token ?
            <div>
                <div className="title2">
                    <div className="title2Text"><h1> SpotASong</h1></div>
                </div>
                <h3 className="introInfo">Use Spotify Stats to help you find reccomended songs using song audio features</h3>
                <a className="logIn" style={{color:'white',textDecoration: 'none'}} href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`}>Log in</a>
            </div>
            :
            <div>
                    <NavBar logOut={logOut}/>
                    
                
                <Routes>
                    <Route exact path="/home" element={recomended}></Route>
                    <Route exact path="" element={recomended}></Route>
                    <Route exact path="/searchPanel" element={ <SearchPanel isSelected={isSelected} toggleSelected={toggleSelected} currentPage ={currentPage} setPage={setPage} stats={stats} search = {search}/>}></Route> 
                    <Route exact path="/playlist" element={playlist}></Route> 

                </Routes>
                <div className="bottomBar"><h2 className="bottomBarText">Ayush Rana FLB Studios</h2></div>

                
            </div>
            }
        </div>
    )
    ;
}
export default App;



