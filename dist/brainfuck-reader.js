'use strict';

var fs = require('fs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);

const storage = Array.from({ length: 30000 }, () => 0);
const loops = [];
let pointer = 0;
let nochar;
const inputFileName = process.argv[2];
if (inputFileName === undefined) {
    console.error('Please enter an input file name');
    process.exit(1);
}
function fromAscii(code) {
    return String.fromCharCode(code);
}
fs__default['default'].readFile(inputFileName, (err, data) => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.error(`no such file or directory: ${inputFileName}`);
        }
    }
    const chars = data.toString().split('');
    for (nochar = 1; nochar < chars.length + 1; ++nochar) {
        switch (chars[nochar - 1]) {
            case '>':
                pointer++;
                break;
            case '<':
                pointer--;
                break;
            case '+':
                storage[pointer]++;
                break;
            case '-':
                storage[pointer]--;
                break;
            case '[':
                loops.push(nochar);
                break;
            case ']':
                // eslint-disable-next-line no-case-declarations
                const startOfLoop = loops.splice(loops.length - 1)[0];
                if (storage[pointer] !== 0)
                    nochar = startOfLoop - 1;
                break;
            case '.':
                process.stdout.write(fromAscii(storage[pointer]));
                // console.log(storage[pointer])
                break;
        }
    }
});
