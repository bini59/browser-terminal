console.old = console.log;
console.log = (...args) => {
    console.old(...args);
    return args;
}


const run_code = (code) => {
    try { return new Function(code)(); }
    catch (e) { return e; }
}

const log_result = (input, result) => {

    // set result
    let result_div = document.createElement("div");
    result_div.setAttribute("class", "console result");
    result_div.innerText = result;

    // set input
    let input_div = document.createElement("div");
    input_div.setAttribute("class", "console input");
    input_div.innerHTML = `
        <span class="console icon"></span>
        <span class="console input-text">${input}</span>
        <span class="console time"></span>
    `

    let log = document.createElement("div");
    log.setAttribute("class", "console log");
    log.appendChild(result_div);
    log.appendChild(input_div);

    let shell = document.getElementsByClassName("console-res")[0];
    shell.appendChild(log)
}

const clear_shell = () => {
    document.getElementsByClassName("console-res")[0].innerHTML = ""
}

let console_input = document.getElementById("console-input");
console_input.addEventListener("keypress", (e) => {
    if (e.key != "Enter") return;

    let text = e.target.value;
    if (text == "") return;
    if (text == "clear") { clear_shell(); e.target.value = ""; return; }
    let result = run_code(text);
    log_result(text, result);
    e.target.value = ""

})