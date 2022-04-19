fTheta = 0;
colors = ["#2e1d66","#010101"]
let drawWire = false;
let rawInput =new Vector2();
scale = 500; 
speed = 1.6;
// generate an icosphere with 4 subdivisions
let forward;
let backward;
let left;
let right;

let up = false;
let down = false;

let flying = true;

canvas.height = screen.height;
canvas.width = screen.width;

let matPjoj  = MakeProjectionMatrix();
let cube = new Mesh([
	new Vector3 (-.5, -.5, -.5),
	new Vector3 (0.5, -.5, -.5),
	new Vector3 (0.5, 0.5, -.5),
	new Vector3 (-.5, 0.5, -.5),
	new Vector3 (-.5, 0.5, 0.5),
	new Vector3 (0.5, 0.5, 0.5),
	new Vector3 (0.5, -.5, 0.5),
	new Vector3 (-.5, -.5, 0.5),
 ],
        [0,1, 2,  //face front
        0,2, 3, 
        2, 3, 4, //face top
        2, 4, 5,
        1,5, 2,  //face right
        1,6, 5, 
        0, 4, 7, //face left
        0, 3, 4,
        5, 7, 4, //face back
        5, 6, 7,
        0,6,7,   //face bottom
        0, 1, 6]
        );

let piramid = new Mesh([
          new Vector3 (-.5,0,-.5),
          new Vector3 (0.5,0,-.5),
          new Vector3 (.5,0,.5),
          new Vector3 (-0.5,0,.5),
          new Vector3 (0,.7,0)
        ],
                [0,2,3,
                  0,1,2,
                  0,1,4, 
                  1,2,4,
                  2,3,4,
                  0,3,4]);
let quad = new Mesh([	new Vector3 (-.5, 0, -.5),
	                    new Vector3 (-.5, 0, 0.5),
	                    new Vector3 (0.5, 0, 0.5),
                    	new Vector3 (0.5,  0, -0.5),],[
                        0,1,2,
                        0,2,3
                      ])
let cubeTrans = new Mesh([
	new Vector3 (-.5, -.5, -.5),
	new Vector3 (0.5, -.5, -.5),
	new Vector3 (0.5, 0.5, -.5),
	new Vector3 (-.5, 0.5, -.5),
	new Vector3 (-.5, 0.5, 0.5),
	new Vector3 (0.5, 0.5, 0.5),
	new Vector3 (0.5, -.5, 0.5),
	new Vector3 (-.5, -.5, 0.5),
],
        [0, 2, 1, //face front
        0, 3, 2,
        2, 3, 4, //face top
        2, 4, 5,
        1, 2, 5, //face right
        1, 5, 6,
        0, 7, 4, //face left
        0, 4, 3,
        5, 4, 7, //face back
        5, 7, 6,
        0, 6, 7, //face bottom
        0, 1, 6]);;
let planeMesh;
 new lightSource("global",new Vector3(0.5,-0.5,0.5));
new lightSource("global",new Vector3(-0.5,0.5,-0.5)); 


let RedLight =  new lightSource("spot",0,new Vector3(2,2,-0.5)); 
RedLight.distence = 2;
RedLight.color = new color(100,0,0);
let RedLight1 =  new lightSource("spot",0,new Vector3(0.5,2,-0.5)); 
RedLight.distence = 2;
RedLight.color = new color(100,0,0);
let RedLight2 =  new lightSource("spot",0,new Vector3(1.5,2,-0.5)); 
RedLight.distence = 2;
RedLight.color = new color(100,0,0);
let RedLight3 =  new lightSource("spot",0,new Vector3(5,2,-0.5)); 
RedLight.distence = 2;
RedLight.color = new color(100,0,0);


let BlueLight =  new lightSource("spot",0,new Vector3(0,2,5)); 
BlueLight.distence =3;
BlueLight.color = new color(0,0,100)


let GreenLight =  new lightSource("spot",0,new Vector3(5,2,2.5)); 
GreenLight.distence =3;
GreenLight.color = new color(0,100,0)

let LightDirection2 =  new lightSource("spot",new Vector3(-0.5,100,-0.5)); 
LightDirection2.distence = 5;
LightDirection2.brightness =40  ;
LightDirection2.color = new color(245, 203, 159)




function plane(size){
    let verticesInt =[];
    



    for (let z = 0; z < size + 1;z++){
        for (let x = 0; x <= size;x++){
            verticesInt.push(new Vector3(x,0,z));
    } 
   
}// (verticesInt)
    let trainglesInt = [];
let add = 0;
   for(let z = 0; z < size + 2;z++){
    for (let x = 0; x < size;x++){
        trainglesInt.push(x +size * z+ add) ;
        trainglesInt.push(x + 1 + size * z+ add);
        trainglesInt.push(x + 1 + size * (z + 1)+ add);
        trainglesInt.push( x + 1 + size * (z + 1)+ add);
        trainglesInt.push(x + 1 + size * z+ add);
        trainglesInt.push( x + 2 + size * (z + 1)+ add);
}
add++;
}

//(trainglesInt)
outMesh = new Mesh(verticesInt,trainglesInt)

return(outMesh) 
    
}


