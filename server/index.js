import express from 'express'
import cors from 'cors'
import multer from 'multer'

const app = express()
const port = process.env.PORT || 4000

const upload = multer({
    dest: '/uploads'
})

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

})

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})