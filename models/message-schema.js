// MongoDB schema
let message_schema = new mongoose.Schema({

    first_last_name : String,
    email : String,
    phone_number : String,
    title : String,
    text : String,
    date : String,
    row : Number

});

message_schema.statics = {

    add : async function (message_data) {

        let list = await message_model.find();
        message_data.row = list.length + 1;

        let new_message = new message_model(message_data);
        return await new_message.save();

    },

    get : async function () {

        return await message_model.find().sort([['row', -1]])

    },

    getById : async function (message_id) {

        return await message_model.findById(message_id);

    },

    del : async function (message_id) {

        return await message_model.findByIdAndDelete(message_id);

    }

};



module.exports = message_model = mongoose.model('message', message_schema);