// MongoDB schema
let category_schema = new mongoose.Schema({

    title : String,
    row : Number,
    parent : {
        type : 'ObjectId',
        ref : 'category'
    }

});

category_schema.statics = {

    add : async function (title_inp, parent_inp) {

        let list = await category_model.find();
        let parent = parent_inp;

        if(parent_inp == '0'){

            parent = null;

        }
        else if(!isObjectId(parent_inp)){

            return -1;

        }

        let new_category = new category_model({

            title : title_inp,
            row : list.length + 1,
            parent : parent

        });

        let find_cat = await category_model.findOne({title : title_inp, parent : parent});

        if(!find_cat){

            let new_cat = new category_model(new_category);
            return await new_cat.save();

        }
        else{

            return null;

        }

        return result;

    },

    get : async function () {

        return await category_model.find({

            parent : null

        });

    },

    getSub : async function (parent_id) {

        return await category_model.find({

            parent : parent_id

        });

    },

    getAll : async function (page) {

        let result = {}
        let skip = page * backend.locals.limit_page - backend.locals.limit_page;
        result.rows = await category_model.find().skip(skip).limit(backend.locals.limit_page).populate('parent').exec();
        result.total_rows = result.rows.length;
        result.total_pages = Math.ceil(result.total_rows / backend.locals.limit_page);

        return result;

    },

    del : async function (category_id) {

        return await category_model.findByIdAndDelete(category_id);

    }

};



module.exports = category_model = mongoose.model('category', category_schema);