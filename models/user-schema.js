// MongoDB schema
let user_schema = new mongoose.Schema({

   first_name : String,
   last_name : String,
   username : {type : String, unique : true},
   password : String,
   email : String,
   phone_number : String,
   status : Boolean,
   avatar : String,
   author_type : String,
   access : String,
   last_activity : String

});

user_schema.statics = {

    login : async function (username_inp, password_inp, callback) {

        let find_user = await user_model.findOne({

            username : username_inp,
            password : password_inp

        });

        if(find_user == null){

            callback(false, null);

        }
        else{

            callback(true, find_user);

        };

    },

    editProfile : async function(user_id, user_data, callback){

        let find_user = await admin_model.findByIdAndUpdate(user_id, {$set : user_data}, {new : true});

        if(find_user){

            callback(find_user);

        }
        else{

            callback(null);

        }
    },

    recoveryEmail : async function(user_email, callback){

        let find_user = await user_model.findOne({email : user_email});

        if(find_user){

            callback(find_user);

        }
        else{

            callback(null);

        }
    },

    changePassword : async function(user_email, user_data, callback){

        let find_user = await user_model.findOneAndUpdate({email : user_email}, {$set : user_data}, {new : true});

        if(find_user){

            callback(find_user);

        }
        else{

            callback(null);

        }
    },

    get : async function () {

        return await user_model.find();

    },

    getById : async function (user_id) {

        return await user_model.findById(user_id);

    },

    del : async function (user_id) {

        return await user_model.findByIdAndDelete(user_id);

    }

};



module.exports = user_model = mongoose.model('user', user_schema);