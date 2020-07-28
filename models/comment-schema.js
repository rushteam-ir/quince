let comment_schema = new mongoose.Schema({

    text: String,
    author : {
        type : 'objectId',
        required : true,
        refPath : 'authorModel'
    },
    response: {
        type : 'objectId',
        ref : 'article'
    },
    reply : {
        type : 'objectId',
        required : true,
        refPath : 'replyModel'
    },
    authorModel : {
        type : String,
        required : true,
        enum : ['admin', 'user']
    },
    replyModel : {
        type : String,
        required : true,
        enum : ['admin', 'user']
    }

});

comment_schema.statics = {



};



module.exports = comment_model = mongoose.model('comment', comment_schema);