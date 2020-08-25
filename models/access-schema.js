let access_schema = new mongoose.Schema({

    title : String,
    values : Array,
    count : Number,
    author : {
        type : 'objectId',
        ref : 'user'
    }

});

access_schema.statics = {

    add : async function(access_data){

        let find_access = await access_model.findOne({title : access_data.title});

        if(!find_access){

            if(Array.isArray(access_data.values)){

                access_data.count = access_data.values.length;

            }
            else if(typeof access_data.values == 'string'){

                access_data.count = 1

            }
            else{

                access_data.count = 0;

            }

            let new_access = new access_model(access_data);
            return await new_access.save();

        }
        else{

            return null;

        }

    },

    edit : async function(access_id, access_data){

        let find_acc = await access_model.findOne({title : access_data.title});

        if(!find_acc || find_acc._id == access_id){

            if(Array.isArray(access_data.values)){

                access_data.count = access_data.values.length;

            }
            else if(typeof access_data.values == 'string'){

                access_data.count = 1

            }
            else{

                access_data.count = 0;

            }

            return await access_model.findByIdAndUpdate(access_id, access_data);

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

    getById : async function(access_id) {

        return await access_model.findById(access_id);

    },

    getList : async function(){

        return await access_model.find();

    },

    del : async function (access_id) {

        let find_access = await access_model.findById(access_id);

        return await access_model.findByIdAndDelete(find_access);

    },

    search : async function (query, search_value, page_number, page_limit) {

        let result = {};
        let _skip = page_number * page_limit - page_limit;

        result.rows_begin_number = _skip + 1;
        let _list = await access_model.find(query).populate('author');
        let temp_list = []

        if(search_value){
            for(let index of _list){
                jsonSearch(['title'], search_value, index) ? temp_list.push(index) : null;
            }
            result.total_pages = Math.ceil(temp_list.length / page_limit);
            result.list = temp_list.slice(_skip, _skip + page_limit)
        }
        else{
            result.list = _list.slice(_skip, _skip + page_limit)
            result.total_pages = Math.ceil(await access_model.find(query).countDocuments() / page_limit);
        }
        return result;

    },

};



module.exports = access_model = mongoose.model('access', access_schema);