export function buttonsActivity(state) {
    let buttons = document.getElementsByClassName("blockable");
    for (let button of buttons) {
        button.disabled = state;
    }
}

export const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export function showError(state, message) {
    window.error.style.display = state;
    window.errorMessage.innerText = message;
    if (state == "block") {
        setTimeout(() => showError("none"), 5000);
    }
}