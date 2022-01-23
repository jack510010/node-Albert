const {
    error
} = require('console');
const fs = require('fs');

const data = {
    name: "David",
    age: 25
};

fs.writeFile(  
    __dirname + '/data.json',  // 加了__dirname 就是說我要把檔案寫入到所在資料夾。
    JSON.stringify(data, null, 3),  
    error => {  
        if (error) {
            console.log('無法寫入檔案：', error);
            process.exit(); // 結束程式
        }
        console.log('寫入成功');
    });