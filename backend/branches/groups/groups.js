const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        res.redirect(`${config.backend_url}groups/admins`)

    }
    catch (error) {

        next(error);

    }

});

const change_status = require('./api/change-status');
const delete_user = require('./api/delete-user');

const admins = require('./admins/admins');
const users = require('./users');
const profile = require('./profile');
const add = require('./add');

router.use('/api/change-status', change_status);
router.use('/api/delete-user', delete_user);

router.use('/admins', admins);
router.use('/users', users);
router.use('/profile', profile);
router.use('/add', add);
module.exports = router;