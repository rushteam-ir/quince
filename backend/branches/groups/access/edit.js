const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let {edit_access_id, edit_title_inp} = req.body;
        let edit_access_list = req.body['edit_access_select_inp[]'];
        let back_url = req.header('Referer') || '/';

        let validation_result = new validation([
            {value : edit_title_inp},
        ]).valid()

        if(validation_result){

            return res.json(validation_result);

        }

        let access_data = {

            title : edit_title_inp,
            values : edit_access_list,

        }

        let result = await access_model.edit(edit_access_id, access_data);

        if(result){

            return res.json({
                status : 'success',
                url : `${back_url}`,
                msg : `دسترسی موردنظر با موفقیت ویرایش شد.`
            })

        }
        else{

            return res.json('این نام تکراری می باشد، لطفا از نام دیگری استفاده کنید.')

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;