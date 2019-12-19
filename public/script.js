var main_twit = document.getElementById('main_twit')
main_twit.width = window.innerWidth;
main_twit.height = window.innerHeight;


var main_context = main_twit.getContext('2d')
var centerRadius = 40;



function CenterCircle(user,radius){

  this.user = user;
  this.radius = radius;

  this.draw = function(){

    var x = window.innerWidth/2;
    var y = window.innerHeight/2;
    main_context.beginPath();
    main_context.arc(x,y,this.radius,0,Math.PI * 2,false);
    main_context.fillText(this.user,x,y+50)
    main_context.fill();

  }

  this.update = function(){
    this.draw();
  }


}


var userCircle = new CenterCircle('pranav', centerRadius);
userCircle.draw();


window.addEventListener('resize', ()=>{
  main_twit.width = window.innerWidth;
  main_twit.height = window.innerHeight;
})