// MongoDB schema
let user_schema = new mongoose.Schema({

   first_name : String,
   last_name : String,
   password : String,
   email : {type : String, unique : true},
   phone_number : String,
   status : Boolean,
   avatar : String,
   author_type : String,
   access : String,
   last_activity : String,
   row : Number

});

user_schema.statics = {

    login : async function (email_inp, password_inp) {

        return await user_model.findOne({email : email_inp, password : password_inp});

    },

    editProfile : async function(user_id, user_data){

        return await user_model.findByIdAndUpdate(user_id, {$set : user_data}, {new : true});
    },

    recoveryEmail : async function(user_email){

        return await user_model.findOne({email : user_email});
    },

    changePassword : async function(user_email, user_data){

        return await user_model.findOneAndUpdate({email : user_email}, {$set : user_data}, {new : true});
    },

    get : async function () {

        return await user_model.find();

    },

    getById : async function (user_id) {

        return await user_model.findById(user_id);

    },

    del : async function (user_id) {

        return await user_model.findByIdAndDelete(user_id);

    },

    register: async function (user_data) {

        let list = await user_model.find();

        user_data.row = list.length + 1;

        let new_user = new user_model(user_data);
        return await new_user.save();

    },

};



module.exports = user_model = mongoose.model('user', user_schema);