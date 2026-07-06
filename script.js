let enteredPasscode = "";
const correctPasscode = "1234"; // Aap yahan apna 4 digit ka password set kar sakte hain

function pressKey(num) {
    if (enteredPasscode.length < 4) {
        enteredPasscode += num;
        updateDots();
    }

    if (enteredPasscode.length === 4) {
        setTimeout(checkPasscode, 300); // 0.3 seconds ka wait karega check karne se pehle
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
        // Agar password sahi hai toh Lock screen chupao aur Main Content dikhao
        document.getElementById("lock-screen").classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
        
        // Background music play karo
        const music = document.getElementById("bg-music");
        music.play().catch(error => console.log("Audio play blocked by browser."));
        
    } else {
        // Agar password galat hai
        document.getElementById("error-message").style.display = "block";
        clearPasscode();
    }
}
