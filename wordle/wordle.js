const readlineSync = require('readline-sync');

// List of 5-letter words
const wordList = [
    'apple', 'bread', 'chase', 'dance', 'eagle', 'fight', 'ghost', 'house', 'ideal', 'joint',
    'lemon', 'mount', 'north', 'ocean', 'plane', 'quick', 'rose', 'stone', 'tiger', 'under'
];

// Select a random word from the word list
const wordToGuess = wordList[Math.floor(Math.random() * wordList.length)];

let attempts = 6;

function checkGuess(guess) {
    let result = [];
    let wordArray = wordToGuess.split('');
    let guessArray = guess.split('');

    // First pass: mark exact matches
    for (let i = 0; i < guessArray.length; i++) {
        if (guessArray[i] === wordArray[i]) {
            result[i] = guessArray[i].toUpperCase(); // Correct letter in correct position
            wordArray[i] = null; // Mark this letter as matched in the word
        }
    }

    // Second pass: mark letters that are in the word but in the wrong position
    for (let i = 0; i < guessArray.length; i++) {
        if (!result[i]) {
            if (wordArray.includes(guessArray[i])) {
                result[i] = guessArray[i]; // Correct letter, wrong position
                wordArray[wordArray.indexOf(guessArray[i])] = null; // Remove the letter from the word
            } else {
                result[i] = '_'; // Incorrect letter
            }
        }
    }

    return result.join('');
}

console.log('Welcome to Wordle!');
console.log('You have 6 attempts to guess the 5-letter word.');

while (attempts > 0) {
    console.log(`\nAttempts remaining: ${attempts}`);
    const guess = readlineSync.question('Enter your 5-letter guess: ').toLowerCase();

    // Validate the input
    if (guess.length !== 5 || !/^[a-z]+$/.test(guess)) {
        console.log('Please enter a valid 5-letter word.');
        continue;
    }

    // Check if the guess is correct
    if (guess === wordToGuess) {
        console.log(`\nCongratulations! You guessed the word: ${wordToGuess}`);
        break;
    } else {
        console.log(checkGuess(guess));
    }

    attempts--;
}

if (attempts === 0) {
    console.log(`\nYou lost! The correct word was: ${wordToGuess}`);
}
