
//     function myContains(arr, elem){
//         for(let i=0;i<arr.length;i++){
//             if(arr[i].toLowerCase()==elem.toLowerCase()){
//                 return true
//             }
//             if(elem.toLowerCase().includes(arr[0].toLowerCase()) || elem.toLowerCase().includes(arr[1].toLowerCase())){
//                 // console.log(elem.toLowerCase() + "/" +arr[0].toLowerCase())
//                 return true;
//             }
//         }
//         return false;
//     }

//      async function getAllSongs(){
//         console.log("sss pressed")
//         console.log(token)
//         const playList1Id="3rVX2iqtUh1PkVvbmZJORj"

//         let url1= "https://api.spotify.com/v1/playlists/3rVX2iqtUh1PkVvbmZJORj/tracks?limit=100"
//         let url2= "https://api.spotify.com/v1/playlists/323ilykgj3a35qs2iFOmbd/tracks?limit=100"
//         let url3= "https://api.spotify.com/v1/playlists/6fglqpvVGJMCJuifydSPBz/tracks?limit=100"

//         let songList=[];

//         while(url1){
//             let {data} = await axios.get(url1,{
//             headers:{
//                 Authorization:`Bearer ${token}`
//             },
//         })
//             url1=data.next
//             songList.push(data.items)
//             console.log(data)

//         }


//         while(url2){
//             let {data} = await axios.get(url2,{
//             headers:{
//                 Authorization:`Bearer ${token}`
//             },
//         })
//             url2=data.next
//             songList.push(data.items)
//             console.log(data)

//         }

//         while(url3){
//             let {data} = await axios.get(url3,{
//             headers:{
//                 Authorization:`Bearer ${token}`
//             },
//         })
//             url3=data.next
//             songList.push(data.items)
//             console.log(data)
//         }

 

//         console.log(songList)
//         // setSongList(songList)
//         // console.log(songList[0][1])

        

//         let songList2 = []
//         let idStrings =[]
//         let StringId =""
//         let count =0;

        

//         for(let i=0; i< songList.length;i++){
//             for(let j=0;j<songList[i].length;j++){
//                 let currentSong=songList[i][j]
//                 currentSong = currentSong.track
//                 if(currentSong.id){
//                     let xgenre=null
//                     if(currentSong.artists[0].genres){
//                         xgenre=currentSong.artists[0].genres[0]
//                     }
//                     // songMap.set(currentSong.id,{name:currentSong.name, album:currentSong.album, image:currentSong.album.images[0] ,
//                     //     artist:currentSong.artists[0], genre:xgenre,id:currentSong.id,popularity:currentSong.popularity})
//                     if(currentSong.popularity>10){

//                         // const {data} = await axios.get("https://api.spotify.com/v1/audio-features/" + currentSong.id,{
//                         //     headers:{
//                         //         Authorization:`Bearer ${token}`
//                         //     },
//                         //     params:{
//                         //         q:"audio-features"
//                         //     }
//                         // })
//                         // console.log(data)
//                         if(myContains(songList2,currentSong.id)){
//                                 console.log("dups")
//                             }
//                         else{
                          
//                             songList2.push({name:currentSong.name, album:currentSong.album.name, image:currentSong.album.images[0].url ,
//                                 artist:currentSong.artists[0].name,id:currentSong.id,popularity:currentSong.popularity})
//                         }

                  

                        
//                             // energy:data.energy, danceability:data.danceability, loudness:data.loudness, tempo:data.tempo, valence:data.valence})
//                     }
                        
//                 }
                
//             }

            
//         }

//         console.log(songList2)

               
    

//      }

//      async function getAudioFeatures(){
//          let genreList=[]
//          console.log(artistId.artistId.length)
//         //  console.log(combinedSongList.songList.length)
//         //  console.log(genre.genres.length)
//         //  const x = new Map()

//         //  for(let i=0;i<genre.genres.length;i++){
            
