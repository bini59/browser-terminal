console.old = console.log;
console.log = (...args) => {
    console.old(...args);
    return args;
}


const run_code = (code) => {
    try {return new Function("return "+ code)();}
    catch (e) { return e; }
}

const log_result = (input, result, err=false) => {

    // set result
    let result_div = document.createElement("div");
    result_div.setAttribute("class", "console-result-div");
    result_div.innerHTML = `<span>${result}</br></br>`;

    // set input
    let input_div = document.createElement("div");
    input_div.setAttribute("class", "console-input-div");
    input_div.innerHTML = `
        <span class="term-arrow" readonly="true">➜</span> <span class="term-tilde">~</span> 
        <div id="console-input" style="color:${(err ? "#ff625e" : "#05ba25")};font-weight:bold;">${input}</br></div>
    `

    let log = document.createElement("div");
    log.setAttribute("class", "console-log");
    log.appendChild(input_div);
    log.appendChild(result_div);

    let shell = document.getElementsByClassName("console-res")[0];
    shell.appendChild(log)
}

const clear_shell = () => {
    document.getElementsByClassName("console-res")[0].innerHTML = ""
}

let console_input_wrapper = document.getElementsByClassName("console")[0];
console_input_wrapper.addEventListener("click", () => {
    document.getElementById("console-input").focus();
})

let console_input = document.getElementById("console-input");
console_input.addEventListener("keypress", (e) => {
    if (e.key == "backspace") console.old("asdf");
    if (e.key != "Enter") return;

    e.preventDefault()

    let text = e.target.innerText;
    console.old(text)
    if (text == "") return;
    if (text == "clear") { clear_shell(); e.target.value = ""; return; }
    let result = run_code(text);
    log_result(text, result, (result instanceof Error ? true : false));
    e.target.innerText = ""

})