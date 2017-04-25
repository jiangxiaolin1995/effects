$(function(){
  var sheng = areaData.sheng;

  // console.log(sheng.length);
  var $sheng = $('#sheng');
  var $shi = $('#shi');
  var $xian = $('#xian');
  var shiIndex = 0;

  for (var i = 0; i < sheng.length; i++) {
    var $option = $('<option value='+ (i + 1) +'>'+ sheng[i] +'</option>');
    $sheng.append( $option );
  }
  $sheng.change(function(){
    shiIndex = this.selectedIndex - 1;
    
    if( shiIndex < 0 ){

    }else{
      var shi = areaData.shi['a_' + shiIndex];
      $shi.html('<option value="0">市</option>');
      $xian.html('<option value="0">县</option>');
      for( i = 0; i < shi.length; i++){
        var $option = $('<option value='+ (i + 1) +'>'+ shi[i] +'</option>');
        $shi.append($option);
      }
    }
  });
  $shi.change(function(){
    var index = this.selectedIndex - 1;
    if( index < 0 ){

    }else{
      var xian = areaData.xian['a_' + shiIndex  + '_' + index];
      $xian.html('<option value="0">县</option>');
      for( i = 0; i < xian.length; i++){
        var $option = $('<option value='+ (i + 1) +'>'+ xian[i] +'</option>');
        $xian.append($option);
      }
    }

  });
});