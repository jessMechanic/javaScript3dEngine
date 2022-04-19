fTheta = 0;
colors = ["#2e1d66", "#010101"]
let drawWire = false;
let rawInput = new Vector2();
scale = 1000;
speed = 1.6;
// generate an icosphere with 4 subdivisions
let forward;
let backward;
let left;
let right;

let up = false;
let down = false;

let flying = true;

let height = 1080;
let width = 1920;

canvas.height = height;
canvas.width = width;
frame.height = height;
frame.width = width;


let cube = new Mesh([
    new Vector3(-.5, -.5, -.5),
    new Vector3(0.5, -.5, -.5),
    new Vector3(0.5, 0.5, -.5),
    new Vector3(-.5, 0.5, -.5),
    new Vector3(-.5, 0.5, 0.5),
    new Vector3(0.5, 0.5, 0.5),
    new Vector3(0.5, -.5, 0.5),
    new Vector3(-.5, -.5, 0.5),
], [0, 1, 2, //face front
    0, 2, 3,
    2, 3, 4, //face top
    2, 4, 5,
    1, 5, 2, //face right
    1, 6, 5,
    0, 4, 7, //face left
    0, 3, 4,
    5, 7, 4, //face back
    5, 6, 7,
    0, 6, 7, //face bottom
    0, 1, 6
]);

let piramid = new Mesh([
    new Vector3(-.5, 0, -.5),
    new Vector3(0.5, 0, -.5),
    new Vector3(.5, 0, .5),
    new Vector3(-0.5, 0, .5),
    new Vector3(0, .7, 0)
], [0, 2, 3,
    0, 1, 2,




    0, 1, 4,
    1, 2, 4,
    2, 3, 4,
    0, 3, 4
]);
let quad = new Mesh([new Vector3(-.5, 0, -.5),
    new Vector3(-.5, 0, 0.5),
    new Vector3(0.5, 0, 0.5),
    new Vector3(0.5, 0, -0.5),
], [
    0, 1, 2,
    0, 2, 3
])
let cubeTrans = new Mesh([
    new Vector3(-.5, -.5, -.5),
    new Vector3(0.5, -.5, -.5),
    new Vector3(0.5, 0.5, -.5),
    new Vector3(-.5, 0.5, -.5),
    new Vector3(-.5, 0.5, 0.5),
    new Vector3(0.5, 0.5, 0.5),
    new Vector3(0.5, -.5, 0.5),
    new Vector3(-.5, -.5, 0.5),
], [0, 2, 1, //face front
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
    0, 1, 6
]);;
let planeMesh;
new lightSource("global", new Vector3(0.5, -0.5, 0.5));
new lightSource("global", new Vector3(-0.5, 0.5, -0.5));


let RedLight = new lightSource("spot", 0, new Vector3(2, 2, -0.5));
RedLight.distence = 2;
RedLight.color = new color(100, 0, 0);
let RedLight1 = new lightSource("spot", 0, new Vector3(0.5, 2, -0.5));
RedLight.distence = 2;
RedLight.color = new color(100, 0, 0);
let RedLight2 = new lightSource("spot", 0, new Vector3(1.5, 2, -0.5));
RedLight.distence = 2;
RedLight.color = new color(100, 0, 0);
let RedLight3 = new lightSource("spot", 0, new Vector3(5, 2, -0.5));
RedLight.distence = 2;
RedLight.color = new color(100, 0, 0);


let BlueLight = new lightSource("spot", 0, new Vector3(0, 2, 5));
BlueLight.distence = 3;
BlueLight.color = new color(0, 0, 100)


let GreenLight = new lightSource("spot", 0, new Vector3(5, 2, 2.5));
GreenLight.distence = 3;
GreenLight.color = new color(0, 100, 0)

let LightDirection2 = new lightSource("spot", new Vector3(-0.5, 100, -0.5));
LightDirection2.distence = 5;
LightDirection2.brightness = 40;
LightDirection2.color = new color(245, 203, 159)




