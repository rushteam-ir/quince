const router = express.Router();

router.post('/', async(req, res, next)=>{

    try {

        let admin_id = req.session.admin_id;
        let file_name = `${randomSha1String()}.${req.files.avatar.name.split(".").pop()}`;

        let upload_result = fileManager.upload(req.files.avatar, file_name,{

            allowed_formats : 'image',
            file_path : `${backend_upload_dir}avatars/`,

        });

        if(upload_result){

            return res.json(upload_result)

        }

        let admin_data = {

            avatar : file_name

        };

        let result = await admin_model.edit(admin_id, admin_data);

        if(result){

            req.session.admin_info = result;
            return res.json({
                status : 'success',
                url : `${config.backend_url}profile`,
                msg : 'عکس پروفایل شما با موفقیت بروز شد.'
            })

        }
        else{

            return res.json('درخواست شما با مشکل مواجه شده است.');

        }

    }
    catch(error) {

        next(error);

    }

});

module.exports = router;