const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        res.redirect(`${config.backend_url}groups/admins`)

    }
    catch (error) {

        next(error);

    }

});


const admins = require('./admins/admins');
const users = require('./users');
const profile = require('./profile');
const add = require('./add');
const access = require('./access/access');

router.use('/admins', admins);
router.use('/users', users);
router.use('/profile', profile);
router.use('/add', add);
router.use('/access', access);

module.exports = router;