const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let data = {

            admin_info : req.session.admin_info,

        }

        res.render('profile/profile', data);

    }
    catch (error) {

        next(error);

    }

});

const delete_avatar_profile = require('./api/delete-avatar-profile');
const change_profile_info = require('./api/change-profile-info');
const change_profile_private = require('./api/change-profile-private');
const change_password = require('./api/change-password');
const upload_avatar = require('./api/upload-avatar');

router.use('/api/delete-avatar-profile', delete_avatar_profile);
router.use('/api/change-profile-info', change_profile_info);
router.use('/api/change-profile-private', change_profile_private);
router.use('/api/change-password', change_password);
router.use('/api/upload-avatar', upload_avatar);

module.exports = router;