function plane(size) {
    let verticesInt = [];




    for (let z = 0; z < size + 1; z++) {
        for (let x = 0; x <= size; x++) {
            verticesInt.push(new Vector3(x, 0, z));
        }

    }
    let trainglesInt = [];
    let add = 0;
    for (let z = 0; z < size + 2; z++) {
        for (let x = 0; x < size; x++) {
            trainglesInt.push(x + size * z + add);
            trainglesInt.push(x + 1 + size * z + add);
            trainglesInt.push(x + 1 + size * (z + 1) + add);
            trainglesInt.push(x + 1 + size * (z + 1) + add);
            trainglesInt.push(x + 1 + size * z + add);
            trainglesInt.push(x + 2 + size * (z + 1) + add);
        }
        add++;
    }


    outMesh = new Mesh(verticesInt, trainglesInt)

    return (outMesh)

}


let trampoline = new gameObject("cube", new Vector3(-5, -0.7, -5), new Vector3(), plane(4));
trampoline.collider = new collider();
trampoline.collider.mesh = plane(4);
trampoline.mesh.color = "#FF5500"
trampoline.scale = new Vector3(0.5, 0.5, 0.5)


let cubeObject1 = new gameObject("cube", new Vector3(3, -1, 0), new Vector3(), cube);
cubeObject1.collider = new collider();
cubeObject1.collider.mesh = cube;

let cubeObject2 = new gameObject("cube", new Vector3(1, -2, -1), new Vector3(), cube);
cubeObject2.collider = new collider();
cubeObject2.collider.mesh = cube;

let floar = new gameObject("floor", new Vector3(-10, 0, -10), new Vector3(), plane(40))
floar.collider = new collider();
floar.collider.mesh = plane(40);
floar.mesh.color = "#FFFFFF"

let camera = new gameObject("camera", new Vector3(0, 2, -5), new Vector3(), new Mesh())
camera.collider = new collider();
camera.collider.mesh.Vertices = [new Vector3(-.5, -2, -.5), new Vector3(.5, 1, .5)]


function toScreenCordination(vector2) {
    vector2.y = canvas.height / 2 + vector2.y;
    vector2.x = canvas.width / 2 + vector2.x;
    return vector2;
}

function callRotate(rotation) {
    let pitch = rotation.x;
    let yaw = rotation.y;
    let roll = rotation.z;

    var cosa = Math.cos(yaw);
    var sina = Math.sin(yaw);

    var cosb = Math.cos(pitch);
    var sinb = Math.sin(pitch);

    var cosc = Math.cos(roll);
    var sinc = Math.sin(roll);

    var Axx = cosa * cosb;
    var Axy = cosa * sinb * sinc - sina * cosc;
    var Axz = cosa * sinb * cosc + sina * sinc;

    var Ayx = sina * cosb;
    var Ayy = sina * sinb * sinc + cosa * cosc;
    var Ayz = sina * sinb * cosc - cosa * sinc;

    var Azx = -sinb;
    var Azy = cosb * sinc;
    var Azz = cosb * cosc;
    Ax = new Vector3(Axx, Axy, Axz);
    Ay = new Vector3(Ayx, Ayy, Ayz)
    Az = new Vector3(Azx, Azy, Azz)
    return (new Vector3(Ax, Ay, Az));

}

