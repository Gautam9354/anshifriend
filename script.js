/* =========================================================
   EDIT ONLY THIS SETTINGS AREA
========================================================= */

const SETTINGS = {

    // HER NAME
    friendName: "BESTIE",

    // YOUR NAME
    yourName: "Your Favourite Human",

    // HERO MESSAGE
    intro:
        "today is basically your personal national holiday. so yes, this entire website exists because a normal happy birthday text was way too boring.",


    // LETTER
    letter: [
        `Happy birthday to the person who somehow makes normal days feel a little less normal.`,

        `I don't know how many random conversations, stupid jokes, chaotic moments and unnecessary drama we've collected, but somehow they became some of my favourite memories.`,

        `I hope this year gives you the kind of happiness that doesn't need to be posted anywhere to feel real. More peace, more laughs, more memories and definitely less unnecessary stress.`,

        `And yes, you're officially one year older... but don't worry, I will still support your delusional main-character moments. 💗`
    ],


    // PHOTOS
    memories: [

        {
            image: "images/photo1.jpg",
            caption: "main character moment ✨"
        },

        {
            image: "images/photo2.jpg",
            caption: "this one stays in the lore"
        },

        {
            image: "images/photo3.jpg",
            caption: "certified chaos 💀"
        },

        {
            image: "images/photo4.jpg",
            caption: "actually kinda cute"
        },

        {
            image: "images/photo5.jpg",
            caption: "memory unlocked 💗"
        },

        {
            image: "images/photo6.jpg",
            caption: "10/10 moment"
        },

        {
            image: "images/photo7.jpg",
            caption: "we don't explain this one 😭"
        },

        {
            image: "images/photo8.jpg",
            caption: "core memory."
        }
    ],


    // REMINDERS
    reminders: [

        {
            emoji: "💗",
            text:
                "You deserve people who make you feel appreciated even on ordinary days."
        },

        {
            emoji: "✨",
            text:
                "Never make yourself smaller just to fit somewhere you have already outgrown."
        },

        {
            emoji: "🎀",
            text:
                "Your weird, chaotic and slightly delusional personality is part of the package."
        },

        {
            emoji: "🫶",
            text:
                "No matter how much life changes, I hope you always have reasons to laugh like an idiot."
        },

        {
            emoji: "🌷",
            text:
                "Be proud of how far you've come, even if you're still figuring everything out."
        },

        {
            emoji: "👑",
            text:
                "Reminder: birthday girl rules apply today. You're automatically right."
        }
    ],


    // LAST MESSAGE
    finalMessage:
        "Happy birthday to one of my favourite people. I hope your next chapter is full of good surprises, stupid laughs, peaceful moments and memories you'll want to keep forever. 💗"
};


/* =========================================================
   DO NOT EDIT BELOW UNLESS YOU WANT TO CUSTOMIZE CODE
========================================================= */


document.addEventListener("DOMContentLoaded", () => {

    setPersonalText();

    createLetter();

    createGallery();

    createReminders();

    setupMusic();

    setupPhotoModal();

    setupCake();

    setupWishButton();

});


/* =========================================================
   PERSONAL DETAILS
========================================================= */

function setPersonalText() {

    const name = SETTINGS.friendName;

    document.getElementById("heroName").textContent =
        `${name} 💗`;

    document.getElementById("letterName").textContent =
        name;

    document.getElementById("cakeName").textContent =
        name;

    document.getElementById("yourName").textContent =
        SETTINGS.yourName;

    document.getElementById("heroIntro").textContent =
        SETTINGS.intro;

    document.getElementById("finalMessage").textContent =
        SETTINGS.finalMessage;

}


/* =========================================================
   LETTER
========================================================= */

function createLetter() {

    const container =
        document.getElementById("letterContent");

    SETTINGS.letter.forEach(text => {

        const paragraph =
            document.createElement("p");

        paragraph.textContent = text;

        container.appendChild(paragraph);

    });

}


/* =========================================================
   GALLERY
========================================================= */

function createGallery() {

    const gallery =
        document.getElementById("gallery");

    SETTINGS.memories.forEach((memory, index) => {

        const card =
            document.createElement("article");

        card.className = "memory-card";

        card.innerHTML = `
            <span class="memory-number">
                0${index + 1}
            </span>

            <img
                src="${memory.image}"
                alt="Birthday memory ${index + 1}"
                loading="lazy"
            >

            <p class="memory-caption">
                ${memory.caption}
            </p>
        `;


        card.addEventListener("click", () => {

            openPhoto(
                memory.image,
                memory.caption
            );

        });


        gallery.appendChild(card);

    });

}


