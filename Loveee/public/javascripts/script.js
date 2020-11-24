var tabLinks = document.querySelectorAll(".tablinks");
var tabContent =document.querySelectorAll(".tabcontent");

tabLinks.forEach(function(el) {
   el.addEventListener("click", openTabs);
});

 //  ============= SIGNIN CONTROL FUNCTION =========

 $('.sign-control li').on("click", function(){
   var tab_id = $(this).attr('data-tab');
   $('.sign-control li').removeClass('current');
   $('.sign_in_sec').removeClass('current');
   $(this).addClass('current animated fadeIn');
   $("#"+tab_id).addClass('current animated fadeIn');
   return false;
});

//  ============= SIGNIN TAB FUNCTIONALITY =========

$('.signup-tab ul li').on("click", function(){
   var tab_id = $(this).attr('data-tab');
   $('.signup-tab ul li').removeClass('current');
   $('.dff-tab').removeClass('current');
   $(this).addClass('current animated fadeIn');
   $("#"+tab_id).addClass('current animated fadeIn');
   return false;
});

//  ============= SIGNIN SWITCH TAB FUNCTIONALITY =========

$('.tab-feed ul li').on("click", function(){
   var tab_id = $(this).attr('data-tab');
   $('.tab-feed ul li').removeClass('active');
   $('.product-feed-tab').removeClass('current');
   $(this).addClass('active animated fadeIn');
   $("#"+tab_id).addClass('current animated fadeIn');
   return false;
});

//  ============= COVER GAP FUNCTION =========

var gap = $(".container").offset().left;
$(".cover-sec > a, .chatbox-list").css({
   "right": gap
});

function openTabs(el) {
   var btn = el.currentTarget; // lắng nghe sự kiện và hiển thị các element
   var electronic = btn.dataset.electronic; // lấy giá trị trong data-electronic
 
   tabContent.forEach(function(el) {
      el.classList.remove("active");
   });

   tabLinks.forEach(function(el) {
      el.classList.remove("active");
   });

   document.querySelector("#" + electronic).classList.add("active");
   
   btn.classList.add("active");
}

$(".user-info").on("click", function(){
   $(this).next(".user-account-settingss").toggleClass("active");
});

(function ($) {
   "use strict";
   
   // Sticky Navbar
   $(window).scroll(function () {
       if ($(this).scrollTop() > 150) {
           $('.nav-bar').addClass('nav-sticky');
       } else {
           $('.nav-bar').removeClass('nav-sticky');
       }
   });
   
   
   // Dropdown on mouse hover
   $(document).ready(function () {
       function toggleNavbarMethod() {
           if ($(window).width() > 768) {
               $('.navbar .dropdown').on('mouseover', function () {
                   $('.dropdown-toggle', this).trigger('click');
               }).on('mouseout', function () {
                   $('.dropdown-toggle', this).trigger('click').blur();
               });
           } else {
               $('.navbar .dropdown').off('mouseover').off('mouseout');
           }
       }
       toggleNavbarMethod();
       $(window).resize(toggleNavbarMethod);
   });
   
   //  ============== ChatBox ============== 


   $(".chat-mg").on("click", function(){
    $(this).next(".conversation-box").toggleClass("active");
    return false;
});
$(".close-chat").on("click", function(){
    $(".conversation-box").removeClass("active");
    return false;
});

   // Back to top button
   $(window).scroll(function () {
       if ($(this).scrollTop() > 100) {
           $('.back-to-top').fadeIn('slow');
       } else {
           $('.back-to-top').fadeOut('slow');
       }
   });
   $('.back-to-top').click(function () {
       $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
       return false;
   });
   
   
   // Top News Slider
   $('.tn-slider').slick({
       autoplay: true,
       infinite: true,
       dots: false,
       slidesToShow: 1,
       slidesToScroll: 1
   });
   
   
   // Category News Slider
   $('.cn-slider').slick({
       autoplay: false,
       infinite: true,
       dots: false,
       slidesToShow: 2,
       slidesToScroll: 1,
       responsive: [
           {
               breakpoint: 1200,
               settings: {
                   slidesToShow: 2
               }
           },
           {
               breakpoint: 992,
               settings: {
                   slidesToShow: 1
               }
           },
           {
               breakpoint: 768,
               settings: {
                   slidesToShow: 2
               }
           },
           {
               breakpoint: 576,
               settings: {
                   slidesToShow: 1
               }
           }
       ]
   });
   
  //  ============= POST PROJECT POPUP FUNCTION =========

  $(".post_event").on("click", function(){
    $(".post-popup.pst-pj").addClass("active");
    $(".wrapper").addClass("overlay");
    return false;
});
$(".post_event > a").on("click", function(){
    $(".post-popup.pst-pj").removeClass("active");
    $(".wrapper").removeClass("overlay");
    return false;
});

$(".cancel").on("click", function(){
    $(".post-popup.pst-pj").removeClass("active");
    $(".wrapper").removeClass("overlay");
    return false;
});




   // Related News Slider
   $('.sn-slider').slick({
       autoplay: false,
       infinite: true,
       dots: false,
       slidesToShow: 3,
       slidesToScroll: 1,
       responsive: [
           {
               breakpoint: 1200,
               settings: {
                   slidesToShow: 3
               }
           },
           {
               breakpoint: 992,
               settings: {
                   slidesToShow: 3
               }
           },
           {
               breakpoint: 768,
               settings: {
                   slidesToShow: 2
               }
           },
           {
               breakpoint: 576,
               settings: {
                   slidesToShow: 1
               }
           }
       ]
   });
})(jQuery);
//  ================== Edit Options Function =================


