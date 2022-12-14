const fs = require('fs');
const readline = require('readline');

var arr = [];
var linep = 0;
var last = null;
var verticals = [[]];

var seeables = 0;

function handleLine(line) {
  let lineArr = [];
  var pos = 0;

  const heights = Array.from(line).map(Number);
  
  if(last == null)
    last = heights.length-1;

  let maxHeightL = -1;
  let maxHeightR = -1;

  heights.forEach(function(h) {
    maxHeightR = Math.max(Math.max.apply(Math, heights.slice(pos+1, last+1)), -1);
    let max= h > maxHeightL || h > maxHeightR;
    if(max) {
      //if(pos != 0 && pos != last && linep != 0 && linep != last)
        //console.log(heights.slice(pos+1, last+1));
      seeables++;
    }
    let obj = {height:h, max:max};
    pos++;
    lineArr.push(obj);
    if(h>maxHeightL)
      maxHeightL = h;
  });
  arr.push(lineArr);
}

function verifyHeight() {
  //console.log("heights");
  for(let x = 1; x < last; x++) {
    var verticalArr = [];
    for(let y = 0; y <= last; y++) {
      verticalArr.push(arr[y][x].height)
    }
    verticals.push(verticalArr);
    let maxHeightL = -1;
    let maxHeightR = -1;
    for(let y = 0; y <= last; y++) {
      const obj = arr[y][x];
      maxHeightR = Math.max(Math.max.apply(Math, verticalArr.slice(y+1, last+1)),-1);
      if(!obj.max && (obj.height > maxHeightL || obj.height > maxHeightR)) {
        seeables++;
        //console.log(String(x) + " " + String(y));
      }
      if(obj.height > maxHeightL)
        maxHeightL = obj.height;
    }
  }
}

function viewing() {
  let res = [];
  let prevH = 0; let prevV = 0; let forH = 0; let forV = 0;
  for(let y = 1; y < last; y++) {
    for(let x = 1; x < last; x++) {
      const val = arr[y][x].height;

      prevH = (arr[y].slice(0, x).map(nnn => val <= nnn.height).reverse().findIndex(element => element)+1);
      prevV = (verticals[x].slice(0, y).map(nnn => val <= nnn).reverse().findIndex(element => element)+1);

      forH = arr[y].slice(x+1, last+1).map(nnn => val <= nnn.height).findIndex(element => element)+1;
      forV = verticals[x].slice(y+1, last+1).map(nnn => val <= nnn).findIndex(element => element)+1;
      if(forH == 0)
        forH = (last)-x;
      if(forV == 0)
        forV = (last)-y;
      if(prevH == 0)
        prevH = x;
      if(prevV == 0)
        prevV = y;
      console.log(val);
      console.log(String(prevH) + " " +String(prevV) + " " +String(forH) + " " +String(forV))
      res.push(prevH*prevV*forH*forV);
    }
  }
  return Math.max.apply(Math, res);
}


void (async () => {

    const rl = readline.createInterface({
      input: fs.createReadStream('input.txt'),
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
        handleLine(line);
        linep++;
    });

    await new Promise((res) => rl.once('close', res));

    verifyHeight();
    console.log(seeables);
    console.log(viewing());

  })();