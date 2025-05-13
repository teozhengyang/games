const readlineSync = require('readline-sync');
const chalk = require('chalk');

let totalWins = 0;
let totalLosses = 0;

// Apply colors to feedback
function formatResult(statusArray, guessArray) {
    return statusArray.map((status, i) => {
        if (status === 'correct') return chalk.bgGreen.black(` ${guessArray[i].toUpperCase()} `);
        if (status === 'present') return chalk.bgHex('#FFA500').black(` ${guessArray[i]} `); // Orange
        return chalk.bgGray.black(` ${guessArray[i]} `);
    }).join(' ');
}

// Compare guess to target word
function evaluateGuess(guess, target) {
    const result = Array(5).fill('absent');
    const targetArr = target.split('');
    const guessArr = guess.split('');

    // First pass: correct position
    for (let i = 0; i < 5; i++) {
        if (guessArr[i] === targetArr[i]) {
            result[i] = 'correct';
            targetArr[i] = null;
        }
    }

    // Second pass: correct letter, wrong position
    for (let i = 0; i < 5; i++) {
        if (result[i] === 'absent' && targetArr.includes(guessArr[i])) {
            result[i] = 'present';
            targetArr[targetArr.indexOf(guessArr[i])] = null;
        }
    }

    return { result, guessArr };
}

// Fetch a random word
async function getRandomWord() {
    const url = 'https://random-word-api.vercel.app/api?words=1&length=5';
    try {
        const response = await fetch(url);
        const [word] = await response.json();
        return word.toLowerCase();
    } catch (error) {
        console.error(chalk.red('Error fetching word:'), error);
        return null;
    }
}

// Play a single game
async function playGame() {
    const targetWord = await getRandomWord();
    if (!targetWord) {
        console.log(chalk.red('❌ Failed to fetch a word. Try again later.'));
        return;
    }

    let attempts = 6;

    while (attempts > 0) {
        console.log(chalk.cyan(`\nAttempts left: ${attempts}`));
        const guess = readlineSync.question('Enter your 5-letter guess: ').toLowerCase();

        if (guess.length !== 5 || !/^[a-z]+$/.test(guess)) {
            console.log(chalk.red('❌ Please enter a valid 5-letter word.'));
            continue;
        }

        if (guess === targetWord) {
            console.log(chalk.greenBright(`\n🎉 Correct! The word was: ${chalk.bold(targetWord.toUpperCase())}`));
            totalWins++;
            return;
        }

        const { result, guessArr } = evaluateGuess(guess, targetWord);
        console.log(formatResult(result, guessArr));
        attempts--;
    }

    console.log(chalk.redBright(`\n💀 Game Over! The word was: ${chalk.bold(targetWord.toUpperCase())}`));
    totalLosses++;
}

// Game entry point
async function main() {
    console.log(chalk.blue.bold('\n🔤 Welcome to Wordle (Console Edition) 🔤'));
    console.log('You have 6 tries to guess the 5-letter word.');
    console.log(chalk.green('🟩 = Correct letter, correct position'));
    console.log(chalk.hex('#FFA500')('🟧 = Correct letter, wrong position'));
    console.log(chalk.gray('⬜ = Letter not in the word'));

    do {
        await playGame();
        console.log(chalk.hex('#FFA500')(`\nScore: ${totalWins} win(s), ${totalLosses} loss(es)`));
    } while (readlineSync.keyInYN('\nPlay again?'));

    console.log(chalk.magentaBright('\nThanks for playing Wordle! 👋'));
    console.log(chalk.greenBright(`Final Score: ${totalWins} win(s), ${totalLosses} loss(es)`));
    process.exit(0);
}

main();
