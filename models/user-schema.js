let user_schema = new mongoose.Schema({

   first_name : String,
   last_name : String,
   nick_name : String,
   password : String,
   email : {
       type : String,
       unique : true
   },
   phone_number : String,
   avatar : String,
   author_type : String,
   last_activity : String,
   birth_day : String,
   birth_month : String,
   birth_year : String,
   biography : String,
   country : String,
   city : String,
   pending_password : String,
   access : String,
   status : Boolean,
   access_type : {
       type : 'ObjectId',
       ref : 'access'
   },
   articles_number : {
       type : Number,
       default : 0
   },
   comments_number : {
       type : Number,
       default : 0
   },
   categories_number : {
       type : Number,
       default : 0
   },
   products_number : {
       type : Number,
       default : 0
   },
   unique_id : String,

});

user_schema.statics = {

    login : async function (email_inp, password_inp) {

        let find_user = await user_model.findOne({email : email_inp, password : password_inp}).populate('access_type');

        if(find_user){

            if(isUndefined(find_user.unique_id)){

                let new_unique_id = randomSha1String();

                await user_model.edit(find_user._id, {unique_id : new_unique_id});

            }

            await user_model.edit(find_user._id, {last_activity : getCurrentDate()})

        }

        return find_user;

    },

    edit : async function(user_id, user_data){

        let find_user = await user_model.findOne({email : user_data.email}).populate('access_type');

        if(!find_user || find_user._id == user_id){

            return await user_model.findByIdAndUpdate(user_id, {$set : user_data}, {new : true}).populate('access_type');

        }
        else{

            return null;

        }
    },

    recoveryEmail : async function(user_email){

        return await user_model.findOne({email : user_email}).populate('access_type');
    },

    setPendingPassword : async function(user_email, user_data){

        return await user_model.findOneAndUpdate({email : user_email}, {$set : user_data}, {new : true}).populate('access_type');
    },

    verifyPendingPassword : async function(user_email, user_pending_password, user_data){

        return await user_model.findOneAndUpdate({email : user_email, pending_password : user_pending_password}, {$set : user_data}, {new : true}).populate('access_type');
    },

    getAll : async function (page_number, page_limit) {

        let result = {}
        let admin_skip = page_number * page_limit - page_limit;

        result.rows_begin_number = admin_skip + 1;
        result.list =  await user_model.find({access_type: { $exists: true }}).skip(admin_skip).limit(page_limit).populate('access_type').exec();
        result.total_pages = Math.ceil(await user_model.find({access_type: { $exists: true }}).countDocuments() / page_limit);

        return result;

    },

    getById : async function (user_id) {

        return await user_model.findById(user_id).populate('access_type');

    },

    del : async function (user_id) {

        let find_user = await user_model.findById(user_id);
        fs.unlink(`${backend_upload_dir}avatars/${find_user.avatar}`, function(err) {})

        return await user_model.findByIdAndDelete(user_id);

    },

    add : async function (user_data) {


        let find_user = await user_model.findOne({email : user_data.email});

        if(!find_user){

            user_data.unique_id = randomSha1String();
            user_data.status = true;

            if(user_data.access_type == '0'){

                user_data.access_type = null;

            }

            let new_user = new user_model(user_data);
            return await new_user.save();

        }
        else{

            return null;

        }

    },

    getByUniqueId : async function (user_id) {

        return await user_model.findOne({unique_id : user_id}).populate('access_type');

    },

    search : async function (query, search_value, page_number, page_limit) {

        let result = {};
        let _skip = page_number * page_limit - page_limit;

        result.rows_begin_number = _skip + 1;
        let _list = await user_model.find(query).populate('access_type');
        let temp_list = []

        if(search_value){
            for(let index of _list){
                jsonSearch(['first_name', 'last_name', 'nick_name', 'email', 'access_type.title'], search_value, index) ? temp_list.push(index) : null;
            }
            result.total_pages = Math.ceil(temp_list.length / page_limit);
            result.list = temp_list.slice(_skip, _skip + page_limit).reverse()
        }
        else{
            result.list = _list.slice(_skip, _skip + page_limit).reverse()
            result.total_pages = Math.ceil(await user_model.find(query).countDocuments() / page_limit);
        }
        return result;

    },

    getById : async function(user_id){

        return await user_model.findById(user_id).populate('access_type');

    }

};



module.exports = user_model = mongoose.model('user', user_schema);