const router = express.Router();

router.get('/', async(req,res)=>{

    let admin_id = req.session.admin_id;
    let admin_data = {

        avatar : '',

    };
    let avatar_path = `${backend_upload_dir}avatars/${req.session.admin_info.avatar}`;

    try {

        await admin_model.editProfile(admin_id, admin_data, (result)=>{

            if(result){

                fs.unlinkSync(avatar_path);
                req.session.admin_info.avatar = '';
                res.redirect(`${config.backend_url}profile/?msg=delete-success`);

            }
            else{

                res.redirect(`${config.backend_url}profile/?msg=delete-fail`);

            }

        })

    } catch(err) {

        res.redirect(`${config.backend_url}profile/?msg=delete-fail`);

    }

});

module.exports = router;