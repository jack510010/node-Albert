const {f1, f3} = require("./arrow-func");  // 因為現在匯出的f1是用{}包起來的，他是一個物件不能用 const = f1 來寫

const f2 = require(__dirname + "/arrow-func"); // 如果我現在想要使用f2或者新變數的話，f2就會變成{f1, f3}


console.log(f1(9));
console.log(f3(10));

console.log(f2.f1(5)); // 如果我現在想要使用f2或者新變數的話，就要這樣子寫
console.log(f2.f3(5)); // 如果我現在想要使用f2或者新變數的話，就要這樣子寫
