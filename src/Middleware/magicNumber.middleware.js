import fs from "node:fs";

const MAGIC_NUMBERS = {
    "image/jpeg": [[0xFF, 0xD8, 0xFF]],
    "image/png":  [[0x89, 0x50, 0x4E, 0x47]],
    "image/webp": [[0x52, 0x49, 0x46, 0x46]],
    "image/gif":  [[0x47, 0x49, 0x46, 0x38]],
};

export const validateMagicNumber = (req, res, next) => {
    if (!req.file) throw BadRequestError({ message: "File is required" });

    // ✅ نقرأ أول 4 bytes من الـ file على الـ disk
    const buffer = Buffer.alloc(4);
    const fd = fs.openSync(req.file.path, "r");
    fs.readSync(fd, buffer, 0, 4, 0);
    fs.closeSync(fd);

    const allowedSignatures = MAGIC_NUMBERS[req.file.mimetype];
    if (!allowedSignatures) {
        fs.unlinkSync(req.file.path); // 🧹 امسح الـ file
        throw BadRequestError({ message: "File type not allowed" });
    }

    const isValid = allowedSignatures.some(signature =>
        signature.every((byte, index) => buffer[index] === byte)
    );

    if (!isValid) {
        fs.unlinkSync(req.file.path); // 🧹 امسح الـ file لو مش valid
        throw BadRequestError({ message: "File content does not match its extension" });
    }

    next();
};