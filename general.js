export function buttonsActivity(state) {
    let buttons = document.getElementsByClassName("blockable");
    for (let button of buttons) {
        button.disabled = state;
    }
}

export const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export function showError(state = "block", title = "Ошибка!", message = "Что-то пошло не так") {
    window.error.style.display = state;
    window.errorTitle.innerText = title;
    window.errorMessage.innerText = message;
    if (state == "block") {
        setTimeout(() => showError("none"), 5000);
    }
}