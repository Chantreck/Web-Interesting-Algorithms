var sample;
var control;
var tree;

window.addEventListener("load", () => {
    window.enterSample.onclick = () => window.sampleBlock.style.display = "block";
    window.saveSample.onclick = save;
    window.clearSample.onclick = () => {
        window.sampleTextArea.value = "";
        save();
    }
    window.sampleTextArea.value = "";
    window.closeSampleBlock.onclick = () => window.sampleBlock.style.display = "none";

    window.makeTree.onclick = makeTree;
    window.shortenTree.onclick = () => runControlSet(control, tree);
    window.clearField.onclick = clearField;

    window.getResult.onclick = obtainRequest;
    
    window.backButton.onclick = () => location.href="../index.html";
})

function clearField() {
    window.fieldContainer.innerHTML = `<ul class = "tree" id = "0"></ul>`;
    window.field.style.display = "none";
    window.requestTextArea.disabled = true;
    window.getResult.disabled = true;
    window.shortenTree.disabled = true;
}

function save() {
    sample = normalizeData(window.sampleTextArea.value.split('\n').filter(str => str.length >= 1));
    let sampleSize = Math.round(sample.length * 0.7);
    let controlSize = sample.length - sampleSize;
    control = sample.splice(sampleSize, controlSize);
    console.log(sample, control);
}

function normalizeData(strings) {
    let result = [];
    for (let string of strings) {
        let resultString = [];
        for (let value of string.split(',')) {
            if (value == "") {
                showError("block", "Кажется, произошла утечка", "Какие-то из примеров содержат пустые значения. Такие данные не могут быть обработаны");
                return;
            }
            if (parseFloat(value) == value) resultString.push(+value);
            else resultString.push(value);
        }
        result.push(resultString);
    }
    return result;
}

async function makeTree() {
    if (!sample || sample.length == 0) {
        showError("block", "Обучение не задалось", "Должно быть не меньше одного примера");
        return;
    }
    clearField();
    window.field.style.display = "block";

    tree = await run(sample);
    
    window.requestTextArea.disabled = false;
    window.getResult.disabled = false;
    window.shortenTree.disabled = false;
}

async function obtainRequest() {
    let request = normalizeRequest(window.requestTextArea.value.split(','));
    console.log(request);
    if (request[0] == "") {
        showError("block", "Вы что-то спросили?", "Введите корректный запрос");
        return;
    }
    if (sample[0].length > 1 && request.length != sample[0].length - 1) {
        showError("block", "Что-то не так с запросом", "Число параметров в запросе должно совпадать с числом параметров в обучающей выборке");
        return;
    }
    if (sample[0].length > 1 && !checkRequest(request)) {
        return;
    }

    buttonsActivity(true);
    window.requestTextArea.value = `Результат: ${await processRequest(request)}`;
    buttonsActivity(false);
}

function normalizeRequest(string) {
    let result = [];
    for (let value of string) {
        if (parseFloat(value) == value) result.push(+value);
        else result.push(value);
    }
    return result;
}

function checkRequest(request) {
    let valuesSet = getValuesSet();
    for (let i = 0; i < request.length; i++) {
        if (isNaN(request[i]) && !valuesSet[i].has(request[i])) {
            showError("block", "Что-то не так с запросом", "Вы ввели значения дискретных параметров, которых не было в обучающей выборке");
            return false;
        }
    }
    return true;
}

function getValuesSet() {
    let result = [];
    let paramCount = sample[0].length - 1;
    for (let i = 0; i < paramCount; i++) {
        result.push(new Set());
    }
    for (let string of sample) {
        for (let i = 0; i < paramCount; i++) {
            result[i].add(string[i]);
        }
    }
    return result;
}

import {run, processRequest} from './treeBuilder.js'
import {runControlSet} from './treeCutter.js'
import {buttonsActivity, showError} from '../general.js'