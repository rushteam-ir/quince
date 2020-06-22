const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        res.redirect(`${config.backend_url}groups/admins`)

    }
    catch (error) {

        next(error);

    }

});

const admins = require('./admins');
const users = require('./users');
const profile = require('./profile');
const add = require('./add');
const change_status_groups = require('./api/change-status-groups');
const delete_user_groups = require('./api/delete-user-groups');

router.use('/admins', admins);
router.use('/users', users);
router.use('/profile', profile);
router.use('/add', add);
router.use('/api/change-status', change_status_groups);
router.use('/api/delete-user', delete_user_groups);

module.exports = router;