let article_schema = new mongoose.Schema({

    title : String,
    unique_id : String,
    category_parent : {
        type : 'ObjectId',
        ref : 'category'
    },
    category_child : {
        type : 'ObjectId',
        ref : 'category'
    },
    summary : String,
    describe : String,
    meta_describe : String,
    main_image : String,
    internal_files : Array,
    status : Boolean,
    comments_status : Boolean,
    author : {
        type : 'ObjectId',
        ref : 'user'
    },
    last_edit : String,
    views_number : Number,
    comments_number : {
        type : Number,
        default : 0
    },
    url : String,

})

article_schema.statics = {

    add : async function (article_data, author_id) {

        let find_article = await article_model.findOne({url : article_data.url});
        let new_id = randomSha1String();

        if(!find_article){

            article_data.author = author_id;
            article_data.views_number= 0;
            article_data.comments_number = 0;
            article_data.last_edit = getCurrentDate();
            article_data.status = true;
            article_data.comments_status = true;
            article_data.unique_id = new_id;

            let new_article = new article_model(article_data);

            await user_model.findByIdAndUpdate(article_data.author, {$inc : {articles_number : 1}})

            return await new_article.save();

        }
        else{

            return null;

        }

    },

    getAll : async function (page_number, page_limit) {

        let result = {}
        let article_skip = page_number * page_limit - page_limit;

        result.rows_begin_number = article_skip + 1;
        result.list =  await article_model.find().skip(article_skip).limit(page_limit).populate('category_parent').populate('category_child').populate('author').exec();
        result.total_pages = Math.ceil(await article_model.find().countDocuments() / page_limit);

        return result;

    },

    del : async function (article_id) {

        let find_article = await article_model.findById(article_id)
        let internal_files_path = find_article.internal_files;

        for(let i = 0; i < internal_files_path.length; i++){

            let file_path = `${backend_upload_dir}${internal_files_path[i]}`
            fs.unlink(file_path, function(err) {})

        }

        fs.unlink(`${backend_upload_dir}images/${find_article.main_image}`, function(err) {})

        await comment_model.deleteMany({response : article_id});
        await user_model.findByIdAndUpdate(find_article.author, {$inc : {articles_number : -1}})

        return await article_model.findByIdAndDelete(article_id);

    },

    search : async function (search_value, page_number, page_limit) {

        let find_list = await article_model.find().populate('category_parent').populate('category_child').populate('author').exec();
        let article_skip = page_number * page_limit - page_limit;
        let search = search_value.toLowerCase();
        let search_list = [];
        let result = {};

        for(let i = 0; i < find_list.length; i++){

            let title = find_list[i].title.toLowerCase();
            let author_first_name = find_list[i].author.first_name.toLowerCase();
            let author_last_name = find_list[i].author.last_name.toLowerCase();
            let author_nick_name = find_list[i].author.nick_name.toLowerCase();
            let author_id = find_list[i].author.unique_id.toLowerCase();

            if(title.includes(search) || author_first_name.includes(search) || author_last_name.includes(search) || author_nick_name.includes(search) || author_id == search){

                search_list.push(find_list[i]);

            }

        }

        result.rows_begin_number = article_skip + 1;
        result.list = search_list.slice(article_skip, page_limit + article_skip);
        result.total_pages = Math.ceil(search_list.length / page_limit);

        return result;

    },

    changeStatus : async function (article_id) {

        let find_article = await article_model.findById(article_id);
        let new_status = true;

        if(find_article.status){

            new_status = false;

        }
        else{

            new_status = true;

        }

        return await article_model.findByIdAndUpdate(article_id, {status : new_status})

    },

    changeCommentsStatus : async function (article_id) {

        let find_article = await article_model.findById(article_id);
        let new_status = true;

        if(find_article.comments_status){

            new_status = false;

        }
        else{

            new_status = true;

        }

        return await article_model.findByIdAndUpdate(article_id, {comments_status : new_status})

    },

    getByUniqueId : async function(article_id){

        return await article_model.findOne({unique_id : article_id}).populate('category_parent').populate('category_child').populate('author').exec();

    },

    edit : async function(article_id, article_data){

        let find_article = await article_model.findOne({url : article_data.url});

        if(!find_article || find_article.unique_id == article_id){

            let this_article = await article_model.findOne({unique_id : article_id});

            if(this_article){

                article_data.last_edit = getCurrentDate();

                return await article_model.findByIdAndUpdate(this_article._id, {$set : article_data}, {new : true});

            }
            else{

                return null;

            }

        }
        else{

            return null;

        }


    },

    getByUrl : async function(url){

        return await article_model.findOne({url : url}).populate('author').populate('category_parent').populate('category_child').exec();

    }

}

module.exports = article_model = mongoose.model('article', article_schema);