let enteredPasscode = "";
const correctPasscode = "1234"; // Aap yahan apna passcode change kar sakte hain

// --- PASSCODE LOGIC ---
function pressKey(num) {
    if (enteredPasscode.length < 4) {
        enteredPasscode += num;
        updateDots();
    }

    // Jab 4 numbers dab jayein, toh 0.3 seconds baad check karo
    if (enteredPasscode.length === 4) {
        setTimeout(checkPasscode, 300); 
    }
}

function updateDots() {
    for (let i = 1; i <= 4; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if (i <= enteredPasscode.length) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    }
}

function clearPasscode() {
    enteredPasscode = "";
    updateDots();
    document.getElementById("error-message").style.display = "none";
}

function checkPasscode() {
    if (enteredPasscode === correctPasscode) {
        // Passcode Sahi Hai -> Lock screen chupao aur Gifts screen dikhao
        document.getElementById("lock-screen").classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
        
        // Background music play karo
        const music = document.getElementById("bg-music");
        if(music) {
            music.play().catch(error => console.log("Audio autoplay blocked by browser."));
        }
        
    } else {
        // Passcode Galat Hai
        document.getElementById("error-message").style.display = "block";
        clearPasscode();
    }
}

// --- GIFTS & POPUP LOGIC ---
function openGift(giftNumber) {
    const popupScreen = document.getElementById("popup-screen");
    const popupMessage = document.getElementById("popup-message");
    
    // Yahan aap apne messages change kar sakte hain!
    if (giftNumber === 1) {
        popupMessage.innerHTML = "<h3>Happy Birthday! 🎂</h3><br><p>You are the most special person in my life. I love you! ❤️</p>";
    } else if (giftNumber === 2) {
        popupMessage.innerHTML = "<h3>My Everything 💖</h3><br><p>Thank you for always being there for me. You make me smile everyday!</p>";
    } else if (giftNumber === 3) {
        popupMessage.innerHTML = "<h3>Forever & Always 💕</h3><br><p>I promise to annoy you for the rest of your life! 😘</p>";
    }

    popupScreen.classList.remove("hidden");
}

function closePopup() {
    document.getElementById("popup-screen").classList.add("hidden");
}
