const fs = require('fs');
const readline = require('readline');

var monkeys = [];

function handleLine(line, id){
  line = line.split(" ");
  if(line[0] == "Monkey") {
    let monkey = {
      items: [],
      op: '',
      opval: 0,
      testval: 0,
      true: 0,
      false: 0,
      inspections: 0
    }
    monkeys.push(monkey)
  } else if(line[2] == "Starting") {
    for(let i = 4; i < line.length; i++) {
      monkeys[id].items.push(parseInt(line[i].replace(',','')));
    }
  } else if(line[2] == "Operation:") {
    monkeys[id].op = line[6];
    if(line[7] != "old")
      monkeys[id].opval = parseInt(line[7]);
  } else if(line[2] == "Test:") {
    monkeys[id].testval = parseInt(line[5]);
  } else if(line[5] == "true:") {
    monkeys[id].true = parseInt(line[9]);
  } else if(line[5] == "false:") {
    monkeys[id].false = parseInt(line[9]);
  }
}

function expandItems() {
  for(let i = 0; i < monkeys.length; i++) {
    monkeys[i].items = monkeys[i].items.map( x => Array(monkeys.length).fill(x));
  }
}

function updateItems(items, monkey, worried) {
  for(let i = 0; i < items.length; i++) {
    let item = items[i];
    let opval = monkey.opval;
    if(opval == 0)
      opval = item;
    if(monkey.op == '+')
      item  = item + opval;
    else if(monkey.op == '*')
      item = item * opval;
    if(!worried)
      item = Math.floor(item/3);
    items[i] = item % monkeys[i].testval;
  }
  return items;
}

function monkeyBusiness(id, worried) {
  let monkey = monkeys[id];
  let its = monkey.items.length;
  for(let i = 0; i < its; i++) {
    monkey.inspections++;
    let item = monkey.items.shift();

    item = updateItems(item, monkey, worried);

    if(item[id] == 0)
      monkeys[monkey.true].items.push(item);
    else
      monkeys[monkey.false].items.push(item);
  }
  id++;
  if(id < monkeys.length) {
    monkeyBusiness(id, worried);
  }
}

void (async () => {

  let monkey = 0;

    const rl = readline.createInterface({
      input: fs.createReadStream('input.txt'),
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      if(line == "") {
        monkey++
      } else {
        handleLine(line, monkey)
      }
    });

    await new Promise((res) => rl.once('close', res));
    expandItems();
    //console.log(monkeys);
    for(let i = 0; i < 10000; i++) {
      monkeyBusiness(0, true);
    }
    let vals = [];
    for(let i = 0; i < monkeys.length; i++) {
      vals.push(monkeys[i].inspections);
    }
    //console.log(vals);
    vals = vals.sort(function(a, b){return b - a});
    console.log(vals[0]*vals[1]);

  })();