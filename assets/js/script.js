const musicInfo = [
  {
    musicName: "Mystical Swamp",
    artistName: "Magical Night X Alexander Nakarada",
    musicSrc:
      "assets/music/16 alexander-nakarada-kevin-macleod-tavern-brawl.mp3",
    musicPoster: "assets/images/1.jpg",
    liked: false
  },
    {
      musicName: "Countryside Field",
      artistName: "Magical Night X Alexander Nakarada",
      musicSrc:
        "assets/music/10 11 god-rest-ye-merry-celtishmen.mp3",
      musicPoster: "assets/images/level2.jpg",
      liked: true
    },
    {
      musicName: "Mystic Forest",
      artistName: "Alexander Narakada x Magical Night",
      musicSrc:
        "assets/music/medieval_chateau.mp3",
      musicPoster:
        "assets/images/3.jpg"
    },
    {
      musicName: "Night Walk",
      artistName: "Alexander Narakada x Magical Night",
      musicSrc:
      "assets/music/rainy_street.mp3",
      musicPoster:    "assets/images/4.png",
    },
    
  ];
  
  // playlist
  const musicPlaylist = document.querySelector(".music-playlist");
  const musicPlayer = document.querySelector(".music-player");
  const playlistOpenBtn = document.querySelector(".playlist-open-btn");
  const playlistCloseBtn = document.querySelector(".playlist-close-btn");
  const playlist = document.querySelector(".playlist");
  
  const openPlaylist = () => {
    musicPlayer.classList.add("open");
    musicPlaylist.classList.add("open");
  };
  
  const closePlaylist = () => {
    musicPlayer.classList.remove("open");
    musicPlaylist.classList.remove("open");
  };
  
  playlistOpenBtn.onclick = () => openPlaylist();
  playlistCloseBtn.onclick = () => closePlaylist();
  
  // swap up and down
  let manager1 = new Hammer.Manager(musicPlayer);
  
  // Create a recognizer
  let Swipe1 = new Hammer.Swipe();
  
  manager1.add(Swipe1);
  
  manager1.on("swipe", function (e) {
    let direction = e.offsetDirection;
    if (direction == 16) {
      openPlaylist();
    }
    if (direction == 8) {
      closePlaylist();
    }
  });
  // swap left and right
  const playerCenter = document.querySelector(".player-center");
  let manager = new Hammer.Manager(playerCenter);
  
  // Create a recognizer
  let Swipe = new Hammer.Swipe();
  
  manager.add(Swipe);
  
  manager.on("swipe", function (e) {
    let direction = e.offsetDirection;
    if (direction == 4) {
      musicIndex = musicIndex - 1;
      currentMusic(musicIndex);
      playMusic();
    } else if (direction == 2) {
      musicIndex = musicIndex + 1;
      currentMusic(musicIndex);
      playMusic();
    }
  });
  
  musicInfo.forEach((item, index) => {
    let playlistItem = document.createElement("div");
    playlistItem.classList.add("playlist-item");
  
    let playlistItemPoster = document.createElement("div");
    playlistItemPoster.classList.add("playlist-item-poster");
    playlistItem.appendChild(playlistItemPoster);
  
    let playlistItemPosterImg = document.createElement("img");
    playlistItemPosterImg.src = item.musicPoster;
    playlistItemPoster.appendChild(playlistItemPosterImg);
  
    let playlistItemInfo = document.createElement("div");
    playlistItemInfo.classList.add("playlist-item-info");
    playlistItem.appendChild(playlistItemInfo);
  
    let playlistItemName = document.createElement("p");
    playlistItemName.classList.add("plalist-item-name");
    playlistItemName.innerText = item.musicName;
    playlistItemInfo.appendChild(playlistItemName);
  
    let playlistItemArtist = document.createElement("p");
    playlistItemArtist.classList.add("playlist-artist-name");
    playlistItemArtist.innerText = item.artistName;
    playlistItemInfo.appendChild(playlistItemArtist);
  
    let playlistHeartBtn = document.createElement("div");
    playlistHeartBtn.classList.add("playlist-heart-btn");
    playlistItem.appendChild(playlistHeartBtn);
  
    let playlistHeartIcon = document.createElement("i");
    playlistHeartIcon.setAttribute("class", "fa fa-heart playlist-heart-icon");
    playlistHeartBtn.appendChild(playlistHeartIcon);
  

  
    playlist.appendChild(playlistItem);
  });


  const playlistItems = document.querySelectorAll(".playlist-item");
  playlistItems.forEach((item, index) => {
    item.onclick = () => {
      currentMusic(index);
      closePlaylist();
      playMusic();
    };
  });
  
  const posterContainer = document.querySelector(".poster-container");
  musicInfo.forEach((item, index) => {
    let poster = document.createElement("img");
    poster.classList.add("poster");
    poster.src = item.musicPoster;
    poster.alt = item.musicName;
    posterContainer.appendChild(poster);
  });
  const audio = document.querySelector(".audio");
  let musicName = document.querySelector(".music-name");
  let artistName = document.querySelector(".artist-name");
  let musicIndex = 0;
  const currentMusic = (index) => {
    let i = index % musicInfo.length;
    posterContainer.style.left = -(index * 100) + "%";
    musicName.innerText = musicInfo[i].musicName;
    artistName.innerText = musicInfo[i].artistName;
    audio.src = musicInfo[i].musicSrc;
  };
  currentMusic(musicIndex);
  
  // music controls
  const prevBtn = document.querySelector(".back-btn");
  const playBtn = document.querySelector(".play-btn");
  const nextBtn = document.querySelector(".forward-btn");
  const loopBtn = document.querySelector(".loop-btn");
  const shuffleBtn = document.querySelector(".shuffle-btn");
  let isPlaying = false;
  let isShuffle = false;
  let isLoop = false;
  
  playBtn.onclick = () => {
    startMusic();
  };
  const startMusic = () => {
    isPlaying ? pauseMusic() : playMusic();
  };
  loopBtn.onclick = () => {
    isLoop = !isLoop;
    if (isLoop == true) {
      loopBtn.classList.add("active");
    } else {
      loopBtn.classList.remove("active");
    }
  };
  shuffleBtn.onclick = () => {
    isShuffle = !isShuffle;
    if (isShuffle == true) {
      shuffleBtn.classList.add("active");
    } else {
      shuffleBtn.classList.remove("active");
    }
  };
  
  nextBtn.onclick = () => {
    nextMusic();
  };
  const nextMusic = () => {
    musicIndex = musicIndex + 1;
    currentMusic(musicIndex);
    playMusic();
  };
  prevBtn.onclick = () => {
    prevMusic();
  };
  const prevMusic = () => {
    musicIndex = musicIndex - 1;
    currentMusic(musicIndex);
    playMusic();
  };
  const playMusic = () => {
    isPlaying = true;
    audio.play();
    playBtn.classList.replace("fa-play-circle", "fa-circle-pause");
  };
  
  function pauseMusic() {
    isPlaying = false;
    audio.pause();
    playBtn.classList.replace("fa-circle-pause", "fa-play-circle");
  }
  




  
  // timebar
  
  // music time
  const current = document.querySelector(".music-current-time");
  const duration = document.querySelector(".music-duration-time");
  if (duration.innerText == "NaN:0NaN") {
    duration.innerText = "0:00";
  }
  
  audio.addEventListener("timeupdate", () => {
    let time = audio.currentTime;
    let seconds = Math.floor(time % 60);
    let minutes = Math.floor(time / 60);
    if (seconds < 10) {
      current.innerText = minutes + ":0" + seconds;
    } else if (minutes >= 0 && seconds >= 0) {
      current.innerText = minutes + ":" + seconds;
    } else {
      current.innerText = minutes + ":0" + seconds;
    }
  
    //duration time
    time = audio.duration;
    seconds = Math.floor(time % 60);
    minutes = Math.floor(time / 60);
    if (seconds < 10) {
      duration.innerText = minutes + ":0" + seconds;
    } else if (minutes >= 0 && seconds >= 0) {
      duration.innerText = minutes + ":" + seconds;
    } else {
      duration.innerText = "0:00";
    }
  
    // time bar
    const timebarCicle = document.querySelector(".music-current-length-circle");
    const timebar = document.querySelector(".music-current-length");
  
    timebar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    timebarCicle.style.left = (audio.currentTime / audio.duration) * 100 + "%";
    if (
      isLoop == false &&
      isShuffle == false &&
      audio.currentTime == audio.duration
    ) {
      musicIndex = musicIndex + 1;
      currentMusic(musicIndex);
      playMusic();
    } else if (isLoop == true && audio.currentTime == audio.duration) {
      audio.currentTime = 0;
      playMusic();
    } else if (isShuffle == true && audio.currentTime == audio.duration) {
      musicIndex = Math.floor(Math.random() * musicInfo.length);
      currentMusic(musicIndex);
      playMusic();
    }
  });
  
  const musicTimebar = document.querySelector(".music-timebar");
  musicTimebar.addEventListener("click", (e) => {
    let a = e.offsetX;
    const b = e.srcElement.clientWidth;
    audio.currentTime = (a / b) * audio.duration;
  });
  
  window.addEventListener("keydown", (e) => {
    let code = e.keyCode;
    if (code == 32) {
      startMusic();
    }
    if (code == 39) {
      audio.currentTime += 5;
      playMusic();
    }
    if (code == 37) {
      playMusic();
      audio.currentTime -= 5;
    }
  });
  