function renderObjects() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
    RealTriangles = [];
    colorsint = [];

    vectorRotateVarX = callRotate(new Vector3(camera.rotation.x, 0, 0));
    vectorRotateVarZ = callRotate(new Vector3(0, 0, camera.rotation.z));

    gameObjects.map(object => {
        let vectorRotateVar = callRotate(object.rotation);

        let Vertices = object.mesh.Vertices;
        let Triangles = object.mesh.Triangles;

        Triangles = object.mesh.Triangles;
        for (i = 0; i < Math.round(object.mesh.Triangles.length / 3); i++) {
            if (typeof(object.mesh.color) != "undefined") {
                currentColor = object.mesh.color;
            } else { currentColor = colors[i % colors.length]; }


            // the real calculation of the triangles
            if (typeof(Vertices[Triangles[i * 3 + 2]]) != "undefined") {

                let x = Vertices[Triangles[i * 3]];
                let y = Vertices[Triangles[i * 3 + 1]];
                let z = Vertices[Triangles[i * 3 + 2]];

                x = Vector_Multi(x, object.scale);
                y = Vector_Multi(y, object.scale);
                z = Vector_Multi(z, object.scale);

                if (!(object.rotation == new Vector3())) {
                    x = MatrixTripMath(vectorRotateVar, x);
                    y = MatrixTripMath(vectorRotateVar, y);
                    z = MatrixTripMath(vectorRotateVar, z);

                }

                x = Vector_add(x, object.position);
                y = Vector_add(y, object.position);
                z = Vector_add(z, object.position);



                line1 = Vector_Sub(y, x);
                line2 = Vector_Sub(z, x);

                normal = Vector_CrossProduct(line1, line2);

                normal = Vector_normalise(normal);

                let color = calculateLight(normal, y, currentColor)

                let vCameraRay = Vector_Sub(x, camera.position);
                //checks wich triangle needs to be renderend and calculated further
                if (Vector_DotProduct(normal, vCameraRay) > 0.0) {


                    let xtrans = Vector_add(x, new Vector3(-camera.position.x, camera.position.y, -camera.position.z));
                    let ytrans = Vector_add(y, new Vector3(-camera.position.x, camera.position.y, -camera.position.z));
                    let ztrans = Vector_add(z, new Vector3(-camera.position.x, camera.position.y, -camera.position.z));

                    xtrans = MatrixTripMath(vectorRotateVarX, xtrans);
                    ytrans = MatrixTripMath(vectorRotateVarX, ytrans);
                    ztrans = MatrixTripMath(vectorRotateVarX, ztrans);



                    xtrans = MatrixTripMath(vectorRotateVarZ, xtrans);
                    ytrans = MatrixTripMath(vectorRotateVarZ, ytrans);
                    ztrans = MatrixTripMath(vectorRotateVarZ, ztrans);

                    if (xtrans.z < 0) {
                        xtrans.z = 0;
                    }
                    if (ytrans.z < 0) {
                        ytrans.z = 0;
                    }
                    if (ztrans.z < 0) {
                        ztrans.z = 0;
                    }

                    let xproj = new Vector3();
                    let yproj = new Vector3();
                    let zproj = new Vector3();

                    xproj.x = Math.floor((scale * (xtrans.x)) / (xtrans.z)) + width / 2;
                    xproj.y = Math.floor((scale * (xtrans.y)) / (xtrans.z)) + height / 2;

                    yproj.x = Math.floor((scale * (ytrans.x)) / (ytrans.z)) + width / 2;
                    yproj.y = Math.floor((scale * (ytrans.y)) / (ytrans.z)) + height / 2;

                    zproj.x = Math.floor((scale * (ztrans.x)) / (ztrans.z)) + width / 2;
                    zproj.y = Math.floor((scale * (ztrans.y)) / (ztrans.z)) + height / 2;





                    let triangle = new triangleInt(
                        xproj,
                        yproj,
                        zproj,
                        (Math.sqrt(xtrans.x ** 2 + xtrans.y ** 2 + xtrans.z ** 2)), object, normal, color)

                    triangle.originObject = x;
                    RealTriangles.push(triangle);





                }
            }



        }


    });
    // sorts triangles on distance
    RealTriangles.sort((a, b) => a.distance > b.distance && -1 || 1);
    for (i = 0; i < RealTriangles.length; i++) {
        let color = RealTriangles[i].color;


        // line(RealTriangles[i].one.x, RealTriangles[i].one.y, RealTriangles[i].two.x, RealTriangles[i].two.y,data)

        ctx.beginPath();
        ctx.moveTo(RealTriangles[i].one.x, RealTriangles[i].one.y)
        ctx.lineTo(RealTriangles[i].two.x, RealTriangles[i].two.y);
        ctx.lineTo(RealTriangles[i].three.x, RealTriangles[i].three.y);
        ctx.lineTo(RealTriangles[i].one.x, RealTriangles[i].one.y);
        ctx.closePath();
        if (drawWire) {
            ctx.strokeStyle = "#fff";
            ctx.stroke();
        } else {
            ctx.fillStyle = color;
            ctx.fill();
        }
    }
}


