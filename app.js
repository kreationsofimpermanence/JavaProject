
const songWrapper = document.querySelector('.songs')

function searchChange(event){   //gets the item to be searched
   renderSongs(event.target.value) //sends item typed in to the renderSongs function
}

 async function renderSongs(searchTerm){ //uses search parameters to get the song
      const response = await fetch(`https://phish.in/api/v2/shows/${encodeURIComponent(searchTerm)}`) //fetches the database with the search term
      const data = await response.json() //turns database into useable code
      
      let song = data //targets the name of the tour from the database
      
      if(song.tour_name === undefined) {
        songWrapper.innerHTML = "<h2>Phish did not play that day.<br>Please try another date.</h2>"
        return
      } 

      songWrapper.innerHTML = 
       `
        <div class="song">              
          <img src=${song.album_cover_url} class="album-cover" alt="${song.tour_name} Album Cover"/>
          <h1 class="tour_name">"${song.tour_name}"</h1>
          <h3>Next Show will be on: ${song.next_show_date}</h3>
          ${song.album_zip_url ? `<a href="${song.album_zip_url}" class="download__btn">Download Album Here</a>` : ''}
        </div>
        `
 }