/* =========================================================
   PHOTO MODAL
========================================================= */

function setupPhotoModal() {

    const modal =
        document.getElementById("photoModal");

    const closeButton =
        document.getElementById("closeModal");


    closeButton.addEventListener("click", closePhoto);


    modal.addEventListener("click", event => {

        if (event.target === modal) {

            closePhoto();

        }

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closePhoto();

        }

    });

}


function openPhoto(image, caption) {

    const modal =
        document.getElementById("photoModal");

    const imageElement =
        document.getElementById("modalImage");

    const captionElement =
        document.getElementById("modalCaption");


    imageElement.src = image;

    captionElement.textContent = caption;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closePhoto() {

    const modal =
        document.getElementById("photoModal");

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================================
   REMINDERS
========================================================= */

function createReminders() {

    const container =
        document.getElementById("reminderContainer");


    SETTINGS.reminders.forEach(reminder => {

        const card =
            document.createElement("article");

        card.className = "reminder-card";


        card.innerHTML = `

            <span>
                ${reminder.emoji}
            </span>

            <p>
                ${reminder.text}
            </p>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   MUSIC
========================================================= */

function setupMusic() {

    const music =
        document.getElementById("bgMusic");

    const button =
        document.getElementById("musicBtn");

    const text =
        document.getElementById("musicText");

    let playing = false;


    button.addEventListener("click", async () => {

        try {

            if (!playing) {

                await music.play();

                playing = true;

                button.classList.add("playing");

                text.textContent = "playing";

            }

            else {

                music.pause();

                playing = false;

                button.classList.remove("playing");

                text.textContent = "music";

            }

        }

        catch (error) {

            console.log(
                "Music could not start:",
                error
            );

        }

    });

}


/* =========================================================
   CAKE
========================================================= */

function setupCake() {

    const cakeStage =
        document.getElementById("cakeStage");

    const instruction =
        document.getElementById("cakeInstruction");

    const nameReveal =
        document.getElementById("nameReveal");

    let cakeCut = false;


    function cutCake() {

        if (cakeCut) {
            return;
        }


        cakeCut = true;


        instruction.textContent =
            "wait for it... 🎂";


        /* Knife animation */

        cakeStage.classList.add("cutting");


        /* small vibration on supported devices */

        if ("vibrate" in navigator) {

            navigator.vibrate([
                50,
                40,
                80
            ]);

        }


        /* split cake */

        setTimeout(() => {

            cakeStage.classList.add("cut");

            instruction.textContent =
                "cake successfully sacrificed 😭";

        }, 850);


        /* confetti */

        setTimeout(() => {

            launchConfetti(130);

        }, 1050);


        /* NAME REVEAL */

        setTimeout(() => {

            nameReveal.classList.add("show");

            instruction.textContent =
                "✨ HAPPY BIRTHDAY ✨";

        }, 1450);


        /* more confetti */

        setTimeout(() => {

            launchConfetti(80);

        }, 2100);

    }


    cakeStage.addEventListener(
        "click",
        cutCake
    );


    cakeStage.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                cutCake();

            }

        }
    );

}


/* =========================================================
   LAST BUTTON
========================================================= */

function setupWishButton() {

    const button =
        document.getElementById("wishButton");


    button.addEventListener("click", () => {

        launchConfetti(160);


        const previous =
            button.textContent;


        button.textContent =
            "birthday magic activated 💗";


        setTimeout(() => {

            button.textContent = previous;

        }, 2500);

    });

}


/* =========================================================
   CONFETTI
========================================================= */

function launchConfetti(amount = 100) {

    const container =
        document.getElementById(
            "confettiContainer"
        );


    const colors = [

        "#ff2e93",

        "#caff33",

        "#ffffff",

        "#ab62ff",

        "#ffd84d",

        "#ff8cc7"

    ];


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const confetti =
            document.createElement("span");


        confetti.className =
            "confetti";


        const size =
            randomNumber(6, 13);


        confetti.style.width =
            `${size}px`;


        confetti.style.height =
            `${randomNumber(7, 18)}px`;


        confetti.style.left =
            `${Math.random() * 100}%`;


        confetti.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        confetti.style.setProperty(
            "--move-x",
            `${randomNumber(-150, 150)}px`
        );


        confetti.style.animationDuration =
            `${randomNumber(2.5, 5)}s`;


        confetti.style.animationDelay =
            `${Math.random() * 0.4}s`;


        container.appendChild(
            confetti
        );


        setTimeout(() => {

            confetti.remove();

        }, 6000);

    }

}


function randomNumber(min, max) {

    return (
        Math.random() *
        (max - min) +
        min
    );

}
