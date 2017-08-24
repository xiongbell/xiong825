(function rotate(){
   var orientation=window.orientation;
   var header =  document.getElementById('header');
   var mui_content =  document.getElementById('mui_content');
   var alertArea =  document.getElementById('alertArea');
   if(orientation==90||orientation==-90){
      alertArea.style.display = 'block';
   }
   window.onorientationchange=function(){
      header.style.display = 'block';
      mui_content.style.display = 'block';
      alertArea.style.display = 'none';
      rotate();
   };
})()