const canvas = document.getElementById("canvas");
const frame = document.getElementById("frame");
const frameCTX = frame.getContext("2d");
const ctx = canvas.getContext("2d");

let gameObjects = [];
let Lights = [];

class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        return this;


    }
}
class triangleInt {
    constructor(x, y, z, distanceINt, objectInt = null,Normal = new Vector3(), colorInt = "#a8329e") {
        this.one = x;
        this.two = y;
        this.three = z;
        this.distance = distanceINt;
        this.color = colorInt;
        this.originObject = objectInt;
        this.NormaL = Normal;
        return this;


    }
}

    class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = 1;
        return this;


    }
}
class Mesh {
    constructor(pointsInt = [], vertecis = []) {
        this.Vertices = pointsInt;
        this.Triangles = vertecis;
        this.color;
        return this;
    }
}
class collider {
    constructor() {
        this.mesh = new Mesh();
        this.collided = false;
        this.collerSides = new Vector3(false, false, false);
        this.Min;
        this.Max;
        this.oncollision;
        this.oncollisionint;

    }
}
function transfrom(pos = new Vector3(),trans = new Vector3(),veloc = new Vector3()){


    return this
}
class gameObject {
    constructor(nameint = "default", positionint = new Vector3(), rotation = new Vector3(), meshINt = "not devined") {
        this.name = nameint;
        this.position = positionint;
        this.mesh = meshINt;
        this.rotation = rotation;
        this.velocity = new Vector3();
        this.scale = new Vector3(1, 1, 1);
        this.wireFrame = false;
        this.collider = new collider();
        this.IsKinematic = false;
        gameObjects[gameObjects.length] = this;
        return this;
    }
}

class lightSource {
    constructor(typeInt = "global",directionInt , positionint = new Vector3(),Bright = 100,color = false) {
        this.type = typeInt;
        this.direction = Vector_normalise(directionInt);
        this.position = positionint;
        this.brightness = Bright;
        this.color = color;
        this.distence = 1;
        Lights[Lights.length] = this;
        return this;
    }
}
class Matrix4x4 {
    constructor() {
        this.M = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    }
}
class color {
    constructor(r = 0, g = 0, b = 0) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = 255;
        return this;
    }
}