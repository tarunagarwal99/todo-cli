const fs = require("fs");
//help text
let usageString = `Usage :-
$ ./todo add "todo item"  # Add a new todo
$ ./todo ls               # Show remaining todos
$ ./todo del NUMBER       # Delete a todo
$ ./todo done NUMBER      # Complete a todo
$ ./todo help             # Show usage
$ ./todo report           # Statistics`;

let path = "todoData.json";

// reload state on entry
let todoData = [];

fs.readFile(path, (err, data) => {
  if (err) {
    //   console.error(err)
    return;
  }
  console.log("this", JSON.parse(data));
  todoData = JSON.parse(data);
});

console.log(todoData.length);
console.log(todoData);
const completed = [];
const remaining = [];

if (todoData.length > 0) {
  completed = todoData.filter((todo) => todo.done === true);
  remaining = todoData.filter((todo) => todo.done === false);
}

function add(incomingText) {
  todoData.push({ name: incomingText, done: false });
  return `Added todo: "${incomingText}"`;
}
function ls() {
  remaining.forEach((todo, index) => {
    console.log(`[${index + 1}] ${todo.name}`);
  });
}
function del(num) {
  let dataIndex = todoData.findIndex(
    (todo) => todo.name == remaining[num - 1].name
  );
  todoData = todoData.filter((todo, index) => index != dataIndex);
  return `Deleted todo #${num}`;
}
function done(num) {
  let dataIndex = todoData.findIndex(
    (todo) => todo.name == remaining[num - 1].name
  );
  todoData[dataIndex].done = true;
  return `Marked todo #${num} as done`;
}
function report() {
  return `Pending: ${remaining.length} Completed: ${completed.length}`;
}

if (process.argv[2]) {
  switch (process.argv[2]) {
    case "help":
      console.log(usageString);
      break;
    case "report":
      console.log(report());
      break;
    case "ls":
      ls();
      break;
    case "add":
      if (process.argv[3]) console.log(add(process.argv[3]));
      else console.log("Sorry you made a mistake please check\n" + usageString);
      break;
    case "done":
      if (process.argv[3]) console.log(done(process.argv[3]));
      else console.log("Sorry you made a mistake please check\n" + usageString);
      break;
    case "del":
      if (process.argv[3]) console.log(del(process.argv[3]));
      else console.log("Sorry you made a mistake please check\n" + usageString);
      break;
    default:
      console.log("Sorry you made a mistake please check\n" + usageString);
      break;
  }
} else {
  console.log(usageString);
}

// console.log(todoData);
// save state on exit
// fs.writeFile(path, JSON.stringify(todoData), (err) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//   })
