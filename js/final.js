//"images/space.jpg""images/redSquare.png"
var ySpeed = 3;
var xSpeed = 1.5;
var height = 640;
var width = 1300;
var mid = height/2;
var level = 1;
/********************* Setup ********************/
var background = new Raster("images/space.jpg", [mid, mid]);
 changeUpdates();
/****************** Player One ******************/
var p1 = new Object({
    skin: new Raster("images/ufo.png", [50, mid]),
    speed: 10,
    size: 50
});
 
p1.skin.onFrame = function(event) {
    if(Key.isDown('w') && p1.skin.position.y > p1.size){
        p1.skin.translate(0, -p1.speed);
    }
    if(Key.isDown('s') && p1.skin.position.y < height - p1.size){
        p1.skin.translate(0, p1.speed);
    }
    
    if(Key.isDown('d') && p1.skin.position.x < width){
        p1.skin.translate(p1.speed, 0);
    }
    
    if(Key.isDown('a') && p1.skin.position.x > p1.size){
        p1.skin.translate(-p1.speed, 0);
    }
}


//var p2 = new Object({
//    skin: new Raster("images/blue-cube.png", [width - 50, mid]),
//    speed: 20,
//    size: 50
//});
// 
//p2.skin.onFrame = function(event) {
//    if(Key.isDown('up') && p2.skin.position.y > p2.size){
//        p2.skin.translate(0, -p2.speed);
//    }
//    if(Key.isDown('down') && p2.skin.position.y < height - p2.size){
//        p2.skin.translate(0, p2.speed);
//    }
//}
/****************** Game Start ******************/
function changeUpdates() {
    h.innerHTML = " Welcome to Asteroid Avoider ";
    window.setTimeout(changeBack, 5000);
}

function changeBack() {
    h.innerHTML = " Get across the screen and back! ";
    window.setTimeout(changeUpdates, 5000);
}
fish = new Object({
    skin: new Raster("images/rock.png", [300, mid]),
    speed: [xSpeed, ySpeed]
});

rock = new Object({
    skin: new Raster("images/rock.png", [650, 5]),
    speed: [xSpeed, ySpeed]
});

rock2 = new Object({
    skin: new Raster("images/rock.png", [1000, 623]),
    speed: [xSpeed, ySpeed]
});
transparentBoxLeft = new Object({
    skin: new Raster("images/transparentBox.png", [50, 320]),
    speed: [0, 0]
});

transparentBoxRight = new Object({
    skin: new Raster("images/transparentBox.png", [1250, 320]),
    speed: [0, 0]
});

halfway  = new Object({
    skin: new Raster("images/halfway.png", [1250, 320]),
    speed: [0, 0]
});

   finish  = new Object({
    skin: new Raster("images/finish.png", [50, 3020]),
    speed: [0, 0]
        });
 
