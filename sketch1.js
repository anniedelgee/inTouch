let r = 200; //RADIUS
//let r; //for bumpysphere esp.

let density;
let densitySlider;

let thetaMax, phiMax;
let thetaMaxSlider, phiMaxSlider;

let frequency, frequency2;
let freqSlider, freqSlider2;


let bumpSlider, thetaSlider, phySlider;
let bumpiness, thetaValue, phyValue;


function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB);
  
  stroke(199, 80, 88);
  strokeWeight(3);
  noFill();
  
  
  thetaMax= createDiv();
  thetaMaxSlider = createSlider(0, 360, 360, 10) //min max default step size
  thetaMax.class("valueDisplay");
  thetaMaxSlider.class("Slider");
  
  phiMax= createDiv();
  phiMaxSlider = createSlider(0, 180, 180, 10) //min max default step size
  phiMax.class("valueDisplay");
  phiMaxSlider.class("Slider");
  
  density= createDiv();
  densitySlider = createSlider(3, 62, 24, 1) //min max default step size
  density.class("valueDisplay");
  densitySlider.class("Slider");

  frequency= createDiv();
  freqSlider = createSlider(1, 10, 1, 0.01) //min max default step size
  frequency.class("valueDisplay");
  freqSlider.class("Slider");

  frequency2= createDiv();
  freqSlider2 = createSlider(1, 10, 1, 0.01) //min max default step size
  frequency2.class("valueDisplay");
  freqSlider2.class("Slider");

  //bumpysphere tingz
  r = width/3;

  bumpiness = createDiv();
  bumpiness.class("valueDisplay");
  bumpSlider = createSlider(0, 1.5, 0.2, 0.01);
  bumpSlider.class("Slider");

  thetaValue = createDiv();
  thetaValue.class("valueDisplay");
  thetaSlider = createSlider(0, 10, 6, 0.1);
  thetaSlider.class("Slider");

  phyValue = createDiv();
  phyValue.class("valueDisplay");
  phySlider = createSlider(0, 10, 5, 0.1);
  phySlider.class("Slider");

  pixelDensity(1);
}

function draw() {
  //background(230, 50, 15);
  clear();
  orbitControl(4, 4); //mouse control
  
  rotateX(65);
  //rotateY(90);
  //rotateZ(65);
  
  //normalSphere();
  //sphericalSpiral();
 lissajous_3D();
 //bumpySphere();

  thetaMax.html("Theta max value: "+ thetaMaxSlider.value());
  phiMax.html("Phi max value: "+ phiMaxSlider.value());
  
    let displayDensity = int(map(densitySlider.value(), 33, 62, 1, 60));
  density.html("Density value: " + displayDensity);
  
  frequency.html("Frequency value: "+ freqSlider.value());
  frequency2.html("Frequency 2 value: "+ freqSlider2.value());
}

// all my many sphereszz
function normalSphere() {
    for(let phi = 0; phi < phiMaxSlider.value(); phi += 180/densitySlider.value()){
    beginShape();
    for(let theta = 0; theta < thetaMaxSlider.value(); theta += 360/densitySlider.value()){
      let x = r *cos(phi);
      let y = r *sin(phi) *sin(theta);
      let z = r *sin(phi) *cos(theta);
      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
   
}

function sphericalSpiral() {
    beginShape();
    for(let theta = 0; theta < thetaMaxSlider.value()/2; theta += 0.1){
      let x = r *cos(theta);
      let y = r *sin(theta) *sin(theta*densitySlider.value());
      let z = r *sin(theta) *cos(theta*densitySlider.value());
      vertex(x, y, z);
    }
    endShape(LINES);
   
}

function lissajous_3D() {
    beginShape();
    for(let theta = 0; theta < 360; theta += 0.2){
      let x = r *cos(theta*freqSlider.value());
      let y = r *sin(theta*freqSlider.value()) *sin(theta*freqSlider2.value());
      let z = r *sin(theta*freqSlider.value()) *cos(theta*freqSlider2.value()); //alter these to change number of lines composing sphere
      vertex(x, y, z);
    }
    endShape(LINES);
   
}

function bumpySphere() {
    //for(let phi = 0; phi < phiMaxSlider.value(); phi += 2){
    beginShape(POINTS);
    for(let theta = 0; theta < 180; theta += 2){
        for(let phy = 0; phy <360; phy =+ 2){
            let x = r *(1+bumpSlider.value()*sin(thetaSlider.value()*theta)*sin(phySlider.value()*phy)) *sin(1*theta) *cos(phy);
            let y = r *(1+bumpSlider.value()*sin(thetaSlider.value()*theta)*sin(phySlider.value()*phy)) *sin(1*theta) *sin(phy);
            let z = r *(1+bumpSlider.value()*sin(thetaSlider.value()*theta)*sin(phySlider.value()*phy)) *cos(1*theta);
            /*
            let x = r * (1+sin(theta*6)*sin(phi*2)) * cos(phi);
            let y = r * (1+sin(theta*6)*sin(phi*2)) * sin(phi) * sin(theta);
            let z = r * (1+sin(theta*6)*sin(phi*2)) * sin(phi) * cos(theta); */
      //alter arbitrary numbers to make irregular figures. theta integer = horizontal, phi integer - vertical. 1 for both = normal sphere
      //ater first number to get biggest charnges in overall shape
      //first number changes radius
      vertex(x, y, z);
     }
    }
    endShape();


  bumpiness.html("bumpiness: " + bumpSlider.value());
  thetaValue.html("theta value: " + thetaSlider.value());
  phyValue.html("phy value: " + phySlider.value());
  }