let trampoline = new gameObject("cube",new Vector3(-5,-0.7,-5),new Vector3(),plane(4));
trampoline.collider = new collider();
trampoline.collider.mesh = plane(4);
trampoline.mesh.color = "#FF5500"
trampoline.scale = new Vector3(0.5,0.5,0.5)


let cubeObject1 = new gameObject("cube",new Vector3(3,-1,0),new Vector3(),cube);
cubeObject1.collider = new collider();
cubeObject1.collider.mesh = cube;

let cubeObject2 = new gameObject("cube",new Vector3(1,-2,-1),new Vector3(),cube);
cubeObject2.collider = new collider();
cubeObject2.collider.mesh = cube;

// let sun = new gameObject("cube",new Vector3(0,-0.5,5),new Vector3(),cubeTrans);
// cubeTrans.color = "#32a852";
// sun.collider = new collider();
// sun.collider.mesh = cube;
// sun.scale = new Vector3(3,3,3);


let floar = new gameObject("floor",new Vector3(-10,0,-10),new Vector3(),plane(20))
floar.collider = new collider();
floar.collider.mesh = plane(20);
//floar.collider.mesh = floar.mesh;
floar.mesh.color = "#FFFFFF"

let camera = new gameObject("camera",new Vector3(0,2,-5),new Vector3(),new Mesh())
camera.collider = new collider();
camera.collider.mesh.Vertices = [	new Vector3 (-.5, -2, -.5),new Vector3 (.5,1, .5)]
//(camera);

function toScreenCordination(vector2){
    vector2.y =canvas.height / 2 + vector2.y;
    vector2.x =canvas.width / 2 + vector2.x;
    return vector2;
}
function RotMatrix(rotation){
    var cosa = Math.cos(rotation.y);
    var sina = Math.sin(rotation.y);

    var cosb = Math.cos(rotation.x);
    var sinb = Math.sin(rotation.x);

    var cosc = Math.cos(rotation.z);
    var sinc = Math.sin(rotation.z);

    var Axx = cosa*cosb;
    var Axy = cosa*sinb*sinc - sina*cosc;
    var Axz = cosa*sinb*cosc + sina*sinc;

    var Ayx = sina*cosb;
    var Ayy = sina*sinb*sinc + cosa*cosc;
    var Ayz = sina*sinb*cosc - cosa*sinc;

    var Azx = -sinb;
    var Azy = cosb*sinc;
    var Azz = cosb*cosc;
    let matrix = new Matrix4x4();
    matrix.M = [[Axx,Axy,Axz,1],[Ayx,Ayy,Ayz,1],[Azx,Azy,Azz,1],[0,0,0,1]]
    return matrix;
     
}
  
