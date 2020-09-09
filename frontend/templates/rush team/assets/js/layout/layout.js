// gasp script for footer
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


// fixed navbar and change color to white when scroll down
window.onscroll = function () {

  myFunction();

};

// when user at middle of page and refresh add sticky class to nav bar to fixed and change color to white
$(document).scroll(function(){

  var scroll = $(window).scrollTop();
  if(scroll > 0){

    $('#navbar').addClass(sticky);

  }

});

// get navbar element
var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {

  if (window.pageYOffset > sticky) {

    navbar.classList.add("sticky")

  } else {

    navbar.classList.remove("sticky");

  }
}

// contact us modal

$('#nav_contact_us').click(function () {

  $('.sec_of_CUM').fadeIn();
  $('body').css('overflow' , 'hidden');
  $('.sec_of_CUM').css('overflow' , 'auto');

  $('#close_CUM').click(function () {

    $('.sec_of_CUM').fadeOut();
    $('body').css('overflow' , 'auto');

  });

});

// click service side bar

$('#nav_service').click(function(){

  $('#body_field').toggleClass('body_field');

  $('.service_sidebar').toggleClass('show_SSP');

});

$('#close_SSP').click(function(){

  $('#body_field').removeClass('body_field');

  $('.service_sidebar').removeClass('show_SSP');

});