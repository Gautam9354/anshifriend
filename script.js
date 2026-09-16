"use strict";

/* ============================================================
   PERSONALIZE HERE

   friendName = Apni friend ka naam
   yourName   = Apna naam

   Photos aur song optional hain.
   Quotes aur commas ko mat hatana.
   ============================================================ */

const SETTINGS = {
  friendName: "Bestie",
  yourName: "Your friend",

  intro:
    "A little extra love, a little extra chaos, and a whole page just for you. Because a basic birthday text? Couldn't be me.",

  // Main photo ka example: "images/her.jpg"
  coverPhoto: "pic2.jpg",

  // Face crop ho to "center top" kar sakte ho.
  coverPhotoPosition: "center",

  // Apne song ka example: "music/song.mp3"
  // Khali chhodne par built-in tune chalegi.
  musicFile: "",

  letter: [
    "Happy birthday, meri favourite chaos partner! 🥳",

    "Socha ek normal sa message bhej doon... phir laga, tumhare liye thoda extra toh banta hai. Isliye internet ka ye chhota sa corner sirf tumhare naam.",

    "Tumhari friendship mere liye bahut special hai. Random baatein, chhoti-chhoti hasi aur tumhari apni alag si energy — bas aise hi rehna.",

    "Iss saal tumhe woh sab mile jo tum dil se chahti ho: achhe log, naye adventures, thoda kam stress aur bahut saari khushiyaan. Aur jab din thoda difficult ho, yaad rakhna: tumhe sab akele handle nahi karna.",

    "Stay a little dramatic, a little filmy, aur poori ki poori tum. Happy birthday! Cake ka bada piece tumhara, party ki reminder meri taraf se. ♡"
  ],

  // Photos add karne ke liye photo ke quotes mein path likho.
  // Example: photo: "images/photo1.jpg"

  memories: [
    {
      photo: "",
      caption: "The little things that mean a lot.",
      position: "center"
    },
    {
      photo: "",
      caption: "A little laughter goes a long way.",
      position: "center"
    },
    {
      photo: "",
      caption: "So many good days are still ahead.",
      position: "center"
    }
  ],

  reminders: [
    "You make ordinary days feel like the good part of a movie.",

    "You deserve friendships that feel safe, easy, and a little unhinged.",

    "Your laugh? Iconic. Your existence? A very good idea.",

    "You don't have to have everything figured out to be doing amazing.",

    "Some people are a whole comfort playlist. You're one of them.",

    "More little wins. More big laughs. More reasons to be proud of yourself."
  ],

  wishMessage:
    "Wish made. Now go be the birthday icon you are. I'm rooting for you, always! ♡"
};

/* ============================================================
   WEBSITE LOGIC
   Neeche ka code change karna zaroori nahi hai.
   ============================================================ */

const $ = (selector) => document.querySelector(selector);

const friendName = SETTINGS.friendName.trim() || "Bestie";
const senderName = SETTINGS.yourName.trim() || "Your friend";

/* Names */
document.querySelectorAll(".friend-name").forEach((element) => {
  element.textContent = friendName;
});

document.querySelectorAll(".sender-name").forEach((element) => {
  element.textContent = senderName;
});

document.title = `Happy birthday, ${friendName} ♡`;

$("#hero-description").textContent = SETTINGS.intro;

/* Personal letter */
const letterBody = $("#letter-body");

letterBody.replaceChildren();

SETTINGS.letter.forEach((text) => {
  const paragraph = document.createElement("p");

  paragraph.textContent = text;

  letterBody.append(paragraph);
});

/* Load photos only when a path is supplied */
function loadPhoto(path, onReady) {
  if (!path || !path.trim()) {
    return;
  }

  const image = new Image();

  image.decoding = "async";

  image.onload = () => {
    onReady(image);
  };

  image.onerror = () => {
    // Photo missing ho to existing text card dikhne do.
  };

  image.src = path;
}

/* Main birthday photo */
loadPhoto(SETTINGS.coverPhoto, (image) => {
  image.className = "cover-photo";
  image.alt = `${friendName}, the birthday girl`;
  image.style.objectPosition = SETTINGS.coverPhotoPosition;

  $("#cover-space").replaceChildren(image);
});

/* Popups */
const letterDialog = $("#letter-dialog");
const photoDialog = $("#photo-dialog");

let lastDialogTrigger = null;

