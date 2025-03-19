const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        let folder = "user_profiles";
        let publicIdPrefix = `user_${req.user?.id || Date.now()}`;

        if (req.originalUrl.includes("/api/courses")) {
            folder = "course_images";
            publicIdPrefix = `course_${req.params.id || Date.now()}`;
        }

        return {
            folder,
            format: req.originalUrl.includes("/api/courses") ? "jpg" : "png",
            public_id: `${publicIdPrefix}_${Date.now()}`,
        };
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
