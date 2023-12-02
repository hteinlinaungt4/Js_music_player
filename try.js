const current=document.querySelector("#current");
const total=document.querySelector("#count");
const menu=document.querySelector("#menu");
const navList=document.querySelector("#nav-list");
const title=document.querySelector("#title");
const singer=document.querySelector("#singer");
const poster=document.querySelector("#poster");
const prev =document.querySelector("#prev");
const next =document.querySelector("#next");
const play=document.querySelector("#play");
const range=document.querySelector("#range");


// json
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

// const variable
let index=0;
let playing = false;
let track = document.createElement("audio")


    function loadTrack(i){
        let index = Number(i);
        current.innerHTML = index + 1;
        total.innerHTML = musics.length;
        title.innerHTML = musics[index].title;
        singer.innerHTML = musics[index].singer;
        poster.src = musics[index].img_path;
        track.src = musics[index].music_path;
        track.load();
        setInterval(trackCurrentTime,1000); 

    }

    loadTrack(index);


    // check Play 
    function checkMusic(){
        playing ? musicPause() : musicPlay();
    }

    // musicPlay
    function musicPlay(){
        track.play();
        playing = true;
        play.classList.add = "fas fa-play";
        play.className = "fas fa-pause";


    }
    // musicPlay
    function musicPause(){
        track.pause();
        playing = false;
        play.className = "fas fa-play";
    }

    // prevSong
    function prevSong(){
        if(index <= 0 ){
            index = musics.length -1 ;
        }else{
            index--;
        }
        loadTrack(index);
        playing = false;
        checkMusic();

    }

    // nextSong
    function nextSong(){
        if(index >= musics.length -1 ){
            index = 0;
        }else{
            index ++ ;
        }
        loadTrack(index);
        playing = false;
        checkMusic();
    }

    // dynamic range bar
    function dynamicBar(){
        track.currentTime = range.value *( track.duration / 100 ); 
    }

    // track current 
    function trackCurrentTime(){
        range.value = track.currentTime *(100/ track.duration);
        if(track.ended){
            nextSong();
        }
    }

    // toggle nav-list
    function toggleMenu(){
        navList.classList.toggle("nav-list-active");
        menu.classList.toggle("fa-times");
    }

    // fetch singleSong 
    musics.map((music,value) => {
        let li = document.createElement("li");
        li.innerHTML =
        `
            <div>
                <h3>${musics[value].title}</h3>
                <p>${musics[value].singer}</p>
            </div>
            <i class="fas track_target ${value} fa-play" id="playSingle"></i>
        `;
        navList.appendChild(li);
    })
    // single song
    function loadSingleSong(e){
        if(e.target.classList.contains("track_target") && e.target.classList.contains("fa-play")){
            loadTrack(e.target.classList[2]);
            playing=false;
            checkMusic();

          
            Array.from(navList.children).forEach(li => {
                li.lastElementChild.classList.add("fa-play");
                li.lastElementChild.classList.remove("fa-pause");
           });

            e.target.classList.remove("fa-play");
            e.target.classList.add("fa-pause");
        }
        else if(e.target.classList.contains("track_target") && e.target.classList.contains("fa-pause")){
            playing = true;
            checkMusic();
            e.target.classList.add("fa-play");
            e.target.classList.remove("fa-pause");

        }
        else{
            toggleMenu();
        }

    }





    play.addEventListener("click",checkMusic);
    prev.addEventListener("click",prevSong);
    next.addEventListener("click",nextSong);
    range.addEventListener("change",dynamicBar);
    menu.addEventListener("click",toggleMenu);
    navList.addEventListener("click",loadSingleSong);




