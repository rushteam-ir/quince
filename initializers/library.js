// Application local library
log = function (str) {

    console.log(str);

};

getCurrentDate = function() {

    let jdate = new JalaliDate;

    return(jdate.format('YYYY/MM/DD'));
};

getCurrentTime = function() {

    let date = new Date;

    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hour = date.getHours();

    return `${hour}:${minutes}:${seconds}`;

}

JalaliConvert = function(date_array){

    let jdate = new JalaliDate(date_array);

    return jdate._d

}

isUndefined = function (obj) {

    if(typeof obj == 'undefined'){
        return true;
    }
    else{
        return false;
    }

};

randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

randomString = function(length) {
    var result           = '';
    var characters       = 'ABCDEFGHJKMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

isObjectId = function (id){

    return mongoose.Types.ObjectId.isValid(id);

}

JsonCount = function (obj) {
    let count = 0;
    for(let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            ++count;
        }
    }
    return count;
}

randomSha1String = function () {

    return `${sha1(new Date().getTime() + Math.random())}`

}

jsonSearch = function(keys_inp, search_value, json_inp){

    let result = false;

    for(let keys of keys_inp){

        if(!keys.includes('.')){

            if(json_inp[keys].includes(search_value)){
                result = true;
            }

        }
        else{

            if(json_inp[keys.split('.')[0]][keys.split('.')[1]].includes(search_value)){
                result = true;
            }

        }

    }

    return result;

}