/******************* Game Play ******************/
function asteroidHit(asteroid1, asteroid2){
    if(asteroid1.skin.bounds.top == asteroid2.skin.bounds.bottom){
         asteroid1.speed[1] = Math.abs(asteroid1.speed[1]);
        asteroid2.speed[1] = -1 * Math.abs(asteroid2.speed[1]);
    }
    
    if(asteroid1.skin.bounds.left == asteroid2.skin.bounds.right){
         asteroid1.speed[0] = Math.abs(asteroid1.speed[0]);
        asteroid2.speed[0] = -1 * Math.abs(asteroid2.speed[0]);
    }
    
    if(asteroid1.skin.bounds.bottom == asteroid2.skin.bounds.top){
         asteroid2.speed[1] = Math.abs(asteroid2.speed[1]);
        asteroid1.speed[1] = -1 * Math.abs(asteroid1.speed[1]);
    }
    
    if(asteroid1.skin.bounds.right == asteroid2.skin.bounds.left){
         asteroid2.speed[0] = Math.abs(asteroid2.speed[0]);
        asteroid1.speed[0] = -1 * Math.abs(asteroid1.speed[0]);
    }
}
function collisionCheck(){
    if(fish.skin.bounds.intersects(p1.skin.bounds) || fish.skin.bounds.intersects(p1.skin.bounds) || rock.skin.bounds.intersects(p1.skin.bounds) || rock.skin.bounds.intersects(p1.skin.bounds) || rock2.skin.bounds.intersects(p1.skin.bounds) || rock2.skin.bounds.intersects(p1.skin.bounds)){
        // turns the fish around if the hit a player     
        alert("You died!");
        alert("You got to Level " + level + "!");
        var refresh = prompt('Restart game?  Type in "yes" for yes or "no" for no. (If it is not reloading it means you have bad internet connecton and you should just try again or connect to wi-fi.)');
        if(refresh == "yes"){
            alert("Okay");
            location.reload();
        }
          if(refresh == "no"){
              alert("Too bad, get good, we're refreshing!");
            location.reload();
        }
        
        else{
            alert('I think and will assume that you said "yes" and I will refresh the page for you.')
            location.reload();
        }
    }
    else if(fish.skin.bounds.intersects(rock.skin.bounds)){
        asteroidHit(fish, rock);
    } 
    else if(fish.skin.bounds.intersects(rock2.skin.bounds)){
        asteroidHit(fish, rock2);
    } 
    else if(rock.skin.bounds.intersects(rock2.skin.bounds)){
        asteroidHit(rock, rock2);
    }
        
       
     else if(fish.skin.position.y <= 0 || fish.skin.position.y >= height){
       // makes the fish bounce off of the top or bottom wall
        fish.speed[1] *= -1; 
    } 
    
    else if(rock.skin.position.y <= 0 || rock.skin.position.y >= height){
       // makes the fish bounce off of the top or bottom wall
        rock.speed[1] *= -1; 
    } 
    
    else if(rock2.skin.position.y <= 0 || rock2.skin.position.y >= height){
       // makes the fish bounce off of the top or bottom wall
        rock2.speed[1] *= -1; 
    } 
    
    
    
    else if(fish.skin.bounds.intersects(transparentBoxLeft.skin.bounds)){
       // makes the fish bounce off of the top or bottom wall
        if(fish.speed[0]<0){
            fish.speed[0] *= -1; 
            console.log("Fish Collide Left");
        }
    } 
    
     else if(fish.skin.bounds.intersects(transparentBoxRight.skin.bounds)){
       // makes the fish bounce off of the top or bottom wall
        if(fish.speed[0]>0){
            fish.speed[0] *= -1;
            console.log("Fish Collide Right");
        }
    } 
    
    
     else if(rock.skin.bounds.intersects(transparentBoxLeft.skin.bounds)){
       // makes the fish bounce off of the top or bottom wall
        if(rock.speed[0]<0){
            rock.speed[0] *= -1;
            console.log("Rock Collide Left");
        }
    } 
    
     else if(rock.skin.bounds.intersects(transparentBoxRight.skin.bounds)){
       // makes the fish bounce off of the top or bottom wall
        if(rock.speed[0]>0){
            rock.speed[0] *= -1;
            console.log("Rock Collide Right");
        }
    } 
    
    else if(rock2.skin.bounds.intersects(transparentBoxLeft.skin.bounds)){
       // makes the fish bounce off of the top or bottom wall
        if(rock2.speed[0]<0){
            rock2.speed[0] *= -1;
            console.log("Rock2 Collide Left");
        }
    } 
    
     else if(rock2.skin.bounds.intersects(transparentBoxRight.skin.bounds)){
       // makes the fish bounce off of the top or bottom wall
        if(rock2.speed[0]>0){
            rock2.speed[0] *= -1;
            console.log("Rock2 Collide Right");
        }
    } 
    
    
   
    
  if(halfway.skin.bounds.intersects(p1.skin.bounds)){
      h.innerHTML = "Congrats, you made it halfway through the level! Now return to where you started!";
      finish.skin = new Raster("images/finish.png", [50, 320]);
   
  }
      
      
       if(finish.skin.bounds.intersects(p1.skin.bounds)){
              
            level = level + 1;
           if(level == 1){    
        fish.speed[1] = 3;
         rock.speed[1] = 3;
         rock2.speed[1] = 3;
           }
               if(level == 2){
        
        fish.speed[1] = 4;
         rock.speed[1] = 4;
         rock2.speed[1] = 4;
           }
           
               if(level == 3){
  
        fish.speed[1] = 5;
         rock.speed[1] = 5;
         rock2.speed[1] = 5;
           }
           
           if(level == 4){
                 
        fish.speed[1] = 6;
         rock.speed[1] = 6;
         rock2.speed[1] = 6;
           }
           
           if(level == 5){
                
        fish.speed[1] = 7;
         rock.speed[1] = 7;
         rock2.speed[1] = 7;
           }
           
           if(level == 6){

        fish.speed[1] = 8;
         rock.speed[1] = 8;
         rock2.speed[1] = 8;
           }
           
           if(level == 7){

        fish.speed[1] = 9;
         rock.speed[1] = 9;
         rock2.speed[1] = 9;
           }
           
           if(level == 8){
        fish.speed[1] = 10;
         rock.speed[1] = 10;
         rock2.speed[1] = 10;
           }
           
           if(level == 9){
        fish.speed[1] = 11;
         rock.speed[1] = 11;
         rock2.speed[1] = 11;
           }
           
           if(level == 10){
 
 
 
        fish.speed[1] = 12;
         rock.speed[1] = 12;
         rock2.speed[1] = 12;
           }
           
           if(level == 11){
 
 
 
        fish.speed[1] = 13;
         rock.speed[1] = 13;
         rock2.speed[1] = 13;
           }
           
           if(level == 12){
 
 
 
        fish.speed[1] = 14;
         rock.speed[1] = 14;
         rock2.speed[1] = 14;
           }
           
           if(level == 13){
 
 
 
        fish.speed[1] = 15;
         rock.speed[1] = 15;
         rock2.speed[1] = 15;
           }
           
           if(level == 14){
 
 
 
        fish.speed[1] = 16;
         rock.speed[1] = 16;
         rock2.speed[1] = 16;
           }
           
           if(level == 15){
 
 
 
        fish.speed[1] = 17;
         rock.speed[1] = 17;
         rock2.speed[1] = 17;
           }
           
           if(level == 16){
 
 
 
        fish.speed[1] = 18;
         rock.speed[1] = 18;
         rock2.speed[1] = 18;
           }
           
           if(level == 17){
 
 
 
        fish.speed[1] = 19;
         rock.speed[1] = 19;
         rock2.speed[1] = 19;
           }
           
           if(level == 18){
 
 
 
        fish.speed[1] = 20;
         rock.speed[1] = 20;
         rock2.speed[1] = 20;
           }
           
           if(level == 19){
 
 
 
        fish.speed[1] = 21;
         rock.speed[1] = 21;
         rock2.speed[1] = 21;
           }
           
           if(level == 20){
 
 
 
        fish.speed[1] = 22;
         rock.speed[1] = 22;
         rock2.speed[1] = 22;
           }
           
           if(level == 21){
 
 
 
        fish.speed[1] = 23;
         rock.speed[1] = 23;
         rock2.speed[1] = 23;
           }
           
           if(level == 22){
 
 
 
        fish.speed[1] = 24;
         rock.speed[1] = 24;
         rock2.speed[1] = 24;
           }
           
           if(level == 23){
 
 
 
        fish.speed[1] = 25;
         rock.speed[1] = 25;
         rock2.speed[1] = 25;
           }
           
           if(level == 24){
 
 
 
        fish.speed[1] = 26;
         rock.speed[1] = 26;
         rock2.speed[1] = 26;
           }
           
           if(level == 25){
 
 
 
        fish.speed[1] = 27;
         rock.speed[1] = 27;
         rock2.speed[1] = 27;
           }
           
           if(level == 26){
 
 
 
        fish.speed[1] = 28;
         rock.speed[1] = 28;
         rock2.speed[1] = 28;
           }
           
           if(level == 27){
 
 
 
        fish.speed[1] = 29;
         rock.speed[1] = 29;
         rock2.speed[1] = 29;
           }
           
           if(level == 28){
 
 
 
        fish.speed[1] = 30;
         rock.speed[1] = 30;
         rock2.speed[1] = 30;
           }
           
           if(level == 29){
 
 
 
        fish.speed[1] = 31;
         rock.speed[1] = 31;
         rock2.speed[1] = 31;
           }
           
           if(level == 30){
 
 
 
        fish.speed[1] = 32;
         rock.speed[1] = 32;
         rock2.speed[1] = 32; 
           }
           
           if(level == 31){
        level = level -= 1;
               alert("Congrats, you got through all thirty levels! You mastered this game!");
           }
           
           finish.skin = new Raster("images/finish.png", [50, 3020]);
      
      h.innerHTML = "Congrats, you made it all the way through the level! Now you are on Level " + level + "!";
      window.setTimeout(levelUp, 4000);
}   
          
          
  
    
  
}
 
      function levelUp() {
          h.innerHTML = "Level " + level + "!";
      }

//function collisionCheck2(){
//    if(rock.skin.bounds.intersects(p1.skin.bounds) || rock.skin.bounds.intersects(p1.skin.bounds)){
//        // turns the fish around if the hit a player     
//        alert("You died!");
//
//       }
//     else if(rock.skin.position.y <= 0 || rock.skin.position.y >= height){
//       // makes the fish bounce off of the top or bottom wall
//        rock.speed[1] *= -1; 
//    } 
//}
function onFrame(event){
    fish.skin.position.x += fish.speed[0];
    fish.skin.position.y += fish.speed[1];
    
    rock.skin.position.x += rock.speed[0];
    rock.skin.position.y += rock.speed[1];
    
    rock2.skin.position.x += rock2.speed[0];
    rock2.skin.position.y += rock2.speed[1];
    
    collisionCheck();
}

//function onFrame2(event){
//    rock.skin.position.x += rock.speed[0];
//    rock.skin.position.y += rock.speed[1];
//    collisionCheck2();
//}