function openDialog(dialog, trigger) {
  lastDialogTrigger = trigger;

  dialog.showModal();

  document.body.classList.add("modal-open");
}

for (const dialog of [letterDialog, photoDialog]) {
  dialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");

    if (lastDialogTrigger) {
      lastDialogTrigger.focus({
        preventScroll: true
      });
    }
  });

  // Popup ke bahar click karne par close karo.
  dialog.addEventListener("click", (event) => {
    const box = dialog.getBoundingClientRect();

    const clickedOutside =
      event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom;

    if (event.target === dialog && clickedOutside) {
      dialog.close();
    }
  });
}

$("#open-letter").addEventListener("click", (event) => {
  openDialog(letterDialog, event.currentTarget);
});

$("#close-letter").addEventListener("click", () => {
  letterDialog.close();
});

$("#letter-done").addEventListener("click", () => {
  letterDialog.close();
});

$("#close-photo").addEventListener("click", () => {
  photoDialog.close();
});

/* Memory photos */
document.querySelectorAll("[data-memory]").forEach((card, index) => {
  const memory = SETTINGS.memories[index];

  if (!memory) {
    return;
  }

  card.querySelector(".memory-caption").textContent =
    memory.caption;

  loadPhoto(memory.photo, (image) => {
    image.alt = memory.caption;
    image.style.objectPosition = memory.position || "center";

    const button = document.createElement("button");

    button.type = "button";
    button.className = "memory-photo-button";

    button.setAttribute(
      "aria-label",
      `View photo: ${memory.caption}`
    );

    button.append(image);

    button.addEventListener("click", () => {
      const enlarged = $("#enlarged-photo");

      enlarged.src = image.src;
      enlarged.alt = memory.caption;
      enlarged.hidden = false;

      $("#photo-caption").textContent = memory.caption;

      openDialog(photoDialog, button);
    });

    card.querySelector(".memory-visual").replaceChildren(button);
  });
});

/* Cute reminders */
const reminders = SETTINGS.reminders.length
  ? SETTINGS.reminders
  : ["The world is better with you in it. ♡"];

let reminderIndex = 0;

function showReminder() {
  $("#reminder-text").textContent = reminders[reminderIndex];

  const current = String(reminderIndex + 1).padStart(2, "0");
  const total = String(reminders.length).padStart(2, "0");

  $("#note-count").textContent = `${current} / ${total}`;
}

showReminder();

$("#next-reminder").addEventListener("click", () => {
  reminderIndex = (reminderIndex + 1) % reminders.length;

  showReminder();
});

/* Confetti */
const canvas = $("#confetti");
const context = canvas.getContext("2d");

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

let confettiFrame = null;
let particles = [];
let animationStart = 0;
let lastFrame = 0;

function stopConfetti() {
  if (confettiFrame !== null) {
    cancelAnimationFrame(confettiFrame);
  }

  confettiFrame = null;
  particles = [];

  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function celebrate() {
  stopConfetti();

  if (!context || reducedMotion.matches) {
    return;
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  const scale = Math.min(
    window.devicePixelRatio || 1,
    2
  );

  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);

  context.setTransform(scale, 0, 0, scale, 0, 0);

  const colors = [
    "#ff71ad",
    "#d5f36b",
    "#b3a1f6",
    "#fdb634",
    "#261d25"
  ];

  const particleCount = width < 600 ? 90 : 150;

  particles = Array.from(
    { length: particleCount },
    () => ({
      x: width / 2,
      y: height * 0.65,
      vx: (Math.random() - 0.5) * 15,
      vy: -9 - Math.random() * 12,
      angle: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.2,
      size: 5 + Math.random() * 7,
      color: colors[
        Math.floor(Math.random() * colors.length)
      ]
    })
  );

  animationStart = performance.now();
  lastFrame = animationStart;

  function draw(now) {
    const step = Math.min(
      (now - lastFrame) / 16.67,
      2
    );

    lastFrame = now;

    context.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.x += particle.vx * step;
      particle.y += particle.vy * step;
      particle.vy += 0.23 * step;
      particle.angle += particle.spin * step;

      context.save();

      context.translate(particle.x, particle.y);
      context.rotate(particle.angle);

      context.globalAlpha = Math.min(
        1,
        Math.max(
          0,
          (4300 - (now - animationStart)) / 900
        )
      );

      context.fillStyle = particle.color;

      context.fillRect(
        -particle.size / 2,
        -particle.size / 2,
        particle.size,
        particle.size * 0.55
      );

      context.restore();
    });

    if (now - animationStart < 4300) {
      confettiFrame = requestAnimationFrame(draw);
    } else {
      stopConfetti();
    }
  }

  confettiFrame = requestAnimationFrame(draw);
}

