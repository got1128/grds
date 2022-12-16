//定义变量
//Sound--声音, amplitude--振幅
let Sound, amplitude;
//1.预读器（新建函数用来读取上传的音频）
function preload() {
    Sound = loadSound('sound.mp3');
}
//2.初始化
function setup() {
    createCanvas(400, 400);
    amplitude = new p5.Amplitude();
    //将振幅生成线
    noStroke();
}
//3.开始绘制
function draw() {
    background(0.5);
    //自由填充颜色
    fill(255, random(255), random(255));
    //映射振幅,并转换成图形
    let level = amplitude.getLevel();
    //振幅是0-1的，画布为400x400，振幅最高不能超过400
    let r = map(level, 0, 1, 0, 400);
    ellipse(width / 2, height / 2, r, r);
}
//4.点击按钮播放/停止
function mousePressed() {
    if (Sound.isPlaying()) {
        Sound.pause();
    } else {
        Sound.play();
        background(255, 255, 0);
    }
}
