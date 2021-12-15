class GraphNode {
    constructor(id, nodeType) {
        this.id = id;
        this.nodeType = nodeType;

        this.connections = [];
    }

    addConnection(graphNode) {
        this.connections = Array.from(new Set([...this.connections, graphNode]));
    }

    removeConnection(graphNode) {
        this.connections = this.connections.filter(connection => connection !== graphNode);
    }
}

export default GraphNode;