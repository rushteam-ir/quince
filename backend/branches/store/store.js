const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        res.redirect(`${config.backend_url}store/list`);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

const delete_product = require('./api/delete-product');
const delete_image = require('./api/delete-image');
const change_status = require('./api/change-status');
const get_features = require('./api/get-features');
const delete_discount_code = require('./api/delete-discount-code');
const get_discounts = require('./api/get-discounts');
const add = require('./add');
const list = require('./list');
const edit = require('./edit');
const discount = require('./discount');

router.use('/api/delete-product', delete_product);
router.use('/api/delete-image', delete_image);
router.use('/api/change-status', change_status);
router.use('/api/get-features', get_features);
router.use('/api/delete-discount-code', delete_discount_code);
router.use('/api/get-discounts', get_discounts);
router.use('/add', add);
router.use('/list', list);
router.use('/edit', edit);
router.use('/discount', discount);

module.exports = router;