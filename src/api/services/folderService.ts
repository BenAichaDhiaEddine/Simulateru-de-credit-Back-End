
import {
    UPLOADS_DIRECTORY,
    UPLOADS_TMP_DIRECTORY,
} from '../utils/Const';
  
const path = require('path');
const fs = require('fs');
var shell = require('shelljs');
const { COPYFILE_EXCL } = fs.constants;

  export const createFolder = async (path: any) => {
      return new Promise((resolve, reject) => {
        try {
            const directoryName = `${UPLOADS_DIRECTORY}${path}`;
            shell.mkdir('-p', directoryName);
            resolve (true)
        } catch(error){
            reject(error)
        }
      })
  };
  
  export let copyFileFromTmpToPath = async (file: any, folderPath: any) => {

    await createFolder(folderPath)
    
    const tmpFilePath = path.join(__dirname, `../../../${file.path}`);
    let correctFilePath = `${UPLOADS_DIRECTORY}${folderPath}/${file.filename}`;
    let filePathreturned = `${folderPath}/${file.filename}`;
    
    await fs.copyFileSync(tmpFilePath, correctFilePath, COPYFILE_EXCL);
    await deleteFilesFromTmp()
    return filePathreturned
  };
  
  
  
  export const deleteFilesFromTmp = async () => {
    try {
      const directory = UPLOADS_TMP_DIRECTORY;
      const files = await fs.readdirSync(directory);
      const unlinkPromises = files.map(
        (filename: string) => {
          fs.unlinkSync(`${directory}/${filename}`);
        });
      return Promise.all(unlinkPromises);
    } catch(err) {
      console.log(err);
    }
  };
  