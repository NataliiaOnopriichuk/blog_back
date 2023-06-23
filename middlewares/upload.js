import { fileURLToPath } from "url";
import multer from "multer"
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tempDir = path.join(__dirname, '../', 'temp')
export const productsDir = path.join(__dirname, '../', 'public', 'products')

const multerConfig = multer.diskStorage({
  destination: tempDir,
filename: (_, file, cb) => {
  cb(null, file.originalname)
},
})


export const upload = multer({ storage: multerConfig })
