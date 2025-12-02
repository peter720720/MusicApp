// ---------- SONGS: add src for each real mp3 in your music/ folder ----------
const songs = [
    {
        id: 1, title: "Mood",
        artist: "Wizkid",
        cover: "img/Big Wigz.jpg",
        src: "music/WizKid-Ft-Buju-Mood-1(TrendyBeatz.com).mp3"
    },

    {
        id: 2,
        title: "Unavailable",
        artist: "Davido",
        cover: "img/Davido-Timeless-AlbumArtwork1.jpg",
        src: "music/Davido-Ft-Musa-Keys-Unavailable-(TrendyBeatz.com).mp3"
    },

    {
        id: 3,
        title: "With You",
        artist: "Davido",
        cover: "img/download.jpg",
        src: "music/Davido-Ft-Omah-Lay-With-You-(TrendyBeatz.com).mp3"
    },

    {
        id: 4,
        title: "Fem",
        artist: "Davido",
        cover: "img/Davido-Fem.jpg",
        src: "music/Davido-Fem-(TrendyBeatz.com).mp3"
    },

    {
        id: 5,
        title: "GreenLight - Olamide",
        artist: "OLamide",
        cover: "img/olamide badoo.jpg",
        src: "music/Olamide-Greenlight-[TrendyBeatz.com].mp3"
    },

    {
        id: 6,
        title: "You",
        artist: "Fola",
        cover: "img/Fola.jpg",
        src: "music/FOLA_-_You.mp3"
    },

    {
        id: 7,
        title: "Lost",
        artist: "Fola ft Kizz-Daniel",
        cover: "img/Kizz-Daniel-–-Lost-Ft.-FOLA.webp",
        src: "music/Kizz_Daniel_Ft_FOLA_-_Lost.mp3"
    },

    {
        id: 8,
        title: "Getting Paid | val9ja.com",
        artist: "Sarz Ft Asake, WizKid & Skillibeng",
        cover: "img/Sarz-Protect-Sarz-At-All-Costs-Album.avif",
        src: "music/Sarz_Ft_Asake_WizKid_Skillibeng_-_Getting_Paid.mp3"
    },

    {
        id: 9,
        title: "Many People",
        artist: "Adekunle Ft Yinka Ayefele & Adewale Ayuba",
        cover: "img/adekunle many.jpg",
        src: "music/Adekunle_Gold_-_Many_People_Ft_Yinka_Ayefele_Adewale_Ayuba.mp3"
    },

    {
        id: 10,
        title: "Happy",
        artist: "Seyi Vibez",
        cover: "img/seyi vibez.jpg",
        src: "music/Seyi_Vibez_-_HAPPY_SONG (1).mp3"
    }
];




// ---------- STORAGE: store ids of added songs ----------
const STORAGE_KEY = "playlistSongs";
function getStoredIds() { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
function setStoredIds(arr) { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }

// ---------- LIBRARY (library.html) ----------
function loadLibrary() {
    const libraryEl = document.getElementById("library");
    if (!libraryEl) return;
    const added = getStoredIds();
    libraryEl.innerHTML = "";
    songs.forEach(song => {
        const isAdded = added.includes(song.id);
        const item = document.createElement("div");
        item.className = "box_1";
        item.innerHTML = `
      <div class="wiz">
        <img src="${song.cover}" alt="">
        <div>
          <h4 style="margin:0">${song.title}</h4>
          <p style="margin:0;color:var(--muted)">${song.artist}</p>
        </div>
      </div>
      <div class="action-btn ${isAdded ? 'checked' : ''}" data-id="${song.id}">${isAdded ? '✔' : '+'}</div>
    `;
        libraryEl.appendChild(item);
    });

    // attach handlers (use event delegation for safety)
    libraryEl.querySelectorAll('.action-btn').forEach(btn => {
        btn.onclick = (e) => {
            const id = Number(btn.getAttribute('data-id'));
            addToPlaylist(id); // only adds, clicking checked does not remove (per your request)
        };
    });
}

function addToPlaylist(id) {
    const added = getStoredIds();
    if (!added.includes(id)) {
        added.push(id);
        setStoredIds(added);
    }
    if (document.getElementById('library')) loadLibrary();
}

function loadIndexPlaylist() {
    const playlistEl = document.getElementById("playlist");
    if (!playlistEl) return;
    const added = getStoredIds();
    playlistEl.innerHTML = "";

    added.forEach(id => {
        const song = songs.find(s => s.id === id);
        if (!song) return;
        const item = document.createElement("div");
        item.className = "box_1";
        item.innerHTML = `
      <div class="wiz song-left" data-id="${song.id}">
        <img class="song-img" src="${song.cover}" alt="">
        <div>
          <h4 style="margin:0">${song.title}</h4>
          <p style="margin:0;color:var(--muted)">${song.artist}</p>
        </div>
      </div>
      <i class="fa-solid fa-trash delete-icon" data-id="${song.id}"></i>
    `;
        playlistEl.appendChild(item);
    });

    // attach event listeners
    // play when clicking left area
    playlistEl.querySelectorAll('.song-left').forEach(left => {
        left.onclick = () => {
            const id = Number(left.getAttribute('data-id'));
            playSongById(id);
        };
    });

    // delete handler
    playlistEl.querySelectorAll('.delete-icon').forEach(icon => {
        icon.onclick = (e) => {
            e.stopPropagation();
            const id = Number(icon.getAttribute('data-id'));
            removeFromPlaylist(id);
        };
    });
}

// remove id from storage
function removeFromPlaylist(id) {
    let added = getStoredIds();
    added = added.filter(x => x !== id);
    setStoredIds(added);
    loadIndexPlaylist();
    if (document.getElementById('library')) loadLibrary();
}

const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const currentTitle = document.getElementById('current-title');
const currentTimeE1 = document.getElementById("current-time");
const remainingTimeE1 = document.getElementById("remaining-time");

function playSongById(id) {
    const song = songs.find(s => s.id === id);
    if (!song) return;
    if (!audioPlayer) return;

    audioPlayer.src = song.src;
    audioPlayer.play().catch(() => { });

    if (currentTitle) currentTitle.innerItem = song.title = song.artist;
    if (playBtn) playBtn.style.display = 'none';
    if (pauseBtn) pauseBtn.style.display = 'inline-block';
}

if (playBtn && pauseBtn && audioPlayer) {
    playBtn.addEventListener('click', () => {
        audioPlayer.play().catch(() => { });
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
    });
    pauseBtn.addEventListener('click', () => {
        audioPlayer.pause();
        pauseBtn.style.display = 'none';
        playBtn.style.display = 'inline-block';
    });
    audioPlayer.addEventListener('ended', () => {
        if (pauseBtn) pauseBtn.style.display = 'none';
        if (playBtn) playBtn.style.display = 'inline-block';
    });


    audioPlayer.addEventListener("loadedmetadata", () => {
        remainingTimeE1.textContent = formatTime(audioPlayer.duration);
        currentTimeE1.textContent = "0:00";
    });


    audioPlayer.addEventListener("timeupdate", () => {
        if (!audioPlayer.duration) return;

        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = percent + "%";

        currentTimeE1.textContent = formatTime(audioPlayer.currentTime);
        remainingTimeE1.textContent = formatTime(audioPlayer.duration);
    });


    if (progressContainer) {
        progressContainer.addEventListener('click', (e) => {
            if (!audioPlayer.duration || isNaN(audioPlayer.duration)) return;
            const rect = progressContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const newTime = (clickX / width) * audioPlayer.duration;
            audioPlayer.currentTime = newTime;
        });
    }
}

if (document.getElementById('library')) loadLibrary();
if (document.getElementById('playlist')) loadIndexPlaylist();


let currentSong = "";
const audio = document.getElementById("audioPlayer");
const play = document.getElementById("playBtn");
const pause = document.getElementById("pauseBtn");

function playSong(url) {
    if (currentSong === url) {
        togglePlayPause();
        return;
    }

    currentSong = url;
    audio.src = url;
    audio.play();

    showPause();
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        showPause();
    } else {
        audio.pause();
        showPlay();
    }
}

