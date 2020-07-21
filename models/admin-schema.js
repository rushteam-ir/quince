// MongoDB schema
let admin_schema = new mongoose.Schema({

   first_name : String,
   last_name : String,
   nick_name : String,
   password : String,
   email : {type : String, unique : true},
   phone_number : String,
   status : Boolean,
   avatar : String,
   author_type : String,
   access : String,
   last_activity : String,
   birth_day : String,
   birth_month : String,
   birth_year : String,
   biography : String,
   country : String,
   city : String,
   pending_password : String,
   unique_id : String,

});

admin_schema.statics = {

    login : async function (email_inp, password_inp) {

        let find_user = await admin_model.findOne({email : email_inp, password : password_inp});

        if(find_user){

            if(isUndefined(find_user.unique_id)){

                let new_unique_id = randomSha1String();

                await admin_model.edit(find_user._id, {unique_id : new_unique_id});

            }

        }

        return find_user;

    },

    edit : async function(user_id, user_data){

        let find_user = await admin_model.findOne({email : user_data.email});

        if(!find_user || find_user._id == user_id){

            return await admin_model.findByIdAndUpdate(user_id, {$set : user_data}, {new : true});

        }
        else{

            return null;

        }
    },

    recoveryEmail : async function(user_email){

        return await uadmin_model.findOne({email : user_email});
    },

    setPendingPassword : async function(user_email, user_data){

        return await admin_model.findOneAndUpdate({email : user_email}, {$set : user_data}, {new : true});
    },

    verifyPendingPassword : async function(user_email, user_pending_password, user_data){

        return await admin_model.findOneAndUpdate({email : user_email, pending_password : user_pending_password}, {$set : user_data}, {new : true});
    },

    getAll : async function (page_number, page_limit) {

        let result = {}
        let admin_skip = page_number * page_limit - page_limit;

        result.rows_begin_number = admin_skip + 1;
        result.list =  await admin_model.find().skip(admin_skip).limit(page_limit);
        result.total_pages = Math.ceil(await admin_model.find().countDocuments() / page_limit);

        return result;

    },

    getById : async function (user_id) {

        return await admin_model.findById(user_id);

    },

    del : async function (user_id) {

        return await admin_model.findByIdAndDelete(user_id);

    },

    register: async function (user_data) {

        let list = await admin_model.find();

        user_data.row = list.length + 1;

        let find_user = await admin_model.findOne({email : user_data.email});

        if(!find_user){

            let new_user = new admin_model(user_data);
            return await new_user.save();

        }
        else{

            return null

        }

    },

    getByUniqueId : async function (user_id) {

        return await admin_model.findOne({unique_id : user_id});

    }

};



module.exports = admin_model = mongoose.model('admin', admin_schema);