const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let do_inp = req.body.do;

        switch (do_inp) {

            case 'delete':
            {

                let {src} = req.body;
                let file_name = src.split('/').slice(-1)[0]
                let file_type = src.split('/').slice(-2)[0]
                let file_path = `${backend_upload_dir}${file_type}/${file_name}`;

                await fileManager.delete(file_path);

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

                let file_name = `${randomSha1String()}.${file.name.split(".").pop()}`

                let upload_result = fileManager.upload(req.files.avatar, file_name,{

                    allowed_formats : 'image',
                    limited_size : backend_limited_images_size,
                    file_path : `${backend_upload_dir}${file_mime_type}s/`,

                });

                if(upload_result){

                    return res.end()

                }

                let data= {"link":`${config.backend_url}media/${file_mime_type}s/${file_name}`};

                req.session.temp_files.push(`${file_mime_type}s/${file_name}`);

                res.json(data)
                break;

            }

            case 'load':
            {

                let images_list = [];

                let files_list = await fileManager.loadFiles(`${backend_upload_dir}images/`);

                for(let file of files_list) {

                    images_list.push({

                        "url": `${config.backend_url}media/images/${file}`,
                        "thumb": `${config.backend_url}media/images/${file}`,
                        "tag": "image"

                    })

                }

                res.json(images_list)

                break;

            }

        }


    }
    catch (error) {

        next(error);

    }

});

module.exports = router;