function renderObjects(){

  let RealTriangles = [];
  console.log(camera.rotation)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let up = new Vector3(0,1,0);
  let vtarget = new Vector3(0,0,1);
  let CameraRoty = MatXrot(camera.rotation.z);
  vLookDir = multiplyMatrixVector(CameraRoty,vtarget);
  
  let CameraRotX = MatYrot(camera.rotation.x);
  vLookDir = multiplyMatrixVector(CameraRotX,vLookDir);
  vtarget = Vector_Add(camera.position,vLookDir);
  
  let CameraMat = Matrix_PointAt(camera.position,vtarget,up);
  
  let matview = Matrix_QuickInverse(CameraMat);
  gameObjects.map(CurrentObj => {
      if(CurrentObj.mesh != null){
        let matRotZ = MatZrot( CurrentObj.rotation.z);
        let matRotX = MatXrot( CurrentObj.rotation.x);
        let matTrans;
        matTrans = Matrix_makeTranslate(CurrentObj.position);
        
        let MatWorld;
        MatWorld = Matrix_MakeIdentity();
        MatWorld = Matrix_multiplyMatrix(matRotZ,matRotX);
        MatWorld = Matrix_multiplyMatrix(MatWorld,matTrans);
        vLookDir = new Vector3(0,0,1);
      
      //loop through every triangle defined in the mesh array
        for(i = 0;i < (Math.round(CurrentObj.mesh.Triangles.length / 3) - 1);i ++){
          if (typeof CurrentObj.mesh.Vertices[CurrentObj.mesh.Triangles[i * 3 + 2]] !== 'undefined') {
            let Vec1Transform = new Vector3();let Vec2Transform = new Vector3();let Vec3Transform = new Vector3();
            let Vec1Project = new Vector3();let Vec2Project = new Vector3();let Vec3Project = new Vector3();
            let Vec1viewed = new Vector3();let Vec2viewed = new Vector3();let Vec3viewed = new Vector3();
          
            

            Vec1Transform = multiplyMatrixVector(MatWorld,CurrentObj.mesh.Vertices[CurrentObj.mesh.Triangles[i * 3]]) ;
              Vec2Transform = multiplyMatrixVector(MatWorld,CurrentObj.mesh.Vertices[CurrentObj.mesh.Triangles[i * 3 + 1]]) ;
              Vec3Transform = multiplyMatrixVector(MatWorld,CurrentObj.mesh.Vertices[CurrentObj.mesh.Triangles[i * 3 + 2]]) ;

            
            //calculate normal
            let normal,line1,line2;
            
            line1 = Vector_Sub(Vec2Transform,Vec1Transform);
            line2 = Vector_Sub(Vec3Transform,Vec1Transform);
            
            normal = Vector_CrossProduct(line1,line2);
            
            normal = Vector_normalise(normal);
            let vCameraRay = Vector_Sub(Vec1Transform, camera.position);

            // calculate color
            if(typeof(CurrentObj.mesh.color) != "undefined"){
              currentColor = CurrentObj.mesh.color;
             }else{currentColor = colors[i%colors.length];}

            let color = calculateLight(normal, Vec2Transform,currentColor)
           
                  // If ray is aligned with normal, then triangle is visible
                  if (Vector_DotProduct(normal, vCameraRay) > 0.0)
                  {
            Vec1viewed = multiplyMatrixVector(matview,Vec1Transform);
            Vec2viewed = multiplyMatrixVector(matview,Vec2Transform);
            Vec3viewed = multiplyMatrixVector(matview,Vec3Transform);
            

          
              // 3D --> 2D

            Vec1Project =  multiplyMatrixVector(matPjoj,Vec1viewed);
            Vec2Project =  multiplyMatrixVector(matPjoj,Vec2viewed);
            Vec3Project =  multiplyMatrixVector(matPjoj,Vec3viewed);
    
            
            //normalize it
            Vec1Project = Vector_Div(Vec1Project ,Vec1Project.z);
            Vec2Project = Vector_Div(Vec2Project ,Vec2Project.z);
            Vec3Project = Vector_Div(Vec3Project ,Vec3Project.z);
          
            
            
            //screen offset
            
            let screenOff = new Vector3(1,1,1);
            
            Vec1Project = Vector_Add(Vec1Project,screenOff);
            Vec2Project = Vector_Add(Vec2Project,screenOff);
            Vec3Project = Vector_Add(Vec3Project,screenOff);
            
            Vec1Project.x = (Vec1Project.x - 0.5) * canvas.width ;Vec1Project.y=(Vec1Project.y - 0.5 )* canvas.height;
            Vec2Project.x = (Vec2Project.x- 0.5) * canvas.width ;Vec2Project.y =(Vec2Project.y - 0.5 )* canvas.height ;
            Vec3Project.x =(Vec3Project.x- 0.5) * canvas.width ;Vec3Project.y =(Vec3Project.y - 0.5 )* canvas.height ;
            
            // declair new triangle to draw
            let triangle = new triangleInt(
              Vec1Project,
              Vec2Project,
              Vec3Project,
              (Math.sqrt( Vec1Transform.x ** 2 +  Vec1Transform.y ** 2 + Vec1Transform.z ** 2 ) +
              Math.sqrt( Vec2Transform.x ** 2 +  Vec2Transform.y ** 2 + Vec2Transform.z ** 2 ) +
              Math.sqrt( Vec3Transform.x ** 2 +  Vec3Transform.y ** 2 + Vec3Transform.z ** 2 )) / 3,CurrentObj,normal,color);
           
              
              RealTriangles.push(triangle );

            }}













  }} });

  // sorts triangles on distance
  RealTriangles.sort((a, b) => a.distance > b.distance && -1 || 1); 

for(i = 0;i < RealTriangles.length;i++){
let color = RealTriangles[i].color;
if((RealTriangles[i].one.x > 0 && RealTriangles[i].one.x < canvas.width &&
  RealTriangles[i].one.y > 0 && RealTriangles[i].one.y < canvas.height)||

  (RealTriangles[i].two.x > 0 && RealTriangles[i].two.x < canvas.width &&
    RealTriangles[i].two.y > 0 && RealTriangles[i].two.y < canvas.height)||

    (RealTriangles[i].three.x > 0 && RealTriangles[i].three.x < canvas.width &&
      RealTriangles[i].three.y > 0 && RealTriangles[i].three.y < canvas.height)){
         ctx.beginPath();
         ctx.moveTo(RealTriangles[i].one.x, RealTriangles[i].one.y)
         ctx.lineTo(RealTriangles[i].two.x, RealTriangles[i].two.y);
         ctx.lineTo(RealTriangles[i].three.x,RealTriangles[i].three.y);
         ctx.lineTo(RealTriangles[i].one.x, RealTriangles[i].one.y);
         ctx.closePath();
         if(drawWire ){
          ctx.strokeStyle = "#fff";
           ctx.stroke();
         }else{
           ctx.fillStyle = color;
           ctx.fill();
         }}
         
        }
}
  

