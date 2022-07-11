import fs from 'fs'

const storage = Array.from({ length: 30000 }, () => 0)
const loops: number[] = []
let pointer = 0
let noline: number
let nochar: number

const inputFileName = process.argv[2]
if (inputFileName === undefined) {
  console.error('Please enter an input file name')
  process.exit(1)
}

function fromAscii (code: number) {
  return String.fromCharCode(code)
}

// eslint-disable-next-line no-unused-vars
function toAscii (text: string) {
  return text
    .split('')
    .map(char => char.charCodeAt(0))
}

// eslint-disable-next-line no-unused-vars
function logError (message: string) {
  console.error(`Error ${inputFileName}:${noline}:${nochar} ${message}`)
}

fs.readFile(inputFileName, (err, data) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error(`no such file or directory: ${inputFileName}`)
    }
  }
  const chars = data.toString().split('')
  noline = 1
  for (nochar = 1; nochar < chars.length + 1; ++nochar) {
    switch (chars[nochar - 1]) {
      case '>':
        pointer++
        break

      case '<':
        pointer--
        break

      case '+':
        storage[pointer]++
        break

      case '-':
        storage[pointer]--
        break

      case '[':
        loops.push(nochar)
        break

      case ']':
        // eslint-disable-next-line no-case-declarations
        const startOfLoop = loops.splice(loops.length - 1)[0]
        if (storage[pointer] !== 0) nochar = startOfLoop - 1
        break

      case '.':
        process.stdout.write(fromAscii(storage[pointer]))
        // console.log(storage[pointer])
        break

      case ',':
        break

      default:
        break
    }
  }
})
