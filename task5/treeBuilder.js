class Node {
    constructor(sampleSet) {
        this.sampleSet = sampleSet;
        this.parameter = this.selectParam();
    }

    selectParam() {
        let samples = this.sampleSet;
        let maxGain = -Infinity;
        let parameterIndex = -1;

        for (let curParameter = 0; curParameter < parameterCount; curParameter++) {
            let parameterValues = new Set();
            for (let i = 0; i < samples.length; i++) parameterValues.add(samples[i][curParameter]);
            let gain = calcEntropy(samples);
            for (let value of parameterValues) {
                let samplesWithCurParamValue = samples.filter(str => str[curParameter] == value);
                gain -= calcEntropy(samplesWithCurParamValue)
            }
            if (gain > maxGain) {
                maxGain = gain;
                parameterIndex = curParameter;
            }
        }
        return parameterIndex;
    }
}

function calcEntropy(samples) {
    let result = 0;
    for (let curClass of classesSet) {
        let samplesWithCurClass = samples.filter(str => str[parameterCount] == curClass).length;
        if (samplesWithCurClass) {
            result -= (samplesWithCurClass/samples.length)*Math.log(samplesWithCurClass/samples.length);
        }
    }
    return result;
}

let sample = [["a", "a", "a", "a"], ["a", "b", "b", "b"], ["a", "c", "c", "c"], ["a", "b", "c", "d"]];
var parameterCount = sample[0].length - 1;

var classesSet = new Set();
for (let i = 0; i < sample.length; i++) classesSet.add(sample[i][parameterCount]);
var classesCount = classesSet.size;

console.log(parameterCount, classesSet, classesCount);

let root = new Node(sample);

console.dir(root);