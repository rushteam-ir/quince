const router = express.Router();

router.post('/', async(req, res, next)=>{

    try {

        let admin_id = req.session.admin_id;
        let last_input = req.session.admin_info;

        let {first_name_inp, last_name_inp, nick_name_inp, email_inp, phone_number_inp} = req.body;

        let last_check_box = '';
        let author_type = '';

        if(req.body.author_type === 'on'){

            last_check_box = 'nick_name';

        }
        else{

            last_check_box = 'name';

        }

        if(last_input.first_name == first_name_inp && last_input.nick_name == nick_name_inp &&
            last_input.last_name == last_name_inp && last_input.email == email_inp &&
            last_input.phone_number == phone_number_inp && last_input.author_type == last_check_box &&
            !req.files){

            return res.redirect(`${config.backend_url}profile/?msg=no-change`);

        }

        let validation_result = new validation([
            {value : email_inp, type : 'email'},
            {value : first_name_inp},
            {value : last_name_inp},
            {value : nick_name_inp},
            {value : phone_number_inp , type : 'phone'},
        ]).valid();

        if(validation_result){

            return res.json(validation_result)

        }

        if(req.body.author_type == 'on'){

            author_type = 'nick_name';

        }
        else{

            author_type = 'name';

        }

        let admin_data = {

            first_name : first_name_inp,
            last_name : last_name_inp,
            nick_name : nick_name_inp,
            email : email_inp,
            phone_number : phone_number_inp,
            author_type : author_type

        };

        let result = await user_model.edit(admin_id, admin_data);

        if(result){

            req.session.admin_info = result;
            return res.redirect(`${config.backend_url}profile/?msg=profile-success`);

        }
        else{

            return res.redirect(`${config.backend_url}profile/?msg=profile-fail`);

        }

    }
    catch(error) {

        next(error);

    }

});

module.exports = router;