var stageCount = 0, frameCount = 0, stageSum = 0, frameSum = 0;
var wrongSum = 0;
var rightId = -1;
var num = 0;
var stageSave = 0;
var frameSave = 0;
var fadeTime = 200;

var cnum = 0;
var isChoosing = false;
var isChanging = false;
var bgsave = "";
var isMusic = false;
var isEnding = false;
var isOpening = true;
var ca = new Array(5);


function processData(data)
{
	console.log(stageCount, frameCount,stageSum, frameCount);
	stageSum = data.stages.length;
	frameSum = data.stages[stageCount].frames.length;
	//if (frameCount == 0)
	//{
		
		if(data.stages[stageCount].backgroundImage != bgsave){

			$(".charaimg").fadeOut(fadeTime,function(){
				$("#charaimg1").attr("src", "");
				$("#charaimg2").attr("src", "");
				$("#charaimg0").attr("src", "");
				$("#conversationBody").css("display","none");
			});
			isChanging = true;
			bgsave = data.stages[stageCount].backgroundImage;
				$("#BackGround").fadeOut(1000,function() {
				$("#BackGround").css("background-image", "url(" + data.stages[stageCount].backgroundImage + ")");
			});
			$("#BackGround").fadeIn(1000,function() {
				otherThing(data);
				if(data.stages[stageCount].frames[frameCount].sentence != "") $("#conversationBody").css("display","block");
				isChanging = false;
			});
		}
		else{
			$("#BackGround").css("background-image", "url(" + data.stages[stageCount].backgroundImage + ")");
			otherThing(data);
		}
		
		



		
}

function otherThing(data) {
	if ($("audio#music").attr("src") != data.stages[stageCount].backgroundMusic)
			$("audio#music").attr("src", data.stages[stageCount].backgroundMusic);
	//}
	$(".charaimg").css("transition", "");
	if(data.stages[stageCount].frames[frameCount].roleImage2 == undefined){
		if (data.stages[stageCount].frames[frameCount].roleImage == "")
		{
			$("#character1").css("display","none");
			$("#character2").css("display","none");
			$("#character").css("display","block");
			$(".charaimg").fadeOut(fadeTime,function(){
				$("#charaimg1").attr("src", "");
				$("#charaimg2").attr("src", "");
				$("#charaimg0").attr("src", "");
			});
		}
		else{
			//alert(1);
			$("#charaimg1").attr("src", "");
			$("#charaimg2").attr("src", "");
			if ($("#charaimg0").attr("src") == "")
			{
				$(".charaimg").fadeOut(fadeTime,function(){
					$("#character1").css("display","none");
					$("#character2").css("display","none");
					$("#character").css("display","block");
					$("#charaimg0").attr("src", data.stages[stageCount].frames[frameCount].roleImage);
				});
				$(".charaimg").fadeIn(fadeTime,function() {
					
				});
			}
			else
			{
				
				
					$("#character1").css("display","none");
					$("#character2").css("display","none");
					$("#character").css("display","block");
					$("#character").css("transition", "background-image 1s");
					$("#charaimg0").attr("src", data.stages[stageCount].frames[frameCount].roleImage );
				
				
			}
		}
	}

	else{
			
			$("#charaimg0").attr("src", "");
			if ($("#charaimg1").attr("src") == "" || $("#charaimg2").attr("src") == "")
			{
				$(".charaimg").fadeOut(fadeTime,function() {
					$("#character1").css("display","block");
					$("#character2").css("display","block");
					$("#character").css("display","none");
					$("#charaimg1").attr("src", data.stages[stageCount].frames[frameCount].roleImage);
					$("#charaimg2").attr("src", data.stages[stageCount].frames[frameCount].roleImage2);
				});
				$(".charaimg").fadeIn(fadeTime,function() {
					
				});
			}
			else
			{
				
					$("#character1").css("display","block");
					$("#character2").css("display","block");
					$("#character").css("display","none");
					$("#charaimg1").attr("src", data.stages[stageCount].frames[frameCount].roleImage);
					$("#charaimg2").attr("src", data.stages[stageCount].frames[frameCount].roleImage2);
				
				
			}
		
	}

	if(data.stages[stageCount].frames[frameCount].sentence == ""){
		$("div#conversationBody").hide();
	} 
	else{
		if ($("div#conversation").html() == "")
			$("div#conversationBody").show();
	}
		
	
	$("div#characterName").text(data.stages[stageCount].frames[frameCount].name);
	
	$("div#conversation").lbyl({content:data.stages[stageCount].frames[frameCount].sentence,speed: 10,type: 'show'});

}

function gotoFrame(stage, frame)
{
	
	stageCount = stage;
	frameCount = frame;
	if(stageCount == 5 && frameCount == 13){
		$("#button1").html("因为我想弥补给你带来的痛苦");
		$("#button2").html("因为我想守护重要的人");
		$("#Buttondiv").fadeIn(1000,function() {
			$("#Buttondiv").css("display","block");
		})
		
		cnum = 1;
		isChoosing = true;
	}
	if(stageCount == 12 && frameCount == 5){
		$("#button1").html("去音乐会");
		$("#button2").html("去新年参拜");
		$("#Buttondiv").fadeIn(1000,function() {
			$("#Buttondiv").css("display","block");
		})
		
		cnum = 2;
		isChoosing = true;
	}
	if(stageCount == 17 && frameCount == 9){
		$("#button1").html("我和雪菜挺好的");
		$("#button2").html("我和雪菜不太好");
		$("#Buttondiv").fadeIn(1000,function() {
			$("#Buttondiv").css("display","block");
		})
		
		cnum = 3;
		isChoosing = true;
	}
	if(stageCount == 31 && frameCount == 19){
		$("#button1").html("去追冬马");
		$("#button2").html("留下来陪雪菜");
		$("#Buttondiv").fadeIn(1000,function() {
			$("#Buttondiv").css("display","block");
		})
		
		cnum = 4;
		isChoosing = true;
	}

	if(stageCount == 15 &&frameCount == 3){
		isMusic = true;
	}

	if(isMusic == false){
			$.ajax({
			url: "json/WAjson.json",
			success: processData,
			dataType: "json"
		});
	}
	else{
		musicStartAll ();
	}
}

