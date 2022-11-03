// const multer = require('multer');

// const MIME_TYPES ={
//     'image/jpg':'jpg',
//     'image/jpeg':'jpg',
//     'image/png':'png'
// }
 

// const storage = multer.diskStorage({

//     destination: (req, file, callback) =>{
//         callback(null, './image')
//     },
    
//     filename: (req, file, callback) =>{
//         const name = file.originalname.split(' ').join('_');
//         const extension = MIME_TYPES[file.mimetype];
//         callback(null, name + Date.now() + '.' + extension);
//     }
// });

// module.exports = multer({storage}).single('image');

// // const multer = require('multer') 
// // // import multer from 'multer';
// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, './image');
// //     },
// //     filename: (req, file, cb) => {
// //         cb(null, Date.now() + "-" + file.originalname);
// //     }
// // });

// // const upload = multer({ storage: storage });

// // const imageUpload = upload.single('image'); // this is the name of the field in the form

// // module.exports = { imageUpload };
 