//         //     const gen= genre.genres[i];
//         //     console.log(gen)
//         //     for(let j=0;j<gen.length;j++){
//         //         const current = gen[j];
//         //         if(x.has(current)){
//         //             x.set(current,x.get(current)+1)
//         //         }
//         //         else{
//         //             x.set(current,1)
//         //         }
//         //     }

//         //  }
//         //  console.log(x)

//          const Pop = ["Pop",
//             "Uk Pop",
//             "Acoustic Pop",
//             "Arab Pop",
//             "Art Pop",
//             "C-Pop",
//             "Classify",
//             "Dance Pop",
//             "Electropop",
//             "Escape Room",
//             "Europop",
//             "Hip Pop",
//             "Hyperpop",
//             "Indie Cafe Pop",
//             "Indie Electropop",
//             "Indie Pop",
//             "Indie Poptimism",
//             "J-Pop",
//             "K-Pop",
//             "Latin Pop",
//             "Levenslied",
//             "Metropopolis",
//             "Mexican Pop",
//             "Neo Mellow",
//             "New Romantic",
//             "New Wave Pop",
//             "Pop Dance",
//             "Pop Edm",
//             "Pop R&B",
//             "Pop Rap",
//             "Pop Rock",
//             "Post-Teen Pop",
//             "Social Media Pop",
//             "Soft Rock",
//             "Sophisti-Pop",
//             "Talent Show",
//             "Teen Pop",
//             "Turkish Pop",
//             "Vapor Soul",
//             "Viral Pop",
//             "Vispop"]

//     const EDM =["Edm",
// "Bass House",
// "Bass Trap",
// "Big Room",
// "Breakbeat",
// "Breakcore",
// "Brostep",
// "Chillstep",
// "Complextro",
// "Deep Big Room",
// "Deep Groove House",
// "Deep House",
// "Deep Tropical House",
// "Disco House",
// "Dubstep",
// "Electro House",
// "Electronic Trap",
// "Electropop",
// "Electro Swing",
// "Filthstep",
// "Future Bass",
// "Future Garage",
// "Future House",
// "Gaming Dubstep",
// "Gaming Edm",
// "Glitch Hop",
// "House",
// "Indie Electropop",
// "Melodic Dubstep",
// "Pop Dance",
// "Pop Edm",
// "Progressive Electro House",
// "Progressive House",
// "Progressive Trance",
// "Sky Room",
// "Tech House",
// "Trance",
// "Tropical House",
// "Uplifting Trance",
// "Vapor Soul",
// "Vapor Twitch",
// "Vocal House"]

// const Rap=[
// "Hip Hop",
// "Rap",
// "Grime",
// "Alternative Hip Hop",
// "Atl Hip Hop",
// "Atl Trap",
// "Bounce",
// "Chicago Rap",
// "Christian Hip Hop",
// "Conscious Hip Hop",
// "Country Rap",
// "Crunk",
// "Dirty South Rap",
// "East Coast Hip Hop",
// "Electro",
// "Gangster Rap",
// "G Funk",
// "Hardcore Hip Hop",
// "Hyphy",
// "Industrial Hip Hop",
// "Jazz Rap",
// "Melodic Rap",
// "Nerdcore",
// "Old School Hip Hop",
// "Pop Rap",
// "Queens Hip Hop",
// "Southern Hip Hop",
// "Trap",
// "Underground Hip Hop",
// "Vapor Trap",
// "West Coast Rap"
// ]

// const RB=[
//     "R&B",
// "Alternative R&B",
// "Disco",
// "Funk",
// "Gospel R&B",
// "Indie R&B",
// "Indie Soul",
// "Motown",
// "Neo R&B",
// "Neo Soul",
// "New Jack Swing",
// "Pop R&B",
// "Pop Soul",
// "Quiet Storm",
// "Soul",
// "Trap Soul",
// "Urban Contemporary"
// ]

