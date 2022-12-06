const fs = require('fs');
const readline = require('readline');

var rollingArray = [];


function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

function getStart(line, size) {
    for(let i = 0; i < line.length; i++) {
        rollingArray.push(line[i]);
        if(rollingArray.length > size) {
            rollingArray.shift();
            if(!hasDuplicates(rollingArray)) {
                return i+1;
            }
        }
    }
}


void (async () => {
    const rl = readline.createInterface({
      input: fs.createReadStream('input.txt'),
      crlfDelay: Infinity,
    });
  
    rl.on('line', (line) => {
        console.log(getStart(line, 14));
    });
  
    await new Promise((res) => rl.once('close', res));
  })();