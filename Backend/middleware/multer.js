const multer = require('multer')
const path = require('path');

const upload = path.join(__dirname, 'uploads');

const upl = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,upload)
        },
        filename:function(req,file,cb){
            cb(null,file.fieldname+"-"+Date.now()+".jpg")
        }
    })
}).single('user_file');

module.exports = upl;




