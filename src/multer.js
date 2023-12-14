const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        
        //const type = req.body.get('type')[0];
        const path1 = 'public/newProduct/';
        cb(null, path1);
    },
    filename: (req, file, cb) => {                    
        const fileName = file.originalname.split(".")[0] + Math.round(Math.random() * 1E9)+ '.' + file.originalname.split(".")[1];
        cb(null, fileName);
    }
});

exports.upload = multer({storage: storage});