$(".ed-opts-open").on("click", function(){
    $(this).next(".ed-options").toggleClass("active");
    return false;
});

function showPreview(event){
    if(event.target.files.length > 0){
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
    }
  }

  
  function showPreview2(event){
    if(event.target.files.length > 0){
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("file-ip-2-preview2");
      preview.src = src;
      preview.style.display = "block";
    }
  }

  function showPreview3(event){
    if(event.target.files.length > 0){
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("file-ip-3-preview3");
      preview.src = src;
      preview.style.display = "block";
    }
  }
 
  var check = function() {
    if (document.getElementById('new-password').value ==
        document.getElementById('re-password').value) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'mật khẩu đã trùng khớp';
        document.getElementById('submit-pass').disabled = false;
    } else {
            document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'Mật khẩu chưa trùng khớp';
        document.getElementById('submit-pass').disabled = true;
    }
}

//change avt
var upload = document.getElementById("image");
var preview = document.getElementById("preview");
var avatar = document.getElementById("avatar");
/** Handle uploading of files */
upload.addEventListener("change", handleFiles, false);
function handleFiles() {
  var files = this.files;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var imageType = /^image\//;
    if (!imageType.test(file.type)) {
      avatar.classList.add("avatar--upload-error");
      setTimeout(function(){
        avatar.classList.remove("avatar--upload-error");
      },1200);
      continue;
    }
    avatar.classList.remove("avatar--upload-error");
    while(preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }
    var img = document.createElement("img");
    img.file = file;
    img.src = window.URL.createObjectURL(file);
    img.onload = function() { }
    img.className ="avatar_img";
    document.activeElement.blur();
    window.getSelection().removeAllRanges();
    preview.appendChild(img);
  }
}
window.changeAvatarName = function(event, key, name) {
  if (event.keyCode != 13 && event != 'blur') return;
  key = parseInt(key);
  if ( !name ) return;
  var change = avatars.changeName(key, name);
  document.activeElement.blur();
  window.getSelection().removeAllRanges();
};

window.changeAvatar = function(dir){
  if ( dir === 'next' ) {
    avatars.showNext();
  }
  else {
    avatars.showLast();
  }
};
window.handleAriaUpload = function(e, obj) {
  if(e.keyCode == 13) {
    obj.click();
  }
};

