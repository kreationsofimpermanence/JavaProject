const songWrapper = document.querySelector('.songs')
//console.log(songWrapper)

function searchChange(event){   //gets the item to be searched
   renderSongs(event.target.value) //sends item typed in to the renderSongs function
}

 async function renderSongs(searchTerm){ //uses search parameters to get the song
      const response = await fetch(`https://phish.in/api/v2/shows/${searchTerm}`) //fetches the database with the search term
      const data = await response.json() //turns database into useable code
      console.log(data)
      let songArr = data.tour_name //targets the name of the tour from the database
      
      songWrapper.innerHTML = songArr.map((song) =>{ //maps through the array creating HTML for the site
        return `
        <div class="song">              
        <img src=${song.album_cover_url} alt="">
        <h1>${song.tour_name}</h1>
        <h3>${song.date}</h3>
        <h3>${song.venue_name}</h3>
        <h3>Next Show will be on: ${song.next_show_date} Tracks</h3>
        <button>Play</button>
        </div>
        `   })
      }
    
