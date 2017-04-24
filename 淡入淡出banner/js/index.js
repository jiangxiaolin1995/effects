$(function(){
  var $tabLi = $('#banner .tab li');
  var $picLi = $('#banner .pic li');
  var $btnDiv = $('#banner .btn div');
  var $btn = $('#banner .btn');
  var $banner = $('#banner');
  var index = 0;
  var timer;

  $tabLi.hover(function(){
    index = $(this).index();
    $(this).addClass('on').siblings().removeClass('on');
    $picLi.eq(index).stop(true).fadeIn().siblings().stop(true).fadeOut();
  });
  $banner.hover(function(){
    $btn.show();
    clearInterval(timer);
  },function(){
    $btn.hide();
    auto();
  });
  $btnDiv.click(function(){
    var i = $(this).index();
    // console.log(i)
    if( i ){
      index ++;
      index %= $tabLi.length;
    }else{
      index --;
      if( index < 0 ){
        index = $tabLi.length - 1; 
      }
      
    }
    $tabLi.eq(index).addClass('on').siblings().removeClass('on');
    $picLi.eq(index).stop(true).fadeIn().siblings().stop(true).fadeOut();
  });
  auto();
  function auto(){
    timer = setInterval(function(){
    index ++;
    index %= $tabLi.length;
    $tabLi.eq(index).addClass('on').siblings().removeClass('on');
    $picLi.eq(index).stop(true).fadeIn().siblings().stop(true).fadeOut();
  },500);
  }
  
});