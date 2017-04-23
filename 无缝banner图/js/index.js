$(function () {
  //图片滚动改变ul的位置即可
  var $tabLi = $('#banner .tab li');
  var $picUl = $('#banner .pic Ul');
  var $banner = $('#banner');
  var $btn = $('#banner .btn');
  var $btnDiv = $('#banner .btn div');
  var index = 0;
  var nowTime = new Date();

  var moveWidth = $('#banner .pic li').width(); //要移动的距离是图片的宽度
  // 点击按钮切换
  $tabLi.click(function () {
    index = $(this).index();
    // console.log(liIndex);
    $(this).addClass('on').siblings().removeClass('on');
    $picUl.animate({
      marginLeft: -moveWidth * (index + 1) + 'px'
    }, 300);
  });
  $banner.hover(function () {
    $btn.show();
    clearInterval(timer);
  }, function () {
    $btn.hide();
    timer = setInterval(function(){
      index ++;
      fn();
    },5000)
  });
  // 点击左右按钮切换
  $btnDiv.hover(function () {
    $(this).addClass('hover');
  }, function () {
    $(this).removeClass('hover');;
  }).click(function () {
    if (new Date() - nowTime > 300) {
      nowTime = new Date();
      var i = $(this).index();
      if (i) {
        index++;
      } else {
        index--;
      }
      fn();
      // var liIndex = index;
      // if (liIndex >= $tabLi.length) {
      //   liIndex = 0;
      // } else if (liIndex < 0) {
      //   liIndex = $tabLi.length - 1;
      // }
      // $tabLi.eq(liIndex).addClass('on').siblings().removeClass('on');
      // $picUl.animate({
      //   marginLeft: -moveWidth * (index + 1) + 'px'
      // }, 300, function () {
      //   if (index == $tabLi.length) {
      //     $picUl.css('marginLeft', -moveWidth + 'px');
      //     index = 0;
      //   } else if (index < 0) {
      //     $picUl.css('marginLeft', -moveWidth * ($tabLi.length) + 'px');
      //     index = $tabLi.length - 1;
      //   }
      // });

    }

  }).mousedown(function () {
    return false;
  });;

  var timer = setInterval(function () {
    index++;
    auto();
  }, 5000);

  function fn() {
    var liIndex = index;
    if (liIndex >= $tabLi.length) {
      liIndex = 0;
    } else if (liIndex < 0) {
      liIndex = $tabLi.length - 1;
    }
    $tabLi.eq(liIndex).addClass('on').siblings().removeClass('on');
    $picUl.animate({
      marginLeft: -moveWidth * (index + 1) + 'px'
    }, 300, function () {
      if (index == $tabLi.length) {
        $picUl.css('marginLeft', -moveWidth + 'px');
        index = 0;
      } else if (index < 0) {
        $picUl.css('marginLeft', -moveWidth * ($tabLi.length) + 'px');
        index = $tabLi.length - 1;
      }
    });
  }

});