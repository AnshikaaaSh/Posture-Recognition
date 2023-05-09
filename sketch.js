let capture;
let posenet;
let noseX, noseY;
let reyeX, reyeY;
let leyeX, leyeY;
let singlePose;
let skeleton;

let spects, smoke;



function setup() {
    createCanvas(600,450);
    capture = createCapture(VIDEO)
    capture.hide()

    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);


    spects=loadImage('images/spects.png');
    smoke=loadImage('images/cigar.png');
}

function receivedPoses(poses) {
    console.log(poses);

    if(poses.length > 0){
        singlePose = poses[0].pose;
        skeleton= poses[0].skeleton;

    }

    console.log(noseX + " " + noseY);
}

function modelLoaded() {
    console.log('model has loaded');
}


function draw() {
    image(capture, 0, 0);
    fill(655, 0,0);
    
    if(singlePose) {


        for(let i =0; i<singlePose.keypoints.length; i++){
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y, 10);
        }

        image(spects, singlePose.nose.x-75, singlePose.nose.y-60,150,90);
        image(smoke, singlePose.nose.x-39, singlePose.nose.y+35, 40,40);

        stroke(255,255,255);
        strokeWeight(3)
        for(let j=0; j< skeleton.length; j++) {
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y);
        }

        
    }
}