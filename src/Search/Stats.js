import React from "react";

export default function Stats(props){

    //when copy button clicked copies this data to App's copy variable which is later passed down to Home as Paste
    function copyData(){
        console.log("send Data")
        console.log(props.majorInfo)
        const newObject= 
            {
            id:props.majorInfo.id,
            Popularity: props.majorInfo.popularity,
            Energy: props.microInfo.energy*100 ,
            Danceability: props.microInfo.danceability*100,
            Tempo:Math.max((props.microInfo.tempo-50)/1.5,0),
            Valence:props.microInfo.valence*100,
            Acousticness:props.microInfo.acousticness*100,
            Speechiness:props.microInfo.speechiness*100,
            Loudness:Math.round(Math.min((props.microInfo.loudness/-25.0)*100,100))}

        props.getCopy(newObject)

        }

    return(
        <div className="statsContainer">
            {/* <div className="vertBar"></div> */}
            <div className="statsInfo">
            <img className="statsImage" src={props.majorInfo.image} alt="no Img"/>
                <div className="copy">
                
                    <h3>Song: {props.majorInfo.name}</h3>
                    <img onClick={copyData} src="./images/copy.png"/>
                </div>
                {/*Display the info and scale everything so fits 0-100, most things are 0-1 so easy to scale those, 
                but Loudness is -60-0 ,but most songs are within -25-0 so used that as my min and max
                Tempo is from 0-unlimited, but most songs are within 50-200 so used that as my min and max.
                I need to display as 0-100 so it corresponds with the slider's where 0-100 is easy to understand
                 */}
                 {/*Gets information from App.js */}
                    <p>Album: {props.majorInfo.album}</p>
                    <p>Artist: {props.majorInfo.artist}</p>
                    <p>Date: {props.majorInfo.year}</p>
                    <div className="gridStats">
                    <p>Popularity: {Math.round(props.majorInfo.popularity)}</p>
                    <p>Energy: {Math.round(props.microInfo.energy*100)}</p>
                    <p>Danceability: {Math.round(props.microInfo.danceability*100)}</p>
                    <p>Tempo: {Math.max(Math.round((props.microInfo.tempo-50)/1.5),0)}</p>
                    <p>Valence: {Math.round(props.microInfo.valence*100)}</p>
                    <p>Loudness: {Math.min(Math.round(props.microInfo.loudness/-25.0*100),100)}</p>
                    <p>Acousticness: {Math.round(props.microInfo.acousticness*100)}</p>
                    <p>Speechiness: {Math.round(props.microInfo.speechiness*100)}</p>

                    </div>
                    
            </div>

        </div>
    )
}