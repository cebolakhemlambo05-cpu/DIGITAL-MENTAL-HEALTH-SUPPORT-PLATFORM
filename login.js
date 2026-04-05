const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginForm = document.getElementById("loginForm");
const progressBar = document.getElementById("progressBar");
const submitButton = document.querySelector("button[type='submit']");

submitButton.style.display = "none";

function calculateEmailProgress(email) {
    if (!email || email.length === 0) return 0;
    
    const maxEmailProgress = 50;
    const targetLength = 20;
    let progress = (email.length / targetLength) * maxEmailProgress;
    
    if (progress > maxEmailProgress) progress = maxEmailProgress;
    
    if (email.includes("@") && email.includes(".")) {
        progress = maxEmailProgress;
    }
    
    return progress;
}


function calculatePasswordProgress(password) {
    if (!password || password.length === 0) return 0;
    
    const maxPasswordProgress = 50;
    const targetLength = 8; 
    let progress = (password.length / targetLength) * maxPasswordProgress;
    
    if (progress > maxPasswordProgress) progress = maxPasswordProgress;
    
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (password.length >= 8 && hasNumber && hasSpecial) {
        progress = maxPasswordProgress; 
    }
    
    return progress;
}


function updateProgress() {
    const email = emailInput.value;
    const password = passwordInput.value;
    
    const emailProgress = calculateEmailProgress(email);
    const passwordProgress = calculatePasswordProgress(password);
    
    let totalProgress = emailProgress + passwordProgress;
    if (totalProgress > 100) totalProgress = 100;
    
    progressBar.style.width = `${totalProgress}%`;
    
    if (totalProgress < 30) {
        progressBar.style.background = "#ff6b6b";
    } else if (totalProgress < 70) {
        progressBar.style.background = "#ffd93d";
    } else {
        progressBar.style.background = "#4be38f";
    }
    
    if (email.length > 0 && password.length > 0) {
        submitButton.style.display = "block";
        if (totalProgress === 100) {
            progressBar.style.background = "#00c853";
        }
    } else {
        submitButton.style.display = "none";
    }
}


function showMessage(message, isError = true) {
    const existingMsg = document.querySelector(".form-message");
    if (existingMsg) existingMsg.remove();
    
    const msgDiv = document.createElement("div");
    msgDiv.className = "form-message";
    msgDiv.textContent = message;
    
    if (isError) {
        msgDiv.style.background = "#ffe0e0";
        msgDiv.style.color = "#d32f2f";
        msgDiv.style.borderLeft = "4px solid #d32f2f";
    } else {
        msgDiv.style.background = "#e0ffe0";
        msgDiv.style.color = "#2e7d32";
        msgDiv.style.borderLeft = "4px solid #2e7d32";
    }
    
    loginForm.appendChild(msgDiv);
    
    setTimeout(() => {
        if (msgDiv.parentNode) msgDiv.remove();
    }, 3000);
}

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;
    
    if (email.length > 0 && isLongEnough && hasNumber && hasSpecial) {
        progressBar.style.background = "#00c853";
        progressBar.style.width = "100%";
        
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = "✓ Logging In...";
        submitButton.disabled = true;
        
        showMessage("✅ Login successful! Welcome! 🧠✨", false);
        
        setTimeout(() => {
            alert("Welcome to Mental Health Platform!\n\nTake a deep breath. You're doing great! 🌿");
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            window.location.href = "homepage.html";
        }, 1500);
    } else {
        let errorMessage = "❌ Please fix the following:\n";
        if (email.length === 0) errorMessage += "- Please enter your email\n";
        if (!isLongEnough) errorMessage += "- Password must be at least 8 characters\n";
        if (!hasNumber) errorMessage += "- Password must contain a number (0-9)\n";
        if (!hasSpecial) errorMessage += "- Password must contain a special character (!@#$%^&* etc.)\n";
        
        showMessage(errorMessage.replace(/\n/g, " · "));
        
        loginForm.style.animation = "shake 0.5s ease";
        setTimeout(() => {
            loginForm.style.animation = "";
        }, 500);
    }
});

emailInput.addEventListener("input", updateProgress);
passwordInput.addEventListener("input", updateProgress);


updateProgress();