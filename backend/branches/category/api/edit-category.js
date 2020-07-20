const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let {category_id, title_inp, parent_inp} = req.body;
        let back_url = req.header('Referer') || '/';

        let result = await category_model.edit(category_id, title_inp, parent_inp);

        if(result){

            return res.json({
                status : 'success',
                url : `${back_url}`,
                msg : `دسته موردنظر با موفقیت ویرایش شد.`
            })

        }
        else{

            return res.json('ویرایش دسته امکان پذیر نمی باشد.')

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;