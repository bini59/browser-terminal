console.old = console.log;
console.log = (...args) => {
    console.old(...args);
    return args;
}


const run_code = (code) => {
    try { return new Function(code)(); }
    catch (e) { return e; }
}