// const Latin =[
//     "Latin",
// "Bachata",
// "Bachata Dominicana",
// "Bolero",
// "Bossa Nova",
// "Chicha",
// "Colombian Pop",
// "Cumbia",
// "Dominican Pop",
// "Flamenco",
// "Huayno",
// "Latin Alternative",
// "Latin Arena Pop",
// "Latin Hip Hop",
// "Latin Jazz",
// "Latin Pop",
// "Latin Rock",
// "Mariachi",
// "Merengue",
// "Mexican Pop",
// "Neotango",
// "Nuevo Flamenco",
// "Perreo",
// "Pop Reggaeton",
// "Puerto Rican Pop",
// "Ranchera",
// "Reggaeton",
// "Reggaeton Colombiano",
// "Reggaeton Flow",
// "Rock En Espanol",
// "Salsa",
// "Spanish Pop",
// "Spanish Pop Rock",
// "Tango",
// "Tejano",
// "Timba",
// "Trap Latino",
// "Tropical",
// "Twoubadou",
// "Zouk"
// ]

// const Rock=[
// "Rock",
// "Acid Rock",
// "Album Rock",
// "Alternative Rock",
// "Art Rock",
// "Blues Rock",
// "British Invasion",
// "Britpop",
// "Classic Rock",
// "Dance-Punk",
// "Dance Rock",
// "Garage Rock",
// "Glam Rock",
// "Grunge",
// "Heartland Rock",
// "Indie Rock",
// "Math Rock",
// "Mellow Gold",
// "Metal",
// "Modern Alternative Rock",
// "Modern Blues Rock",
// "Modern Rock",
// "New Romantic",
// "New Wave",
// "Noise Rock",
// "Permanent Wave",
// "Post-Grunge",
// "Psychedelic Rock",
// "Rock-And-Roll",
// "Rockabilly",
// "Roots Rock",
// "Soft Rock",
// "Southern Rock",
// "Symphonic Rock"]

// const Metal=[
// "Metal",
// "Alternative Metal",
// "Black Metal",
// "Brutal Death Metal",
// "Crossover Thrash",
// "Dark Black Metal",
// "Death Metal",
// "Doom Metal",
// "Folk Metal",
// "German Metal",
// "German Power Metal",
// "Glam Metal",
// "Gothic Metal",
// "Groove Metal",
// "Hard Rock",
// "Melodic Death Metal",
// "Melodic Metal",
// "Neo-Trad Metal",
// "Neo Classical Metal",
// "Nu Metal",
// "Nwothm",
// "Old School Thrash",
// "Power Metal",
// "Progressive Metal",
// "Speed Metal",
// "Swedish Metal",
// "Symphonic Black Metal",
// "Symphonic Metal",
// "Technical Death Metal",
// "Thrash Metal",
// "Us Power Metal"
// ]


// const Country =[
//     "Country",
// "Alberta Country",
// "Alternative Country",
// "Australian Country",
// "Bakersfield Sound",
// "Bluegrass",
// "Bluegrass Gospel",
// "Cajun",
// "Classic Country Pop",
// "Contemporary Country",
// "Country Dawn",
// "Country Gospel",
// "Country Pop",
// "Country Rap",
// "Country Road",
// "Country Rock",
// "Cowboy Western",
// "Cowpunk",
// "Dansband",
// "Honky Tonk",
// "Kentucky Roots",
// "Modern Country Rock",
// "Nashville Sound",
// "Neo-Traditional Bluegrass",
// "Neo-Traditional Country",
// "New Americana",
// "Oklahoma Country",
// "Outlaw Country",
// "Progressive Bluegrass",
// "Queer Country",
// "Red Dirt",
// "Sertanejo",
// "Texas Country",
// "Traditional Bluegrass",
// "Traditional Country",
// "Truck-Driving Country",
// "Western Swing",
// "Wyoming Roots"
// ]

