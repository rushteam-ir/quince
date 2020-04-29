// Application local library
log = function (str) {

    console.log(str);

};

getCurrentDate = function() {

    let jdate = new JalaliDate;

    return(jdate.format('YYYY/MM/DD'));
};

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





let code_takhfif = '';

for(let i = 0; i < 4; i++){

    code_takhfif += randomString(4) + '-';

}

code_takhfif = code_takhfif.slice(0, -1);

log(code_takhfif)





















