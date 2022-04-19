
frame.requestPointerLock = frame.requestPointerLock ||
frame.mozRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
document.mozExitPointerLock;

frame.onclick = function() {
frame.requestPointerLock();
};

// pointer lock event listeners

// Hook pointer lock state change events for different browsers
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

function lockChangeAlert() {
if (document.pointerLockElement === frame ||
document.mozPointerLockElement === frame) {
console.log('The pointer lock status is now locked');
document.addEventListener("mousemove", updatePosition, false);
} else {
console.log('The pointer lock status is now unlocked');  
document.removeEventListener("mousemove", updatePosition, false);
}
}

var tracker = document.getElementById('tracker');

var animation;
function updatePosition(e) {
camera.rotation.x += e.movementX / -300;
camera.rotation.z += e.movementY / 300;
}
function press(e){
  if ( e.keyCode === 87){
    forward = true
  }
  if ( e.keyCode === 68 /* d */){
    right = true
  }
  if ( e.keyCode === 83 /* s */){
   backward = true
  }
  if ( e.keyCode === 65 /* a */){
    left = true
  }
  if ( e.keyCode === 16 /* s */){
    down = true
   }
   if ( e.keyCode === 32 /* a */){
     up = true
   }
 




  if (e.keyCode == 85){
    if(ui){
      ui = false
    }else{
      ui = true
    }
  }
  if (e.keyCode === 	73){
    if(drawWire){
      drawWire = false
    }else{
      drawWire = true
    }
   }


   if (e.keyCode === 	70){
    if(flying){
      flying = false
    }else{
      flying = true
    }
   }
}
function release(e){
  if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ || e.keyCode === 90 /* z */){
    forward = false
  }
  if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */){
    right = false
  }
  if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */){
   backward = false
  }
  if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */){
    left = false
  }
  if ( e.keyCode === 16 /* s */){
    down = false
   }
   if ( e.keyCode === 32 /* a */){
     up = false 
   }

}