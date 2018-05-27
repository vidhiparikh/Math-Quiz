//script.js for maths game
var playing = false;
var score;
var timeRemaining;
var countdown;
var correctAnswer;
document.getElementById("startReset").onclick = function(){
	if(playing){
		location.reload();//reload a page
	}
	else{
		//if not playing
		
		//change the mode to playing
		playing = true;
		
		//hide gameover
		hide("gameOver");
		
		//set score to 0
		score = 0;
		document.getElementById("scoreValue").innerHTML = score;
		
		//show countdown box
		show("timeRemaining");
		timeRemaining = 60;
		document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
		
		//change button text to reset game
		document.getElementById("startReset").innerHTML = "Reset Game";
		
		//start countdown
		startCountdown();
		
		//start showing questions and answers(lets play the game!)
		generateQA();
	}
}

for(i=1; i<5; i++){
	document.getElementById("box"+i).onclick = function(){
		//check if we are playing or not
		if(playing){
			if(this.innerHTML == correctAnswer){
				//increase score by one
				score++;
				document.getElementById("scoreValue").innerHTML = score;
				
				//
				hide("wrong");
				show("correct");
				setTimeout(function(){
					hide("correct");
				},1000);
				
				generateQA();
			}else{
			//you clicked wrong answer
			hide("correct");
			show("wrong");
			setTimeout(function(){
				hide("wrong");
			},1000);
			
		}
		}
	}
}


//questiioiionnn aaannssswwweeerrrr
function generateQA(){
	var x = 1 + Math.round(9 * Math.random());
	var y = 11 + Math.round(19 * Math.random());
	correctAnswer = x * y;
	document.getElementById("question").innerHTML = x +"x" + y;
	var correctPos = 1 + (Math.round(3 * Math.random()));
	document.getElementById("box"+correctPos).innerHTML = correctAnswer; //fill one of the box with correct answer
	
	//fill other boxers with random wrong answers
	var answers = [correctAnswer];
	for(i=1; i<5; i++){
		if(i!=correctPos){
			var wrongAnswer;
			do{
				wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(19 * Math.random()));//a wrong answer
			}while(answers.indexOf(wrongAnswer)>-1);
			//while(wrongAnswer==correctAns);
			//this may generate the multiple options having same value 
			
			document.getElementById("box"+i).innerHTML = wrongAnswer;
			answers.push(wrongAnswer);
		}
	}
	
}


//start counting
function startCountdown(){
	countdown = setInterval(function(){
		timeRemaining -= 1;
		document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
		if(timeRemaining == 0){//stop counting
			stopCountdown();
			show("gameOver");
			document.getElementById("gameOver").innerHTML = "<p>Game Over!</p><p>Your Score is "+ score +".</p>";
			hide("timeRemaining");
			playing = false;
			document.getElementById("startReset").innerHTML = "Start Game";
		}
	},1000);
}

//stop counting
function stopCountdown(){
	clearInterval(countdown);
}

//show an element with specific id
function show(id){
	document.getElementById(id).style.display = "block";
}

//hide an element with specific id
function hide(id){
	document.getElementById(id).style.display = "none";
}