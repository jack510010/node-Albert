const db = require('./../modules/connect-mysql');


db.query("SELECT * FROM address_book LIMIT 3,2")
.then(([result, fields]) => {
    console.log(result);
    console.log(fields);
    process.exit();
})
.catch(ex => {
    console.log(ex);
})





/*
db.query("SELECT * FROM address_book LIMIT 5")    db.query() 裡面會有3個值『err, results, fields』
.then(arr => {     then() 裡面如果只有一個值的話會拿到一個array，因為 db.query() 裡面會有3個值『err, results, fields』
    
})
.catch(ex => {
    console.log(ex);
})

所以要改寫成
.then(([result, fields]) => {

})
.catch(ex => {
    console.log(ex);
})
*/
