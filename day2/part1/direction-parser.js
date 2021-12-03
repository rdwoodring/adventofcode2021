const directionModifierMap = {
    up: (magnitude) => Math.abs(magnitude) * -1,
    down: (magnitude) => Math.abs(magnitude),
    forward: (magnitude) => Math.abs(magnitude),
    back: (magnitude) => Math.abs(magnitude) * -1
};

function parseDirection(rawDirection) {
    const [
        direction,
        magnitude
    ] = rawDirection.split(' '),
    lcaseDirection = direction.toLowerCase();

    return {
        x: lcaseDirection === 'forward' || lcaseDirection === 'back' ? directionModifierMap[lcaseDirection](magnitude) : 0,
        y: lcaseDirection === 'up' || lcaseDirection === 'down' ? directionModifierMap[lcaseDirection](magnitude) : 0
    };
}

function parseDirections(rawDirections) {
    return rawDirections.map(parseDirection);
}

function sumDirectionVectors(directionVectors) {
    return directionVectors.reduce((acc, directionVector) => {
        const {
                x: accX,
                y: accY
            } = acc,
            {
                x: curX,
                y: curY
            } = directionVector;
        
        return {
            x: accX + curX,
            y: accY + curY
        };
    }, {
        x: 0,
        y: 0
    });
}

function parseAndSumRawDirections(rawDirections) {
    return sumDirectionVectors(parseDirections(rawDirections));
}

export {
    parseAndSumRawDirections
}