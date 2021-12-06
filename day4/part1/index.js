import BingoBoard from '../BingoBoard.js'

import {
    drawnNumbers,
    boards
} from '../input.js';

import { WIN } from '../gameStatuses.js';

const bingoBoards = boards.map((rawBoard) => new BingoBoard(rawBoard));

let winner,
    lastDrawnNumber;

drawnNumbers.some((drawnNumber) => {
    bingoBoards.forEach((board) => board.markNumber(drawnNumber));

    const winningBoard = bingoBoards.find(board => board.status === WIN);

    if (winningBoard) {
        winner = winningBoard;

        lastDrawnNumber = drawnNumber;

        return true;
    }
});

const unmarkedSum = winner.getUnmarkedNumbers().reduce((acc, num) => acc + Number(num), 0);

console.log(lastDrawnNumber * unmarkedSum);