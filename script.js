const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");
const timerDisplay = document.getElementById("timerDisplay");

let timer; // Variable to store timer interval
let elapsedTime = 0; // Variable to track elapsed time

convertBtn.addEventListener('click', function () {
    const speechSynth = window.speechSynthesis;
    const enteredText = text.value;
    const error = document.querySelector('.error-para');

    if (!enteredText.trim().length) {
        error.textContent = `Nothing to Convert! Enter text in the text area.`;
        clearTimer(); // Clear timer if no text
        return; // Exit if there's no text
    }

    if (!speechSynth.speaking) {
        error.textContent = "";
        const newUtter = new SpeechSynthesisUtterance(enteredText);
        
        // Calculate the estimated duration based on word count
        const wordCount = enteredText.trim().split(/\s+/).length;
        const estimatedDuration = Math.ceil(wordCount * 0.5); // Estimate 0.5 seconds per word

        // Start the speech synthesis
        speechSynth.speak(newUtter);
        convertBtn.textContent = "Sound is Playing...";

        // Start the timer
        startTimer(estimatedDuration);

        newUtter.onend = () => {
            convertBtn.textContent = "Play Converted Sound";
            clearTimer(); // Clear timer when speech ends
        };
    }
});

function startTimer(totalDuration) {
    elapsedTime = 0; // Reset elapsed time
    timerDisplay.textContent = formatTime(totalDuration); // Show initial remaining time
    clearInterval(timer); // Clear any existing timer

    timer = setInterval(() => {
        elapsedTime++;
        const remainingTime = totalDuration - elapsedTime;
        
        if (remainingTime >= 0) {
            timerDisplay.textContent = formatTime(remainingTime);
        } else {
            clearInterval(timer); // Clear timer if it goes below zero
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function clearTimer() {
    clearInterval(timer); // Clear the timer interval
    timerDisplay.textContent = "0:00"; // Reset display
}
