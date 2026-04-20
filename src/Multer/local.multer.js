 import multer from "multer";
// import path from "node:path";
// import fs from "node:fs";


// export const localFileUploader = ({customPath = "general"})=>{
//     const basePath = `public/uploads/${customPath}`;

//     const storage = multer.diskStorage({
//         destination:(req , file, cb)=>{
//             let userBasePath = basePath;
//             if(req.user?._id){
//                 userBasePath += `/${req.user._id}`;
//             }
//             const fullPath = path.resolve(`/public/uploads${userBasePath}`);
//             if(!fs.existsSync(fullPath)){
//                 fs.mkdirSync(fullPath, { recursive: true });
//             }
//             cb(null, fullPath);
//         },
//         filename:(req , file, cb)=>{
//             const uniqueFileName = Date.now() + '-' + Math.round(Math.random() * 1E9) +'-' + file.originalname  ;
//             file.finalFilePath = `${basePath}/${req.user._id}/${uniqueFileName}`;
//             cb(null, uniqueFileName);
//         }
//     });
//     return multer({ storage }); // MIDDLEWARE
// }import multer from "multer";
import path from "node:path";
import fs from "node:fs";

export const localFileUploader = ({ customPath = "general" }) => {
    const basePath = `public/uploads/${customPath}`;

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            let userBasePath = basePath;
            if (req.user?._id) {
                userBasePath += `/${req.user._id}`;
            }

            // ✅ Fix 1: resolve from userBasePath directly, not a duplicated prefix
            const fullPath = path.resolve(userBasePath);
            if (!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath, { recursive: true });
            }
            cb(null, fullPath);
        },
        filename: (req, file, cb) => {
            const uniqueFileName =
                Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + file.originalname;

            // ✅ Fix 2: mirror the same conditional used in destination
            const userSegment = req.user?._id ? `/${req.user._id}` : "";
            file.finalFilePath = `${basePath}${userSegment}/${uniqueFileName}`;

            cb(null, uniqueFileName);
        },
    });

    return multer({ storage }); // MIDDLEWARE
};