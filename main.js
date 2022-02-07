video ="";
status ="";
object= [];

function preload(){
    video = createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas = createCanvas(480 , 380);
    canvas.center();
}

function gotresult(error , results){
    if(error){
        console.error(error);
    }

    else{
        console.log(results);
        object = results;
    }
}

 function draw(){
     image(video , 0 , 0 , 480 , 380);
     if(status != ""){
         objectDetector.detect(video , gotresult);
         for(i=0 ; i < object.length ; i ++){
             document.getElementById("status").innerHTML = "Status : object detecting";
             document.getElementById("number_of_objects") .innerHTML = "Number of objects detected :" + object.length;

             percent = floor(object[i].confidence * 100);
             fill("#FF0000");
             text(object[i].label + " " + percent + "%" , object[i].x + 15 , object[i].y + 15);
             noFill();
             stroke("#FF0000");
             rect(object[i].x , object[i].y , object[i].width , object[i].height);
         }
     }
 }

 function start(){
     objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
     document.getElementById("status").innerHTML = "Status : detecting object";
 }

 function modelLoaded(){
     status = true;
     console.log("modelLoaded");
     video.loop();
     video.speed(1);
     video.volume(0);
 }

 