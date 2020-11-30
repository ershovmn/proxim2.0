import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./public/static/images_upload";
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        console.log(err, fields, files)
        res.json({name: files.file.path})
        res.end()
    })
};
