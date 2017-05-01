(function () {
  var $left = $('#left');
  var $right = $('#right');
  var $li = $('#pic li');
  var $tabLi = $('#tab li');
  var index = 0;

  //添加遮罩层
  $li.append('<span></span>')
  $('#pic li span').eq(0).css('display', 'none'); //为第一张去掉遮罩层
  //先定义数组把宽度 高度 距左距离 距顶部距离 zindex span的样式存起来
  var arrWidth = [],
    arrHeight = [],
    arrLeft = [],
    arrTop = [],
    arrZindex = [],
    arrSpan = [],
    arrOpacity = [];
  var nowTime = new Date(); //定义当前时间 也可以为0
  //点击右按钮
  $right.click(function () {
    // if (new Date() - nowTime > 500) {
    //   nowTime = new Date();
    //   //先遍历所有 li 把要用的存在数组里
    //   $li.each(function (i) {
    //     arrWidth[i] = $(this).css('width');
    //     arrHeight[i] = $(this).css('height');
    //     arrLeft[i] = $(this).css('left');
    //     arrTop[i] = $(this).css('top');
    //     arrZindex[i] = $(this).css('zIndex');
    //     arrSpan[i] = $(this).find('span').css('display');
    //     arrOpacity[i] = $(this).css('opacity');
    //   });
    //   //把上面遍历的数据遍历到要变化的 li 中
    //   $li.each(function (i) {
    //     var a = i - 1;
    //     if (a < 0) a = $li.length - 1;
    //     $(this).find('span').css('display', arrSpan[a]);
    //     $(this).css('zIndex', arrZindex[a]).animate({
    //       width: arrWidth[a],
    //       height: arrHeight[a],
    //       left: arrLeft[a],
    //       top: arrTop[a],
    //       opacity: arrOpacity[a]
    //     }, 500);
    //   });
    // }
    fn($(this).index());
  });
  // 左边
  $left.click(function(i){
    fn($(this).index());
  });

  $tabLi.click(function(){
    $(this).addClass('on').siblings().removeClass('on');
     var i = $(this).index();
     var x = i -index;
     if( x == 1 || x == -($li.length - 1)){
       fn(true);

     }else if(  x == -1 || x ==$li.length - 1){
       fn(false)

     }else{
       $li.each(function (i) {
        arrWidth[i] = $(this).css('width');
        arrHeight[i] = $(this).css('height');
        arrLeft[i] = $(this).css('left');
        arrTop[i] = $(this).css('top');
        arrZindex[i] = $(this).css('zIndex');
        arrSpan[i] = $(this).find('span').css('display');
        arrOpacity[i] = $(this).css('opacity');
      });
     }
     index = i;
  });
  function fn( x ){
    if (new Date() - nowTime > 500) {
      nowTime = new Date();
      //先遍历所有 li 把要用的存在数组里
      $li.each(function (i) {
        arrWidth[i] = $(this).css('width');
        arrHeight[i] = $(this).css('height');
        arrLeft[i] = $(this).css('left');
        arrTop[i] = $(this).css('top');
        arrZindex[i] = $(this).css('zIndex');
        arrSpan[i] = $(this).find('span').css('display');
        arrOpacity[i] = $(this).css('opacity');
      });
      //把上面遍历的数据遍历到要变化的 li 中
      $li.each(function (i) {
        if ( x ){
          var a = i - 1;
          if (a < 0) a = $li.length - 1;
          index ++;
          index %= $li.length; // 如果点击的右边的按钮 则把 index + 1 然后  index 的值不能为别的 必须是 1-10 所以用模
        }else{
          var a = i + 1;
          if( a == $li.length) a = 0;
          index --;
          if(index < 0) index = $li.length - 1; // 当 a < 0 的时候 则把 index 的值重置最后一个
        }
        
        $(this).find('span').css('display', arrSpan[a]);
        $(this).css('zIndex', arrZindex[a]).animate({
          width: arrWidth[a],
          height: arrHeight[a],
          left: arrLeft[a],
          top: arrTop[a],
          opacity: arrOpacity[a]
        }, 500);
      });
    }
    
  }


})();