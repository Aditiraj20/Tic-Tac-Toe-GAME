class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = { X: 0, O: 0 };
        this.cells = document.querySelectorAll('.cell');
        this.currentPlayerElement = document.getElementById('currentPlayer');
        this.gameMessage = document.getElementById('gameMessage');
        this.scoreXElement = document.getElementById('scoreX');
        this.scoreOElement = document.getElementById('scoreO');
        this.resetGameButton = document.getElementById('resetGame');
        this.resetScoreButton = document.getElementById('resetScore');
        
        this.winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        this.resetGameButton.addEventListener('click', () => this.resetGame());
        this.resetScoreButton.addEventListener('click', () => this.resetScore());
        
        this.updateDisplay();
    }
    
    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.makeMove(index);
    }
    
    makeMove(index) {
        this.board[index] = this.currentPlayer;
        this.cells[index].textContent = this.currentPlayer;
        this.cells[index].classList.add(this.currentPlayer.toLowerCase());
        
        if (this.checkWinner()) {
            this.handleGameEnd(`Player ${this.currentPlayer} wins!`);
            this.scores[this.currentPlayer]++;
            this.highlightWinningCells();
        } else if (this.checkDraw()) {
            this.handleGameEnd("It's a draw!");
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateDisplay();
        }
    }
    
    checkWinner() {
        return this.winConditions.some(condition => {
            const [a, b, c] = condition;
            return this.board[a] && 
                   this.board[a] === this.board[b] && 
                   this.board[a] === this.board[c];
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    highlightWinningCells() {
        this.winConditions.forEach(condition => {
            const [a, b, c] = condition;
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                this.cells[a].classList.add('winner');
                this.cells[b].classList.add('winner');
                this.cells[c].classList.add('winner');
            }
        });
    }
    
    handleGameEnd(message) {
        this.gameActive = false;
        this.gameMessage.textContent = message;
        this.gameMessage.classList.add('draw');
        this.cells.forEach(cell => cell.style.cursor = 'not-allowed');
    }
    
    updateDisplay() {
        this.currentPlayerElement.textContent = this.currentPlayer;
        this.scoreXElement.textContent = this.scores.X;
        this.scoreOElement.textContent = this.scores.O;
    }
    
    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.gameMessage.textContent = '';
        this.gameMessage.classList.remove('draw');
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winner');
            cell.style.cursor = 'pointer';
        });
        
        this.updateDisplay();
    }
    
    resetScore() {
        this.scores = { X: 0, O: 0 };
        this.updateDisplay();
        this.resetGame();
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new  TicTacToe();
});