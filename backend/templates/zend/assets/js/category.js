function categoryError() {

    var category_modal_error_field = document.getElementById('category_modal_error_field');

    var edit_title_inp = document.forms['category_modal_form']['edit_title_inp'].value;
    var parent_inp = document.forms['category_modal_form']['parent_inp'].value;

    if (edit_title_inp == "" || parent_inp == "0")

    {

        category_modal_error_field.style.display = "block";
        category_modal_error_field.innerHTML = "لطفا ورودی ها را پر کنید";
        return false;

    }
}