// Set Normal.x to (multiply U.y by V.z) minus (multiply U.z by V.y)
// 	Set Normal.y to (multiply U.z by V.x) minus (multiply U.x by V.z)
// 	Set Normal.z to (multiply U.x by V.y) minus (multiply U.y by V.x)

function calculateNormal(triangle){
    let normal = new Vector3();
    normal.x = (triangle.one.y * triangle.two.z) - (triangle.one.z * triangle.two.y);
    normal.y = (triangle.one.z * triangle.two.x) - (triangle.one.x * triangle.two.z);
    normal.z = (triangle.one.x * triangle.two.y) - (triangle.one.y * triangle.two.x);
return normal;
}
function Vector_DotProduct( in0, in1){
    return( in0.x * in1.x + in0.y * in1.y + in0.z * in1.z);
}
function Vector_add( in0, in1){
  return(new Vector3(in0.x + in1.x,in0.y + in1.y,in0.z + in1.z,in0.w + in1.w))
}

function translateTo2d(vecotr3int){
    if(vecotr3int.z < 0){
      vecotr3int.z = 0;
    }
    realx = (scale *(vecotr3int.x ))/( vecotr3int.z) + screen.width / 2;
    realy = (scale *(vecotr3int.y))/( vecotr3int.z ) + screen.height / 2;
       return new Vector3(realx,realy,0)
  }
function vectorSub(in0, in1){
    return( new Vector3(in0.x - in1.x, in0.y - in1.y,in0.z - in1.z));
}


  function colorToCssColor(color){
      return ("rgb(" + color.r + "," + color.g + "," + color.b + ")");
  }

  String.prototype.convertToRGB = function(){
    if(this.length == 6){ var aRgbHex = this.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return aRgb;
    }else{
      return this; 
    }

   
}

function Vector_Div( in0, in1){
  return( new Vector3(in0.x / in1, in0.y / in1,in0.z / in1));
}
function Vector_Multi( in0, in1){
  return( new Vector3(in0.x * in1.x, in0.y * in1.y,in0.z * in1.z));
}
  function Vector_Add( in0, in1){
    return(new Vector3(in0.x + in1.x,in0.y + in1.y,in0.z + in1.z));
}
function Vector_Sub( in0, in1){
  return( new Vector3(in0.x - in1.x, in0.y - in1.y,in0.z - in1.z));
}
function Vector_normalise( in0){
  let l = VectorLenght(in0);
  return(new Vector3(in0.x / l,in0.y / l,in0.z / l));
  }

function VectorLenght( in0){
    
    return (Math.sqrt(Vector_DotProduct(in0,in0)));
}
function Vector_Multi_int( in0, in1){
  return( new Vector3(in0.x * in1, in0.y * in1,in0.z * in1));
}
function Vector_CrossProduct( in0, in1){
  let Out = new Vector3();
  Out.x = in0.y * in1.z - in0.z * in1.y;
  Out.y = in0.z * in1.x - in0.x * in1.z;
  Out.z = in0.x * in1.y - in0.y * in1.x;
  return Out;

}
function vectorDistance(in0,in1){
  return(Math.sqrt(  (in0.x - in1.x) *  (in0.x - in1.x) + (in0.y - in1.y) *  (in0.y - in1.y) + (in0.z - in1.z) *  (in0.z - in1.z)))
}
  function DisplayTriangle(triangle){
         ctx.beginPath();
         ctx.moveTo(triangle.one.x, triangle.one.y)
         ctx.lineTo(triangle.two.x, triangle.two.y);
         ctx.lineTo(triangle.three.x,triangle.three.y);
         ctx.lineTo(triangle.one.x, triangle.one.y);
        // ctx.fillStyle = "rgba(255, 255, 255,255)"
         ctx.closePath();
         if(drawWire ){
           ctx.stroke();
         }else{
           ctx.fill();
         }
  }

  function set_brightness(hex, percent){
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(hex.length == 3){
        hex = hex.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);
    return 'rgba' +"(" + Math.floor(Math.max(0,r * percent)).toString()+ "," +  Math.floor(Math.max(0,g * percent)).toString()+ "," +  Math.floor(Math.max(0,b * percent)).toString() + ",1)"
}
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);


