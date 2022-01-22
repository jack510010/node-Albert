const {Person, people} = require("./person"); 
// const people = require("./person");
const p1 = require("./person"); 
const Bill = new p1.Person("Bill", 26, "Taipei", "purple", "Japanese");
const myMom = new p1.people("Wendy", "Lee", 72, "Taipei", "brown")

console.log(Bill);
console.log(Bill.toString()); // 很納悶已經JSON.stringify，為何又要toString？？？？『JSON.stringify』不是已經把物件變成字串了嗎？  然後「JSON.parse()』是把字串變成物件對吧？

console.log("My mother's name is " + myMom.firstname + ".");
console.log("Her eyes color are " + myMom.eyeColor + ".");
console.log("She is " + myMom.age + " years old.");
// console.log(myMom.toString());