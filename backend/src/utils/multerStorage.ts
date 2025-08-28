import multer, { StorageEngine } from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;
    }
  }
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Create upload folder if not exists
const uploadDir = path.join(__dirname, "../public/avatars");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage engine
const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `avatar-${Date.now()}${ext}`);
  },
});

export const upload = multer({ storage });
