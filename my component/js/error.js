function testf(){
    let test = $("input[name=test]").val();

    if( test.length < 20){

        $('.error_info').addClass('error_active');
        return false;

    }

}