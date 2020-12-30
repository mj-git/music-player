const music = document.querySelector('audio');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const playBtn = document.querySelector('#play');
const img = document.querySelector('img');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const progressContainer = document.querySelector('#progress-container');
const progress = document.querySelector('#progress');
const currentTimeEl = document.querySelector('#current-time');
const durationEl = document.querySelector('#duration');

const songs = [
  { name: 'jacinto-1', displayName: 'Electric Chill Machine', artist: 'Jacinto Design' },
  { name: 'jacinto-2', displayName: 'Seven Nation Army (Remix)', artist: 'Jacinto Design' },
  { name: 'jacinto-3', displayName: 'Goodnight, Disco Queen', artist: 'Jacinto Design' },
  { name: 'metric-1', displayName: 'Front Row (Remix)', artist: 'Jacinto Design' }
];

let isPlaying = false;
let songIndex = 0;
const playSong = () => {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
};

const pauseSong = () => {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
};

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

const loadSong = (song) => {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  img.src = `img/${song.name}.jpg`;
};

loadSong(songs[songIndex]);

const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  isPlaying && playSong();
};

const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  isPlaying && playSong();
};

const updateProgress = (e) => {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    durationSeconds = durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds;
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    const currentTimeMinutes = Math.floor(currentTime / 60);
    let currentTimeSeconds = Math.floor(currentTime % 60);
    currentTimeSeconds = currentTimeSeconds < 10 ? `0${currentTimeSeconds}` : currentTimeSeconds;
    if (currentTimeSeconds) {
      currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
    }
  }
};

const setProgress = function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
};

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgress);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgress);
