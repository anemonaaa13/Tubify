const express= require('express');
const dotenv=require('dotenv');
const cors = require('cors');
const path=require('path');
const multer=require('multer');
mongoose = require('mongoose');

const app= express();
const port = process.env.PORT || 3000;

const uploadPath = path.join(__dirname, 'uploads'); // __dirname reprezintă directorul curent al fișierului index.js
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Permite cereri doar de la acest domeniu
    methods: ['GET', 'POST'], // Permite doar metodele GET și POST
    allowedHeaders: ['Content-Type'] // Permite antetele corespunzătoare
}));

// Verifică dacă folderul uploads există, altfel îl creează
const fs = require('fs');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

mongoose.connect('mongodb://localhost:27017/Upload',)
.then(() => {
    console.log('Conectat la MongoDB');
}).catch(err => {
    console.error('Eroare la conectarea la MongoDB:',err);
});

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+path.extname(file.originalname));
    }
});

const upload= multer({storage});

const uploadRoutes = require('./routes/uploadRoutes');

app.use('/upload',uploadRoutes);

app.listen(port, () => {

    console.log(`Serverul ruleaza pe portul ${port}`);
});
