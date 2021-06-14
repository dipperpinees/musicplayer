
const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const audio = $('.song-play');

const songs = [
    {
        id: 1,
        name: 'Alcohol Free',
        singer: 'TWICE',
        img: './assets/img/alcoholfree.jpg',
        song: './assets/song/AlcoholFree.mp3'
    },
    {
        id: 2,
        name: 'Candy Pop',
        singer: 'TWICE',
        img: './assets/img/candypop.jpg',
        song: './assets/song/CandyPop.mp3'
    },
    {
        id: 3,
        name: 'LIKEY',
        singer: 'TWICE',
        img: './assets/img/likey.jpg',
        song: './assets/song/LIKEY.mp3'
    }
]

const app = {
    currentID: 1,
    isStarted: false,
    playCurrentSong: function () {

        //play current song
        audio.src = songs[app.currentID-1].song;
        if(app.isStarted){
            audio.pause();
        }
        audio.play();

        //change play button
        $('.play-button').style.display = 'none';
        $('.pause-button').style.display = 'block';

        //change playlist song
        if($('.song-played')){
            $('.song-played').classList.remove('song-played');
        }
        if($('.song-paused')){
            $('.song-paused').classList.remove('song-paused');
        }
        let parentElement = $('.songid-'+app.currentID).parentNode.parentNode;
        parentElement.classList.add('song-played');    
        
        //change song info in player bar
        $('.info-avatar img').src = songs[app.currentID-1].img;
        $('.info-song h3').innerHTML = songs[app.currentID-1].name;
        $('.info-song h4').innerHTML = songs[app.currentID-1].singer;
    },
    
    unPauseCurrentSong(){
        audio.play();
        let parentElement = $('.songid-'+app.currentID).parentNode.parentNode;
        parentElement.classList.remove('song-paused');
    },

    pauseCurrentSong: function(){
        audio.pause();
        let parentElement = $('.songid-'+app.currentID).parentNode.parentNode;
        parentElement.classList.add('song-paused');
        $('.pause-button').style.display = 'none';
        $('.play-button').style.display = 'block';
    },
    
    handleEvent: function () {

        //pause play audio
        $('.play-button').onclick = function (){
            if(!app.isStarted){
                app.playCurrentSong();
                app.isStarted = true;
            }
            else{
                app.unPauseCurrentSong();
            }
        }
        $('.pause-button').onclick = function () {
            app.pauseCurrentSong();
        }

        // click playlist song
        playSongs = $$('.small-play');
        playSongs.forEach(function (playSong) {
            playSong.onclick = function () {
                let songClass = playSong.classList[1];
                app.currentID = songClass.slice(songClass.indexOf('-')+1, songClass.length);
                app.isStarted = true;
                app.playCurrentSong();
            }
        })
    },

    // handleChooseSong: function () {
    //     playSongs = $$('.small-play');
    //     playSongs.forEach(function (playSong){
    //         playSong.onclick = function () {
    //             let songid = playSong.classList[1];
                
    //             //load current audio
    //             audio.pause();
    //             app.currentSong = songs[songid - 1];
    //             audio.src = app.currentSong.song;
    //             audio.play();

    //             //change display 
    //             
    //         }
    //     })  
    // },
    handleAccountButton: function () {
        $('.account').onclick = function(){
            if($('.account-control').style.display === 'block'){
                $('.account-control').style.display = 'none';
                $('.account i:last-child ').style.display = 'none';
                $('.account i:nth-child(2)').style.display = 'block';
                $('.account').style.backgroundColor = '#3f453f';
            }
            else{
                $('.account-control').style.display = 'block';
                $('.account i:last-child ').style.display = 'block';
                $('.account i:nth-child(2)').style.display = 'none';
                $('.account').style.backgroundColor = '#282828';
            }
        }
    },
    handleMobileButton: function () {
        $('.mobile-more').onclick = function () {
            $('#sideBar').style.display = 'flex';
            $('#content').style.filter = 'blur(8px)';
        }
        $('.mobile-back').onclick = function () {
            $('#sideBar').style.display = 'none';
            $('#content').style.filter = 'none';
        }
    },
    renderAlbum: function (){
        var htmls = songs.map(function(song){
            return `
            <li>
            <div class="playlist-left">
                <div class="number-song">
                    ${song.id}
                </div>
                <div class="small-play songid-${song.id}">
                    <i class="fas fa-play"></i>
                </div>
                <img src="./assets/img/animated.gif" alt="animated" class="animated-song">
                <div class="song-name">
                    <h3 class="song-header">
                        ${song.name}
                    </h3>
                    <h3 class="singer">
                        ${song.singer}
                    </h3>
                </div>
            </div>
            <div class="time-song">
                3:30
            </div>
        </li>
            `
        })
    
        $('.playlist').innerHTML = htmls.join(' ');
    },
    // handlePause: function () {
    //     $('.play-button').onclick = function () {
    //         audio.play();
                //if($('.song-paused')){
        //             $('.song-paused').classList.remove('song-paused');
        //         }
    //         this.style.display = 'none';
    //         
    //         $('.pause-button').style.display = 'block';
    //     }
    //     $('.pause-button').onclick = function () {
    //         audio.pause();
    //         this.style.display = 'none';
    //         if($('.song-played')){
    //             $('.song-played').classList.add('song-paused');
    //         }
    //         else{

    //         }
    //         $('.play-button').style.display = 'block';
    //     }
    // },
    start: function () {
        this.handleAccountButton();
        this.handleMobileButton();
        this.renderAlbum();
        this.handleEvent();
    }
}

app.start();

