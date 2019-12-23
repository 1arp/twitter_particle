var main_twit = document.getElementById('main_twit')
main_twit.width = window.innerWidth;
main_twit.height = window.innerHeight;


var main_context = main_twit.getContext('2d');
var centerRadius = 30;

function getxyofcircle(radius,posrad){
  var x = (window.innerWidth/2) + (Math.cos(posrad) * radius) ;
  var y = (window.innerHeight/2) + (Math.sin(posrad) * radius);
  var xy = {
    x : x,
    y : y, 
  }
  return xy;
}

mouse_hover = {
  x : undefined,
  y : undefined,
}

mouse_click = {
  x : undefined,
  y : undefined,
}

window.addEventListener('click',(event)=>{
  mouse_click.x = event.x;
  mouse_click.y = event.y;
  console.log(mouse_click);
})

window.addEventListener('mousemove',(event)=>{
  mouse_hover.x = event.x;
  mouse_hover.y = event.y;
  // console.log(mouse_hover);
})
 
// CENTER CIRCLE USER
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
// userCircle.draw();




function FollowingCircle(posrad,posradius,radius,followingUserName,followingUserHandle){
  this.posrad = posrad;
  var pos = getxyofcircle(posradius,this.posrad);
  this.x = pos.x;
  this.y = pos.y;
  this.radius = radius;
  this.user = followingUserName;
  this.dposrad =  (Math.random() - 0.5)/100;
  this.startingradius = radius;
  this.followingUserHandle = followingUserHandle;

  this.draw = function(){
    main_context.beginPath();
    
    // line
    main_context.moveTo(window.innerWidth/2,window.innerHeight/2);
    main_context.lineTo(this.x,this.y);
    main_context.lineWidth = '2';
    main_context.stroke();

    // circle
    main_context.beginPath()
    main_context.arc(this.x,this.y,this.radius,0,Math.PI * 2,false)
    main_context.fill();
    
    

    // text
    main_context.font = '20px Poppins'
    main_context.textAlign = 'center'
    main_context.fillText(this.user,this.x,this.y+50)

  }

  this.update = function (){
    //move in circle
    this.posrad += this.dposrad;
    pos = getxyofcircle(posradius,this.posrad);
    this.x = pos.x;
    this.y = pos.y;

    // on_hover - change size
    if((mouse_hover.x - this.x) < 20 && (mouse_hover.x - this.x) > -20 && (mouse_hover.y - this.y)  < 20 && (mouse_hover.y - this.y) > -20){
      if(this.radius < 30)
        this.radius +=1;
    }else if(this.radius > this.startingradius){
      this.radius -= 1;
    }


    this.draw();
  }

  this.check_click = function(){
    if((mouse_click.x - this.x) < 20 && (mouse_click.x - this.x) > -20 && (mouse_click.y - this.y ) < 20 && (mouse_click.y - this.y) > -20){
      mouse_click.x = undefined;
      mouse_click.y = undefined;
      init(this.followingUserHandle);

    }
  }


}

var arrayFollowing = [];
for (let i = 0; i < 10; i++) {
  var posrad = Math.random() * 2 *Math.PI;
  var posradius = 100 + Math.random() * ((window.innerHeight/2) - 100);
  arrayFollowing.push(new FollowingCircle(posrad,posradius,15,'test'))
}

 
// var folowingcircle = new FollowingCircle(posrad,posradius,20,'test')
// folowingcircle.draw()

function animate(){
  requestAnimationFrame(animate);
  main_context.clearRect(0,0,window.innerWidth,window.innerHeight)
  userCircle.update()
  arrayFollowing.forEach(element =>{
    element.update();
  })
  // folowingcircle.update();
}


window.addEventListener('resize', ()=>{
  main_twit.width = window.innerWidth;
  main_twit.height = window.innerHeight;
})

var followingArray =[];
var mainUser;

async function init(twitterhandle){

  mainUser = new CenterCircle(twitterhandle,centerRadius);

  followingArray = [];
  var followingData = await getFollowing(twitterhandle||'realDonaldTrump');
  
  followingData.forEach(element => {
    var posrad = Math.random() * 2 *Math.PI;
    var posradius = 100 + Math.random() * ((Math.min(window.innerHeight,window.innerWidth)/2) - 100);
    followingArray.push(new FollowingCircle(posrad,posradius,15,element['name'],element['screen_name']))
  });
  
  animate_twitter();



}


function animate_twitter(){
  requestAnimationFrame(animate_twitter);
  main_context.clearRect(0,0,window.innerWidth,window.innerHeight)


  mainUser.update()

  followingArray.forEach(element => {
    element.update();
    element.check_click();
  })


}

// twitter functions
async function getFollowing(twitterhandle){
  const response = await fetch('/api/following/' + twitterhandle)
  const following = await response.json()
  return following
}

init('realDonaldTrump');
// animate();