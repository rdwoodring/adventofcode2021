import {
    input
} from '../input.js';

const closingMap = {
        '}': '{',
        ']': '[',
        ')': '(',
        '>': '<'
    },
    autoCompleteMap = {
        '{': '}',
        '[': ']',
        '(': ')',
        '<': '>'
    },
    scoreMap = {
        '}': 3,
        ']': 2,
        ')': 1,
        '>': 4
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

// const score = input.map(tokenize).reduce((acc, line) => {
//     // return acc + line.split('').reduce((innerAcc, char) => (scoreMap[char] || 0) + innerAcc, 0);
//     const firstInvalid = line.split('').find((char) => {
//         return char === '}' || char === ']' || char === ')' || char === '>';
//     });

//     return acc + (scoreMap[firstInvalid] || 0);
// }, 0);

const scores = input.map(tokenize)
    .filter((line) => !line.includes('}') && !line.includes(']') && !line.includes(')') && !line.includes('>'))
    .map((line) => {
        return line.split('')
            .reverse()
            .map(char => autoCompleteMap[char])
            .join('')
    })
    .map((line) => {
        return line.split('').reduce((innerAcc, char) => innerAcc * 5 + scoreMap[char], 0);
    })
    .sort((a, b) => a - b),
    score = scores[Math.floor(scores.length / 2)];

console.log(score);