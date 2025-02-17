"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSpinner = startSpinner;
const process_1 = require("process");
function startSpinner(params) {
    const characters = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    const cursorEsc = {
        hide: '\u001B[?25l',
        show: '\u001B[?25h',
    };
    process_1.stdout.write(cursorEsc.hide);
    let i = 0;
    const timer = setInterval(function () {
        process_1.stdout.write('\r' + characters[i++] + ' ' + (params !== null && params !== void 0 ? params : ' '));
        i = i >= characters.length ? 0 : i;
    }, 150);
    return () => {
        clearInterval(timer);
        process_1.stdout.write('\r');
        process_1.stdout.write(cursorEsc.show);
        process_1.stdout.write('\n');
    };
}
