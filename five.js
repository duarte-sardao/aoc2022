const fs = require('fs');
const readline = require('readline');

var crateReading = true;
var arrayObj = []
var arraySize = 0;
var intToPos = {};
var cratesToRead = [];

function addCrates(line) {
    console.log(line);
    for(let i = 0; i < arraySize; i++) {
        let c = line[intToPos[i]];
        if(c==" ")
            continue;
        console.log("adding " + c + " to " + i);
        arrayObj[i].unshift(c);
    }
}

function moveCrate(line, version=9000) {
    if(line == "")
        return;
    let numbers = line.match(/\d+/g);
    numbers[1]--;
    numbers[2]--;
    let popped = arrayObj[numbers[1]].splice(-numbers[0], numbers[0]);
    if(version == 9000)
        arrayObj[numbers[2]].push(...popped.reverse());
    else if(version == 9001)
        arrayObj[numbers[2]].push(...popped);
}

function readCrate(line) {
    const c = line[1];
    if(c == '1') {
        crateReading = false;
        for(let i = 0; i < line.length; i++) {
            const p = line[i];
            if(p != ' ') {
                intToPos[parseInt(p)-1] = i;
                arraySize = parseInt(p);
                arrayObj.push([]);
            }
        }
        for(let i = 0; i < cratesToRead.length; i++) {
            addCrates(cratesToRead[i]);
        }
    } else {
        cratesToRead.push(line);
    }
}


void (async () => {
    const rl = readline.createInterface({
      input: fs.createReadStream('input.txt'),
      crlfDelay: Infinity,
    });
  
    rl.on('line', (line) => {
      if(crateReading) {
        readCrate(line);
      } else {
        moveCrate(line,9001);
      }
    });
  
    await new Promise((res) => rl.once('close', res));
  
    for(let i = 0; i < arraySize; i++) {
        const n = arrayObj[i].pop();
        process.stdout.write(n);
    }
  })();