function Collision(){
  camera.collider.collided = false;
  gameObjects.map(object =>{
if(object.collider != null && object != camera){
  currentColor = object.mesh.color
  object.collider.collided = false;

  // check foreach point if between min and max of camera
    object.collider.mesh.Vertices.map(point =>{
    min = camera.collider.mesh.Vertices[0];
    max = camera.collider.mesh.Vertices[1];
    camPos = camera.position;
    obPos = object.position;
    let x = false;
    let y = false;
    let z = false;
      if((point.x * object.scale.x) + obPos.x  >= min.x + camPos.x && max.x +  camPos.x>= (point.x* object.scale.x )+ obPos.x ){x = true}
        if((point.y * object.scale.y)+ obPos.y >= min.y - camPos.y && max.y -  camPos.y>= (point.y* object.scale.y ) + obPos.y ){y =true}
          if((point.z* object.scale.z) + obPos.z >= min.z  + camPos.z&& max.z + camPos.z>= (point.z* object.scale.z) + obPos.z ){z = true}
          if(x&&y&&z){
            object.collider.collided = true;
            camera.collider.collided = true;
            camera.collider.collerSides = new Vector3(x,y,z);
          }

    });
  }



 });
}
function physicsUpdate(){
  //add x velocity
  camera.position.x -= camera.velocity.x;
  camera.collider.collided =false;

  // check for collision
  Collision();

  // moves back if collided
    if(camera.collider.collided){
      camera.position.x += camera.velocity.x;
      camera.collider.collerSides.x = true;
    }
      camera.position.z += camera.velocity.z;
      camera.collider.collided = false
    Collision();
    if(camera.collider.collided){
      camera.position.z -= camera.velocity.z;
      camera.collider.collerSides.z = true;
    }   
    camera.position.y += camera.velocity.y;
    camera.collider.collided = false
    Collision();
    if(camera.collider.collided){
      camera.position.y -= camera.velocity.y;
      yAdd = 0;
      camera.collider.collerSides.y = true;
    }  else{
      camera.collider.collerSides.y = false;
    } 
}

// some variables needed in update()
add = 1;
ui = true;
let yAdd = -0.05;
let collided =false;
let startRot =0

 window.setInterval(function update() {

  // bounce pad check
   if(trampoline.collider.collided){
    yAdd =  0.5;
   

} 

   
    add++;

    //check if can fly
if(!flying){
   yAdd += -0.01; 
   yAdd = Math.max(yAdd,-0.5)
}else{
  yAdd = 0;
}

// input checkers
inputRaw = new Vector2(0,0);
if (forward){
    inputRaw.y = 0.10
  }
  if (right){
    inputRaw.x =  0.10
  }
  if (backward){
    inputRaw.y -= 0.10
  }
  if (left){
    inputRaw.x -= 0.10
  }
  if (up){
    if(flying){
      yAdd = 0.1
    }
    if(camera.collider.collerSides.y){
       yAdd += 0.2
    }
   
  }
  if (down){
    if(flying){
      yAdd = -0.1
    }
  } 
  physicsUpdate();
    fTheta += 0.1;


    // adds player velocity calculated from input
camera.velocity.x =( Math.sin(camera.rotation.x) * inputRaw.y - Math.cos(camera.rotation.x) * inputRaw.x) * speed;
camera.velocity.z = (Math.cos(camera.rotation.x) * inputRaw.y + Math.sin(camera.rotation.x) * inputRaw.x) * speed;
camera.velocity.y = yAdd;



// triangle.rotation.x =(add) / 1000 * Math.PI + Math.PI ;
   if(ui){
    LightDirection2.position = camera.position
   }else{
    LightDirection2.position.y = 1000;
   }
    
 },16);



 let timer = 0;
 let fpsCounter;
 function loop(timestamp) {
  progress = (timestamp - lastRender)
  renderObjects();
 timer += progress;
 if(timer > 100){
   fpsCounter = 1.0 /(timestamp - lastRender) * 1000
   timer = 0;
 }
 ctx.fillStyle = "white";
ctx.fillText(Math.ceil(fpsCounter), 10, 50);

 lastRender = timestamp
 window.requestAnimationFrame(loop)
}
var lastRender = 0
window.requestAnimationFrame(loop)










