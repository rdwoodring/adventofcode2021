import {
    input
} from '../input.js';

const closingMap = {
        '}': '{',
        ']': '[',
        ')': '(',
        '>': '<'
    },
    scoreMap = {
        '}': 1197,
        ']': 57,
        ')': 3,
        '>': 25137
    };

function tokenize(str) {
    const chars = str.split('');

    debugger;

    return chars.reduce((acc, char, idx) => {
        let next = [...acc];

        const last = [...next].pop();

        if (last === undefined) {
            return [char];
        }

        if (closingMap[char] === last) {
            next.pop();
        } else {
            next.push(char);
        }

        return next;
    }, []).join('');
}

const score = input.map(tokenize).reduce((acc, line) => {
    // return acc + line.split('').reduce((innerAcc, char) => (scoreMap[char] || 0) + innerAcc, 0);
    const firstInvalid = line.split('').find((char) => {
        return char === '}' || char === ']' || char === ')' || char === '>';
    });

    return acc + (scoreMap[firstInvalid] || 0);
}, 0);

console.log(score);