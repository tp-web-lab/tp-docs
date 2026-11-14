// Build a greeting without modifying the page.
function greet(name) {
  return `Hello, ${name}!`;
}

const participants = ["Ada", "Grace", "Linus"];
const greetings = participants.map(greet);
console.log(greetings.join("\n"));
