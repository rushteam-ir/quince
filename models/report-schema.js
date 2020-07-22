let report_schema = new mongoose.Schema({

    type : String,
    text : String,
    date : String,
    url : String,
    who : {
        type : 'ObjectId',
        ref : 'admin'
    },
    remote_address : String,

});

report_schema.statics = {

    add : async function(report_data){

        report_data.date = `${getCurrentDate()} - ${getCurrentTime()}`;
        let new_report = new report_model(report_data);
        return await new_report.save();

    },

    getAll : async function (page_number, page_limit) {

        return await report_model.find().populate('who').exec();

    },

};



module.exports = report_model = mongoose.model('report', report_schema);