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

router.use('/register', register);
router.use('/login', login);

module.exports = router;