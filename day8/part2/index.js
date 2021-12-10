// import {
//     input
// } from '../tempInput.js';
import {
    input
} from '../input.js';

const allSignalLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    signalOutputValuePairs = input.split('\n').map((splitInputs) => splitInputs.split('|').map(i => i.trim())),
    total = signalOutputValuePairs.reduce((acc, signalOutputValuePair) => {
        const [signal, outputValue] = signalOutputValuePair,
            outputValuePatterns = outputValue.split(' ').map(pattern => pattern.split('').sort().join('')),
            signalPatterns = signal.split(' ').map(pattern => pattern.split('').sort().join('')),
            oneLetters = signalPatterns.find(pattern => pattern.length === 2).split(''),
            fourLetters = signalPatterns.find(pattern => pattern.length === 4).split(''),
            nineLetters = signalPatterns.find(pattern => {
                return pattern.length === 6 &&
                    fourLetters.reduce((acc, letter) => acc && pattern.includes(letter), true);
            }).split(''),
            zeroLetters = signalPatterns.find(pattern => {
                return pattern.length === 6 &&
                    // pattern.includes(oneLetters) &&
                    oneLetters.reduce((acc, letter) => acc && pattern.includes(letter), true) &&
                    pattern !== nineLetters.join('');
            }).split(''),
            sixLetters = signalPatterns.find(pattern => pattern.length === 6 && pattern !== nineLetters.join('') && pattern !== zeroLetters.join('')).split(''),
            sevenLetters = signalPatterns.find(pattern => pattern.length === 3).split(''),
            positions = {
                top: sevenLetters.find(letter => !oneLetters.includes(letter)),
                rightTop: allSignalLetters.find(letter => !sixLetters.includes(letter)),
                rightBottom: oneLetters.find(letter => sixLetters.includes(letter)),
                leftBottom: allSignalLetters.find(letter => !nineLetters.includes(letter))
            },
            threeLetters = signalPatterns.find(pattern => {
                return pattern.length === 5 &&
                    oneLetters.reduce((acc, letter) => acc && pattern.includes(letter), true);
            }).split(''),
            twoLetters = signalPatterns.find(pattern => {
                return pattern.length === 5 &&
                    pattern.includes(positions.rightTop) &&
                    pattern !== threeLetters.join('');
            }).split(''),
            fiveLetters = signalPatterns.find(pattern => pattern.length === 5 && pattern !== twoLetters.join('') && pattern !== threeLetters.join('')).split(''),
            eightLetters = signalPatterns.find(pattern => pattern.length === 7).split(''),
            signalMap = {
                [zeroLetters.join('')]: 0,
                [oneLetters.join('')]: 1,
                [twoLetters.join('')]: 2,
                [threeLetters.join('')]: 3,
                [fourLetters.join('')]: 4,
                [fiveLetters.join('')]: 5,
                [sixLetters.join('')]: 6,
                [sevenLetters.join('')]: 7,
                [eightLetters.join('')]: 8,
                [nineLetters.join('')]: 9
            },
            outputNumbers = outputValuePatterns.reduce((acc, pattern) => {
                return `${acc}${signalMap[pattern]}`;
            }, '');

        return acc + Number(outputNumbers);
    }, 0);

console.log(total);