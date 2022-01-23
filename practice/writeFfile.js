const {
    error
} = require('console');
const fs = require('fs');

const data = {
    name: "David",
    age: 25
};

fs.writeFile(  // 會有3個值要輸入
    'data.json',  // 1st 檔名.副檔名
    JSON.stringify(data, null, 3),  // 2nd 要寫入的東西
    error => {  // 3rd  一個func 『可以是callback、error、normal』
        if (error) {
            console.log('無法寫入檔案：', error);
            process.exit(); // 結束程式
        }
        console.log('寫入成功');
    });