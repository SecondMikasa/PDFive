import express from 'express'
import cors from 'cors'
import multer from 'multer'
import fs from 'fs'

const app = express()
const port = process.env.PORT || 4000

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)

        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true)
    }
    else {
        cb(new Error("File type not supported"), false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
})

const dir = './uploads'
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
}

app.use(cors())

app.get('/health', (req, res) => {
    res
        .json({
            success: true,
            message: "API is active"
        })
        .status(200)
})

app.post('/upload/pdf', upload.single('pdf'), (req, res) => {
    res
        .json({
            message: 'File uploaded successfully',
            file: req.file
        })
        .status(200)
})

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})