const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const fs = require('fs');
const jimp = require('jimp')
var port = process.env.PORT || 5000;

//Multer configuration
const storage=multer.diskStorage({
    destination:path.join(__dirname,'/images/uploads'),
    filename:(req,file,cb)=>{
    cb(null,file.originalname)
}})

var app=express()

app.use(cors());
app.use(bodyParser.json())

app.use(multer({
    storage,
    dest:path.join(__dirname,'/images')
}).single('image'))

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

function sendImage (res,p) {
    var dir = path.join(__dirname, 'images/transform');
    var file = path.join(dir, p);
    if (file.indexOf(dir + path.sep) !== 0) {
        return res.status(403).end('Forbidden');
    }
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var s = fs.createReadStream(file);
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('close',function () {
        res.end()
        s.close()
        fs.unlinkSync(`images/transform/${p}`)
    })
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
}

app.post('/',(req,res)=>{
    if (req.file) {
        jimp.read(req.file.path)
        .then(function (image) {
            loadedImage = image;
            return jimp.loadFont(jimp.FONT_SANS_32_WHITE)
        })
        .then(async function (font) {
            let date= Date.now()
            await loadedImage.print(font, parseInt(10), parseInt(10),req.body.phrase).write(`images/transform/${date}${req.file.filename}`)
            fs.unlinkSync(`images/uploads/${req.file.filename}`)
            sendImage(res, `${date}${req.file.filename}` )
        })
        .catch(function (err) {
            console.log(err)
            res.sendStatus(400)
        })
    }else{
        res.sendStatus(400)
    }
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});