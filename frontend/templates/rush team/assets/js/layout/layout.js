function animateWithRandomNumber(myClass, from, to) {

  TweenLite.fromTo(

    myClass,
    Math.floor(Math.random() * 20 + 1), {

      y: from

    }, {

      y: to,
      onComplete: animateWithRandomNumber,
      onCompleteParams: [myClass, from, to],
      ease: Linear.easeNone

    });

}

const itemsDown = [
  ".light4",
  ".light5",
  ".light6",
  ".light7",
  ".light8",
  ".light11",
  ".light12",
  ".light13",
  ".light14",
  ".light15",
  ".light16"
].
forEach(e => animateWithRandomNumber(e, -1080, 1080));
const itemsUp = [
  ".light1",
  ".light2",
  ".light3",
  ".light9",
  ".light10",
  ".light17"
].
forEach(e => animateWithRandomNumber(e, 1080, -1080));


// window.onscroll = function () {

//   myFunction();

// };

// var navbar = document.getElementById("navbar");
// var sticky = navbar.offsetTop;

// function myFunction() {

//   if (window.pageYOffset > sticky) {

//     navbar.classList.add("sticky")

//   } else {

//     navbar.classList.remove("sticky");

//   }
// }



// contact us modal

$('#nav_contact_us').click(function () {

  $('.sec_of_CUM').fadeIn();

  $('#close_CUM').click(function () {

    $('.sec_of_CUM').fadeOut();

  });

});