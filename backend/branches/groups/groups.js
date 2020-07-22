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
const delete_groups = require('./api/delete-groups');
const delete_select = require('./api/delete-select');

const admins = require('./admins/admins');
const users = require('./users');
const profile = require('./profile');
const add = require('./add');
const access = require('./access');

router.use('/api/change-status', change_status);
router.use('/api/delete-groups', delete_groups);
router.use('/api/delete-select', delete_select);

router.use('/admins', admins);
router.use('/users', users);
router.use('/profile', profile);
router.use('/add', add);
router.use('/access', access);

module.exports = router;