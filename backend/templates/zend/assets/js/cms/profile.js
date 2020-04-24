var first_pro_box = document.getElementById('first_pro_box');
var second_pro_box = document.getElementById('second_pro_box');
var admin_pro_edit = document.getElementById('admin_pro_edit');
var admin_change_pass = document.getElementById('admin_change_pass');
var admin_profile_error_field_pass = document.getElementById('admin_profile_error_field_pass');
var first_profile_header_number = document.getElementById('first_profile_header_number');
var second_profile_header_number = document.getElementById('second_profile_header_number');


admin_pro_edit.style.display = "block";
admin_change_pass.style.display = "none";

if (sessionStorage.text == 2) {

    secondChangeDisplay()

} else {

    firstChangeDisplay()

}


// switch tab js


function firstChangeDisplay() {

    sessionStorage.text = 1;
    admin_pro_edit.style.display = "block"
    admin_change_pass.style.display = "none";
    second_profile_header_number.style.color = "#5D78FF";
    second_pro_box.style.backgroundColor = "#F7F8FB";
    second_profile_header_number.style.backgroundColor = "#DFE2EE";
    first_pro_box.style.backgroundColor = "white";
    first_profile_header_number.style.color = "white";
    first_profile_header_number.style.backgroundColor = "#5D78FF";

}

function secondChangeDisplay() {

    sessionStorage.text = 2;
    admin_change_pass.style.display = "block";
    admin_pro_edit.style.display = "none";
    second_pro_box.style.backgroundColor = "white";
    second_profile_header_number.style.backgroundColor = "#5D78FF";
    second_profile_header_number.style.color = "white";
    first_pro_box.style.backgroundColor = "#F7F8FB";
    first_profile_header_number.style.color = "#5D78FF"
    first_profile_header_number.style.backgroundColor = "#DFE2EE";


}


// sweetalert

$('.avatar_del').on('click', function (e) {

    let image_id = $(e.currentTarget).attr('name');

    Swal.fire({
        title: 'حذف تصویر',
        text: "آیا از حذف این تصویر مطمئن هستید ؟",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر',
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                title: 'حذف شد',
                text: 'تصویر مور نظر با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                icon: 'success',
                confirmButtonText: 'تایید',
            }).then((result) => {
                if (result.value) {
                    redirect(`${backend_url}profile/api/delete-avatar`);
                }
            })
        }
    })
});

function redirect(url) {
    location.href = url
}


// chose file customize
(function () {

    $('.input-file-custom').each(function () {
        var $input = $(this),
            $label = $input.next('.js-labelFile'),
            labelVal = $label.html();
    });

})();
$(document).ready(function () {

    // show img when browse
    $(".input-file-custom").change(function () {

        let input = this;

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {

                let fieldHTML = '<div class="remove_parent"><img class="uploading_img_from_brows" src="' + e.target.result + '"> <div class="remove_img_icon remove"></div></div>';
                $(input).prev().append(fieldHTML);

            }

            reader.readAsDataURL(input.files[0]); // convert to base64 string
        }

    });

});

$(document).on('click', '.remove', function (e) {

    $(this).parents('.img-show').next().val('');
    $(this).parent('.remove_parent').remove();

});

function proError() {

    $('.alert_query').remove();

    var email_inp = document.forms['pro_op_main_form']['email_inp'].value;
    var firstname_inp = document.forms['pro_op_main_form']['firstname_inp'].value;
    var lastname_inp = document.forms['pro_op_main_form']['lastname_inp'].value;
    var phonenumber_inp = document.forms['pro_op_main_form']['phonenumber_inp'].value;

    var error_field = document.getElementById('error_field_warning_front');
    var error_text = document.getElementById('error_text');

    if (email_inp == "") {

        scrollTop();
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا ایمیل خود را وارد کنید."
        return false;


    } else if (!email_inp.includes("@") || email_inp.length < 13 || !email_inp.includes(".com")) {

        scrollTop();
        error_field.style.display = "block";
        error_text.innerHTML = "ایمیل وارد شده معتبر نمی باشد."
        return false;

    } else if (firstname_inp == "") {

        scrollTop();
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا نام خود را وارد کنید."
        return false;

    } else if (lastname_inp == "") {

        scrollTop();
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا نام خانوادگی خود را وارد کنید."
        return false;

    } else if (phonenumber_inp == "") {

        scrollTop();
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا شماره تلفن خود را وارد کنید."
        return false;

    } else if (isNaN(phonenumber_inp) || phonenumber_inp.length < 11) {

        scrollTop();
        error_field.style.display = "block";
        error_text.innerHTML = "شماره تلفن وارد شده معتبر نمی باشد.";
        return false;

    }

}

function passerror() {

    $('.alert_query').remove();

    var current_password = document.forms['admin_pro_pass_edit']['current_password'].value;
    var new_password = document.forms['admin_pro_pass_edit']['new_password'].value;
    var confirm_password = document.forms['admin_pro_pass_edit']['confirm_password'].value;

    var error_field = document.getElementById('error_field_warning_password');
    var error_text = document.getElementById('error_text_pass');


    if (current_password == "") {

        scrollTop();
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا رمز عبور فعلی خود را وارد کنید."
        return false;

    } else if (new_password == "") {

        scrollTop();
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا رمز عبور جدید خود را وارد کنید."
        return false;

    } else if (confirm_password == "") {

        scrollTop();
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا تکرار رمز عبور جدید خود را وارد کنید."
        return false;

    } else if (new_password !== confirm_password) {

        scrollTop();
        error_field.style.display = "block";
        error_text.innerHTML = "رمز عبور جدید با تکرار آن برابر نمی باشد."
        return false;

    }

}


function removeWarningErrorFront(){

    document.getElementById('error_field_warning_password').style.display = "none";
    
}