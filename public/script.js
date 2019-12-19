var main_twit = document.getElementById('main_twit')
main_twit.width = window.innerWidth;
main_twit.height = window.innerHeight;


var main_context = main_twit.getContext('2d')


function CenterCircle(user,radius){

  this.user = user;
  this.radius = radius;

  this.draw = function(){
    main_context.beginPath();
    main_context.arc(window.innerWidth/2,window.innerHeight/2,this.radius,0,Math.PI * 2,false);
    main_context.fill();

  }

  this.update = function(){
    this.draw();
  }



}



window.addEventListener('resize', ()=>{
  main_twit.width = window.innerWidth;
  main_twit.height = window.innerHeight;
})