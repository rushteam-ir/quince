let access_schema = new mongoose.Schema({

    title : String,
    values : Array,
    author : {
        type : 'ObjectId',
        ref : 'admin'
    }

});

access_schema.statics = {

    add : async function(access_data, author_id){

        let find_access = await access_model.findOne({title : access_data.title});

        if(!find_access){

            access_data.author = author_id;
            let new_access = new access_model(access_data);
            return await new_access.save();

        }
        else{

            return null;

        }

    },

    getAll : async function (page_number, page_limit) {

        let result = {}
        let access_skip = page_number * page_limit - page_limit;

        result.rows_begin_number = access_skip + 1;
        result.list =  await access_model.find().skip(access_skip).limit(page_limit).populate('author').exec();
        result.total_pages = Math.ceil(await access_model.find().countDocuments() / page_limit);

        return result;

    },

    get : async function() {

        return await access_model.find();

    },

    del : async function (access_id) {

        let find_access = await access_model.findById(access_id);

        return await access_model.findByIdAndDelete(find_access);

    },

    search : async function (search_value, page_number, page_limit) {

        let find_list = await access_model.find().populate('author').exec();
        let access_skip = page_number * page_limit - page_limit;
        let search = search_value.toLowerCase();
        let search_list = [];
        let result = {};

        for(let i = 0; i < find_list.length; i++){

            let title = find_list[i].title.toLowerCase();
            let values = find_list[i].values.toString().toLowerCase();

            if(title.includes(search) || values.includes(search)){

                search_list.push(find_list[i]);

            }

        }

        result.rows_begin_number = access_skip + 1;
        result.list = search_list.slice(access_skip, page_limit + access_skip);
        result.total_pages = Math.ceil(search_list.length / page_limit);

        return result;

    },

};



module.exports = access_model = mongoose.model('access', access_schema);