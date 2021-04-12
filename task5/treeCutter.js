var leaves = [];
var parameterCount;
var root;
var confidenceConstant = 0.69;

function addControlSample(request, node) {
    while (!node.isFinal) {
        node.controlSet.push(request);
        if (node.isDiscrete) {
            node = node.branches.get(request[node.parameter]);
        } else {
            node = (request[node.parameter] < node.keyValue) ? node.branches.get("<") : node.branches.get("⩾");
        }
    }
    node.controlSet.push(request);
    return node.class;
}

function emptyNodesReduction(node) {
    if (!node.controlSet.length) {
        if (node.isFinal) {
            let parent = node.parent;
            let value = (node.isDiscrete) ? node.value : node.value[0];
            parent.branches.delete(value);
        } else {
            node.isFinal = true;
            node.class = node.findMostPopularClass("sampleSet");
            node.branches = null;
            return;
        }
    }
    if (node.isFinal) return;
    for (let branch of node.branches.values()) {
        emptyNodesReduction(branch);
    }  
}

function pruning(node) {
    if (node.isFinal) {
        return;
    }

    let averageNodeError = calculateAverageNodeError(node);
    let newNode = node;
    let minError = averageNodeError;

    for (let branch of node.branches.values()) {
        pruning(branch);
    }

    //subtree raising
    for (let branch of node.branches.values()) {
        let averageSubtreeError = calculateRaisingError(branch, node.controlSet);
        if (averageSubtreeError <= minError) {
            minError = averageSubtreeError;
            newNode = branch;
        }
    }

    //subtree replacement
    let mostPopularClass = node.findMostPopularClass("controlSet");
    let nodeError = calculateReplacementError(node.controlSet, mostPopularClass);
    if (nodeError < minError) {
        minError = nodeError;
        node.isFinal = true;
        node.class = mostPopularClass;
        node.branches = null;
        return;
    }

    if (node != newNode) {
        nodeSwap(node, newNode);
        return;
    }
}

function calculateAverageNodeError(node) {
    let averageNodeError = 0;
    for (let branch of node.branches.values()) {
        averageNodeError += (branch.controlSet.length / node.controlSet.length) * calculateRaisingError(branch, branch.controlSet);
    }
    return averageNodeError;
}

function calculateRaisingError(node, set) {
    let errors = 0;
    for (let request of set) {
        if (!processRequest(request, node)) errors++;
    }
    let f = errors / set.length;
    return (calculateProbabilty(f, set.length));
}

function calculateReplacementError(set, className) {
    let errors = 0;
    for (let request of set) {
        if (request[parameterCount] != className) errors++;
    }
    let f = errors / set.length;
    return (calculateProbabilty(f, set.length));
}

function processRequest(request, node) {
    while (!node.isFinal) {
        if (node.isDiscrete) {
            node = node.branches.get(request[node.parameter]);
        } else {
            node = (request[node.parameter] < node.keyValue) ? node.branches.get("<") : node.branches.get("⩾");
        }
    }
    return node.class == request[parameterCount];
}

function calculateProbabilty(f, N) {
    return f + confidenceConstant * Math.sqrt(f * (1 - f) / N);
}

function nodeSwap(node, newNode) {
    if (!node.parent) {
        root = newNode;
        newNode.value = "Корень";
        newNode.parent = null;
    } else {
        let parent = node.parent;
        let value = (parent.isDiscrete) ? node.value : node.value[0];
        parent.branches.set(value, newNode);
        newNode.parent = parent;
        newNode.value = node.value;
    }
}

export async function runControlSet(control, node) {
    root = node;
    parameterCount = control[0].length - 1;
    for (let request of control) {
        addControlSample(request, root);
    }

    /* emptyNodesReduction(root);
    clearField();
    visualize(root);
    await sleep(10000); */

    pruning(root);
    clearField();
    visualize(root);
    console.log(root);
}

function clearField() {
    window.fieldContainer.innerHTML = `<ul class = "tree" id = "0"></ul>`;
}

import {visualize} from './treeBuilder.js'
import {sleep} from '../general.js'