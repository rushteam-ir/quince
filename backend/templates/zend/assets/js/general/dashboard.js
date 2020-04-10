// ring ring notif
var notif_drd_id = document.getElementById('notif_drd_id');
notif_drd_id.style.display = "none";

function shop_dropdown() {

    var shop_dropdown = document.getElementById('shop_DD_id');
    var dashbord_text = document.getElementById('dashbord_shop_text');
    var shop_field = document.getElementById('shop_field');
    var shop_arrow = document.getElementById('shop_arrow');
    var shop_icon = document.getElementById('shop_icon');

    if (shop_dropdown.style.display == "block") {

        shop_dropdown.style.display = "none";
        dashbord_text.style.color = "#B1B1B1";
        shop_field.style.backgroundColor = "#1E1E2D";
        shop_icon.style.color = '#494B74';
        shop_arrow.style.transform = "rotate(0deg)";


    } else {

        shop_dropdown.style.display = "block";
        dashbord_text.style.color = "white";
        shop_field.style.background = "#1A1A2C";
        shop_icon.style.color = '#5D78FF';
        shop_arrow.style.transform = "rotate(-90deg)";

    }
}

function notifDropDown() {


    if (notif_drd_id.style.display === "none") {

        notif_drd_id.style.display = "block";

    } else {

        notif_drd_id.style.display = "none";

    }
}


// when click on profile tab on dashbord , tab1 open 
function profileBtn(){

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

$('.logout_cms').on('click', function (e) {

    let cat_id = $(e.currentTarget).attr('name');

    Swal.fire({
        title: 'خروج',
        text: "آیا برای خروج مطمئن هستید ؟",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر',
    }).then((result) => {
        if (result.value) {
            redirect(`${backend_url}logout`);
        }
    })
})

function redirect(url) {
    location.href = url
}