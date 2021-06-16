// https://siddharthac6.medium.com/creating-node-js-rest-apis-for-aws-s3-upload-list-and-delete-files-608cc3569c0b

import express from "express"
import multer from "multer"
import AWS from "aws-sdk"
import { v4 as uuidv4  } from "uuid"
const router = express.Router()

const s3 = new AWS.S3({
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    }
})

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({storage}).single('image')

router.post('/',upload,(req, res) => {

    let myFile = req.file.originalname.split(".")
    const fileType = myFile[myFile.length - 1]

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuidv4()}.${fileType}`,
        Body: req.file.buffer
    }

    s3.upload(params, (error, data) => {
        if(error){
            res.status(500).send(error)
        }

        res.status(200).send(data)
    })
})

export default router