function calculateLight(Normal,trianglePos,hex,format = false) {
  let dpintR = 0,dpintG = 0,dpintB = 0;
  Lights.map(CurLight =>{
    
    if(CurLight.type == "global"){
      if(CurLight.color){
        let dpint = Math.min(Math.max(Vector_DotProduct(CurLight.direction,Normal),0),1); 
        dpintR += dpint *CurLight.color.r / 255 * CurLight.brightness / 100   ;
        dpintG += dpint *CurLight.color.g / 255  * CurLight.brightness / 100 ;
        dpintB += dpint *CurLight.color.b / 255  * CurLight.brightness / 100 ;
      }else{
        let dpint = Math.max(Vector_DotProduct(CurLight.direction,Normal),0); 
        dpintR += dpint;dpintG += dpint;dpintB += dpint;
      }
      
    }else if(CurLight.type == "spot"){
      if(CurLight.color){
        let dpint = Math.min(1,Math.max(0, 2- (VectorLenght(vectorSub(trianglePos,CurLight.position) ) /10 *(1/(CurLight.distence / 10)) )))  ;
      
        dpintR += dpint *CurLight.color.r / 255 * CurLight.brightness / 100  ;
        dpintG += dpint *CurLight.color.g / 255 * CurLight.brightness / 100  ;
        dpintB += dpint *CurLight.color.b / 255 * CurLight.brightness / 100  ;
      } else{
        let dpint = Math.max(0,1- (VectorLenght(vectorSub(trianglePos,CurLight.position) ) /10 *(1/(CurLight.distence / 10)) ) )  ;
      dpintR += dpint,dpintG += dpint,dpintB += dpint;
      }
      
      
    }
    
  }
);
  


 // strip the leading # if it's there
 hex = hex.replace(/^\s*#|\s*$/g, '');

 // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
 if(hex.length == 3){
     hex = hex.replace(/(.)/g, '$1$1');
 }

 var r = parseInt(hex.substr(0, 2), 16),
     g = parseInt(hex.substr(2, 2), 16),
     b = parseInt(hex.substr(4, 2), 16);
     if(format){
        return new color(Math.floor(Math.max(0,r * dpintR)).toString(), Math.floor(Math.max(0,g * dpintG)).toString(),  Math.floor(Math.max(0,b * dpintB)).toString());

     }else{
      return "rgb(" + Math.floor(Math.max(0,r * dpintR)).toString()+","+ Math.floor(Math.max(0,g * dpintG)).toString()+","+  Math.floor(Math.max(0,b * dpintB)).toString() + ")";

     }
}


function MatrixTripMath(Mat3x3,vec){
  let out = new Vector3();
  out.x =Mat3x3.x.x*vec.x +Mat3x3.x.y*vec.y +Mat3x3.x.z*vec.z;
  out.y =Mat3x3.y.x*vec.x +Mat3x3.y.y*vec.y +Mat3x3.y.z*vec.z;
  out.z =Mat3x3.z.x*vec.x +Mat3x3.z.y*vec.y +Mat3x3.z.z*vec.z;


return out;
}

let draw_line = (one,two,data,color) => {
  // Calculate "deltas" of the line (difference between two ending points)
  let dx = two.x - one.x;
  let dy = two.y - one.y;
  // Calculate the line equation based on deltas
  let D = (2 * dy) - dx;
  let y = one.y;
  // Draw the line based on arguments provided
if(two.x < Infinity){
  for (let x = one.x; x < two.x; x++)
  { 
      // Place pixel on the raster display
      data[(x +  y * x) * 4] = 255;
      data[(x +  y * x) * 4] = 0;
      data[(x +  y * x) * 4] = 0;
      data[(x +  y * x) * 4] = 255;
      if (D >= 0)
      {
           y = y + 1;
           D = D - 2 * dx;
      }
      D = D + 2 * dy;
  }}
};