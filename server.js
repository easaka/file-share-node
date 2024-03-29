require("dotenv").config()
const multer = require("multer")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const express = require("express")
const app = express()
const file = require("./Models/file")

mongoose.connect(process.env.DATABASE_URL)

const uploads = multer({dest: "uploads"})

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))

app.get('/',(req,res)=>{
    res.render("index")
})

app.post('/upload', uploads.single("file"),async (req,res)=>{
    const fileData = {
        path:req.file.path,
        originalName: req.file.originalname
    }
    if (req.body.password !== null && req.body.password!==""){
        fileData.password = await bcrypt.hash(req.body.password,10)
    }
    const File = await file.create(fileData)
    console.log(File);
    res.render('index', {fileLink: `${req.headers.origin}/file/${File.id}`})
})

app.route('/file/:id').get(handleDownload).post(handleDownload)

async function handleDownload(req,res) {
    const File = await file.findById(req.params.id)
    File.downloadCount++

    await File.save()
    console.log(File.downloadCount);

    if (File.password != null){
        if(req.body.password == null){
            res.render("password")
            return
        }
    }

    if (!(await bcrypt.compare(req.body.password, File.password))) {
        res.render("password", {error: true})
        return
    }


    res.download(File.path, File.originalName)
}

app.listen(process.env.PORT)