function gotoNextFrame()
{
	//console.log(stageCount, frameCount,stageSum, frameCount);
	if ((frameCount + 1) < frameSum)
		gotoFrame(stageCount, frameCount + 1);
	else
		if ((stageCount + 1) < stageSum){
			if(stageCount == 6) gotoFrame(stageCount + 2, 0);
			if(stageCount == 18) gotoFrame(stageCount + 2, 0);
			if(stageCount == 49 || stageCount == 45 || stageCount == 33 || stageCount == 39) {
				isEnding = true;
				endingStart();
			}
			else gotoFrame(stageCount + 1, 0);

		}
			
}


function preloadImage(data)
{
	/*for (var i = 0; i < data.stages.length; i++)
	{
		$("<img />").attr("src", data.stages[i].backgroundImage);
		for (var j = 0; j < data.stages[i].frames.length; j++)
			$("<img />").attr("src", data.stages[i].frames[j].roleImage);
	}*/
}

function musicStartAll () {
	$("#Body").css("display","none");
	var dom = document.getElementById('music');
	dom.pause();
	musicStart();
}
function musicEnd () {
	isMusic = false;
	frameCount++;
	$("#Body").css("display","block");
	var dom = document.getElementById('music');
	dom.play();
}

$(document).keydown(function(event) {

	if(isMusic == false && isChanging == false && isEnding == false && isOpening == false){
		if(isChoosing == false){
			if(event.keyCode == 13){ 
				gotoNextFrame(); 
				
			}
			
			else if(event.keyCode == 82){
				$("#character1").css("display","none");
				$("#character2").css("display","none");
				$("#character").css("display","none");
				$("#charaimg1").attr("src", "");
				$("#charaimg2").attr("src", "");
				$("#charaimg0").attr("src", "");
				gotoFrame(stageSave,frameSave);
			}
		}

		if(event.keyCode == 83){
			stageSave = stageCount;
			frameSave = frameCount;
		}
	}

	if(isOpening == true){
		if(event.keyCode == 13){ 
				isOpening = false;
				$("#opening").css("display","none");
				$("#Body").fadeOut(0,function() {
					
				})
				$("#Body").fadeIn(1000,function() {
					
				})
			}
	}

	
	if(event.keyCode == 77){//M
		gotoFrame(49,0);
	}

});

$("#button1").click(function(){
	if(cnum == 1){
		ca[1] = 1;
		gotoFrame(6,0);
	$("#Buttondiv").css("display","none");
	isChoosing = false;
	}
	else if(cnum == 2){
		ca[2] = 1;
		gotoFrame(13,0);
	$("#Buttondiv").css("display","none");
	isChoosing = false;
	}
	else if(cnum == 3){
		ca[3] = 1;
		gotoFrame(18,0);
	$("#Buttondiv").css("display","none");
	isChoosing = false;
	}
	else if(cnum == 4){
		ca[4] = 1;
		gotoEnd();
	$("#Buttondiv").css("display","none");
	isChoosing = false;
	}
});

$("#button2").click(function(){
	if(cnum == 1){
		ca[1] = 2;
		gotoFrame(7,0);
	$("#Buttondiv").css("display","none");
	isChoosing = false;
	}
	else if(cnum == 3){
		ca[3] = 2;
		gotoFrame(19,0);
	$("#Buttondiv").css("display","none");
	isChoosing = false;
	}
	else if(cnum == 4){
		ca[4] = 2;
		gotoEnd();
	$("#Buttondiv").css("display","none");
	isChoosing = false;
	}
});

function gotoEnd() {
	if(ca[1] == 1 && ca[3] == 1 && ca[4] == 1){
		gotoFrame(40,0);
	}
	if(ca[1] == 1 && ca[3] == 1 && ca[4] == 2){
		gotoFrame(46,0);
	}
	if(ca[1] == 1 && ca[3] == 2 && ca[4] == 1){
		gotoFrame(34,0);
	}
	if(ca[1] == 1 && ca[3] == 2 && ca[4] == 2){
		gotoFrame(46,0);
	}
	if(ca[1] == 2 && ca[3] == 1 && ca[4] == 1){
		gotoFrame(40,0);
	}
	if(ca[1] == 2 && ca[3] == 1 && ca[4] == 2){
		gotoFrame(32,0);
	}
	if(ca[1] == 2 && ca[3] == 2 && ca[4] == 1){
		gotoFrame(34,0);
	}
	if(ca[1] == 2 && ca[4] == 2 && ca[4] == 2){
		gotoFrame(32,0);
	}
}

function endingStart () {
	$("#Body").css("display","none");
	var dom = document.getElementById('music');
	dom.pause();
	$("#ending").css("display","block");
	var dom = document.getElementById('endMusic');
	dom.play();
	endStart();
}



function getReady()
{
	gotoFrame(0, 0);
	ca[1] = 1;
	ca[2] = 1;
	ca[3] = 2;
	ca[4] = 2;
	/*$("div#character1").click(gotoNextFrame);
	$("div#character2").click(gotoNextFrame);
	$("div#BackGround").click(gotoNextFrame);*/
	var dom = document.getElementById('endMusic');
	dom.pause();
	$.ajax({
		url: "json/WAjson.json",
		success: preloadImage,
		dataType: "json"
	});
	openWords();
}




