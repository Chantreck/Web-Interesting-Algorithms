var parameterCount ;
var classesSet;
var classesCount;
var treeNodesCount = 0;
var root;

class Node {
    constructor(sampleSet, value, parent) {
        this.parent = parent;
        this.sampleSet = sampleSet;
        this.value = value;

        if (!this.checkClassEquality()) {
            this.isFinal = false;
            this.selectParam();
            this.branches = new Map();
            this.isDiscrete = isNaN(sampleSet[0][this.parameter]);
            if (this.isDiscrete) {
                this.makeBranches();
            } else {
                this.makeContinuousBranches();
            }
        } else {
            this.isFinal = true;
            this.class = sampleSet[0][parameterCount];
        }
    }

    checkClassEquality() {
        let samples = this.sampleSet;
        for (let i = 0; i < samples.length - 1; i++) {
            if (samples[i][parameterCount] != samples[i + 1][parameterCount]) {
                return false;
            }
        }
        return true;
    }

    selectParam() {
        let samples = this.sampleSet;
        let minEntropy = Infinity;
        let parameterIndex = -1;
        let keyValue = 0;

        for (let curParameter = 0; curParameter < parameterCount; curParameter++) {
            let parameterValues = new Set();
            for (let i = 0; i < samples.length; i++) parameterValues.add(samples[i][curParameter]);
            parameterValues = Array.from(parameterValues);
            let entropy;
            let currentKeyValue = -Infinity;

            if (isNaN(parameterValues[0])) {
                entropy = calcDiscreteEntropy(parameterValues, samples, curParameter);
            } else {
                [currentKeyValue, entropy] = calcContinuousEntropy(parameterValues, samples, curParameter);
            }
            
            if (entropy < minEntropy) {
                minEntropy = entropy;
                parameterIndex = curParameter;
                keyValue = currentKeyValue;
            }
        }

        this.keyValue = keyValue;
        this.parameter = parameterIndex;
    }

    makeBranches() {
        let parameterValues = new Set();
        for (let i = 0; i < this.sampleSet.length; i++) parameterValues.add(this.sampleSet[i][this.parameter]);
        for (let value of parameterValues) {
            let newSampleSet = this.sampleSet.filter(str => str[this.parameter] == value);
            this.branches.set(value, new Node(newSampleSet, value, this));
        }
    }

    makeContinuousBranches() {
        this.branches.set("<", new Node(this.sampleSet.filter(str => str[this.parameter] < this.keyValue), `< ${this.keyValue}`, this));
        this.branches.set(">=", new Node(this.sampleSet.filter(str => str[this.parameter] >= this.keyValue), `⩾ ${this.keyValue}`, this))
    }
}

function calcEntropy(samples) {
    let result = 0;
    for (let curClass of classesSet) {
        let samplesWithCurClass = samples.filter(str => str[parameterCount] == curClass).length;
        if (samplesWithCurClass) {
            result -= (samplesWithCurClass/samples.length)*Math.log2(samplesWithCurClass/samples.length);
        }
    }
    return result;
}

function calcDiscreteEntropy(parameterValues, samples, parameter) {
    let result = 0;
    for (let value of parameterValues) {
        let curValuePart = samples.filter(str => str[parameter] == value);
        result += (curValuePart.length / samples.length) * calcEntropy(curValuePart);
    }
    return result;
}

function calcContinuousEntropy(parameterValues, samples, parameter) {
    let sortedValues = parameterValues.sort((a, b) => {return a - b});
    let minEntropy = Infinity;
    let keyValue = sortedValues[0];
    for (let i = 0; i < sortedValues.length - 1; i++) {
        let currentKeyValue = (sortedValues[i + 1] + sortedValues[i]) / 2;
        let entropy = 0;
        let lessPart = samples.filter(str => str[parameter] < currentKeyValue);
        entropy += (lessPart.length / samples.length) * calcEntropy(lessPart);
        let morePart = samples.filter(str => str[parameter] >= currentKeyValue);
        entropy += (morePart.length / samples.length) * calcEntropy(morePart);
        if (entropy < minEntropy) {
            minEntropy = entropy;
            keyValue = currentKeyValue;
        }
    }
    return [keyValue, minEntropy];
}

function visualize(treeNode) {
    let node;
    if (!treeNode.parent) {
        node = window[0];
    } else {
        node = window[treeNode.parent.nodeID]
    }

    treeNode.nodeID = ++treeNodesCount;

    let li = document.createElement("li");
    if (treeNode.isFinal) {
        li.innerHTML = `<span>${treeNode.value}</span><br><span class = "finalNode">Результат:<br><b>${treeNode.class}</b></span>`;
        li.class = "finalNode";
        node.append(li);
    } else {
        //debugger;
        li.innerHTML = `<span>${treeNode.value}</span><br><span class = "paramName">Параметр ${treeNode.parameter + 1}</span>`;
        node.append(li);
        let ul = document.createElement("ul");
        ul.id = treeNode.nodeID;
        li.append(ul);
        for (let branch of treeNode.branches.values()) {
            visualize(branch);
        }
    }
}

export async function processRequest(request) {
    console.log(request);
    let node = root;
    while (!node.isFinal) {
        //debugger;
        //window[node.nodeID].classList.add("current");
        if (node.isDiscrete) {
            node = node.branches.get(request[node.parameter]);
        } else {
            node = (request[node.parameter] < node.keyValue) ? node.branches.get("<") : node.branches.get(">=");
        }
        await sleep(500);
    }
    return node.class;
}

/* let sample = ["a"];
let sample = [[20, "a", "a"], [10, "b", "b"], [10, "c", "c"], [15, "b", "d"]]; !!! НЕ РАБОТАЕТ !!!
let sample = [["a", "a", "a", "a"], ["a", "b", "b", "b"], ["a", "c", "c", "c"], ["a", "b", "c", "d"]];
let sample = [["a", "a", "a", "a"], ["a", "a", "b", "b"], ["a", "b", "b", "b"], ["a", "c", "c", "c"], ["a", "b", "c", "d"]];
let sample = [["М", 14, 2, "УМЕР"], ["М", 14, 3, "УМЕР"], ["М", 5, 2, "ВЫЖИЛ"], ["М", 5, 3, "УМЕР"], ["Ж", 14, 2, "ВЫЖИЛ"], ["Ж", 14, 3, "ВЫЖИЛ"], ["Ж", 5, 2, "ВЫЖИЛ"], ["Ж", 5, 3, "ВЫЖИЛ"]] */

export function run(sample) {
    console.log(sample);
    parameterCount = sample[0].length - 1;
    
    classesSet = new Set();
    for (let i = 0; i < sample.length; i++) classesSet.add(sample[i][parameterCount]);
    classesCount = classesSet.size;
    
    root = new Node(sample, "Корень");
    console.dir(root);
    visualize(root, 0);
}

import {sleep} from '../general.js';