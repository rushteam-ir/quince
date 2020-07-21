const router = express.Router();

router.get('/', async(req, res, next)=>{

    try {

        let admin_id = req.session.admin_id;
        let admin_data = {

            avatar : '',

        };
        let avatar_path = `${backend_upload_dir}avatars/${req.session.admin_info.avatar}`;

        let result = await admin_model.edit(admin_id, admin_data)

        if(result){

            fileManager.delete(avatar_path);
            req.session.admin_info.avatar = '';

        }

        res.redirect(`${config.backend_url}profile`);

    }
    catch(error) {

        next(error);

    }

});

module.exports = router;