
 
function MakeProjectionMatrix(){
       let MatProjOut = new Matrix4x4();
        let fNear = 0.1;
        let fFar = 1000.0;
        let fFov = 90.0;
        let fAspectRatio = canvas.width / canvas.height;
        let fFovRad = 1.0 / Math.tan(fFov * .5 / 180.0 * Math.PI);

        MatProjOut.M[0][0] = fAspectRatio * fFovRad;
        MatProjOut.M[1][1] = fFovRad;
        MatProjOut.M[2][2] = fFar / (fFar - fNear);
        MatProjOut.M[3][2] = (-fFar * fNear) / (fFar - fNear);
        MatProjOut.M[2][3] = 1.0;
    return MatProjOut;
    }



    function MatXrot( degree){
 let matRotX = new Matrix4x4();
		// Rotation X
		matRotX.M[0][0] = 1.0;
		matRotX.M[1][1] = Math.cos(degree);
		matRotX.M[1][2] = Math.sin(degree);
		matRotX.M[2][1] = Math.sin(degree)* -1.0;
		matRotX.M[2][2] = Math.cos(degree);
		matRotX.M[3][3] = 1.0;

        return matRotX;
 }



 function MatZrot( degree){
    let matRotZ = new Matrix4x4();
    	// Rotation Z
		matRotZ.M[0][0] =  Math.cos(degree);
		matRotZ.M[0][1] =  Math.sin(degree)* -1.0;
		matRotZ.M[1][0] =  Math.sin(degree);
		matRotZ.M[1][1] =  Math.cos(degree);
		matRotZ.M[2][2] = 1.0;
		matRotZ.M[3][3] = 1.0;
        return (matRotZ);
        }

       function MatYrot ( degree){
    let matrix = new Matrix4x4();
		matrix.M[0][0] =  Math.cos(degree);
		matrix.M[0][2] =  Math.sin(degree);
		matrix.M[2][0] = - Math.sin(degree);
		matrix.M[1][1] = 1.0;
		matrix.M[2][2] =  Math.cos(degree);
		matrix.M[3][3] = 1.0;
		return matrix;
        }

function Matrix_makeTranslate( i){
let matrix = new Matrix4x4();
    matrix.M[0][0] = 1.0;
    matrix.M[1][1] = 1.0;
    matrix.M[2][2] = 1.0;
    matrix.M[3][3] = 1.0;
    matrix.M[3][0] = i.x;
    matrix.M[3][1] = i.y * -1;
    matrix.M[3][2] = i.z;

    return matrix;
}

function multiplyMatrixVector( m, In){
    let Out = new Vector3();

    Out.x = In.x * m.M[0][0] + In.y * m.M[1][0] + In.z * m.M[2][0] + m.M[3][0];
    Out.y = In.x * m.M[0][1] + In.y * m.M[1][1] + In.z * m.M[2][1] + m.M[3][1];
    Out.z = In.x * m.M[0][2] + In.y * m.M[1][2] + In.z * m.M[2][2] + m.M[3][2];
    Out.w = In.x * m.M[0][3] + In.y * m.M[1][3] + In.z * m.M[2][3] + m.M[3][3];
    return Out;
}

function Matrix_multiplyMatrix  ( m1,  m2){
    let matrix = new Matrix4x4();
    for (let c = 0; c < 4; c++){
        for (let r = 0; r < 4; r++){
            matrix.M[r][c] = m1.M[r][0] * m2.M[0][c] + m1.M[r][1] * m2.M[1][c] + m1.M[r][2] * m2.M[2][c] + m1.M[r][3] * m2.M[3][c];
                }}
				return matrix;
			
                
    }

 function Matrix_MakeIdentity()
	{
		let matrix = new Matrix4x4();
		matrix.M[0][0] = 1.0;
		matrix.M[1][1] = 1.0;
		matrix.M[2][2] = 1.0;
		matrix.M[3][3] = 1.0;
		return matrix;
	}

    function Matrix_PointAt( pos, tar,  up){
    // New forward
    let newForward = Vector_Sub(tar, pos);
    newForward = Vector_normalise(newForward);

// new Up
    let a = Vector_Multi(newForward,Vector_DotProduct(up,newForward));
    let Newup = Vector_Sub(up,a);
    Newup = Vector_normalise(Newup);
// new right
let NewRight = Vector_CrossProduct(Newup,newForward);
let matrix = new Matrix4x4();
		matrix.M[0][0] = NewRight.x; 	matrix.M[0][1] = NewRight.y; 	matrix.M[0][2] = NewRight.z; 	matrix.M[0][3] = 0.0;
		matrix.M[1][0] = Newup.x;		matrix.M[1][1] = Newup.y;		matrix.M[1][2] = Newup.z;		matrix.M[1][3] = 0.0;
		matrix.M[2][0] = newForward.x;	matrix.M[2][1] = newForward.y;	matrix.M[2][2] = newForward.z;	matrix.M[2][3] = 0.0;
		matrix.M[3][0] = pos.x;			matrix.M[3][1] = pos.y;			matrix.M[3][2] = pos.z;			matrix.M[3][3] = 1.0;
		return matrix;
}

function Matrix_QuickInverse  ( m) // Only for Rotation/Translation Matrices
	{
		let matrix = new Matrix4x4();
		matrix.M[0][0] = m.M[0][0]; matrix.M[0][1] = m.M[1][0]; matrix.M[0][2] = m.M[2][0]; matrix.M[0][3] = 0.0;
		matrix.M[1][0] = m.M[0][1]; matrix.M[1][1] = m.M[1][1]; matrix.M[1][2] = m.M[2][1]; matrix.M[1][3] = 0.0;
		matrix.M[2][0] = m.M[0][2]; matrix.M[2][1] = m.M[1][2]; matrix.M[2][2] = m.M[2][2]; matrix.M[2][3] = 0.0;
		matrix.M[3][0] = -(m.M[3][0] * matrix.M[0][0] + m.M[3][1] * matrix.M[1][0] + m.M[3][2] * matrix.M[2][0]);
		matrix.M[3][1] = -(m.M[3][0] * matrix.M[0][1] + m.M[3][1] * matrix.M[1][1] + m.M[3][2] * matrix.M[2][1]);
		matrix.M[3][2] = -(m.M[3][0] * matrix.M[0][2] + m.M[3][1] * matrix.M[1][2] + m.M[3][2] * matrix.M[2][2]);
		matrix.M[3][3] = 1.0;
		return matrix;
	}
function InversScreenMatrix(x,y){
    MatrixOut = Matrix_MakeIdentity();
    if(y){
        MatrixOut.M[1][1] = -1.0;   
    }
    if(x){
        MatrixOut.M[0][0] = -1.0;    
    }
    return (MatrixOut);
}