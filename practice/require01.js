const {f1, f3} = require("./arrow-func");  // 因為現在匯出的f1是用{}包起來的，他是一個物件不能用 const = f1 來寫
//const f2 = require(__dirname + "/arrow-func"); 


console.log(f1(9));
console.log(f3(10));
console.log("2 ", __dirname);

