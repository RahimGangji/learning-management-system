const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "user_profiles",
        format: async (req, file) => "png",
        public_id: (req, file) => `user_${req.user.id}_${Date.now()}`,
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
