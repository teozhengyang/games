# Games

## Description

This repository contains a collection of simple games implemented in JavaScript. Each game is designed to be played in the terminal. Connect 4 and Tic Tac Toe are two-player games, while Wordle and Hangman are single-player games.

## Available Games
- **Connect 4**: A two-player game where players take turns dropping colored discs into a grid. The objective is to connect four discs in a row, either horizontally, vertically, or diagonally.
- **Tic Tac Toe**: A two-player game played on a 3x3 grid. Players take turns placing their marks (X or O) in empty squares. The first player to get three marks in a row (horizontally, vertically, or diagonally) wins the game.
- **Hangman**: A word guessing game where the player has to guess a hidden word by suggesting letters. The player has a limited number of incorrect guesses before the game ends.
- **Wordle**: A word guessing game where you have to guess a five-letter word within six attempts. After each guess, the game provides feedback on the letters that are correct and in the right position, as well as letters that are correct but in the wrong position.

## Installation
1. Clone the repository
2. Run ```chmod +x play.sh``` to make the script executable
3. Run the scirpt using ```./play.sh``` and select the game you want to play
4. Follow the instructions in the terminal to play the game
5. Enjoy!

## Requirements
- Node.js (version 18 or higher)
- npm (Node Package Manager)
- chalk (for colored output in the terminal)