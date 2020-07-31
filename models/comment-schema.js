let comment_schema = new mongoose.Schema({

    text: String,
    status : Boolean,
    date : String,
    time : String,
    email : String,
    name : String,
    groupModel : {
        type : String,
        enum : ['admin', 'user']
    },
    author : {
        type : 'objectId',
        refPath : 'groupModel'
    },
    response: {
        type : 'objectId',
        ref : 'article'
    },
    reply : {
        type : 'objectId',
        refPath : 'comment'
    },

});

comment_schema.statics = {

    add : async function(comment_data){

        comment_data.date = getCurrentDate();
        comment_data.time = getCurrentTime();
        comment_data.status = false;

        let new_comment = new comment_model(comment_data);
        return await new_comment.save();

    },

    getAll : async function (page_number, page_limit) {

        let result = {}
        let comment_skip = page_number * page_limit - page_limit;

        result.rows_begin_number = comment_skip + 1;
        result.list =  await comment_model.find().skip(comment_skip).limit(page_limit).populate('response').populate('author').populate('reply').exec();
        result.total_pages = Math.ceil(await comment_model.find().countDocuments() / page_limit);

        return result;

    },

    getByArticleId : async function(article_id){

        return await comment_model.find({response : article_id, reply : {$exists : false}}).populate('reply');

    },

};



module.exports = comment_model = mongoose.model('comment', comment_schema);