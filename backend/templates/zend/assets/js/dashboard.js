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

function shop_dropdown(){
    var shop_ul = document.getElementById('shop_list_main_field_id');
    alert(shop_ul)
}