function Collision() {
    camera.collider.collided = false;
    gameObjects.map(object => {
        if (object.collider != null && object != camera) {
            currentColor = object.mesh.color
            object.collider.collided = false;

            // check foreach point if between min and max of camera
            object.collider.mesh.Vertices.map(point => {
                min = camera.collider.mesh.Vertices[0];
                max = camera.collider.mesh.Vertices[1];
                camPos = camera.position;
                obPos = object.position;
                let x = false;
                let y = false;
                let z = false;
                if ((point.x * object.scale.x) + obPos.x >= min.x + camPos.x && max.x + camPos.x >= (point.x * object.scale.x) + obPos.x) { x = true }
                if ((point.y * object.scale.y) + obPos.y >= min.y - camPos.y && max.y - camPos.y >= (point.y * object.scale.y) + obPos.y) { y = true }
                if ((point.z * object.scale.z) + obPos.z >= min.z + camPos.z && max.z + camPos.z >= (point.z * object.scale.z) + obPos.z) { z = true }
                if (x && y && z) {
                    object.collider.collided = true;
                    camera.collider.collided = true;
                    camera.collider.collerSides = new Vector3(x, y, z);
                }

            });
        }



    });
}

function physicsUpdate() {
    //add x velocity
    camera.position.x -= camera.velocity.x;
    camera.collider.collided = false;

    // check for collision
    Collision();

    // moves back if collided
    if (camera.collider.collided) {
        camera.position.x += camera.velocity.x;
        camera.collider.collerSides.x = true;
    }
    camera.position.z += camera.velocity.z;
    camera.collider.collided = false
    Collision();
    if (camera.collider.collided) {
        camera.position.z -= camera.velocity.z;
        camera.collider.collerSides.z = true;
    }
    camera.position.y += camera.velocity.y;
    camera.collider.collided = false
    Collision();
    if (camera.collider.collided) {
        camera.position.y -= camera.velocity.y;
        yAdd = 0;
        camera.collider.collerSides.y = true;
    } else {
        camera.collider.collerSides.y = false;
    }
}

// some variables needed in update()
add = 1;
ui = true;
let yAdd = -0.05;
let collided = false;
let startRot = 0

window.setInterval(function update() {

    // bounce pad check
    if (trampoline.collider.collided) {
        yAdd = 0.5;


    }


    add++;

    //check if can fly
    if (!flying) {
        yAdd += -0.01;
        yAdd = Math.max(yAdd, -0.5)
    } else {
        yAdd = 0;
    }

    // input checkers
    inputRaw = new Vector2(0, 0);
    if (forward) {
        inputRaw.y = 0.10
    }
    if (right) {
        inputRaw.x = 0.10
    }
    if (backward) {
        inputRaw.y -= 0.10
    }
    if (left) {
        inputRaw.x -= 0.10
    }
    if (up) {
        if (flying) {
            yAdd = 0.1
        }
        if (camera.collider.collerSides.y) {
            yAdd += 0.2
        }

    }
    if (down) {
        if (flying) {
            yAdd = -0.1
        }
    }
    physicsUpdate();
    fTheta += 0.1;


    // adds player velocity calculated from input
    camera.velocity.x = (Math.sin(camera.rotation.x) * inputRaw.y - Math.cos(camera.rotation.x) * inputRaw.x) * speed;
    camera.velocity.z = (Math.cos(camera.rotation.x) * inputRaw.y + Math.sin(camera.rotation.x) * inputRaw.x) * speed;
    camera.velocity.y = yAdd;



    // triangle.rotation.x =(add) / 1000 * Math.PI + Math.PI ;
    if (ui) {
        LightDirection2.position = camera.position
    } else {
        LightDirection2.position.y = 1000;
    }

}, 16);



let timer = 0;
let fpsCounter;


function loop(timestamp) {
    progress = (timestamp - lastRender)
    renderObjects();
    timer += progress;
    if (timer > 100) {
        fpsCounter = 1.0 / (timestamp - lastRender) * 1000
        timer = 0;
    }
    ctx.fillStyle = "white";
    ctx.fillText(Math.ceil(fpsCounter), 10, 50);
    frameCTX.drawImage(canvas, 0, 0)
    lastRender = timestamp
    window.requestAnimationFrame(loop)
}
var lastRender = 0
window.requestAnimationFrame(loop)
renderObjects();