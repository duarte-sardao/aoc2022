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
      monkeys[id].items.push(BigInt(parseInt(line[i].replace(',',''))))
    }
  } else if(line[2] == "Operation:") {
    monkeys[id].op = line[6];
    if(line[7] != "old")
      monkeys[id].opval = BigInt(parseInt(line[7]));
  } else if(line[2] == "Test:") {
    monkeys[id].testval = BigInt(parseInt(line[5]));
  } else if(line[5] == "true:") {
    monkeys[id].true = parseInt(line[9]);
  } else if(line[5] == "false:") {
    monkeys[id].false = parseInt(line[9]);
  }
}

function monkeyBusiness(id, worried) {
  let monkey = monkeys[id];
  let its = monkey.items.length;
  for(let i = 0; i < its; i++) {
    monkey.inspections++;
    let item = monkey.items.shift();
    let opval = monkey.opval;
    if(opval == 0)
      opval = item;
    if(monkey.op == '+')
      item  = item + opval;
    else if(monkey.op == '*')
      item = item * opval;
    if(!worried)
      item = Math.floor(item/3);
    if(item % monkey.testval == 0)
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
    for(let i = 0; i < 10000; i++) {
      monkeyBusiness(0, true);
      console.log(i);
    }
    let vals = [];
    for(let i = 0; i < monkeys.length; i++) {
      vals.push(monkeys[i].inspections);
    }
    vals = vals.sort(function(a, b){return b - a});
    console.log(vals[0]*vals[1]);

  })();