const searchInput = () => {
    const input = document.getElementById("input").value;
    if (input == "") {
        alert("SORRY SIR, AT FIRST WRITE YOUR EXPECTED SONG NAME")
    }
    else {
        const url = `https://api.lyrics.ovh/suggest/${input}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySongs(data.data));
    }

}

const displaySongs = songs => {

    // const clearSongsContainer = document.getElementById("song-container");
    // clearSongsContainer.innerHTML = "";

    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML="";
    songs.forEach(song => {


        const songDiv = document.createElement("div");
        songDiv.className = "single-result row align-items-center my-3 p-3";

        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>

            

            <div  class="col-md-3 text-md-right text-center">
            <button  onclick="getLyric('${song.artist.name}','${song.title}')"  class="btn btn-success">Get Lyrics</button>
            </div>
            `
          
        songContainer.appendChild(songDiv);

    });
}

const getLyric = (artist,song)=>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayLyric(data.lyrics));
}


const displayLyric = lyric=>{
    const displayLyric = document.getElementById("song-lyric");
    displayLyric.innerText=lyric;
}
