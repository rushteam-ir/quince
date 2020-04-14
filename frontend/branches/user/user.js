const router = express.Router();

router.get('/', async(req, res)=>{


    try{

        res.redirect(`${config.frontend_url}user/login`)

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

const register = require('./register');
const login = require('./login');
const profile = require('./profile');
const factor = require('./factor');

router.use('/register', register);
router.use('/login', login);
router.use('/profile', profile);
router.use('/factor', profile);

module.exports = router;