// const Folk=
// [
// "Folk",
// "Acoustic Pop",
// "American Folk Revival",
// "Anti-Folk",
// "Appalachian Folk",
// "Contemporary Folk",
// "Ectofolk",
// "Folk Rock",
// "Freak Folk",
// "Indie Folk",
// "Lilith",
// "Medieval Folk",
// "Melancholia",
// "Mellow Gold",
// "Modern Folk Rock",
// "New Americana",
// "Psychedelic Folk",
// "Roots Rock",
// "Singer-Songwriter",
// "Stomp And Holler",
// "Traditional Folk"
// ]

// const Classical=[
// "Classical",
// "Avant-Garde",
// "Baroque",
// "Chamber Ensemble",
// "Chamber Orchestra",
// "Choral",
// "Classical Cello",
// "Classical Era",
// "Classical Guitar",
// "Classical Piano",
// "Classical Soprano",
// "Compositional Ambient",
// "Contemporary Classical",
// "Early Modern Classical",
// "Early Music",
// "Early Music Choir",
// "Early Music Ensemble",
// "Early Romantic Era",
// "Historically Informed Performance",
// "Impressionism",
// "Italian Baroque",
// "Late Romantic Era",
// "Medieval",
// "Minimalism",
// "Neoclassicism",
// "Opera",
// "Orchestra",
// "Polyphony",
// "Post-Romantic Era",
// "Renaissance",
// "Serialism",
// "String Quartet",
// "Violin"
// ]
// const Jazz = [
//     "Jazz",
// "Acid Jazz",
// "Avant-Garde Jazz",
// "Bebop",
// "Bossa Nova",
// "Classical Jazz Fusion",
// "Contemporary Jazz",
// "Contemporary Post-Bop",
// "Cool Jazz",
// "Dixieland",
// "Ecm-Style Jazz",
// "Ethio-Jazz",
// "Free Improvisation",
// "Free Jazz",
// "Gypsy Jazz",
// "Hard Bop",
// "Harlem Renaissance",
// "Indie Jazz",
// "Jazz Clarinet",
// "Jazz Double Bass",
// "Jazz Drums",
// "Jazz Funk",
// "Jazz Fusion",
// "Jazz Guitar",
// "Jazz Piano",
// "Jazz Quartet",
// "Jazz Saxophone",
// "Jazz Trio",
// "Jazz Trumpet",
// "Jazz Vibraphone",
// "Latin Jazz",
// "Modern Jazz Piano",
// "Ragtime",
// "Samba-Jazz",
// "Smooth Jazz",
// "Soul Jazz",
// "Spiritual Jazz",
// "Straight-Ahead Jazz",
// "Stride",
// "Vintage Jazz",
// "Vocal Jazz"
// ]

// const Blues =
// [
//     "Blues",
// "Acoustic Blues",
// "Blues Rock",
// "British Blues",
// "Canadian Blues",
// "Chicago Blues",
// "Country Blues",
// "Delta Blues",
// "Electric Blues",
// "Gospel Blues",
// "Harmonica Blues",
// "Jazz Blues",
// "Jump Blues",
// "Louisiana Blues",
// "Memphis Blues",
// "Modern Blues",
// "New Orleans Blues",
// "Piano Blues",
// "Piedmont Blues",
// "Power Blues-Rock",
// "Pre-War Blues",
// "Punk Blues",
// "Rhythm And Blues",
// "Soul Blues",
// "Swamp Blues",
// "Texas Blues",
// "Traditional Blues"]
// let newGenreList =[];

// const test = myContains(Blues,"traditional blues")
// console.log(test)

//     //  const x = new Map()

//         //  for(let i=0;i<genre.genres.length;i++){
            
//         //     const gen= genre.genres[i];
//         //     console.log(gen)
//         //     for(let j=0;j<gen.length;j++){
//         //         const current = gen[j];
//         //         if(x.has(current)){
//         //             x.set(current,x.get(current)+1)
//         //         }
//         //         else{
//         //             x.set(current,1)
//         //         }
//         //     }

