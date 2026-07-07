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

// --- GIFTS & POPUP LOGIC WITH LOVE TEMPLATE ---
function openGift(giftNumber) {
    const popupScreen = document.getElementById("popup-screen");
    const headerTitle = document.getElementById("popup-header-title");
    const messageText = document.getElementById("popup-message-text");
    
    if (giftNumber === 1) {
        headerTitle.innerHTML = "<h3>Our Beautiful Journey 🧸</h3>";
        messageText.innerHTML = "Happy Birthday my love! 🎂<br><br>Yahan aap apni pehli lambi baat likh sakte hain. Jaise ki jab aap pehli baar mile the toh kaisa laga tha, aur kaise unhone aapki life ko badal diya. You are my absolute favorite person! ❤️";
    } else if (giftNumber === 2) {
        headerTitle.innerHTML = "<h3>Reasons I Love You 💖</h3>";
        messageText.innerHTML = "Thank you for always being my safe place. ✨<br><br>Yahan aap dusri pyari baat likh sakte hain. Aapka gussa hona, aapka muskurana, aapka mujhe jhelna... sab kuch bohot special hai mere liye. Har din aapke sath ek nayi memory jaisa hai.";
    } else if (giftNumber === 3) {
        headerTitle.innerHTML = "<h3>My Forever Promise ♾️</h3>";
        messageText.innerHTML = "I promise to annoy you for the rest of your life! 😘<br><br>Yahan aapka aakhri special message aayega. No matter kya situation ho, main hamesha aapke sath khada rahunga. Happy Birthday once again, my whole world! 💕";
    }

    popupScreen.classList.remove("hidden");
}

function closePopup() {
    document.getElementById("popup-screen").classList.add("hidden");
}
