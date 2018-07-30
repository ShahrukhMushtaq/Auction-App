var express = require('express');
var router = express.Router();
var main = require('./controllers/main');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './auction-front/src/assets/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

/* Registering All the routes */
router.get('/profile', main.me);
router.get('/users', main.home);
router.post('/login', main.login);
router.post('/signup', upload.single('userImage'), main.signup);
router.get('/logout', main.logout);

router.post('/addauction', (req , res) =>{
    res.send("true");
    console.log("Run");
});

/****/
//
module.exports = router;