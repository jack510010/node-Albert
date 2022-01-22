const f1 = require("./arrow-func");  // 「.」就是目前所在的資料夾
const f2 = require(__dirname + "/arrow-func"); // 也可以改成這樣寫。
//* 第一次的require會去"./arrow-func" 找叫做f1的變數，因為我在"require01.js"這隻檔案用了f1個變數。
//! 特別注意！第一次require 跟 第二次require不同
//! 第二次require會先去檢查這隻檔案「先前」有沒有require過， 如果有的話會參照他然後設定給「新的變數」。
//! 所以不會發生說require執行了兩次這件事。

console.log(f1(9));
console.log(f2(10));
console.log("2 ", __dirname);
console.log(f1 === f2); // 會得到true
