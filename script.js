let currentPage = 1;

const music = document.getElementById("birthdayMusic");
const musicBtn = document.getElementById("musicBtn");
const mainPlay = document.getElementById("mainPlay");


// =========================
// START SURPRISE
// =========================

function startSurprise() {

    music.volume = 0.5;

    music.play()
        .then(() => {

            musicBtn.innerHTML = "♫";

            if (mainPlay) {
                mainPlay.innerHTML = "❚❚";
            }

        })
        .catch((error) => {

            console.log("Music could not start:", error);

        });

    nextPage();
}


// =========================
// NEXT PAGE
// =========================

function nextPage() {

    const oldPage =
        document.getElementById("page" + currentPage);

    oldPage.classList.remove("active");

    currentPage++;

    if (currentPage > 5) {
        currentPage = 5;
    }

    const newPage =
        document.getElementById("page" + currentPage);

    setTimeout(() => {

        newPage.classList.add("active");

    }, 100);
}


// =========================
// MUSIC PLAY / PAUSE
// =========================

function toggleMusic() {

    if (music.paused) {

        music.play()
            .then(() => {

                musicBtn.innerHTML = "♫";

                if (mainPlay) {
                    mainPlay.innerHTML = "❚❚";
                }

            })
            .catch((error) => {

                console.log("Music error:", error);

            });

    } else {

        music.pause();

        musicBtn.innerHTML = "♪";

        if (mainPlay) {
            mainPlay.innerHTML = "▶";
        }
    }
}


// =========================
// RESTART MUSIC
// =========================

function restartMusic() {

    music.currentTime = 0;

    music.play()
        .then(() => {

            musicBtn.innerHTML = "♫";

            if (mainPlay) {
                mainPlay.innerHTML = "❚❚";
            }

        })
        .catch((error) => {

            console.log("Music error:", error);

        });
}


// =========================
// VIDEO
// =========================

const video =
    document.getElementById("birthdayVideo");

if (video) {

    video.muted = true;

    video.play()
        .catch(() => {

            console.log("Video autoplay was blocked.");

        });
}


// =========================
// MUSIC PROGRESS BAR
// =========================

const progress =
    document.querySelector(".progress");

const currentTimeText =
    document.getElementById("currentTime");

const durationText =
    document.getElementById("duration");


function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60);

    return minutes + ":" +
        (secs < 10 ? "0" : "") +
        secs;
}


music.addEventListener("loadedmetadata", function() {

    durationText.textContent =
        formatTime(music.duration);

});


music.addEventListener("timeupdate", function() {

    if (!music.duration) {
        return;
    }

    const percentage =
        (music.currentTime / music.duration) * 100;

    progress.style.width =
        percentage + "%";

    currentTimeText.textContent =
        formatTime(music.currentTime);

});


music.addEventListener("play", function() {

    musicBtn.innerHTML = "♫";

    if (mainPlay) {
        mainPlay.innerHTML = "❚❚";
    }

});


music.addEventListener("pause", function() {

    musicBtn.innerHTML = "♪";

    if (mainPlay) {
        mainPlay.innerHTML = "▶";
    }

});


// =========================
// KEYBOARD NAVIGATION
// =========================

document.addEventListener("keydown", function(event) {

    if (
        event.key === "ArrowRight" ||
        event.key === "Enter"
    ) {

        if (currentPage < 5) {
            nextPage();
        }

    }

});