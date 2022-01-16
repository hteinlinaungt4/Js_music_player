// DOM Selector

const menu = document.querySelector("#menu");
const menuList = document.querySelector("#nav-list");
const current = document.querySelector("#current");
const count = document.querySelector("#count");
const title = document.querySelector("#title");
const singer = document.querySelector("#singer");
const poster = document.querySelector("#poster");
const prev = document.querySelector("#prev");
const play = document.querySelector("#play");
const next = document.querySelector("#next");
const range = document.querySelector("#range");
const track = document.createElement("audio");



// Menu Toggle

menu.addEventListener("click",() => {
    menu.classList.toggle("fa-times");
    menuList.classList.toggle("nav-list-active");
});

// Musics

let musics = [
    {
        id : 1,
        title : "Nin Mathi Tak A Chit",
        singer : "Wai La",
        img_path : "img/1.jpg",
        music_path : "music/1.mp3"
    },
    {
        id : 2,
        title : "Elody",
        singer : "Adjustor and Floke Rose",
        img_path : "img/2.jpg",
        music_path : "music/2.mp3"
    },
    {
        id : 3,
        title : "Tha Di Ya Yin",
        singer : "Eternal Gosh",
        img_path : "img/3.jpg",
        music_path : "music/3.mp3"
    },
    {
        id : 4,
        title : "Danyar Houng Myar..",
        singer : "Zaw Win Htut",
        img_path : "img/4.jpg",
        music_path : "music/4.mp3"
    },
    {
        id : 5,
        title : "Lamin Tean Chin",
        singer : "Eternal Gosh",
        img_path : "img/5.jpg",
        music_path : "music/5.mp3"
    }
    
];

// global Variable

let playing = false;
let indexCount = 0;

// load music

function loadTrack(i){

    let index = Number(i);

    track.src = musics[index].music_path;
    poster.src = musics[index].img_path;
    title.innerHTML =  musics[index].title;
    singer.innerHTML = musics[index].singer;
    track.load();

    count.innerHTML = musics.length;
    current.innerText = index + 1;

    setInterval(rangeSlider,1000);
}

loadTrack(indexCount);

// Check Play Or Pause

const showMusic = () => playing === false ? justPlay() : justPause();

// Play 

function justPlay(){
    track.play();
    play.classList.add("fa-pause");
    play.classList.remove("fa-play");
    playing = true;
}

// Pause

function justPause(){
    track.pause();
    play.classList.add("fa-play");
    play.classList.remove("fa-pause");
    playing = false;
}


// Next

function nextSong(){
    if(indexCount >= musics.length) indexCount = 0;
    else indexCount++;
    loadTrack(indexCount);
    playing = false;
    showMusic();    
}

// Prev

function prevSong(){
    if(indexCount <= 0) indexCount = musics.length - 1;
    else indexCount--;
    loadTrack(indexCount);
    playing = false;
    showMusic();    
}

// Range Slide

function rangeSlider(){
    range.value = track.currentTime * (100 / track.duration);

    if(track.ended){
        nextSong();
    }
    
}

// SongSlider

function songSlider(){
    track.currentTime = range.value * (track.duration / 100)
}

// MenuList

musics.forEach((music,index) => {
    const li = document.createElement("li");
    li.innerHTML = `<div>
                        <h3>${music.title}</h3>
                        <p>${music.singer}</p>
                    </div>
                    <i class="trackSingle ${index} fas fa-play" id="playSingle"></i>`;
    menuList.appendChild(li);
});

// play Single Song

function playSingle(e){
    console.log(e.target);
    if(e.target.classList.contains("trackSingle") && e.target.classList.contains("fa-play")){
        loadTrack(e.target.classList[1]);
        playing = false;
        showMusic(); 

        Array.from(menuList.children).forEach(li => {
            li.lastElementChild.classList.add("fa-play");
            li.lastElementChild.classList.remove("fa-pause");
        });

        e.target.classList.add("fa-pause");
        e.target.classList.remove("fa-play");
    }
    else if(e.target.classList.contains("trackSingle") && e.target.classList.contains("fa-pause")){
        playing = true;
        showMusic(); 
        e.target.classList.add("fa-play");
        e.target.classList.remove("fa-pause");
    }
    else{
        menuList.classList.toggle("nav-list-active");
        menu.classList.toggle("fa-times");
    }
}


// Event Listener

play.addEventListener('click',showMusic);
next.addEventListener('click',nextSong);
prev.addEventListener('click',prevSong);
range.addEventListener('change',songSlider);
menuList.addEventListener('click',playSingle);