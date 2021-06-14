const { UPLOAD_LIMIT } = require('config/vars');

const multer = require('multer');

const storage = multer.diskStorage({
    destination(req: Request, file: any, cb: any) {
      cb(null, 'uploads/tmp/');
    },
    filename(req: Request, file: any, cb: any) {
      console.log("aaaa");
      
      const fileName = file.originalname.split('.')[0];
      const fileExt = file.originalname.split('.')[1];
      cb(null, `${fileName}_${Date.now().toString()}.${fileExt}`);
    }
  });

  export const upload = multer({ storage, limits: { fieldSize: `${UPLOAD_LIMIT}MB` } });
