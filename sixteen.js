const fs = require('fs');
const readline = require('readline');

var nodes = {};

function code(x,y) {
  return String(x)+"_"+String(y);
}

function handleLine(line){

}

function dfs(node, time, flow) {
  nodes[node].visited = true; //this wont work we might need to check still
  if(time <= 0) //i get thats its a flow thing but i dont really care enough to learn
    return flow;//graphs just bore me
  flow += nodes[node].flow * time;
  let max = 0;
  for(let i = 0; i < nodes[node].children.length; i++) {
    const chi = nodes[node].children[i];
    if(nodes[chi].visited)
      continue;
  }
}

function reset() {
  for(const n in nodes) {
    nodes[n].visited = false;
  }
}

void (async () => {
    const rl = readline.createInterface({
      input: fs.createReadStream('input.txt'),
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      handleLine(line) 
    });

    await new Promise((res) => rl.once('close', res));

  })();
