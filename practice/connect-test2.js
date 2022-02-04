const db = require('./../modules/connect-mysql');


db.query("SELECT * FROM address_book LIMIT 3,2")
.then(([r]) => {
    console.log(r);
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
.then(([r]) => {

})
.catch(ex => {
    console.log(ex);
})
*/
