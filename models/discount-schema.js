// MongoDB schema
let discount_schema = new mongoose.Schema({

    code : String,
    value : String,
    row : Number,
    status : Boolean

});

discount_schema.statics = {

    add : async function (discount_data) {

        let list = await discount_model.find();

        discount_data.status = true;
        discount_data.row = list.length + 1;

        let new_discount = new discount_model(discount_data);
        
        return await new_discount.save();

    },

    del : async function (discount_id) {

        return await discount_model.findByIdAndDelete(discount_id);

    },

    get : async function () {

        return await discount_model.find().sort([['row', -1]]);

    },

    check : async function (code_inp) {

        return await discount_model.find({code : code_inp});

    },

};



module.exports = discount_model = mongoose.model('discount', discount_schema);