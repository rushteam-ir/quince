$(document).ready(function () {

    $('#selectall').trigger('change');
    sessionStorage.modal = '0';

    $('.limit_row').change(function () {

        let page_limit = $(this).val();
        $.post(`${backend_url}api/get-page-limit`, {
            limit: page_limit,
            url: `${backend_url}contacts`,
        }, function (data, status) {

            redirect(`${backend_url}contacts`);

        })

    })

});

// Delete contact
$('.contact_delete').on('click', function (e) {

    let contact_id = $(e.currentTarget).attr('name');

    Swal.fire({
        title: 'حذف پیام',
        text: "آیا از حذف این پیام مطمئن هستید ؟",
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
                text: 'پیام مور نظر با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                icon: 'success',
                confirmButtonText: 'تایید',
            }).then((result) => {
                if (result.value) {
                    redirect(`${backend_url}contacts/api/delete-contact/?id=${contact_id}`);
                }
            })
        }
    })
})

// Delete Selected access
$('.table_delete_btn').on('click', function (e) {

    let query = ''

    $(':checkbox:checked').each(function (i) {
        if ($(this).attr('name') != 'select_all') {
            query += '&id[]=' + $(this).val();
        }
    });

    if (query != '') {
        Swal.fire({
            title: 'حذف پیام ها',
            text: "آیا از حذف پیام های انتخاب شده مطمئن هستید ؟",
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
                    text: 'پیام های انتخاب شده با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                    icon: 'success',
                    confirmButtonText: 'تایید',
                }).then((result) => {
                    if (result.value) {
                        redirect(`${backend_url}contacts/api/delete-select/?${query}`);
                    }
                })
            }
        })
    }

})

$('.search_btn').on('click', function (e) {

    let search_value = $('.search_table').val();
    if (search_value != "") {
        redirect(`${backend_url}contacts/?search=${search_value}`);
    }
})

$('.search_btn_cancel').on('click', function (e) {

    redirect(`${backend_url}contacts`);

})

// Modal reply
$('.edit_btn').click(function () {

    $.post(`${backend_url}contacts/api/get-contact`, {
        id: $(this).attr('name'),
    }, function (data, status) {

        let name = '';
        let date = data.date;
        let text = data.text;
        let title = data.title;
        let email = '';
        let phone_number = '';
        let image = "img/default-profile-picture.png";

        if(data.author){
            if(data.author.author_type == 'name'){
                name = `${data.author.first_name} ${data.author.last_name}`;
            }
            else{
                name = data.author.nick_name
            }
            email = data.author.email;
            phone_number = data.author.phone_number;
            image = `media/avatars/${data.author.avatar}`
        }
        else{
            email = data.email;
            phone_number = data.phone_number;
            name = data.name;
        }

        $('.reply_name').text(name);
        $('.reply_date').text('تاریخ : ' + date);
        $('.reply_email').text('ایمیل : ' + email);
        $('.reply_id').val(data._id)
        $('.reply_phone_number').text('تلفن : ' + phone_number);
        $('.reply_text').text(text);
        $('.reply_title').text(title);
        $('.reply_image').attr('src', image);

    });

});

function redirect(url) {
    location.href = url
}

// lable collapse

var lable_collaps = document.getElementsByClassName('lable_collaps');

for (let i = 0; i < lable_collaps.length; i++) {

    lable_collaps[i].addEventListener('click', function () {

        let panel = this.nextElementSibling;

        if (panel.style.maxHeight) {

            panel.style.maxHeight = null;

        } else {

            panel.style.maxHeight = panel.scrollHeight + 'px';

        }

        this.classList.toggle('rotate_angle');

    });

}