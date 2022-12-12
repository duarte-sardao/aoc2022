const fs = require('fs');
const readline = require('readline');

var grid = [];
var nodes = {};

function code(x,y) {
  return String(x)+"_"+String(y);
}

function handleLine(line){
  let arr = [];
  let val = -1;
  for(const char in line) {
    const ch = line[char]
    if(ch == "S") {
      arr.push(0);
      val = char;
    } else if(ch == "E")
      arr.push(-1);
    else
      arr.push(ch.charCodeAt()-97);
  }
  grid.push(arr);
  return val;
}

function buildnodes(x,y) {
  const cod = code(x,y);
  if(x < 0 || y < 0 || x >= grid[0].length || y >= grid.length || nodes[cod] != null) //why do i need this last check??? it loops when its big not when small!
    return;
  let node = {
    children: [],
    visited: false,
    value: grid[y][x],
    x: x,
    y: y,
    target: false
  }
  if(node.value == -1) {
    node.value = 25;
    node.target = true;
  }
  nodes[cod] = node;
  buildnodes(x+1,y);
  buildnodes(x,y+1);
}

function buildgraph() {

  buildnodes(0,0);
  console.log("Built nodes");
  for(const n in nodes) {
    let node = nodes[n];
    const x = node.x;
    const y = node.y;
    let possChildren = [code(x+1,y),code(x-1,y),code(x,y+1),code(x,y-1)];
    for(let i = 0; i < 4; i++) {
      let possChild = nodes[possChildren[i]];
      if(possChild != null && (possChild.value - node.value) < 2)
        node.children.push(possChildren[i]);
    }
  }
}

function bfs(moves) {
  while(moves.length > 0) {
    const move = moves.shift();
    const code = move[0];
    const dist = move[1];
    if(nodes[code].target)
      return dist;
    for(const node in nodes[code].children) {
      let child = nodes[code].children[node];
      if(!nodes[child].visited) {
        nodes[child].visited = true;
        moves.push([child, dist+1]);
      }
    }
  }
  return Number.MAX_SAFE_INTEGER;
}

function reset() {
  for(const n in nodes) {
    nodes[n].visited = false;
  }
}

function findBestHike() {
  let options = [];
  for(const n in nodes) {
    if(nodes[n].value == 0) {
      options.push(code(nodes[n].x, nodes[n].y));
    }
  }
  let min = Number.MAX_SAFE_INTEGER;
  while(options.length > 0) {
    reset();
    const start = options.shift();
    nodes[start].visited = true;
    let res = bfs([[start,0]]);
    if(res < min) {
      min = res;
    }
  }
  return min;
}

void (async () => {
    let pos = 0;
    let starter = "";
    const rl = readline.createInterface({
      input: fs.createReadStream('input.txt'),
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      const pos2 = handleLine(line) 
      if(pos2 != -1)
        starter = code(pos2, pos);
      pos++;
    });

    await new Promise((res) => rl.once('close', res));

    buildgraph();
    nodes[starter].visited = true;
    let res = bfs([[starter,0]])
    console.log(res);
    res = findBestHike();
    console.log(res);

  })();