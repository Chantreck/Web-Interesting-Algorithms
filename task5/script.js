var sample;

window.addEventListener("load", () => {
    window.enterSample.onclick = showSampleArea;
    window.backButton.onclick = () => location.href="../index.html";
})

function showSampleArea() {
    window.sampleBlock.style.display = "block";
    window.saveSample.onclick = saveSample;
}

function saveSample() {
    sample = normalizeData(window.sampleTextArea.value.split('\n').filter(str => str.length >= 1));
    console.dir(sample);
    window.sampleBlock.style.display = "none"; //перенести на нажатие "Сгенерировать дерево"
}

function normalizeData(strings) {
    let result = [];
    for (let string of strings) {
        result.push(string.split(','));
    }
    return result;
}