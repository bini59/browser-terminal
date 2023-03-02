console.old = console.log;
console.log = (...args) => {
    console.old(...args);
    return args;
}