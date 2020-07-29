let comment_schema = new mongoose.Schema({

    text: String,
    status : Boolean,
    date : String,
    groupModel : {
        type : String,
        required : true,
        enum : ['admin', 'user']
    },
    author : {
        type : 'objectId',
        required : true,
        refPath : 'groupModel'
    },
    response: {
        type : 'objectId',
        ref : 'article'
    },
    reply : {
        type : 'objectId',
        required : true,
        refPath : 'groupModel'
    },

});

comment_schema.statics = {

    add : async function(comment_data){

        comment_data.date = getCurrentDate();
        commen_date.status = false;

        let new_comment = new comment_model(comment_data);
        return await new_comment.save();

    }

};



module.exports = comment_model = mongoose.model('comment', comment_schema);