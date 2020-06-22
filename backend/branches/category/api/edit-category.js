const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let {category_id, title_inp, parent_inp} = req.body;
        let back_url = req.header('Referer') || '/';

        let result = await category_model.edit(category_id, title_inp, parent_inp);

        if(result){

            return res.redirect(back_url);

        }
        else{

            return res.redirect(back_url);

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;