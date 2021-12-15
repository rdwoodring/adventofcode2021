// import {
//     input
// } from '../tempInput.js';

import {
    input
} from '../input.js';

import GraphNode from '../GraphNode.js';

function generateCaveGraph(rawNodeStrings) {
    const nodeList = rawNodeStrings.reduce((acc, rawNodeString) => [...acc, ...rawNodeString.split('-')], []),
        dedupedNodeList = Array.from(new Set(nodeList)),
        graphNodesMap = dedupedNodeList.reduce((acc, nodeId) => {
            let nodeType;

            if (nodeId === 'start' || nodeId === 'end') {
                nodeType = nodeId;
            } else if (nodeId.toUpperCase() === nodeId) {
                nodeType = 'big';
            } else {
                nodeType = 'small'
            }

            return {
                ...acc,
                [nodeId]: new GraphNode(nodeId, nodeType)
            };
        }, {});

    // add connections
    rawNodeStrings.forEach((nodeString) => {
        const [node1, node2] = nodeString.split('-');

        graphNodesMap[node1].addConnection(graphNodesMap[node2]);
        graphNodesMap[node2].addConnection(graphNodesMap[node1]);
    });

    // // drop dead-end small caves
    // const deadEndSmallCaves = Object.values(graphNodesMap).filter(node => {
    //     const [connection] = node.connections;

    //     return node.nodeType === 'small' && node.connections.length <= 1 && connection.nodeType === 'small';
    // });

    // deadEndSmallCaves.forEach(node => {
    //     node.connections.forEach(connection => {
    //         connection.removeConnection(node);
    //         node.removeConnection(connection);
    //     });

    //     delete graphNodesMap[node.id];
    // });

    return graphNodesMap;
}

function findPath(visited, hasDoubleVisitedSmallCave = false) {
    const latestNode = [...visited].pop();

    if (latestNode.id === 'end') {
        return visited.map(node => node.id).join(',');
    } else {
        if (hasDoubleVisitedSmallCave) {
            // filter out all remaining small caves that we've visited
            const connectionsThatAreNotVisitedSmallCaves = latestNode.connections
                .filter(node => !((node.nodeType === 'small' || node.nodeType === 'start') && visited.includes(node)));
            
            // hasDoubleVisitedSmallCave is true for the rest of this path
            return connectionsThatAreNotVisitedSmallCaves.reduce((acc, node) => {
                return `${acc}\n${findPath([...visited, node], true)}`
            }, '');
        } else {
            // only filter out start
            const connectionsThatAreNotVisitedSmallCaves = latestNode.connections
                .filter(node => node.nodeType !== 'start');
            
            // calculate if we are now double visiting a small cave
            return connectionsThatAreNotVisitedSmallCaves.reduce((acc, node) => {
                const doubleVisitedSmallCave = visited.includes(node) && node.nodeType === 'small';

                return `${acc}\n${findPath([...visited, node], doubleVisitedSmallCave)}`
            }, '');
        }
    }
}

const graph = generateCaveGraph(input),
    paths = findPath([graph['start']]).split('\n').filter(path => path.length);

debugger;
console.log(paths);
console.log(paths.length);