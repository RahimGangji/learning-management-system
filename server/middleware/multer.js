// middleware/multer.js
const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const isImage = file.mimetype.startsWith("image/");
        const isVideo = file.mimetype.startsWith("video/");
        if (isImage || isVideo) {
            cb(null, true);
        } else {
            cb(new Error("Only images or videos are allowed"), false);
        }
    },
});

module.exports = upload;
