// MongoDB schema
let discount_schema = new mongoose.Schema({

    code : String,
    value : String,
    row : Number,
    status : Boolean

});

discount_schema.statics = {

    add : async function (code_inp, value_inp) {

        let list = await discount_model.find();
        let new_discount = new discounts_model({

            code : code_inp,
            value : value_inp,
            row : list.length + 1,
            status : true

        });
        
        return await new_discount.save();

    },

    del : async function (discount_id) {

        return await discount_model.findByIdAndDelete(discount_id);

    },

    get : async function () {

        return await discount_model.find().sort([['row', -1]]);

    },

};



module.exports = discount_model = mongoose.model('discount', discount_schema);