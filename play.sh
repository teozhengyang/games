#!/bin/bash

echo "🎮 Available Games:"
echo "1. Connect Four"
echo "2. Hangman"
echo "3. Tic Tac Toe"
echo "4. Wordle"

read -p "Choose a game (1-4): " game_choice

case $game_choice in
    1)
        echo ""
        echo "Starting Connect Four..."
        echo ""
        node connect-4.js
        ;;
    2)
        echo ""
        echo "Starting Tic Tac Toe..."
        echo ""
        node tic-tac-toe.js
        ;;
    3)
        echo ""
        echo "Starting Wordle..."
        echo ""
        node wordle.js
        ;;
    4)
        echo ""
        echo "Starting Trivia..."
        echo ""
        node trivia.js
        ;;
    *)
        echo "❌ Invalid choice. Please select a number between 1 and 4."
        ;;
esac
