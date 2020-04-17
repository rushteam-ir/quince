// Application local library
log = function (str) {

    console.log(str);

};

getCurrentDate = function() {

    let jdate = new JalaliDate;

    return(jdate.format('YYYY/MM/DD'));
};

isUndefined = function (obj) {

    if(typeof obj == 'undefined'){
        return true;
    }
    else{
        return false;
    }

};

randomInt = function(min, max) { // min and max included
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

validation = {

    isUsername : function (username_inp) {


        if(username_inp != ""){

            if(username_inp.length >= 4) {

                if (!Array.isArray(username_inp)){

                    return '';

                }
                else{

                    return 'invalid-input';

                }

            }
            else{

                return 'short-input';

            }

        }
        else{

            return 'empty-input';

        }

    },

    isPassword: function (password_inp) {

        if(password_inp != ""){

            if(!Array.isArray(password_inp)) {

                if(password_inp.length >= 8) {

                    return '';

                }

            }
            else{

                return 'invalid-input';

            }

        }
        else{

            return 'empty-input';

        }

    },

    isCaptcha : function (captcha_inp) {

        if(captcha_inp != ""){

            if(!Array.isArray(captcha_inp)) {

                return '';

            }
            else{

                return 'invalid-input';

            }

        }
        else{

            return 'empty-input';

        }

    },

    isEmail : function (email_inp) {

        let emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

        if (!email_inp)
            return 'invalid-email';

        if(email_inp.length>254)
            return 'invalid-email';

        let valid = emailRegex.test(email_inp);
        if(!valid)
            return 'invalid-email';

        let parts = email_inp.split("@");
        if(parts[0].length>64)
            return 'invalid-email';

        let domainParts = parts[1].split(".");
        if(domainParts.some(function(part) { return part.length>63; }))
            return 'invalid-email';

        return '';

    },

    isSafe : function (str) {

        if(str != ""){

            if(!Array.isArray(str) || str.constructor !== ({}).constructor){

                return '';

            }
            else{

                return 'invalid-input';

            }

        }
        else{

            return 'empty-input';

        }

    },

    isPhonenumber : function (number_inp) {


        if(number_inp != ""){

            if(number_inp.length == 11) {

                if (!Array.isArray(number_inp)){

                    return '';

                }
                else{

                    return 'invalid-input';

                }

            }
            else{

                return 'not-phonenumber';

            }

        }
        else{

            return 'empty-input';

        }

    },

};

