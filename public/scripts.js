$(document).ready(function(){


  $(".button-collapse").sideNav({
    menuWidth: 200,
    closeOnClick: true,
    draggable: true
  });


  $('.seenotes').click(function() {
    show('.submitQuestion');
  } );
  // $(".output").hide();
  // var counter = 1;

  // $("button").on('click', 'p',function() {
  //   $(this).show("slow");
  // });


});
