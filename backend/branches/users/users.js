const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        res.redirect(`${config.backend_url}users/list`)

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

const list = require('./list');
const profile = require('./profile');
const change_status = require('./api/change-status');
const delete_user = require('./api/delete-user');

router.use('/list', list);
router.use('/profile', profile);
router.use('/api/change-status', change_status);
router.use('/api/delete-user', delete_user);

module.exports = router;