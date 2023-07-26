import { IncomingForm } from 'formidable'
var mv = require('mv');

export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req : any, res : any) => {
    
    const data = await new Promise((resolve, reject) => {
       const form = new IncomingForm()
       
        form.parse(req, (err : any, fields : any, files : any) => {
            if (err) return reject(err)
            var oldPath = files.file.filepath;
            var newPath = `public/assets/images/${files.file.originalFilename}`;
            mv(oldPath, newPath, function(err : any) {
            });
            res.status(200).json({ fields, files })
        })
    })
    
}