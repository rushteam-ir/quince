const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let data = {

            list : await product_model.get()

        }

        res.render('store/store-list', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;