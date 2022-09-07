import React from "react";
import SliderBar from "./SliderBar";
import Carousel from "react-elastic-carousel";
import Genre from "./Genre";
import finalSongList from "../SongData/finalSongList";
import SearchedSongs from "./SearchedSong";
import axios from "axios";
import Checkbox from "react-custom-checkbox";

export default function Home(props){

    //tracks all the inputted setting preferences
    const[settings,setSettings]=React.useState({Popularity: {value:50, checked:true},
        Energy: {value:50, checked:true},                       
        Danceability: {value:50, checked:true},
        Tempo: {value:50, checked:true},
        Valence: {value:50, checked:true},
        Loudness:{value:50,checked:true},
        Acousticness:{value:50,checked:true},
        Speechiness:{value:50,checked:true}})
    //current inputted genre
    const [currGenre,setCurrGenre]= React.useState("Any")

    //the songs that are displayed
    const[topSongs,setTopSongs]=React.useState([])
    //the songs that are added to the playlist
    const[addedSongs,setAddedSongs]=React.useState([])
    //the settings that are pasted from the search page
    const[paste,setPaste]=React.useState()
    //additional reccomended songs
    const[listRec,setListRec]=React.useState([])
    const[seedSong,setSeedSong]=React.useState(true)

    //store settings through refresh page
    React.useEffect(()=>{
        if(JSON.parse(window.sessionStorage.getItem("settings"))){
            setSettings(JSON.parse(window.sessionStorage.getItem("settings")))
        }
    },[])

    
    React.useEffect(()=>{
        testRec()
        console.log(listRec)
    },[paste,settings,currGenre])


    React.useEffect(()=>{props.setPage("Home")
                         props.toggleSelected(false)},[])


    //changes settings, this method passed down to SliderBar component
    function changeSettings(name, properties){
   
        setSettings((x) => {return {...x, [name] : properties}})
    }

    //changes genre
    function handleGenre(click){
        console.log("Click" +click)
        setCurrGenre(click)
        
    }

    //counts number of stats later used to give perecntage score
    function getTotalStats(){
        let total=0;
        if(settings.Popularity.checked){
            total+=1;
        }
        if(settings.Energy.checked){
            total+=1;
        }
        if(settings.Danceability.checked){
            total+=1;
        }
        if(settings.Tempo.checked){
            total+=1;
        }
        if(settings.Valence.checked){
            total+=1;
        }
        if(settings.Loudness.checked){
            total+=1;
        }
        if(settings.Acousticness.checked){
            total+=1;
        }
        if(settings.Speechiness.checked){
            total+=1;
        }
        return total;
    }

    //filters library by genre
    function filterGenre(){
        console.log("search")
        let filteredList=[]
        if(currGenre==="Any"){
            return finalSongList.songs
        }
        for(let i=0;i<finalSongList.songs.length;i++){
            const currentSong=finalSongList.songs[i];
            let genreCount=0;
            for(let j=0;j<currentSong.genre.length;j++){
                if(currentSong.genre[j]===currGenre){
                    genreCount+=1;
                }
            }
            if((genreCount/parseFloat(currentSong.genre.length))>0.4){
                filteredList.push(currentSong)
            }
        }
        console.log(filteredList)
        return filteredList
        

    }

    //calculates score by comparing song features to settings features
    function calculateScore(){
        const songList=filterGenre()
        const totalStats= getTotalStats();
        const popularity=settings.Popularity.value;
        const energy = settings.Energy.value
        const danceability= settings.Danceability.value
        const valence= settings.Valence.value
        const tempo=settings.Tempo.value
        const acousticness=settings.Acousticness.value
        const speechiness=settings.Speechiness.value
        const loudness=settings.Loudness.value




        let scoreList=[]
        
        for(let i=0;i<songList.length;i++){
            const currSong=songList[i]
            let score=0;
            if(settings.Popularity.checked){

                const diff=Math.abs(currSong.popularity-popularity)
                score+=(100-diff);
            }
            if(settings.Energy.checked){

                const diff=Math.abs((currSong.energy*100)-energy)
                score+=(100-diff);
            }
            if(settings.Danceability.checked){

                const diff=Math.abs((currSong.danceability*100)-danceability)
                score+=(100-diff);
            }
            if(settings.Valence.checked){

                const diff=Math.abs((currSong.valence*100)-valence)
                score+=(100-diff);
            }
            if(settings.Tempo.checked){

                const diff=Math.abs(((currSong.tempo-50)/1.5)-tempo)
                score+=(100-diff);
            }
            if(settings.Acousticness.checked){

                const diff=Math.abs((currSong.acousticness*100)-acousticness)
                score+=(100-diff);
            }
            if(settings.Speechiness.checked){

                const diff=Math.abs((currSong.speechiness*100)-speechiness)
                score+=(100-diff);
            }
            if(settings.Loudness.checked){

                const diff=Math.abs(((currSong.loudness/25.0)*100)-loudness)
                score+=(100-diff);
            }
            score=score/(parseFloat(totalStats)*100);
            
            const newObj= {...currSong, "score" : score}
            scoreList.push(newObj)
    
            
        }

        //sorts by score
        scoreList.sort(function(a,b){
            if(a.score>b.score){
                return -1;
            }
            else if(a.score<b.score){
                return 1;
            }
            else{
                return 0;
            }
        })

        setTopSongs(getSongs(scoreList))
        console.log(scoreList)
        return scoreList;
  

    }

    
    //gets additional reccomended songs outside of code library using spotify api
    async function testRec(){
    
    let targetPop=""
    let targetEnergy=""
    let targetDance=""
    let targetTempo=""
    let targetVal=""
    let targetLoud=""
    let targetAcc=""
    let targetSpeech=""
    let targetGenre=""

    if(settings.Popularity.checked){
        targetPop="target_popularity="+settings.Popularity.value+"&"
    }
    if(settings.Energy.checked){
        targetEnergy="target_energy"+settings.Energy.value/100+"&"
    }
    if(settings.Danceability.checked){
        targetDance="target_danceability="+settings.Danceability.value/100+"&"
    }
    if(settings.Tempo.checked){
        targetTempo="target_tempo="+(settings.Tempo.value*1.5+50)+"&"
    }
    if(settings.Valence.checked){
        targetVal="target_valence="+(settings.Valence.value/100)+"&"
    }
    if(settings.Loudness.checked){
        targetLoud="target_loudness="+(settings.Loudness.value/4-25)+"&"
    }
    if(settings.Acousticness.checked){
        targetAcc="target_acousticness="+(settings.Acousticness.value/100)+"&"
    }
    if(settings.Speechiness.checked){
        targetSpeech="target_speechiness="+(settings.Speechiness.value/100)+"&"
    }
    if(currGenre!=="Any" || currGenre!=="Other"){
        targetGenre="seed_genres="+currGenre
    }
    let url="https://api.spotify.com/v1/recommendations?market=US&seed_tracks="+paste.id+"&"+targetGenre+targetPop+targetEnergy+targetDance+targetTempo+targetVal+targetLoud+targetAcc+targetSpeech
    console.log(url)
        const {data} = await axios.get(url,{
            headers:{
                Authorization:`Bearer ${props.token}`
            },
        })

        console.log(data) 
        setListRec(data.tracks)
        return data.tracks; 
    }

    //mixes spotify api reccomendations and our library reccomendations
    function getSongs(songList){
        let moreArr=[]
       
        let arr=[]

        
        for(let i=0;i<61;i++){
            arr.push(songList[i])
        }
        //only uses spotify api reccomendations, if user pastes song features and does not change them, (allowed to uncheck features)
        if(seedSong){
            listRec.forEach(x=>{
                console.log(x)
                const newObj={name:x.name,
                            image:x.album.images[0].url,
                            album:x.album.name,
                            artist:x.artists[0].name,
                            id:x.id,
                            previewUrl:x.preview_url}
                arr.splice(Math.floor(Math.random()*40),0,newObj)
            })
        }
        console.log(arr)
        return arr;
    }

    //pastes data from search tab
    function pasteData(){
        setSettings(function(x){
            const newObj= {id:x.id,
                          Popularity:{value: props.copy.Popularity,checked: x.Popularity.checked},
                          Energy:{value: props.copy.Energy,checked: x.Energy.checked},
                          Danceability:{value: props.copy.Danceability,checked: x.Danceability.checked},
                          Tempo:{value: props.copy.Tempo,checked: x.Tempo.checked},
                          Valence:{value: props.copy.Valence,checked: x.Valence.checked},
                          Loudness:{value: props.copy.Loudness,checked: x.Loudness.checked},
                          Speechiness:{value: props.copy.Speechiness,checked: x.Speechiness.checked},
                          Acousticness:{value: props.copy.Acousticness,checked: x.Acousticness.checked}}
            return newObj    
        }
       
        )
        console.log(props.copy)
        setPaste(props.copy)
    }


    //adds songs to reccomended
    function addSong(newSong){
        setAddedSongs((x)=>
            [...x,newSong])
        
       
    }

    //only use api reccomended if settings unchanged from paste
    function isAPi(){
        if(!paste){
            return false
        }
        if(settings.Energy.checked){
            if(settings.Energy.value!==paste.Energy){
                return false
            }
        }
        if(settings.Danceability.checked){
            if(settings.Danceability.value!==paste.Danceability){
                return false
            }
        }
        if(settings.Valence.checked){
            if(settings.Valence.value!==paste.Valence){
                return false
            }
        }
        if(settings.Tempo.checked){
            if(settings.Tempo.value!==paste.Tempo){
                return false
            }
        }
        if(settings.Acousticness.checked){
            if(settings.Acousticness.value!==paste.Acousticness){
                return false
            }
        }
        if(settings.Speechiness.checked){
            if(settings.Speechiness.value!==paste.Speechiness){
                return false
            }

        }
        if(settings.Loudness.checked){
            if(settings.Loudness.value!==paste.Loudness){
                return false
            }
        }
        return true
    }

    //removes song from playlist by clocking again
    function removeSong(songId){
        let newList=[]
        for(let i=0;i<props.inPlaylist.length;i++){
            if(props.inPlaylist[i].id===songId){

            }
            else{
                newList.push(props.inPlaylist[i])
            }
        }
        props.changePlaylist(newList)

    }

    props.addFromRecomended(addedSongs)
   
    //how many genres to show
    const breakPoints =[
        {width:1, itemsToShow:5}
    ]

    const genres =["Any","Pop","EDM","Rap","R&B","Latin","Rock","Metal","Country","Folk","Other"]
    const genreList = genres.map(name => <Genre click={()=>handleGenre(name)} name={name} current={currGenre} />)

    //maps songs to Searched Song component
    const songsWithScore= topSongs.map(x =><SearchedSongs removeSong={removeSong} inPlaylist={props.inPlaylist} name={x.name} id={x.id} album={x.album} artist={x.artist} image={x.image} addSong={addSong} previewUrl={x.previewUrl}/>)

    function handleCheck(){
        setSeedSong(x=>!x)
        console.log(seedSong)
    }

    return(
        <div>
            <h1 className="homeTitle">
                Find Songs
            </h1> 
            <div className="sliderGrid">
            <div className="paste">
                <SliderBar  val = {settings.Popularity.value} change={changeSettings} name="Popularity"></SliderBar>
                {props.copy && <img onClick={pasteData} src="./images/paste.png"/>}
            </div>
           
            <SliderBar val = {settings.Energy.value} change={changeSettings} name="Energy"></SliderBar>
            <SliderBar val = {settings.Danceability.value} change={changeSettings} name="Danceability"></SliderBar>
            <SliderBar val = {settings.Tempo.value} change={changeSettings} name="Tempo"></SliderBar>
            <SliderBar val = {settings.Valence.value} change={changeSettings} name="Valence"></SliderBar>  
            <SliderBar val = {settings.Loudness.value} change={changeSettings} name="Loudness"></SliderBar> 
            <SliderBar val = {settings.Acousticness.value} change={changeSettings} name="Acousticness"></SliderBar>   
            <SliderBar val = {settings.Speechiness.value} change={changeSettings} name="Speechiness"></SliderBar>   
            </div>
            

            <div className="genres">
            <Carousel style ={{color:"green"}} breakPoints={breakPoints} loop={true} >
                {genreList}
            </Carousel>  
            </div>
            {paste &&

            <div className="seedTrack">  
                <Checkbox className="checkBox" checked={true} onChange={handleCheck} style={{borderColor:"rgb(160, 50, 17)"}}></Checkbox>
                <p>Find Songs based off Pasted Song?</p>
            </div>
            }
            
           <button onClick={calculateScore}className="searchSong">Search</button>
          
           {topSongs.length>0 && <div className="testOverFlow">
                <div className="searchSongGrid">
                    {songsWithScore}

                </div>
           </div>}


        </div>
    )
}

