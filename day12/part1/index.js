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

    // drop dead-end small caves
    const deadEndSmallCaves = Object.values(graphNodesMap).filter(node => {
        const [connection] = node.connections;

        return node.nodeType === 'small' && node.connections.length <= 1 && connection.nodeType === 'small';
    });

    deadEndSmallCaves.forEach(node => {
        node.connections.forEach(connection => {
            connection.removeConnection(node);
            node.removeConnection(connection);
        });

        delete graphNodesMap[node.id];
    });

    return graphNodesMap;
}

function findPath(visited) {
    const latestNode = [...visited].pop();

    if (latestNode.id === 'end') {
        return visited.map(node => node.id).join(',');
    } else {
        const connectionsThatAreNotVisitedSmallCaves = latestNode.connections
            .filter(node => !((node.nodeType === 'small' || node.nodeType === 'start') && visited.includes(node)));
            
        return connectionsThatAreNotVisitedSmallCaves.reduce((acc, node) => {
            // return [
            //     ...acc,
            //     findPath([...visited, node])
            // ];
            return `${acc}\n${findPath([...visited, node])}`
        }, '');
    }
}

const graph = generateCaveGraph(input),
    paths = findPath([graph['start']]).split('\n').filter(path => path.length);

debugger;
console.log(paths);
console.log(paths.length);