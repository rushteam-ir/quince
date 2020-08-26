$(document).ready(function () {

    $('#selectall').trigger('change');

    $('.limit_row').change(function () {

        let page_limit = $(this).val();
        $.post(`${backend_url}api/get-page-limit`, {
            limit: page_limit,
            url: `${backend_url}comments`,
        }, function (data, status) {

            redirect(`${backend_url}comments`);

        })

    })

});

$('.comment_delete').on('click', function (e) {

    let comment_id = $(e.currentTarget).attr('name');

    Swal.fire({
        title: 'حذف پیام',
        text: "آیا از حذف این پیام مطمئن هستید ؟ با حذف این نظر تمامی پاسخ های مربوط به آن نیز حذف خواهند شد.",
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
                text: 'پیام مورد نظر با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                icon: 'success',
                confirmButtonText: 'تایید',
            }).then((result) => {
                if (result.value) {
                    redirect(`${backend_url}comments/api/delete-comment/?id=${comment_id}`);
                }
            })
        }
    })
})

$('.table_delete_btn').on('click', function (e) {

    let query = ''

    $(':checkbox:checked').each(function (i) {
        if ($(this).attr('name') != 'select_all') {
            query += '&id[]=' + $(this).val();
        }
    });

    if (query != '') {
        Swal.fire({
            title: 'حذف پیام',
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
                        redirect(`${backend_url}comments/api/delete-select/?${query}`);
                    }
                })
            }
        })
    }
})

// Change comment status
$('.comment_status').on('click', function (e) {

    let comment_id = $(e.currentTarget).attr('name');
    let comment_status = $(e.currentTarget).attr('value');

    if (comment_status == 'true') {

        comment_status = 'غیر فعال';

    } else {

        comment_status = 'تایید';

    }

    Swal.fire({
        title: `${comment_status} کردن پیام`,
        text: `آیا از ${comment_status} کردن این پیام مطمئن هستید؟`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر',
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                title: `${comment_status} شد`,
                text: `پیام مور نظر با موفقیت ${comment_status} شد برای تایید نهایی کلیک کنید`,
                icon: 'success',
                confirmButtonText: 'تایید',
            }).then((result) => {
                if (result.value) {
                    redirect(`${backend_url}comments/api/change-status/?id=${comment_id}`);
                }
            })
        }
    })
})

$('.table_accept_btn').on('click', function (e) {

    let query = ''

    $(':checkbox:checked').each(function (i) {
        if ($(this).attr('name') != 'select_all') {
            query += '&id[]=' + $(this).val();
        }
    });

    if (query != '') {
        Swal.fire({
            title: 'تایید/غیرفعال کردن پیام',
            text: "آیا از تایید/غیرفعال کردن پیام های انتخاب شده مطمئن هستید ؟",
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
                    text: 'پیام های انتخاب شده با موفقیت تایید/غیرفعال شد برای تایید نهایی کلیک کنید',
                    icon: 'success',
                    confirmButtonText: 'تایید',
                }).then((result) => {
                    if (result.value) {
                        redirect(`${backend_url}comments/api/accept-select/?${query}`);
                    }
                })
            }
        })
    }
})

// Modal reply
$('.edit_btn').click(function () {

    $.post(`${backend_url}contacts/api/get-contact`, {
        id: $(this).attr('name'),
    }, function (data, status) {

        let name = '';
        let response = data.response;
        let date = data.date;
        let reply_to = '';
        let reply_to_id = data._id;
        let text = data.text;
        let image = "img/default-profile-picture.png";
        let root_id = '';

        if(data.author){
            if(data.author.author_type == 'name'){
                name = `${data.author.first_name} ${data.author.last_name}`
            }
            else{
                name = data.author.nick_name
            }
            image = `media/avatars/${data.author.avatar}`
        }
        else{
            name = data.name;
        }
        if(data.reply_to){
            if(data.reply_to.author){
                reply_to = `${data.reply_to.author.first_name} ${data.reply_to.author.last_name}`
            }
            else{
                reply_to = data.reply_to.name;
            }
        }
        else{
            reply_to = null;
        }
        if(data.root_id){
            root_id = data.root_id;
        }
        else{
            root_id = data.parent_id;
        }

        $('.reply_name').text(name);
        $('.reply_response').text('نام مقاله : ' + response.title);
        $('.reply_date').text('تاریخ : ' + date);
        if(reply_to){
            $('.reply_reply_to').text('در پاسخ به : ' + reply_to);
        }
        else{
            $('.reply_reply_to').text('');
        }
        $('.reply_text').text(text);
        $('.reply_image').attr('src', image);
        $('.reply_root_id').val(root_id);
        $('.reply_response_id').val(response._id);
        $('.reply_reply_to_id').val(reply_to_id);

    });

});

$('.second_edit_btn').click(function () {

    $.post(`${backend_url}comments/api/get-comment`, {
        id: $(this).attr('name'),
    }, function (data, status) {

        let text = data.text;
        let comment_id = data._id;

        $('.edit_comment_text').val(text);
        $('.edit_comment_id').val(comment_id);

    });

});

$('.search_btn').on('click', function (e) {

    let search_value = $('.search_table').val();
    if (search_value != "") {
        redirect(`${backend_url}comments/?search=${search_value}`);
    }

})

$('.search_btn_cancel').on('click', function (e) {

    redirect(`${backend_url}comments`);

})

function redirect(url) {
    location.href = url
}