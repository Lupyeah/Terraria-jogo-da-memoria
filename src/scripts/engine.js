const music = document.getElementById("music");
music.volume = 0.1;
const clickSound = document.getElementById("click-sound");
clickSound.volume = 0.5;
const winSound = document.getElementById("win-sound");

const slimes = [
    "./src/images/Bouncy_Slime.png",
    "./src/images/Bouncy_Slime.png",
    "./src/images/Cool_Slime.png",
    "./src/images/Cool_Slime.png",
    "./src/images/Diva_Slime.gif",
    "./src/images/Diva_Slime.gif",
    "./src/images/Golden_Slime.png",
    "./src/images/Golden_Slime.png",
    "./src/images/Hoppin'_Jack.png",
    "./src/images/Hoppin'_Jack.png",
    "./src/images/Lava_Slime.png",
    "./src/images/Lava_Slime.png",
    "./src/images/Nerdy_Slime.png",
    "./src/images/Nerdy_Slime.png",
    "./src/images/Slimeling.png",
    "./src/images/Slimeling.png",
];

let openCards = [];

let shuffleSlimes = slimes.sort(() => (Math.random() > 0.5 ? 2 : -1));

for (let i = 0; i < slimes.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.setAttribute("data-slime", shuffleSlimes[i]);
    let img = document.createElement("img");
    img.src = shuffleSlimes[i];
    img.classList.add("hidden-img");
    box.appendChild(img);
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function handleClick() {
    if (openCards.length < 2 && !this.classList.contains("boxOpen")) {
        this.classList.add("boxOpen");
        const img = this.querySelector("img");
        img.classList.remove("hidden-img");
        openCards.push(this);
        clickSound.currentTime = 0;
        clickSound.play();
    }

    if (openCards.length == 2) {
        setTimeout(checkMatch, 800);
    }
}

function checkMatch() {
    const [first, second] = openCards;

    if (first.getAttribute("data-slime") === second.getAttribute("data-slime")) {
        first.classList.add("boxMatch");
        second.classList.add("boxMatch");

    } else {
        first.classList.remove("boxOpen");
        second.classList.remove("boxOpen");
        first.querySelector("img").classList.add("hidden-img");
        second.querySelector("img").classList.add("hidden-img");
    }

    openCards = [];

    if (document.querySelectorAll(".boxMatch").length === slimes.length) {
        winSound.play();

        const victory = document.getElementById("victory");
        if (victory) {
            victory.style.display = "flex";
        }
    }
}

