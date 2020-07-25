const router = express.Router();

router.post('/', async(req, res, next)=>{

    try {

        let {access_inp} = req.body;

        let validation_result = new validation([
            {value : access_inp, type : 'objectId'},
        ]).valid()

        if(validation_result){

            return res.json(validation_result);

        }

        if(access_inp == '0'){

            return res.json('لطفا یک سطح دسترسی انتخاب کنید.');

        }

        let admin_data = {

            access_type : access_inp

        }

        let result = await admin_model.edit(admin_data);

        if(result){

            return res.json({
                status : 'success',
                url : `${config.backend_url}groups/admins`,
                msg : `دسترسی جدید برای این مدیر اصلاح شد.`
            })

        }
        else{

            return res.json('درخواست شما با مشکل مواجه شده است.')

        }

    }
    catch(error) {

        next(error);

    }

});

module.exports = router;