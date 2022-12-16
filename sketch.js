let noiseScale = 0.02;
let b1, b2, c1, c2;
var t;
var x = 0;


let Sound, amplitude;
//1.预读器（新建函数用来读取上传的音频）
function preload() {
  Sound = loadSound('sound.mp3');
}


class Particle {
  // setting the co-ordinates, radius and the
  // speed of a particle in both the co-ordinates axes.
  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.r = random(1, 8);
    this.xSpeed = random(-4, 4);
    this.ySpeed = random(-1, 2.5);
  }

  // creation of a particle.
  createParticle() {
    noStroke();
    fill('rgba(220,0,0,0.3)');//節點
    circle(this.x, this.y, this.r);
  }

  // setting the particle in motion.
  moveParticle() {
    if (this.x < 0 || this.x > width)
      this.xSpeed *= -1;
    if (this.y < 0 || this.y > height)
      this.ySpeed *= -1;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  // this function creates the connections(lines)
  // between particles which are less than a certain distance apart
  joinParticles(particles) {
    particles.forEach(element => {
      let dis = dist(this.x, this.y, element.x, element.y);
      if (dis < 85) {
        strokeWeight(2)
        stroke('rgba(220,0,0,0.3)');//線的顏色
        line(this.x, this.y, element.x, element.y);
      }
    });
  }
}

// an array to add multiple particles
let particles = [];


function setup() {
  createCanvas(windowWidth, windowHeight)
  t = 0
  for (let i = 0; i < width / 5; i++) {
    particles.push(new Particle());
  }
  amplitude = new p5.Amplitude();
  fft = new p5.FFT();
  frameRate(20);//变化频率
}

let zoff = 0.0;
let yoff = 0.0;


function draw() {



  background('#0f0f0f');
  for (let i = 0; i < particles.length; i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }
  Musicp()
  Musicw()
  BC()
  RT()
  PT()

  beginShape();//繪製圖形，可以指定很多模式
  let xoff = 0;
  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xoff, yoff), 0, 1, 200, 400) * 2.5;
    let z = map(noise(xoff, yoff, zoff), 0, 1, 0, 255);
    noStroke();
    fill(z, 0, 0);
    square(x, y, 5);
    vertex(x, y);
    xoff += 0.05;
    fill(255, 0, 0);
  }
  yoff += 0.01;

  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);//紅海波動

  //background(0);
  for (let x = 0; x < width; x++) {
    let noiseVal = noise((mouseX + x) * noiseScale, mouseY * noiseScale);
    stroke(0, 0, 0);
    rect(x, mouseY + noiseVal * 200, x, height);
    fill(255, 0, 0)
  }//滑鼠紅線


}

function BC() {
  strokeWeight(2)//線的粗度
  noFill()

  for (var i = 0; i < 500; i += 100) {
    beginShape()
    let rr = (400 - i) * 0.8;
    // ellipse(0, 0, width-i);
    /*1. 設定顏色 */

    /*2. 改變波型數量: 360 -> 100 ; 改變角度(ang)設定  ; Vertex -> curveVertex */
    for (var o = 0; o < 300; o += 3) {
      stroke('rgba(0,0,255,0.7)')
      let ang = o / (1.2 + i / 2000) + frameCount / (40 + o);
      curveVertex(cos(ang) * rr + width / 2, sin(ang) * rr + height / 2)
    }


    endShape()
  }
}

function RT() {
  strokeWeight(2)
  noFill()

  for (var i = 0; i < 350; i += 100) {
    beginShape()
    let rr = (300 - i) * 0.8;
    // ellipse(0, 0, width-i);
    /*1. 設定顏色 */
    let y = 100
    /*2. 改變波型數量: 360 -> 100 ; 改變角度(ang)設定  ; Vertex -> curveVertex */
    for (var o = 0; o < y; o += 3) {
      stroke('rgba(255,0,0,0.7)')
      let ang = o / (1.2 + i / 2000) + frameCount / (40 + o);
      curveVertex(cos(ang) * rr + 400, sin(ang) * rr + 100)
      y = 100 + 0.5 * o
    }


    endShape()
  }
}

function PT() {
  strokeWeight(2)
  noFill()

  for (var i = 0; i < 300; i += 100) {
    beginShape()
    let rr = (200 - i) * 0.8;
    // ellipse(0, 0, width-i);
    /*1. 設定顏色 */
    let r = 100
    /*2. 改變波型數量: 360 -> 100 ; 改變角度(ang)設定  ; Vertex -> curveVertex */
    for (var o = 0; o < r; o += 3) {
      stroke('rgba(180,0,255,0.7)')
      let ang = o / (1.2 + i / 2000) + frameCount / (40 + o);
      curveVertex(cos(ang) * rr + 1200, sin(ang) * rr + 600)//+數字移位置
      r = 100 + 0.5 * o
    }


    endShape()
  }
}

function Musicp() {
  fill(random(255), 0, 0);
  noStroke()
  //映射振幅,并转换成图形
  let level = amplitude.getLevel();
  //振幅是0-1的，画布为400x400，振幅最高不能超过400
  let r = map(level, 0, 1, 0, 400);
  ellipse(0, height / 2 - r / 2, r, r);
  ellipse(width, height / 2 - r / 2, r, r);
}

function Musicw() {
  let waveform = fft.waveform();
  noFill();
  stroke(0, 255, 0);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);

    let y = map(waveform[i], -1, 1, 0, height);
    //line(i,160,i,y);
    vertex(x, y);
  }
  endShape();
}

function mousePressed() {
  if (Sound.isPlaying()) {
    Sound.pause();
  } else {
    Sound.play();
    background(255, 255, 0);
  }
}

