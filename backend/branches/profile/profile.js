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
const upload_avatar = require('./api/upload-avatar');

const info = require('./info');
const private = require('./private');
const password = require('./password');

router.use('/api/delete-avatar-profile', delete_avatar_profile);
router.use('/api/upload-avatar', upload_avatar);

router.use('/info', info);
router.use('/private', private);
router.use('/password', password);

module.exports = router;