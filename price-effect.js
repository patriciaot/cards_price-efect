let words = document.querySelectorAll(".word");
words.forEach((word) => {
    let letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach((letter) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let rotateText = () => {
    let currentWord = words[currentWordIndex];
    let nextWord =
        currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    // Rotate out letters of current word
    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = "letter out";
        }, i * 80);
    });

    // Reveal and rotate in letters of the next word
    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
            letter.className = "letter in";
        }, 340 + i * 80);
    });

    currentWordIndex =
        currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;

    if (currentWordIndex === maxWordIndex) {
        setTimeout(() => {
            words[currentWordIndex].style.opacity = "1";
            Array.from(words[currentWordIndex].children).forEach((letter) => {
                letter.className = "letter in";
            });

            // Alternar clases para efecto spark
            let rotatingElement = document.querySelector(".starting_price--rotating");
            rotatingElement.classList.remove("starting_price--default");
            rotatingElement.classList.add("starting_price--activated");

            setTimeout(() => {
                rotatingElement.classList.remove("starting_price--activated");
                rotatingElement.classList.add("starting_price--default");
            }, 10000); // Duración de estado activado
        }, 1000);
    }
};

// Ciclo para que se ejecute el efecto cada cierto tiempo
setInterval(() => {
    rotateText();
}, 4000); // Intervalo de 4 segundos entre efectos

