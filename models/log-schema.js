// MongoDB schema
let log_schema = new mongoose.Schema({

    type : String,
    text : String,
    date : String,
    url : String,
    who : {
        type : 'ObjectId',
        ref : 'user'
    },
    remote_address : String,
    request_headers : Object,

});

log_schema.statics = {

    add : async function(log_data){

        log_data.date = `${getCurrentDate()} - ${getCurrentTime()}`;
        let new_log = new log_model(log_data);
        return await new_log.save();

    }

};



module.exports = log_model = mongoose.model('log', log_schema);