function messagesError() {

    $('.alert_query').remove();

    var title_inp = document.forms['messages_reply_form']['title_inp'].value;
    var text_inp = document.forms['messages_reply_form']['text_inp'].value;

    var error_field = document.getElementById('error_field_warning_front');
    var error_text = document.getElementById('error_text');

    if (title_inp == "") {

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا عنوان پیام را وارد کنید.";
        return false;

    } else if (text_inp == "") {

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا متن پیام را بنویسید.";
        return false;

    }

}