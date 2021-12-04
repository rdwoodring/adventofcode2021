function parseBinaryStrings(binaryStrings, bitToPreferIfEqual) {
    const bitCount = binaryStrings[0].length;

    return Array.from({length: bitCount})
        .fill(null)
        .map((bit, idx) => {
            const truthyBitTally = binaryStrings.reduce((acc, binaryString) => {
                return acc + Number(binaryString.split('')[idx]);
            }, 0);

            // return truthyBitTally > (binaryStrings.length / 2) ? 1 : 0;
            return truthyBitTally >= (binaryStrings.length / 2) ? bitToPreferIfEqual : Number(!bitToPreferIfEqual);
        })
        .join('');
        // bits = binaryStrings.map((binaryString) => binaryString.split());
}

function getOxygenBits(binaryStrings) {
    return parseBinaryStrings(binaryStrings, 1);
}

function getCarbonDioxideBits(binaryStrings) {
    return parseBinaryStrings(binaryStrings, 0);
}

export {
    getOxygenBits,
    getCarbonDioxideBits
};