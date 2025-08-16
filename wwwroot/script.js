console.log("hello")
let div = document.createElement("div")
let trackle = document.querySelector(".boxes")
let as = div.getElementsByTagName("a")
let songs = [];

const searchIcon = document.getElementById("searchIcon");
const searchBar = document.getElementById("searchBar");

const artistInput = document.getElementById("artistInput");
const tracksContainer = document.getElementById("tracksContainer");
console.log("searchIcon", searchIcon)




//fetch('/api/deezer?q=The Beatles')
//    .then(res => res.json())
//    .then(data => console.log(data))
//    .catch(err => console.error(err));

//console.log("pyary")
////uper wala ka starting
//async function loadArtiststrack(songName) {
//    try {
//        const res = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(songName)}&output=jsonp&callback=displaySongs`);
//        if (!res.ok) throw new Error(`HTTP ${res.status}`);
//        const data = await res.json();
//        console.log(data);

//        console.log("Deezer API data helloooooo:", data);

//        const trackcon = document.querySelector("#tracksContainer");
//        console.log(trackcon.innerHTML)
//        trackcon.innerHTML = ""; // Clear existing content

//        data.data.forEach(track => {
//            const html = `
//                <div class="box singles">
//                <div class="boximg">
//                    <img src="${track.album.cover_medium}" alt="${track.title}">
//                </div>
//                <a href="#" onclick="playSong('${track.preview}')">${track.title}</a>
//                <p2>${track.artist.name}</p2>
                  
//            </div >
//            `;
//            trackcon.innerHTML += html;
//        });

//    } catch (err) {
//        console.error("Error loading artists:", err);
//    }
//}
//loadArtiststrack("sania");
//loadArtiststrack('atif');
//// Elements


        // Add click event for playing songs
        document.querySelectorAll(".playTrack").forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const previewUrl = e.target.getAttribute("data-preview");
                if (previewUrl) {
                    audioPlayer.src = previewUrl;
                    audioPlayer.play();
                }
            });
        });

 

//loadArtiststrack("sona");
// Step 1: Show search bar when icon is clicked
artistInput.addEventListener("click", () => {

    //searchBar.style.display = "block"; // show input & button
    console.log("block")
    artistInput.focus();
});

// Step 2: Search when "Go" button is clicked
//searchIcon.addEventListener("click", () => {
//    const songName = artistInput.value.trim();
//    console.log(songName)
//    if (songName) {
       
//        console.log("Searching for artist:", songName);
//        const playlist = document.getElementsByClassName("playlist");
//        console.log(playlist)
       
//        //playlist.innerHTML = `searching${playlist}`;

//        loadArtiststrack(songName); // Change the artist name here if needed

//    }
//    else {
//        boxes.innerHTML = "artist not found";
//        console.log("not found")
//    }
//});

//nechy wala
console.log("nechy ao")
async function loadArtists(searchTerm) {
    const boxes = document.querySelector(".track");
    boxes.innerHTML = ""; // Clear existing content
    boxes.innerHTML = "loading .....";
    try {
        const res = await fetch(`/api/deezer?q=${encodeURIComponent(searchTerm)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        console.log(data);

        console.log("Deezer API data:", data);


        boxes.innerHTML = ""; // Clear existing content
        //boxes.innerHTML = "loading .....";
        data.data.forEach(artist => {
            const htm= `
                <div class="box singles">
                    <div class="boximg">
                        <img src="${artist.picture_medium}" alt="${artist.name}">
                    </div>
                    <a href="${artist.link}" target="_blank">${artist.name}</a>
                    <p2>Artist</p2>
                </div>
            `;
            boxes.innerHTML += htm;
        });

    } catch (err) {
        console.error("Error loading artists:", err);
    }
}
loadArtists('bilal');

function playSong(url) {
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = url;
    audioPlayer.play();
}



//search
//async function loadArtiststrack(searchTerm) {
//    try {
//        const res = await fetch(`/api/deezer?q=${encodeURIComponent(searchTerm)}`);
//        if (!res.ok) throw new Error(`HTTP ${res.status}`);
//        const data = await res.json();

//artistInput.addEventListener("click", () => {

//    //searchBar.style.display = "block"; // show input & button
//    console.log("block")
//    artistInput.focus();
//});

//// Step 2: Search when "Go" button is clicked
//searchIcon.addEventListener("click", () => {
//    const songName = artistInput.value.trim();
//    console.log(songName)
//    if (songName) {
//        loadArtiststrack(songName); // Change the artist name here if needed
//        console.log("Searching for artist:", songName);



//    }
//    else {
//        boxes.innerHTML = "artist not found";
//        console.log("not found")
//    }
//});


//hahahaha
function searchSongs(songName) {
    const script = document.createElement("script");
    const url = `https://api.deezer.com/search?q=${encodeURIComponent(songName)}&output=jsonp&callback=displaySongs`;
    script.src = url;
    document.body.appendChild(script);
}

function displaySongs(response) {
    const container = document.getElementById("tracksContainer");
    container.innerHTML = ""; // Clear old results

    response.data.forEach((track, index) => {
        let words = track.title.split(" ");
        let shortTitle = words.length > 3? words.slice(0, 3).join(" ") + "..." : track.title;

        const html = `
            <div class="box singles">
                <div class="boximg">
                    <img src="${track.album.cover_medium}" alt="${track.title}">
                </div>
                <a href="#" 
                   onclick="showFullTitleAndPlay(${index}, '${track.preview}')"
                   id="trackTitle_${index}" 
                   data-full="${track.title}">
                    ${shortTitle}
                </a>
                <p2>${track.artist.name}</p2>
            </div>
        `;
        container.innerHTML += html;
        artistInput.value = "";
    });
}

// Show full title and play song
function showFullTitleAndPlay(index, previewUrl) {
    const link = document.getElementById(`trackTitle_${index}`);
    link.textContent = link.getAttribute("data-full");
    playSong(previewUrl);
    return false; // Prevent link navigation
}

function playSong(url) {
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = url;
    audioPlayer.play();
}

// Search icon click
searchIcon.addEventListener("click", () => {
    const artistName = artistInput.value.trim();
    if (artistName) {
        searchSongs(artistName);
    } else {
        alert("Please enter an artist name.");
    }
});

searchSongs("tum mery ho");
//bar
const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const seekBar = document.getElementById("seekBar");
const time = document.getElementById("time");

function playSong(url) {
    audio.src = url;
    audio.play();
    playBtn.textContent = "⏸";
  
}

playBtn.addEventListener("click", () => {
    if (audio.paused) {
       
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
});

audio.addEventListener("loadedmetadata", () => {
    seekBar.max = Math.floor(audio.duration);
    time.textContent = `0:00 / ${formatTime(audio.duration)}`;
});

audio.addEventListener("timeupdate", () => {
    seekBar.value = audio.currentTime;
    time.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
});

seekBar.addEventListener("input", () => {
    audio.currentTime = seekBar.value;
});

function formatTime(sec) {
    let minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
