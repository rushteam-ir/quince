const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let do_inp = req.body.do_inp;

        switch (do_inp) {

            case 'delete':
            {

                let {link_inp} = req.body;
                let file_name = link_inp.split('/').slice(-1)[0]
                let file_type = link_inp.split('/').slice(-2)[0]
                let file_path = `${backend_upload_dir}${file_type}/${file_name}`;

                fs.unlink(file_path, function(err) {})

                let index = req.session.temp_files.indexOf(`${file_type}/${file_name}`);

                if (index > -1) {
                    req.session.temp_files.splice(index, 1);
                }

                res.end();
                break;

            }

            case 'upload':
            {

                let file = req.files[`${Object.keys(req.files)[0]}`];
                let file_mime_type = file.mimetype.split('/')[0];

                if(file_mime_type != 'image' && file_mime_type != 'video'){

                    file_mime_type = 'file';

                }

                let uploader_options = {

                    allowed_formats : file_mime_type,
                    limited_size : backend_limited_files_size,
                    file_path : `${backend_upload_dir}${file_mime_type}s/`,

                }

                let file_name = `${randomSha1String()}.${file.name.split(".").pop()}`
                let upload_result = new uploader(file, file_name, uploader_options).upload();

                if(upload_result){

                    return res.end()

                }

                let data= {"link":`${config.backend_url}media/${file_mime_type}s/${file_name}`};

                req.session.temp_files.push(`${file_mime_type}s/${file_name}`);

                res.json(data)
                break;

            }

        }


    }
    catch (error) {

        next(error);

    }

});

module.exports = router;