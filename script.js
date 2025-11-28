document.addEventListener('DOMContentLoaded', () => {

    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (!searchInput || !searchResults) return;

    function getAllSongs() {
        return (typeof songs !== "undefined" && Array.isArray(songs)) ? songs : [];
    }

    
    function createResultItem(song) {
        const li = document.createElement('li');
        li.className = 'search-item';
        li.style.color = 'white';
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.justifyContent = 'space-between';
        li.style.padding = '10px';
        li.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        li.style.cursor = 'pointer';

        
        const left = document.createElement('div');
        left.style.display = 'flex';
        left.style.alignItems = 'center';
        left.style.gap = '10px';

        const img = document.createElement('img');
        img.src = song.cover;
        img.style.width = '45px';
        img.style.height = '45px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '6px';

        const text = document.createElement('div');
        text.innerHTML = `
            <b style="display:block;">${song.title}</b>
            <span style="opacity:0.8;">${song.artist}</span>
        `;

        left.appendChild(img);
        left.appendChild(text);

       
        const arrow = document.createElement('i');
        arrow.className = "fa-solid fa-download";
        arrow.style.fontSize = "20px";
        arrow.style.padding = "8px";

        left.addEventListener('click', () => {
            if (typeof playSongById === "function") {
                playSongById(song.id);
            }
            searchResults.innerHTML = "";
            searchInput.value = "";
        });

        
        arrow.addEventListener('click', (e) => {
            e.stopPropagation(); 

            const a = document.createElement('a');
            a.href = song.src;
            a.download = song.title + ".mp3";
            a.click();
        });

        li.appendChild(left);
        li.appendChild(arrow);
        return li;
    }

    function doSearch(q) {
        const query = q.trim().toLowerCase();
        searchResults.innerHTML = "";

        if (!query) return;

        const results = getAllSongs().filter(song =>
            song.title.toLowerCase().includes(query) ||
            song.artist.toLowerCase().includes(query)
        );

        if (results.length === 0) {
            const li = document.createElement('li');
            li.textContent = "No match found";
            li.style.color = 'white';
            li.style.padding = "10px";
            searchResults.appendChild(li);
            return;
        }

        results.forEach(song => {
            searchResults.appendChild(createResultItem(song));
        });
    }

    let timer = null;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => doSearch(e.target.value), 150);
    });
});



audioPlayer.addEventListener("ended", function () {
    nextSong();
});


function updatePlayPauseIcons() {
    const playBtn = document.getElementById("playBtn");
    const pauseBtn = document.getElementById("pauseBtn");

    if (audioPlayer.paused) {
        playBtn.style.display = "block";
        pauseBtn.style.display = "none";
    } else {
        playBtn.style.display = "none";
        pauseBtn.style.display = "block";
    }
}




