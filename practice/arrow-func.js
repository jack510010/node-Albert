const f1 = a => a * a;
const f3 = a => a * a * a;

// console.log(f1(7));
// console.log("1 ", __dirname);

//module.exports = f1; // 匯出
//module.exports = [f1, f3]; // 可以匯出array~~
module.exports = {f1, f3}; // 不過一般都是匯出object
