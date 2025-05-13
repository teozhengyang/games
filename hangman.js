const readlineSync = require('readline-sync');

const words = ['javascript', 'hangman', 'node', 'developer', 'computer', 'algorithm'];
const wordToGuess = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let attempts = 6;
let wordDisplay = '_'.repeat(wordToGuess.length);

function displayWord() {
    let display = '';
    for (let i = 0; i < wordToGuess.length; i++) {
        display += guessedLetters.includes(wordToGuess[i]) ? wordToGuess[i] : '_';
    }
    return display;
}

while (attempts > 0) {
    console.log(`\nWord to guess: ${displayWord()}`);
    console.log(`Attempts remaining: ${attempts}`);
    const guess = readlineSync.question('Guess a letter: ').toLowerCase();

    if (guess.length !== 1 || !/[a-z]/.test(guess)) {
        console.log('Please enter a valid letter.');
        continue;
    }

    if (guessedLetters.includes(guess)) {
        console.log('You already guessed that letter.');
        continue;
    }

    guessedLetters.push(guess);

    if (wordToGuess.includes(guess)) {
        console.log('Good guess!');
    } else {
        attempts--;
        console.log('Wrong guess!');
    }

    if (displayWord() === wordToGuess) {
        console.log(`\nCongratulations! You guessed the word: ${wordToGuess}`);
        break;
    }
}

if (attempts === 0) {
    console.log(`\nYou lost! The word was: ${wordToGuess}`);
}
