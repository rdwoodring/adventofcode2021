function parseBinaryStrings(binaryStrings) {
    const bitCount = binaryStrings[0].length;

    return Array.from({length: bitCount})
        .fill(null)
        .map((bit, idx) => {
            const truthyBitTally = binaryStrings.reduce((acc, binaryString) => {
                return acc + Number(binaryString.split('')[idx]);
            }, 0);

            return truthyBitTally > (binaryStrings.length / 2) ? 1 : 0;
        })
        .join('');
        // bits = binaryStrings.map((binaryString) => binaryString.split());
}

function reverseBits(binaryString) {
    return binaryString.split('')
        .map(bit => Number(!Number(bit)))
        .join('');
}

export {
    parseBinaryStrings,
    reverseBits
};