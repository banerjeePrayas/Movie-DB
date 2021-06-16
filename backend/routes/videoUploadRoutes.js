  
import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

// SET STORAGE
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'videoUploads/')
  },
  filename: function(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  }
})

function checkFileType(file, cb) {
  const filetypes = /mp4|gif|mkv/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
})

router.post('/', upload.single('video'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router