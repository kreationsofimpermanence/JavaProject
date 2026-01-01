
const search = document.querySelector('#search')
const songWrapper = document.querySelector('.songs')
const songWrapper2 = document.querySelector('.other_shows')

function searchChange(event){   //gets the item to be searched
   renderSongs(event.target.value) //sends item typed in to the renderSongs function
   search.style.display = 'block' 
}

async function renderSongs(searchTerm){ //uses search parameters to get the song
    const response = await fetch(`https://phish.in/api/v2/search/${encodeURIComponent(searchTerm)}`) //fetches the database with the search term
    const data = await response.json() //turns database into useable code
    console.log(data)
    let song = data //targets the name of the tour from the database
      
    if(song.exact_show === null) {
        if(song.other_shows.length === 0){
          songWrapper.innerHTML = `<h2>Phish never played on that day. Try another date</h2>`
          return
        }else{
          songWrapper.innerHTML = `<h2> They played that date before, just not that year. <br>Try: ${song.other_shows[0].date}</h2>`
          return
        }
      } 
        
    songWrapper.innerHTML = //displays the album cover and download link for the exact show searched
      `
        <div class="song">              
        <img src=${song.exact_show.album_cover_url} class="album-cover" alt="${song.exact_show.tour_name} Album Cover"/>
          ${song.exact_show.album_zip_url ? `<a href="${song.exact_show.album_zip_url}" class="download__btn">Download Album Here</a>` : ''}
      `
    if(song.other_shows.length > 0) {//loops through other shows on that date and displays albumn covers
      songWrapper2.innerHTML += '<br><h2 class="other_title">Other Shows on this Date:</h2><br>' 
      for(let i = 0; i < song.other_shows.length; i++){
        songWrapper2.innerHTML +=`
          <div class="other_shows">
          <img src=${song.other_shows[i].album_cover_url} class="album-cover" alt="${song.other_shows[i].tour_name} Album Cover"/>
            ${song.other_shows[i].album_zip_url ? `<a href="${song.other_shows[i].album_zip_url}" class="download__btn">Download Album Here</a>` : ''}
          </div>
          `
      }
    }
    
     function filterShows(filter) {
      if (filter === 'LOW_TO_High') {
         console.log('Filtering shows with filter:', filter);
        // song.other_shows.sort((a, b) => a.year - b.year);
       } else if (filter === 'HIGH_TO_LOW') {
         console.log('Filtering shows with filter:', filter);
         //song.other_shows.sort((a, b) => b.year - a.year);
       } else if (filter === 'A_TO_Z') {
         console.log('Filtering shows with filter:', filter);
         //song.other_shows.sort((a, b) => a.city.localeCompare(b.city));
       }
    }
    
    setTimeout( () => {
      filterShows();
    });
        
     
       
 }