//         //  }
//         //  console.log(x)

// const x = new Map()

// // for(let k=0;k<genre.genres.length;k++){
// //     let subList=[]
// //     const current=genre.genres[k]
    
// //     for(let j=0;j<current.length;j++){
// //         const currentGenre=current[j].toLowerCase()
        
// //         if(myContains(Pop,currentGenre)){
// //             subList.push("Pop")
            
// //         }
// //         else if(myContains(EDM,currentGenre)){
// //             subList.push("EDM")
// //         }
// //         else if(myContains(Rap,currentGenre)){
// //             subList.push("Rap")
// //         }
// //         else if(myContains(RB,currentGenre)){
// //             subList.push("R&B")
// //         }
// //         else if(myContains(Latin,currentGenre)){
// //             subList.push("Latin")
// //         }
// //         else if(myContains(Rock,currentGenre)){
// //             subList.push("Rock")
// //         }
// //         else if(myContains(Metal,currentGenre)){
// //             subList.push("Metal")
// //         }
// //         else if(myContains(Country,currentGenre)){
// //             subList.push("Country")
// //         }
// //         else if(myContains(Folk,currentGenre)){
// //             subList.push("Folk")
// //         }
// //         else if(myContains(Classical,currentGenre)){
// //             subList.push("Classical")
// //         }
// //         else if(myContains(Blues,currentGenre)){
// //             subList.push("Blues")
// //         }
// //         else{
// //             if(x.has(currentGenre)){
// //                 x.set(currentGenre,x.get(currentGenre)+1)
// //             }
// //             else{
// //                 x.set(currentGenre,1)
// //             }
// //             subList.push("Other")
// //         }
        
// //     }
// //     newGenreList.push(subList);
// // }



// console.log(newGenreList)
// console.log(x)
// // try{
// //         for(let i=11734;i<combinedSongList.songList.length;i++){
// //             const x= artistId.artistId[i]

// //             const {data} = await axios.get("https://api.spotify.com/v1/artists/" + x,{
// //                 headers:{
// //                     Authorization:`Bearer ${token}`
// //                 },
// //                 params:{
                    
// //                 }
// //             })
            
// //             console.log(i);
// //             console.log(data.genres[0]);
// //             const y = data.genres
// //             genreList.push(y)
           
// //         }
// //     }
// //     catch(err){
// //         console.log(genreList)
// //     }
//     // console.log(genreList)

//     let newCombinedList=[]
//     for(let i=0; i<combinedSongList.songList.length;i++){
//         const current=combinedSongList.songList[i]
//         const currentGenre = genre.genres[i]

//         const newObj = {
//             name: current.name,
//             album: current.album,
//             image: current.image,
//             artist: current.artist,
//             id: current.id,
//             popularity: current.popularity,
//             energy: current.energy,
//             danceability: current.danceability,
//             loudness: current.loudness,
//             tempo: current.tempo,
//             valence: current.valence,
//             genre: currentGenre
//         }
//         newCombinedList.push(newObj)

//     }

 // function combineGenres(){
    //     let newList=[]
    //     for(let i=0;i<combinedSongList.songs.length;i++){
    //         const current=combinedSongList.songs[i];
    //         const currentGenre = simplifyGenre.genre[i]
    //         const newObj = {
    //                         name: current.name,
    //                         album: current.album,
    //                         image: current.image,
    //                         artist: current.artist,
    //                         id: current.id,
    //                         popularity: current.popularity,
    //                         energy: current.energy,
    //                         danceability: current.danceability,
    //                         loudness: current.loudness,
    //                         tempo: current.tempo,
    //                         valence: current.valence,
    //                         genre: currentGenre
    //                     }
    //         newList.push(newObj)
    //     }
    //     console.log(newList)
    // }

//     console.log(newCombinedList)
        
       
       
//      }