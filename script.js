let enteredPasscode = "";
const correctPasscode = "1234"; // Aapka passcode

// --- PASSCODE LOGIC ---
function pressKey(num) {
    if (enteredPasscode.length < 4) {
        enteredPasscode += num;
        updateDots();
    }

    if (enteredPasscode.length === 4) {
        setTimeout(checkPasscode, 300); 
    }
}

function updateDots() {
    for (let i = 1; i <= 4; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if (dot) {
            if (i <= enteredPasscode.length) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        }
    }
}

function clearPasscode() {
    enteredPasscode = "";
    updateDots();
}

function checkPasscode() {
    if (enteredPasscode === correctPasscode) {
        // Lock screen ko chupao aur Main content dikhao
        document.getElementById("lock-screen").classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
        
        // Error message agar dikh raha ho toh chupao
        document.getElementById("error-message").style.display = "none";
        
        // Music play karne ki koshish karo
        const music = document.getElementById("bg-music");
        if (music) {
            music.play().catch(err => console.log("Music play blocked by browser settings."));
        }
    } else {
        document.getElementById("error-message").style.display = "block";
        clearPasscode();
    }
}

// --- GIFTS & POPUP LOGIC ---
function openGift(giftNumber) {
    const popupScreen = document.getElementById("popup-screen");
    const headerTitle = document.getElementById("popup-header-title");
    const messageText = document.getElementById("popup-message-text");
    
    // Check karega ki saare elements HTML me hain ya nahi
    if (!popupScreen || !headerTitle || !messageText) {
        console.error("HTML elements missing! Please check index.html IDs.");
        return;
    }

    // Gift ke hisaab se content badlega
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

    // Popup ko screen par dikhao
    popupScreen.classList.remove("hidden");
}

function closePopup() {
    const popupScreen = document.getElementById("popup-screen");
    if (popupScreen) {
        popupScreen.classList.add("hidden");
    }
}
// --- AUTO-TYPING EFFECT FOR GIFT PAGE ---
document.addEventListener("DOMContentLoaded", () => {
    const textElement = document.querySelector(".typing-text");
    if (textElement) {
        const txt = textElement.innerHTML;
        textElement.innerHTML = ""; // Pehle text khali karo
        let i = 0;
        
        function typeWriter() {
            if (i < txt.length) {
                // Agar HTML tag jaise <br> ya 🏠 emojis hain toh unhe handle karega
                textElement.innerHTML += txt.charAt(i);
                i++;
                setTimeout(typeWriter, 40); // Har letter 40ms ke gap par type hoga
            }
        }
        // Thoda sa pause lekar typing shuru karo
        setTimeout(typeWriter, 500);
    }
});
