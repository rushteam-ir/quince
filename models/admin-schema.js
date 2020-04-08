// MongoDB schema
let admin_schema = new mongoose.Schema({

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

admin_schema.statics = {

    login : async function (username_inp, password_inp, callback) {

        let find_admin = await admin_model.findOne({

            username : username_inp,
            password : password_inp

        });

        if(find_admin == null){

            callback(false, null);

        }
        else{

            callback(true, find_admin);

        };

    },

    editProfile : async function(admin_id, admin_data, callback){

        let find_admin = await admin_model.findByIdAndUpdate(admin_id, {$set : admin_data}, {new : true});

        if(find_admin){

            callback(find_admin);

        }
        else{

            callback(null);

        }
    },

    recoveryEmail : async function(admin_email, callback){

        let find_admin = await admin_model.findOne({email : admin_email});

        if(find_admin){

            callback(find_admin);

        }
        else{

            callback(null);

        }
    },

    changePassword : async function(admin_email, admin_data, callback){

        let find_admin = await admin_model.findOneAndUpdate({email : admin_email}, {$set : admin_data}, {new : true});

        if(find_admin){

            callback(find_admin);

        }
        else{

            callback(null);

        }
    },

    get : async function () {

        return await admin_model.find();

    },

    getById : async function (admin_id) {

        return await admin_model.findById(admin_id);

    },

    del : async function (user_id) {

        return await admin_model.findByIdAndDelete(user_id);

    }

};



module.exports = admin_model = mongoose.model('admin', admin_schema);