import {
    WIN,
    IN_PROGRESS
} from './gameStatuses.js';

class BingoBoard {
    constructor(gridRows) {
        function calculateCoordinates(idx) {
            const numbersPerRow = 5,
                y = Math.floor(idx / numbersPerRow),
                x = idx - y * 5;

            return {
                x,
                y
            };
        }

        const rawNumbers = gridRows.reduce((acc, row) => {
            return [...acc, ...row];
        }, []);

        this.byNumbers = rawNumbers.reduce((acc, number, idx) => {
            const coordinates = calculateCoordinates(idx);

            return {
                ...acc,
                [number]: acc[number] ? [...acc[number], coordinates] : [coordinates]
            }
        }, {});

        this.byCoordinates = rawNumbers.reduce((acc, number, idx) => {
            const {
                x,
                y
            } = calculateCoordinates(idx);

            return {
                ...acc,
                [`${x},${y}`]: number
            };
        }, {});

        this.markedNumbers = [];
        this.status = IN_PROGRESS;
    }

    markNumber(number) {
        if (this.byNumbers[number]) {
            this.markedNumbers = Array.from(new Set([...this.markedNumbers, number]));
        }

        if (this.checkIsWin()) {
            this.status = WIN;
        }
    }

    getUnmarkedNumbers() {
        return Object.keys(this.byNumbers).filter(number => !this.markedNumbers.includes(number));
    }

    checkIsWin() {
        const markedNumberCoordinates = this.markedNumbers.reduce((acc, number) => {
                return [...acc, ...this.byNumbers[number]];
            }, []),
            tallyByRows = Array.from({length: 5})
                .map((val, idx) => {
                    return markedNumberCoordinates.filter((coordinates) => {
                        return coordinates.x === idx;
                    }).length;
                }),
            tallyByColumns = Array.from({length: 5})
                .map((val, idx) => {
                    return markedNumberCoordinates.filter((coordinates) => {
                        return coordinates.y === idx;
                    }).length;
                });

        if (tallyByColumns.includes(5) || tallyByRows.includes(5)) {
            this.status = WIN;
        }
    }
}

export default BingoBoard;