function showPause() {
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline-block";
}

function showPlay() {
    pauseBtn.style.display = "none";
    playBtn.style.display = "inline-block";
}

playBtn.addEventListener("click", () => togglePlayPause());
pauseBtn.addEventListener("click", () => togglePlayPause());


let currentSongId = null;


const forwardBtn = document.getElementById('forwardBtn');

function playSongByIdClean(id) {
    const song = songs.find(s => s.id === id);
    if (!song || !audioPlayer) return;

    currentSongId = id;
    audioPlayer.src = song.src;
    audioPlayer.play().catch(() => { });

    if (currentTitle) currentTitle.innerText = song.title;
    if (playBtn) playBtn.style.display = 'none';
    if (pauseBtn) pauseBtn.style.display = 'inline-block';
}

function togglePlayPauseClean() {
    if (!audioPlayer) return;

    if (audioPlayer.paused) {
        audioPlayer.play().catch(() => { });
        if (playBtn) playBtn.style.display = 'none';
        if (pauseBtn) pauseBtn.style.display = 'inline-block';
    } else {
        audioPlayer.pause();
        if (pauseBtn) pauseBtn.style.display = 'none';
        if (playBtn) playBtn.style.display = 'inline-block';
    }
}

function showPauseClean() {
    if (playBtn) playBtn.style.display = 'none';
    if (pauseBtn) pauseBtn.style.display = 'inline-block';
}
function showPlayClean() {
    if (pauseBtn) pauseBtn.style.display = 'none';
    if (playBtn) playBtn.style.display = 'inline-block';
}

if (playBtn) {
    playBtn.removeEventListener && playBtn.removeEventListener('click', togglePlayPauseClean);
    playBtn.addEventListener('click', togglePlayPauseClean);
}
if (pauseBtn) {
    pauseBtn.removeEventListener && pauseBtn.removeEventListener('click', togglePlayPauseClean);
    pauseBtn.addEventListener('click', togglePlayPauseClean);
}

if (audioPlayer) {
    audioPlayer.addEventListener('ended', () => {
        showPlayClean();
    });
}


if (forwardBtn) {
    forwardBtn.addEventListener('click', () => {
        const added = getStoredIds();
        if (!added.length) return;

        if (currentSongId === null) {
            playSongByIdClean(added[0]);
            return;
        }

        const idx = added.indexOf(currentSongId);
        const nextIdx = (idx === -1) ? 0 : ((idx + 1) % added.length);
        playSongByIdClean(added[nextIdx]);
    });
}


const prevBtn = document.getElementById('prevBtn');

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        const added = getStoredIds();
        if (!added.length) return;

        if (currentSongId === null) {
            playSongByIdClean(added[0]);
            return;
        }

        const idx = added.indexOf(currentSongId);
        const prevIdx = (idx <= 0) ? added.length - 1 : idx - 1;
        playSongByIdClean(added[prevIdx]);
    });
}



window.playSongById = playSongByIdClean;


function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}






// document.querySelectorAll('.nav-item').forEach(item => {
//     item.addEventListener('click', () => {

//         document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));

//         item.classList.add('active');
//     });
// });

