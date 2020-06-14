const router = express.Router();

router.post('/', function (req, res) {

    try{
        log(req.files)
        let uploader_options = {

            allowed_formats : 'video',
            limited_size : backend_limited_videos_size,
            file_path : `${backend_upload_dir}articles/videos`,

        }

        let file_name = `${randomSha1String()}.${req.files.file.name.split(".").pop()}`
        let upload_result = new uploader(req.files.file, file_name, uploader_options).upload();

        if(upload_result){

            return res.status(404).end(JSON.stringify(upload_result));

        }

        let data= {"link":`${config.backend_url}media/articles/videos/${file_name}`}
        res.send(data)

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;