/* Wish button */
$("#wish-button").addEventListener("click", () => {
  $("#cake-emoji").textContent = "✨";

  $("#wish-response").textContent = SETTINGS.wishMessage;

  $("#wish-button").textContent =
    "A little more confetti ✦";

  celebrate();
});

window.addEventListener("resize", stopConfetti);

reducedMotion.addEventListener("change", stopConfetti);

/* Small status message */
let toastTimer;

function notify(text) {
  const toast = $("#toast");

  toast.textContent = text;
  toast.hidden = false;

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 4500);
}

/* Music */
let audioContext;
let audioFile;

let musicTimer = null;
let isPlaying = false;
let musicBusy = false;

const activeNotes = new Set();

// Original soft instrumental pattern.
const melody = [
  72, 76, 79, 76,
  74, 77, 81, 79,
  76, 79, 84, 83,
  81, 79, 76, 74
];

let nextNoteTime = 0;
let melodyStep = 0;

function updateMusicButton() {
  $("#music-button").setAttribute(
    "aria-pressed",
    String(isPlaying)
  );

  $("#music-label").textContent = isPlaying
    ? "Music on"
    : "Music off";
}

function scheduleNotes() {
  if (!isPlaying || !audioContext) {
    return;
  }

  while (nextNoteTime < audioContext.currentTime + 0.35) {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";

    const note = melody[melodyStep % melody.length];

    oscillator.frequency.value =
      440 * Math.pow(2, (note - 69) / 12);

    gain.gain.setValueAtTime(0, nextNoteTime);

    gain.gain.linearRampToValueAtTime(
      0.075,
      nextNoteTime + 0.02
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      nextNoteTime + 0.72
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    activeNotes.add(oscillator);

    oscillator.onended = () => {
      activeNotes.delete(oscillator);

      oscillator.disconnect();
      gain.disconnect();
    };

    oscillator.start(nextNoteTime);
    oscillator.stop(nextNoteTime + 0.75);

    nextNoteTime += 0.43;
    melodyStep += 1;
  }
}

function stopMusic() {
  isPlaying = false;

  clearInterval(musicTimer);
  musicTimer = null;

  if (audioFile) {
    audioFile.pause();
  }

  activeNotes.forEach((oscillator) => {
    try {
      oscillator.stop();
    } catch (_) {
      // Note already stopped.
    }
  });

  activeNotes.clear();

  updateMusicButton();
}

async function startMusic() {
  if (SETTINGS.musicFile.trim()) {
    if (!audioFile) {
      audioFile = new Audio(SETTINGS.musicFile);

      audioFile.loop = true;
      audioFile.volume = 0.45;

      audioFile.addEventListener("error", () => {
        stopMusic();

        notify(
          "The song couldn't load. The birthday magic still works ♡"
        );
      });
    }

    await audioFile.play();

    isPlaying = true;
  } else {
    const AudioContextClass =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContextClass) {
      throw new Error("Audio not supported");
    }

    if (!audioContext) {
      audioContext = new AudioContextClass();
    }

    await audioContext.resume();

    isPlaying = true;
    melodyStep = 0;

    nextNoteTime = audioContext.currentTime + 0.03;

    scheduleNotes();

    musicTimer = setInterval(scheduleNotes, 200);
  }

  if (document.hidden) {
    stopMusic();
  } else {
    updateMusicButton();
  }
}

$("#music-button").addEventListener("click", async () => {
  if (musicBusy) {
    return;
  }

  if (isPlaying) {
    stopMusic();
    return;
  }

  musicBusy = true;

  $("#music-button").disabled = true;

  try {
    await startMusic();
  } catch (_) {
    stopMusic();

    notify(
      "Couldn't play music. Try tapping Music again ♡"
    );
  } finally {
    musicBusy = false;

    $("#music-button").disabled = false;
  }
});

/* Stop sound and animation when the page is hidden */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopMusic();
    stopConfetti();
  }
});

window.addEventListener("pagehide", () => {
  stopMusic();
  stopConfetti();
});
