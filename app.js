
const songsWrapper = document.querySelector('.songs')
console.log(songsWrapper)

function searchChange(event){
    console.log(event.target.value);
}

async function renderSongs(){
    const response = await fetch("https://phish.in/api/v2/swagger_doc")
    const data = await response.json()
    const songArr = data.search
}

renderSongs();