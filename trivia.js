const readlineSync = require('readline-sync');
const chalk = require('chalk');

// Decode HTML entities in trivia questions/answers
function decodeHTML(str) {
    return str.replace(/&quot;/g, '"')
              .replace(/&#039;/g, "'")
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&eacute;/g, 'é');
}

let totalWins = 0;
let totalLosses = 0;

async function generateQuestions(number) {
    const questionsURL = `https://opentdb.com/api.php?amount=${number}&type=multiple`;
    const response = await fetch(questionsURL);
    const data = await response.json();

    return data.results.map(item => ({
        question: decodeHTML(item.question),
        correct_answer: decodeHTML(item.correct_answer),
        all_answers: shuffle([
            ...item.incorrect_answers.map(decodeHTML),
            decodeHTML(item.correct_answer)
        ])
    }));
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function evaluateGuess(allAnswers, correctAnswer) {
    allAnswers.forEach((ans, i) => {
        console.log(chalk.yellow(`${i + 1}. ${ans}`));
    });

    const index = readlineSync.questionInt('Your answer (1-4): ', {
        limit: input => [1, 2, 3, 4].includes(Number(input)),
        limitMessage: 'Please enter a number between 1 and 4.'
    }) - 1;

    if (allAnswers[index] === correctAnswer) {
        console.log(chalk.greenBright('Correct! 🎉'));
        totalWins++;
    } else {
        console.log(chalk.redBright(`Wrong! The correct answer was: ${correctAnswer}`));
        totalLosses++;
    }

    console.log(chalk.hex('#FFA500')(`Score: ${totalWins} win(s), ${totalLosses} loss(es)`));
}

async function playGame(questions) {
    for (let i = 0; i < questions.length; i++) {
        const { question, all_answers, correct_answer } = questions[i];
        console.log(chalk.cyanBright(`\nQuestion ${i + 1}: ${question}`));
        evaluateGuess(all_answers, correct_answer);
    }
}

async function main() {
    console.log(chalk.blue.bold('🧠 Welcome to Trivia Game!'));
    console.log('Answer the questions correctly to win points.\n');

    while (true) {
        const questionNumber = readlineSync.questionInt('How many questions would you like to answer? (1-10): ', {
            limit: input => input >= 1 && input <= 10,
            limitMessage: 'Enter a number between 1 and 10.'
        });

        const questions = await generateQuestions(questionNumber);
        await playGame(questions);

        console.log(chalk.hex('#FFA500')(`\nRound Summary: ${totalWins} win(s), ${totalLosses} loss(es)`));

        const again = readlineSync.keyInYN('\nPlay again?');
        if (!again) break;
    }

    console.log(chalk.magentaBright('\nThanks for playing Trivia! 👋'));
    console.log(chalk.greenBright(`Final Score: ${totalWins} win(s), ${totalLosses} loss(es)`));
    process.exit(0);
}

main();
