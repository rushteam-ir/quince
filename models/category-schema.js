// MongoDB schema
let category_schema = new mongoose.Schema({

    title : String,
    row : Number,
    parent : {
        type : 'ObjectId',
        ref : 'category'
    },
    child_number : Number,

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
            parent : parent

        });

        let find_cat = await category_model.findOne({title : title_inp, parent : parent});

        if(!find_cat){

            if(parent_inp != '0'){

                await category_model.findByIdAndUpdate(parent_inp, { $inc: {child_number : 1 } });

            }
            else{

                new_category.child_number = 0;

            }

            let new_cat = new category_model(new_category);
            return await new_cat.save();

        }
        else{

            return null;

        }

    },

    getParent : async function () {

        return await category_model.find({

            parent : null

        });

    },

    getSub : async function (parent_id) {

        return await category_model.find({

            parent : parent_id

        });

    },

    getAll : async function (page_number, page_limit) {

        let result = {}
        let category_skip = page_number * page_limit - page_limit;

        result.rows_begin_number = category_skip + 1;
        result.list =  await category_model.find().skip(category_skip).limit(page_limit).populate('parent').exec();
        result.total_pages = Math.ceil(await category_model.find().countDocuments() / page_limit);

        return result;

    },

    del : async function (category_id) {

        let parent_inp = await category_model.findById(category_id);

        if(parent_inp.parent != null){

            await category_model.findByIdAndUpdate(parent_inp.parent._id, { $inc: {child_number : -1 } });

        }

        return await category_model.findByIdAndDelete(category_id);

    },

    search : async function (search_value) {

        let find_list = await category_model.find().populate('parent').exec();
        let result_list = [];

        for(let i = 0; i < find_list.length; i++){

            log(i)
            if(find_list[i].title.includes(search_value) || find_list[i].parent.title.includes(search_value)){

                result_list.push(find_list[i]);

            }

        }

        return  result_list;

    },

};



module.exports = category_model = mongoose.model('category', category_schema);