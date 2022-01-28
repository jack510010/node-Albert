const multer = require('multer');
const {v4: uuidv4} = require('uuid');

const extMap = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
};

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, __dirname + '/../public/img')
    },
    filename: (req, file, cb)=>{
        cb(null, uuidv4() + extMap[file.mimetype]);
    },
})

const fileFilter = (req, file, cb) => {    // cb就是callback func
    cb(null, !!extMap[file.mimetype]);  // 『!!extMap[file.mimetype]』變成布林值
};    // 這裡要決定是true or false， 有對應到就是我要的檔案，沒有對應到就是undefined


module.exports = multer({storage, fileFilter}); // 匯出
// 這個檔案是我要的才會去進行儲存的動作。沒有對應到就不會過關了，被filter掉了被過濾掉了