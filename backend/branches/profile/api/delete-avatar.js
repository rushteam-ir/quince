const router = express.Router();

router.get('/', async(req,res)=>{

    try {

        let admin_id = req.session.admin_id;
        let admin_data = {

            avatar : '',

        };
        let avatar_path = `${backend_upload_dir}avatars/${req.session.admin_info.avatar}`;

        let result = await user_model.editProfile(admin_id, admin_data)

        if(result){

            try{
                fs.unlinkSync(avatar_path);
            }
            catch(e){

            }
            req.session.admin_info.avatar = '';
            res.redirect(`${config.backend_url}profile`);

        }
        else{

            res.redirect(`${config.backend_url}profile`);

        }

    }
    catch(error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;