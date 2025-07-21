const musics = [
    { id: 1, title: "پژواک‌های نیمه‌شب", src: "public/audios/1.mp3", artist: "لونا اسکای" },
    { id: 2, title: "امواج فردا", src: "public/audios/2.mp3", artist: "افق نقره‌ای" },
    { id: 3, title: "خاکسترهای فروزان", src: "public/audios/3.mp3", artist: "دره اسکارلت" },
    { id: 4, title: "رویاهای نئونی", src: "public/audios/4.mp3", artist: "سایه الکتریکی" },
    { id: 5, title: "زمزمه‌های باد", src: "public/audios/5.mp3", artist: "اورلیا نایت" },
    { id: 6, title: "تعقیب غروب", src: "public/audios/6.mp3", artist: "خیال طلایی" }
]
const music = document.querySelector("audio")
const playBtnBuutom = document.querySelector(".play-button")
const iconBtnBottom = playBtnBuutom.querySelector("i")
const playBtn = document.querySelectorAll(".play-btn")
const forward = document.querySelector(".forward")
const backForward = document.querySelector(".back-forward")
const volumeCard = document.querySelector(".volume-card")
const volume = document.querySelector(".volume")
const volomechange = document.querySelector(".volomechange")
const musicName = document.querySelector(".music-name")
const artist = document.querySelector(".artist")
const processBar = document.querySelector(".process-bar")
const currentTime = document.querySelector(".current-time")

function nameHandler() {
    let name = musics.find(function (mus) {
        return music.src.includes(mus.src)
    })
    musicName.innerHTML = name.title
    artist.innerHTML = name.artist

}
function playMusic() {
    if (iconBtnBottom.className.includes("fa-play")) {
        iconBtnBottom.classList.remove("fa-play")
        iconBtnBottom.classList.add("fa-pause")
        let musicBuutom = musics.find(function (musicBox) {
            return music.src.includes(musicBox.src)
        })
        playBtn.forEach(function (musicBtn) {
            if (musicBtn.dataset.src === musicBuutom.src) {
                let musicIcon = musicBtn.querySelector("i")
                musicIcon.classList.remove("fa-play")
                musicIcon.classList.add("fa-pause")
            }
        })
        music.play()
        timerMusic()
        nameHandler()
    } else {
        playBtn.forEach(function (boxbtn) {
            let boxi = boxbtn.querySelector("i")
            boxi.classList.remove("fa-pause")
            boxi.classList.add("fa-play")
        })

        iconBtnBottom.classList.remove("fa-pause")
        iconBtnBottom.classList.add("fa-play")
        music.pause()
    }


}
playBtnBuutom.addEventListener("click", playMusic)
playBtn.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
        let iconMusic;
        if (event.target.className.includes("fa")) {
            iconMusic = event.target
        } else {
            iconMusic = event.target.querySelector("i")
        }
        if (iconMusic.className.includes("fa-play")) {
            playBtn.forEach(function (boxbtn) {
                let boxi = boxbtn.querySelector("i")
                boxi.classList.remove("fa-pause")
                boxi.classList.add("fa-play")
            })
            iconBtnBottom.classList.remove("fa-play")
            iconBtnBottom.classList.add("fa-pause")
            iconMusic.classList.remove("fa-play")
            iconMusic.classList.add("fa-pause")
            let musicChoise = musics.find(function (musicBox) {
                return iconMusic.parentElement.dataset.src.includes(musicBox.src)
            })
            if (music.src.includes(musicChoise.src)) {
                music.play()
                nameHandler()
            } else {
                music.setAttribute("src", musicChoise.src)
                music.play()
                timerMusic()
                nameHandler()
            }
        } else {
            iconBtnBottom.classList.add("fa-play")
            iconBtnBottom.classList.remove("fa-pause")
            iconMusic.classList.add("fa-play")
            iconMusic.classList.remove("fa-pause")
            music.pause()
        }
    })
})
function forwardHandler() {
    let musicplay = musics.find(function (musicBox) {
        return music.src.includes(musicBox.src)
    })
    if (musicplay.id === musics.length) {
        let nextMusic = musics[0]
        music.src = nextMusic.src
    } else {
        let nextMusic = musics[musicplay.id]
        music.src = nextMusic.src
    }
    iconBtnBottom.classList.add("fa-pause")
    iconBtnBottom.classList.remove("fa-play")
    playBtn.forEach(function (boxMusic) {
        let i = boxMusic.querySelector("i")
        if (music.src.includes(boxMusic.dataset.src)) {
            i.classList.remove("fa-play")
            i.classList.add("fa-pause")
        } else {
            i.classList.remove("fa-pause")
            i.classList.add("fa-play")
        }
    })
    music.play()
    timerMusic()
    nameHandler()
}
function backForwardHandler() {
    let musicplay = musics.find(function (musicBox) {
        return music.src.includes(musicBox.src)
    })
    if (musicplay.id === 1) {
        let nextMusic = musics[musics.length - 1]
        music.src = nextMusic.src
    } else {
        let nextMusic = musics[musicplay.id - 2]
        music.src = nextMusic.src
    }
    iconBtnBottom.classList.add("fa-pause")
    iconBtnBottom.classList.remove("fa-play")
    playBtn.forEach(function (boxMusic) {
        let i = boxMusic.querySelector("i")
        if (music.src.includes(boxMusic.dataset.src)) {
            i.classList.remove("fa-play")
            i.classList.add("fa-pause")
        } else {
            i.classList.remove("fa-pause")
            i.classList.add("fa-play")
        }
    })
    music.play()
    timerMusic()
    nameHandler()
}
forward.addEventListener("click", forwardHandler)
backForward.addEventListener("click", backForwardHandler)
volumeCard.addEventListener("click", function (event) {
    music.volume = event.offsetX / 110
    volume.style.width = `${event.offsetX}px`
})
volomechange.addEventListener("click", function () {
    let iVolume = volomechange.querySelector("i")
    if (iVolume.className.includes("fa-volume-up")) {
        iVolume.classList.remove("fa-volume-up")
        iVolume.classList.add("fa-volume-mute")
        music.volume = 0
        volume.style.width = "0px"
    } else {
        iVolume.classList.add("fa-volume-up")
        iVolume.classList.remove("fa-volume-mute")
    }
})

function timerMusic() {
    let timer = setInterval(function () {
        if (music.duration === music.currentTime) {
            forwardHandler()
            clearInterval(timer)
        }
        currentTime.style.width = ((music.currentTime * 100) / music.duration + "%")

    }, 1000)
}
processBar.addEventListener("click", function (event) {
    currentTime.style.width = event.offsetX + "px"
    music.currentTime = event.offsetX/processBar.clientWidth * music.duration

})