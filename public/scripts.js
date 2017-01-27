$(document).ready(function(){


  $(".button-collapse").sideNav({
    menuWidth: 200,
    closeOnClick: true,
    draggable: true
  });


  $('.output').hide();
  var counter = 1;
  $('.newPage').on('click',function(){
    var input = $('textarea').val();
    counter ++;
    if(counter == 2){
      $('.extraPages').addClass('page1');
      $('.output').append('<p>'+input+'</p>');
      $('textarea').val("");
      $('.range').html('&#59242;');
      $('textarea').focus();
    }
    if(counter == 3){
      $('.extraPages').addClass('page2');
      $('.output').append('<p>'+input+'</p>');
      $('textarea').val("");
      $('.range').html('&#59243;');
      $('textarea').focus();
    }
    if(counter >= 4){
      $('.output').append('<p>'+input+'</p>');
      $('textarea').val("");
      $('.notebook').fadeOut(250);
      function showOutput(){$('.output').fadeIn(200);}
      setTimeout(showOutput,300);

    }
  });//newPage.on

  $('.range').on('click',function(){
  alert('you are currently on page '+counter + '.');
  });//range.on

  $('.seeOutput').on('click',function(){
      $('.notebook').fadeOut(250);
      function showOutput(){$('.output').fadeIn(200);}
      setTimeout(showOutput,300);
  });//seeOutput.on

  $('.output').on('click',function(){
    $('.output').fadeOut(250);
      function showInput(){$('.notebook').fadeIn(200);}
      setTimeout(showInput,300);
  });//output.on




});



// $('.nav-wrapper').collapse('hide');
// $(function(){
//      var side_nav = $(".nav-wrapper");
//      side_nav.on("click", "li", null, function () {
//          side_nav.collapse('hide');
//      });
//  });
