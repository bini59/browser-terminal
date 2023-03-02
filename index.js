console.old = console.log;
console.log = (...args) => {
    console.old(...args);
    return args;
}


const run_code = (code) => {
    try { return new Function(code)(); }
    catch (e) { return e; }
}

let console_input = document.getElementById("console-input");
console_input.addEventListener("keypress", (e) => {
    if (e.key != "Enter") return;

    let text = e.target.value;
    if (text == "") return;
    if (text == "clear") return;
    let result = run_code(text);

})