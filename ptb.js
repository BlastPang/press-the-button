var press, pause;


var imgBackground = new Image();
imgBackground.src = "background.jpg";

var tutorial = new Image();
tutorial.src = "tutorial.jpg";

var Game_STATE_READY = 0;
var Game_STATE_GAME = 1;
var Game_STATE_OVER = 2;
var Game_STATE_PAUSE = 3;

var time = 10, intTime = time, intervalID;
var GameState = Game_STATE_READY;

var ingame_audio = new Audio();
ingame_audio.src = 'bgm.mp3';
ingame_audio.load();

var presscount = 0;

window.onload = function() {
	theCanvas = document.getElementById("canvas");
	Context = theCanvas.getContext("2d");


	drawScreen();           
}
            
window.onkeydown = function (e) {
    if( e.keyCode == 13 ) { 
    	if (GameState==Game_STATE_READY) // 엔터누르면 시작
    		onGameStart(); 
    	else if(GameState==Game_STATE_GAME) // 일시 정지
    		onGamePause();
    	else if(GameState==Game_STATE_OVER) // 게임 오버 되고 엔터누르면 다시 첫 화면으로 가기
    		onGameReady();
    	else if(GameState==Game_STATE_PAUSE)
    		onGameStart();
    }
}

window.onkeyup = function (e) { // 키보드 스페이스바를 누르고 땟을 때
	if (e.keyCode == 32 && GameState==Game_STATE_GAME) {
		presscount++ // 하나 중가
	}
} 

function drawScreen(){
	tut_w = tutorial.width;
	tut_h = tutorial.height;
	canvaswidth = document.getElementById('canvas').width;
	canvasheight = document.getElementById('canvas').height;

	var fontsize = 30;

	canvas_x_center = canvaswidth / 2
 	canvas_y_center = canvasheight / 2
 
	
	Context.fillStyle="#000";
	Context.fillRect(0,0,canvaswidth,canvasheight);
	

	Context.fillStyle = "#fff";
	Context.font = fontsize+'px NanumGothicCoding';
	Context.fillStyle = "#fff";
	Context.textBaseline = "middle";
	Context.textAlign = "center";
	if(GameState==Game_STATE_READY){
		Context.drawImage(tutorial, canvaswidth/2-(tut_w/2),canvasheight/2-(tut_h/2))
		Context.fillText('스페이스바를 조낸누르는거다', canvas_x_center, canvas_y_center-150)
	}
	else if(GameState==Game_STATE_GAME){
		Context.textAlign = "left"; // 왼쪽에서 부터
		Context.fillText("Time : "+intTime.toFixed(2), 50, 50);
		Context.textAlign = "center"; // 중앙
		Context.fillText(presscount, canvas_x_center, canvas_y_center)
	}
	else if(GameState==Game_STATE_OVER){
		Context.fillText('스페이스바를 조낸 누른 수: '+presscount, canvas_x_center, canvas_y_center)
	}
	else if(GameState==Game_STATE_PAUSE) {
		Context.fillText('일시정지', canvas_x_center, canvas_y_center);
	}
}



function onGameReady(){ // 초기화

	GameState = Game_STATE_READY;
	intTime = time;
	presscount = 0;
	drawScreen();

}

function onGameStart(){ // 함수 실행
	
	GameState = Game_STATE_GAME;
	intervalID = setInterval(function(){ 
		inGameUpdate() // 0.01초마다 게임 업데이트
	},10);
	ingame_audio.play();

}
function inGameUpdate(){

	intTime-=0.01 // 0.01초 뺴기
	if(intTime<0){onGameOver();} // 0초되면 게임 오버
	drawScreen();

}

function onGameOver(){

  ingame_audio.pause()
  ingame_audio.currentTime = 0;
 GameState = Game_STATE_OVER;
 clearInterval(intervalID); // 게임 업데이트 지우기
 drawScreen();

}

function onGamePause () {
ingame_audio.pause()
	GameState = Game_STATE_PAUSE;
	clearInterval(intervalID);
	drawScreen();

}
