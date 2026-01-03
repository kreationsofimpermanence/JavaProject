
const search = document.querySelector('#search')
const songWrapper = document.querySelector('.songs')
const songWrapper2 = document.querySelector('.other_shows')
let currentOtherShows = []

function renderOtherShows(list){ //renders other shows on the same date
  if(!Array.isArray(list) || list.length === 0){
    songWrapper2.innerHTML = ''
    return
  }
  let html = '<br><h2 class="other_title">Other Shows on this Date:</h2><br>'
  for(let i=0;i<list.length;i++){
    const show = list[i]
    html += `
      <div class="other_show">
        <img src=${show.album_cover_url} class="album-cover" alt="${show.tour_name} Album Cover"/>
        <div class="other_meta"><h2>${show.date} <br> ${show.venue_name} <br> ${show.venue.city}, ${show.venue.state}</h2></div>
        ${show.album_zip_url ? `<a href="${show.album_zip_url}" class="download__btn other_download">Download Album Here</a>` : ''}
      </div>
    `
  }
  songWrapper2.innerHTML = html
}

function filterShows(event){
  const value = event && event.target ? event.target.value : ''
  let list = currentOtherShows.slice() //uses the list of other shows from the search to filter/sort
  if(value === 'LOW_TO_High' || value === 'DATE_ASC'){
    list.sort((a,b) => new Date(a.date) - new Date(b.date))
  } else if (value === 'HIGH_TO_LOW' || value === 'DATE_DESC'){
    list.sort((a,b) => new Date(b.date) - new Date(a.date))
  } else if (value === 'A_TO_Z' || value === 'CITY_ASC'){
    list.sort((a,b) => String(a.venue.city || a.tour_name || '').localeCompare(String(b.venue.city || b.tour_name || '')))
  } else if (value === 'CITY_DESC' || value === 'Z_TO_A'){
    list.sort((a,b) => String(b.venue.city || b.tour_name || '').localeCompare(String(a.venue.city || a.tour_name || '')))
  }  else if (value === 'A_TO_Z' || value === 'VENUE_ASC'){
    list.sort((a,b) => String(a.venue_name || a.tour_name || '').localeCompare(String(b.venue_name || b.tour_name || '')))
  } else if (value === 'VENUE_DESC' || value === 'Z_TO_A'){
    list.sort((a,b) => String(b.venue_name || b.tour_name || '').localeCompare(String(a.venue_name || a.tour_name || '')))
  }
  renderOtherShows(list)
}
window.filterShows = filterShows

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

    if(song.other_shows.length > 0){ //if there are other shows on that date, it will render them
      currentOtherShows = song.other_shows.slice()
      renderOtherShows(currentOtherShows)
    } else {
      currentOtherShows = []
      renderOtherShows(currentOtherShows)
    } 
}
