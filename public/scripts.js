$(document).ready(function(){


  $(".button-collapse").sideNav({
    menuWidth: 200,
    closeOnClick: true,
    draggable: true
  });

  $("button").on('click', 'p',function() {
    $(this).show("slow");
  });




});
