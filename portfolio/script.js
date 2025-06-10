const typingText = document.querySelector('.typing-text');

const words = ["Student", "Part-timer", "Gamer", "Game Designer", "TT Coach"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const type = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);

    typingText.textContent = currentChar;

    if (!isDeleting) {
        charIndex++;
        if (charIndex === currentWord.length + 1) {
            isDeleting = true;
            setTimeout(type, 1000); 
            return;
        }
    } else {
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    const typingSpeed = isDeleting ? 100 : 100;
    setTimeout(type, typingSpeed);
};

document.addEventListener("DOMContentLoaded", () => {
    type();
});
