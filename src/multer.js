const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        const path1 = 'public/' + req.body.type + '/';

        cb(null, path1);
    },
    filename: (req, file, cb) => {                    
        const fileName = file.originalname.split(".")[0] + Math.round(Math.random() * 1E9)+ '.' + file.originalname.split(".")[1];
        cb(null, fileName);
    }
});

exports.upload = multer({storage: storage});