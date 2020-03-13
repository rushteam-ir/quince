// $$$$$$$$$$$$$$$$$$$$$$ dashbrd custom js $$$$$$$$$$$$$$$$$$$$$$

// function dashbordDrd() {
//     var openDrd = document.getElementById('main-txt-of-menu-list');
//     var dalam = document.getElementById('salam');
//     var dalam2 = document.getElementById('salam2');
//     var dalam3 = document.getElementById('salam3');
//     var dalam4 = document.getElementById('salam4');
//     var flag = 0;
//     var closeflag = 30
//     if (openDrd.style.display == "none") {
//         openDrd.style.display = "block";
//         var setId = setInterval(frame, 5);

//         function frame() {
//             if (flag == 30) {
//                 clearInterval(setId);
//             } else {
//                 flag++;
//                 dalam.style.height = flag + "px";
//                 dalam2.style.height = flag + "px";
//                 dalam3.style.height = flag + "px";
//                 dalam4.style.height = flag + "px";
//             }
//         }
//     }
//     else{
//         var setId2 = setInterval(frame2, 5);
//         function frame2() {
//             if (closeflag == 0) {
//                 openDrd.style.display = "none";
//                 clearInterval(setId2);
//             } else {
//                 closeflag--;
//                 dalam.style.height = closeflag +"px";
//                 dalam2.style.height = closeflag + "px";
//                 dalam3.style.height = closeflag + "px";
//                 dalam4.style.height = closeflag + "px";
//             }
//         }
//     }
// };

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

    } else {

        shop_dropdown.style.display = "block";
        dashbord_text.style.color = "white";
        shop_field.style.background = "#1A1A2C";
        shop_icon.style.color = '#5D78FF';

    }
}


function notifDropDown() {

    if (notif_drd_id.style.display === "none") {

        new WOW().init();
        notif_drd_id.style.display = "block";

    } else {

        notif_drd_id.style.display = "none";

    }
}


