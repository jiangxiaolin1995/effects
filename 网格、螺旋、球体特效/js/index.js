$(function () {
	var liNum = 125; // 暂且认为有 125 5*5*5 个 li
	//定义间隔变量
	// var sX = 400, sY = 400,  sZ = 800; 

	//定义最开始的 li 的位置
	// var firstX = -2*sX; // 由最开始的 li 位置 可以知道 firstX 间隔中间的 li 为两倍间距
	// var firstY = -2*sY; // y 轴偏移量
	// var firstZ = -2*sY; // z 轴偏移量
	// 最开始的位置是这样  乱序后将最终排放位置放在 Grid 函数中

	// 把 li 添加到 #main 中
	init();
	function init() {
		for (var i = 0; i < liNum; i++) {
			var $li = $('<li></li>'); // 把 li 变成 jq 对象  这样允许我们对 li 添加对象

			// var iX = (i % 25) % 5; // x方向，要增加的倍数
			// var iY = parseInt((i % 25) / 5); //y方向，要增加的倍数
			// var iZ = parseInt(i / 25); //z方向，要增加的倍数
			var x = (Math.random() - 0.5) * 5000;
			var y = (Math.random() - 0.5) * 5000;
			var z = (Math.random() - 0.5) * 5000;
			// 刚进入乱序所以用 random 函数来随机取 xyz 轴的位置
			// Math.random()   [0,1)*2000  [0,2000) ->  [-1000 , 1000)
			$li.css({
				'transform': 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)'
			});
			// $li.css({
			//  	'transform' : 'translate3d('+ ( firstX + iX*sX ) +'px,'+ ( firstY + iY*sY ) +'px,'+ (firstZ + iZ*sZ) +'px)'
			// });

			$('#main').append($li);
		}
		setTimeout(function(){
			Grid();
			// 添加左下角四个选项卡特效 先在css中设置初始的位置 然后延时加载最终位置
			$('#styleBtn').css({
			transform : 'scale(1)',
			opacity : 1
		})
		},300);
		$('#styleBtn li').click(function(){
			var index = $(this).index();
			switch ( index ){
				case 0:
					break;
				case 1:
				  Sphere();
					break;
				case 2:
					Helix();
					break;
				case 3:
					Grid();
					break;
			}
		});
		
	}
	// 球体
	function Sphere(){
	// 第一次球体代码 不完善
	// 	var sZ = 800; // 到球心的距离
	// 	var firstX = 0; // 初始的旋转的角度
	// 	var roX = 20, roY = 360/(liNum/18); // 变化的角度  由roY个平分360度
		
	// 	$('#main li').each(function(i){
	// 		var iY = Math.floor(i/18); // 18个是一圈 iY是铺成一个圆用多少个
	// 		$(this).css({
	// 			'transform' : 'rotateY('+firstX+iY*roY +'deg) rotateX('+(firstX + roX*i)+'deg) translateZ('+ sZ +'px)'
	// 		});
	// 	})
		
  }
	(function(){
		var $mainLi = $('#main li');
		var $show = $('#show');
		$mainLi.click(function(ev){
			$show.fadeIn(1000).css({
				'transform' : 'scale(1)'
			});
			// return false;
			ev.stopPropagation();
		});
		$(document).click(function(){
			$show.fadeOut(1000,function(){
				$(this).css({
					'transform' : 'rotateY(180deg) scale(1.5)'
				});
			}).css({
				'transform' : 'rotateY(180deg) scale(0.1)'
			})
		});
		$show.click(function(ev){
			$('#wrap').animate({
				'marginLeft' : '-100%'

			},1000);
			$('#iframe').show().animate({
				left : 0
			},1000);
			ev.stopPropagation();
		});
	})();
  
})
	// 螺旋
	function Helix(){
		var initY = 10 , sY = 10; // y轴累计增加10度 y轴位移增加10
		var mIndex = Math.floor($('#main li').length / 2);
		var firstY = -sY*mIndex;
		$('#main li').each(function(i){
			$(this).css({
				'transform' : 'rotateY('+ 10*i +'deg) translateY('+ (firstY+sY*i) +'px) translateZ(1000px)'// 先旋转在位移 先旋转在移y轴
			});
		})
	}
	
	function Grid() {
		var sX = 400, sY = 400, sZ = 800;
		var firstX = -2 * sX; // 由最开始的 li 位置 可以知道 firstX 间隔中间的 li 为两倍间距
		var firstY = -2 * sY; // y 轴偏移量
		var firstZ = -2 * sY; // z 轴偏移量
		$('#main li').each(function (i) {
			var iX = (i % 25) % 5; // x方向，要增加的倍数
			var iY = parseInt((i % 25) / 5); //y方向，要增加的倍数
			var iZ = parseInt(i / 25); //z方向，要增加的倍数
			$(this).css({
				'transform': 'translate3d(' + (firstX + iX * sX) + 'px,' + (firstY + iY * sY) + 'px,' + (firstZ + iZ * sZ) + 'px)',
				'transition': '4s ease-in-out'
			});
		});


	}
	//鼠标拖拽
	(function () {
		// nowX lastX minusX 当前 前一点 两点差值
		var nowX, lastX, minusX = 0, nowY, lastY, minusY = 0;
		var initY = 0,
			initX = 0,
			initZ = -2000; // 初始的 y 为 0
		var timer1, timer2;
		$(document).mousedown(function (ev) {
			
			ev = ev || window.event; // event 兼容
			lastX = ev.clientX; // 当鼠标按下的时候存当时鼠标的位置 作为鼠标前一点的位置
			lastY = ev.clientY;
			clearInterval(timer1);
			$(this).on('mousemove', function (ev) {
				ev = ev || window.event; // event 兼容
				nowX = ev.clientX; // clientX 指鼠标的X坐标  nowX 指当前鼠标的位置
				nowY = ev.clientY;
				minusX = nowX - lastX; // 两点差值
				minusY = nowY - lastY;
				// console.log(minusX)
				initY += minusX * 0.1;
				initX -= minusY * 0.1;
				$('#main').css({
					'transform': 'translateZ(' + initZ + 'px) rotateX(' + initX + 'deg) rotateY(' + initY + 'deg)'
				});
				lastX = nowX; // 然后把当前点的坐标赋值给前一点
				lastY = nowY;

			});
			return false; // 禁止选中 
		}).mouseup(function () {
			$(this).off('mousemove');
			// 鼠标松开继续滑动 使动作更加平滑
			timer1 = setInterval(function () {
				minusX *= 0.95;
				minusY *= 0.95;
				// console.log( minusX )
				if (Math.abs(minusX) < 0.5 && Math.abs(minusY) < 0.5)
					clearInterval(timer1);
				initY += minusX * 0.2;
				initX -= minusY * 0.2;
				$('#main').css({
					'transform': 'translateZ(' + initZ + 'px) rotateX(' + initX + 'deg) rotateY(' + initY + 'deg)'
				});
			}, 13);

		}).mousewheel(function (e, d) { // 滚轮事件
			// clearInterval( timer2 );
			initZ += d * 80;
			initZ = Math.min(0, initZ) // 取参数最小的
			initZ = Math.max(-8000, initZ)
			$('#main').css({
				'transform': 'translateZ(' + initZ + 'px) rotateX(' + initX + 'deg) rotateY(' + initY + 'deg)'
			});
			// timer2 = setInterval(function(){
			// 	d *= 0.85;
			// 	if ( Math.abs(d) < 0.01 )
			// 	{
			// 		clearInterval( timer2 );
			// 	}
			// 	initZ += d*80;
			// 	initZ = Math.min(0,initZ); // Math.min()  取参数里面最小的
			// 	initZ = Math.max(-8000,initZ); // Math.max()  …… 最大

			// 	$('#main').css({
			// 		'transform' : 'translateZ('+ initZ +'px) rotateX('+ initX +'deg) rotateY('+ initX +'deg)'
			// 	});
			// } , 13);
		})
	})();



// onselectstart = 'return false'  禁止鼠标拖动选中