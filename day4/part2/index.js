import BingoBoard from '../BingoBoard.js'

import {
    drawnNumbers,
    boards
} from '../input.js';
// import {
//     drawnNumbers,
//     boards
// } from './tempInput.js';

import { IN_PROGRESS, WIN } from '../gameStatuses.js';

const bingoBoards = boards.map((rawBoard) => new BingoBoard(rawBoard));

let lastWinner,
    lastDrawnNumber;

drawnNumbers.some((drawnNumber) => {
    bingoBoards.forEach((board) => board.markNumber(drawnNumber));

    const inProgressBoards = bingoBoards.filter(board => board.status === IN_PROGRESS);

    if (inProgressBoards.length === 1) {
        lastWinner = inProgressBoards[0];

        // lastDrawnNumber = drawnNumber;

        return true;
    }
});

drawnNumbers.some((drawnNumber) => {
    lastWinner.markNumber(drawnNumber);

    if (lastWinner.status === WIN) {
        lastDrawnNumber = drawnNumber;

        return true;
    }
});

const unmarkedSum = lastWinner.getUnmarkedNumbers().reduce((acc, num) => acc + Number(num), 0);

// // console.log(boards);
// console.log(boards);
// process.exit(0);

console.log(lastDrawnNumber);
console.log(lastWinner.getUnmarkedNumbers());
console.log(unmarkedSum);
console.log(lastDrawnNumber * unmarkedSum);