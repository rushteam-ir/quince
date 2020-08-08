const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let data = {

            list : await product_model.get()

        }

        res.render('store/store-list', data);

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;