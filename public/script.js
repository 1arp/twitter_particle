var main_twit = document.getElementById('main_twit')
main_twit.width = window.innerWidth;
main_twit.height = window.innerHeight;


var main_context = main_twit.getContext('2d');
var centerRadius = 30;

function getxyofcircle(radius){
  var posrad = Math.random() * 2 * Math.PI;
  var x = (window.innerWidth/2) + (Math.cos(posrad) * radius) ;
  console.log(posrad);
  var y = (window.innerHeight/2) + (Math.sin(posrad) * radius);
  var xy = {
    x : x,
    y : y,
    posrad : posrad, 
  }
  return xy;
}

function CenterCircle(user,radius){

  this.user = user;
  this.radius = radius;

  this.draw = function(){

    var x = window.innerWidth/2;
    var y = window.innerHeight/2;
    main_context.beginPath();
    main_context.arc(x,y,this.radius,0,Math.PI * 2,false);
    main_context.fill();
    // text
    main_context.font = '20px Poppins'
    main_context.textAlign = 'center'
    main_context.fillText(this.user,x,y+50)
    

  }

  this.update = function(){
    this.draw();
  }


}


var userCircle = new CenterCircle('pranav', centerRadius);
userCircle.draw();




function FollowingCircle(x,y,radius,followingUserName){
  
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.user = followingUserName;

  this.draw = function(){
    main_context.beginPath();
    main_context.arc(this.x,this.y,this.radius,0,Math.PI * 2,false)
    main_context.fill()

    // text
    main_context.font = '20px Poppins'
    main_context.textAlign = 'center'
    main_context.fillText(this.user,x,y+50)

  }

  this.update = function (){
    this.draw();
  }

}


var testposxy = getxyofcircle(200);
console.log(testposxy)
var folowingcircle = new FollowingCircle(testposxy.x,testposxy.y,20,'test')
folowingcircle.draw()

function animate(){
  requestAnimationFrame(animate);
  main_context.clearRect(0,0,window.innerWidth,window.innerHeight)
  userCircle.update()
  folowingcircle.update();
}


window.addEventListener('resize', ()=>{
  main_twit.width = window.innerWidth;
  main_twit.height = window.innerHeight;
})

animate();