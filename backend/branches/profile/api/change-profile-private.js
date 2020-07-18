const router = express.Router();

router.post('/', async(req, res, next)=>{

    try {

        let admin_id = req.session.admin_id;
        let last_input = req.session.admin_info;

        let {day_inp, month_inp, year_inp, country_inp, city_inp, bio_inp} = req.body;
        let date = `${year_inp}/${month_inp}/${day_inp}`;

        if(last_input.birth_day == day_inp && last_input.birth_month == month_inp &&
            last_input.birth_year == year_inp && last_input.country == country_inp &&
            last_input.city == city_inp && last_input.biography == bio_inp){

            return res.redirect(`${config.backend_url}profile/?msg=no-change`);

        }

        let validation_result = new validation([
            {value : date , type : 'date'},
            {value : country_inp},
            {value : city_inp},
            {value : bio_inp},
        ]).valid();

        if(validation_result){

            return res.redirect(`${config.backend_url}profile/?msg=${validation_result}`);

        }

        let admin_data = {

            birth_day : day_inp,
            birth_month : month_inp,
            birth_year : year_inp,
            country : country_inp,
            city : city_inp,
            biography : bio_inp,

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