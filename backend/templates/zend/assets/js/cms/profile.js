
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

// profile error

function passerror(){

    var current_password = document.forms['admin_pro_pass_edit']['current_password'].value;
    var new_password = document.forms['admin_pro_pass_edit']['new_password'].value;
    var confirm_password = document.forms['admin_pro_pass_edit']['confirm_password'].value;

}













// sweetalert

function deleteCall() {
    Swal.fire({
        title: 'حذف تصویر',
        text: "آیا از حذف تصویر پروفایل خود مطمئن هستید ؟",
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
                text: 'تصویر پروفایل شما با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                icon: 'success',
                confirmButtonText: 'تایید',
            }).then((result) => {
                if (result.value) {
                    redirect(`${backend_url}profile/api/delete-avatar`);
                }
            })
        }
    })
    return false
}

function redirect(url) {
    location.href = url
}


// chose file customize
(function () {

    $('.input-file-custom').each(function () {
        var $input = $(this),
            $label = $input.next('.js-labelFile'),
            labelVal = $label.html();

        $input.on('change', function (element) {
            var fileName = '';
            if (element.target.value) fileName = element.target.value.split('\\').pop();
            fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass(
                'has-file').html(labelVal);
        });
    });

})();