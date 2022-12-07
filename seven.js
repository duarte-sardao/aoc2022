const fs = require('fs');
const readline = require('readline');

var stack = [];
var stString = "";
var dirFiles = {};

function stackString() {
  var st = "";
  for(let i = 0; i < stack.length; i++) {
    st = st + stack[i] + "/";
  }
  return st;
}

function handleLine(line) {
  const arr = line.split(" ");
  if(arr[0]=="$" && arr[1] == "cd") {
    if(arr[2] == "..") {
      stack.pop();
      prevString = stString;
      stString = stackString();
      dirFiles[stString] += dirFiles[prevString]; //lets hope they dont go into a place more than once lol
    } else {
      stack.push(arr[2]);
      stString = stackString();
      dirFiles[stString] = 0;
    }
  } else if(arr[0] != "$" && arr[0] != "dir") {
    dirFiles[stString] += parseInt(arr[0]);
  }
}

void (async () => {
    const rl = readline.createInterface({
      input: fs.createReadStream('input.txt'),
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
        handleLine(line);
    });

    await new Promise((res) => rl.once('close', res));

    while(stack.length > 0) {
      handleLine("$ cd ..");
    }

    let sum = 0;
    let smallestYet = dirFiles["//"];
    let neededSpace = 30000000-(70000000-smallestYet);
    //console.log(neededSpace);
    for(key in dirFiles) {
      const val = dirFiles[key]
      if(val <= 100000) {
        sum += val;
      }
      if(val >= neededSpace && val < smallestYet) {
        smallestYet = val;
      }
    }

    //console.log(dirFiles);
    console.log(sum);
    console.log(smallestYet);
  })();