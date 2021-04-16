var weightsMatrix = [];
var biasesMatrix = [];

export function run(values) {
    /* let matrixA = math.matrix([[2, 3, 4], [5, 6, 7]]);
    let matrixB = math.matrix([[1], [2], [3]]);
    console.log(matrixA, matrixB);
    console.log(math.multiply(matrixA, matrixB)); */

    readCoeffiecients();
    let input = scaleTable(values);
    console.log(input);
    let result = feed_forward(input);
    window.result.innerText = result;
}

function readCoeffiecients() {
    for (let i = 0; i < 2; i++) {
        weightsMatrix[i] = math.matrix(weights[i]);
        biasesMatrix[i] = math.matrix(biases[i]);
    }
}

function scaleTable(values) {
    let vector = [];
    for (let i = 0; i < 784; i++) {
        vector[i] = []
        vector[i][0] = values[i];
    }
    vector = math.matrix(vector);
    return math.column(vector, 0);
}

/* function scaleTable(values) {
    let scaled = [];
    for (let i = 0; i < 28; i++) {
        scaled[i] = [];
        for (let j = 0; j < 28; j++) {
            scaled[i][j] = 0;
        }
    }
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            scaled[i + 4][j + 4] = +values[math.floor(i / 4)][math.floor(j / 4)];
        }
    }
    for (let i = 1; i <= 28; i++) {
        scaled[i - 1] = [];
        for (let j = 1; j <= 28; j++) {
            scaled[i - 1][j - 1] = +values[math.floor(i / 6)][math.floor(j / 6)];
        }
    } 
    let vector = [];
    for (let i = 0; i < 784; i++) {
        vector[i] = []
        vector[i][0] = scaled[math.floor(i / 28)][i % 28];
    }
    vector = math.matrix(vector);
    return math.column(vector, 0);
} */

function feed_forward(value) {
    let hiddenLayer = sigmoid(math.add(math.multiply(weightsMatrix[0], value), biasesMatrix[0]));
    let output = sigmoid(math.add(math.multiply(weightsMatrix[1], hiddenLayer), biasesMatrix[1]));
    let maxArg = -Infinity;
    let number = -1;
    console.log("-----");
    for (let i = 0; i < 10; i++) {
        console.log(`${i}: ${output._data[i][0]}`);
        if (output._data[i][0] > maxArg) {
            maxArg = output._data[i][0];
            number = i;
        }
    }
    return number;
}

function sigmoid(vector) {
    let exp = math.exp(math.multiply(vector, -1));
    let denominator = math.add(1.0, exp);
    let result = math.dotDivide(1, denominator);
    return result;
}

import { weights, biases } from './coefficients.js'