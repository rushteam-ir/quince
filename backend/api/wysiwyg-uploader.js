const router = express.Router();

router.post('/', async (req, res)=> {

    try{

        let file_type = req.files.file.mimetype.split('/')[0]

        if(file_type != 'image' && file_type != 'video'){

            file_type = 'file';

        }

        let uploader_options = {

            allowed_formats : file_type,
            limited_size : backend_limited_files_size,
            file_path : `${backend_upload_dir}${file_type}s/`,

        }

        let file_name = `${randomSha1String()}.${req.files.file.name.split(".").pop()}`
        let upload_result = new uploader(req.files.file, file_name, uploader_options).upload();

        if(upload_result){

            return res.status(404).end(JSON.stringify(upload_result));

        }

        let data= {"link":`${config.backend_url}media/${file_type}s/${file_name}`}
        req.session.temp_files.push(`${file_type}s/${file_name}`)
        res.send(data)

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;