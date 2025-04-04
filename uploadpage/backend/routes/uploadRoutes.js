const express= require('express');
const router = express.Router();
const multer= require('multer');
const path=require('path');
const Video = require('../models/video');

const storage= multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'./uploads'); //merge?
    },
    filename: (req, file, cb) => {
        cb(null,Date.now()+path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'video') {
        // Filtrare pentru videoclipuri
        const allowedVideoTypes = /mp4|mov|avi/;
        const extname = allowedVideoTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedVideoTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true); 
        } else {
            return cb(new Error('Tip de fișier video neacceptat!'), false);
        }
    } else if (file.fieldname === 'thumbnail') {
        // Filtrare pentru imagini
        const allowedImageTypes = /jpg|jpeg|png/;
        const extname = allowedImageTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedImageTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true); 
        } else {
            return cb(new Error('Tip de fișier imagine neacceptat!'), false);
        }
    } else {
        return cb(new Error('Câmpul de fișier necunoscut!'), false);
    }
};

const upload = multer({storage, fileFilter});


router.post('/upload', upload.fields([{name: 'video'}, {name: 'thumbnail'}]), async(req,res) =>{
    try{
        console.log(req.files); 
        const { title, description, visibility} = req.body;

        if(!req.files['video'] || !req.files['thumbnail'])
        {
            return res.status(400).json({message: 'Lipseste videoclipul sau thumnailul'});
        }
    const videoPath = req.files['video'][0].path;
    const thumbnailPath = req.files['thumbnail'][0].path;

    //cream o noua intrare in baza de date

    const newVideo = new Video({
        title,
        description,
        visibility,
        filePath: videoPath,
        thumbnailPath
    });
    await newVideo.save();

    //succes
    res.status(200).json({ message: 'Videoclip incarcat cu succes!', video: newVideo });
} catch(error)
{
    console.error(error);
    res.status(500).json({message: 'Eroare la incarcarea videoclipului.'});
}
});

module.exports=router;