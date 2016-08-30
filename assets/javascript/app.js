var right = 0;
var wrong = 0 ;
var slideNumber = 0; 
var secondsLeft = 0;
var timer = $.timer(function(){
	triviaGame.timerCount();
});

var winTimer = $.timer(function(){
	triviaGame.nextQuestion();
	winTimer.stop()
});







var triviaGame = {
	newGame: function () {
			slideNumber = 0 
			right = 0
			wrong = 0
			secondsLeft = 20
			
			this.startButton();

	},

	slides : [

	["Where was the first permanent English colony established?", "Jamestown", "Boston", "Roanoke", "New York City", "Jamestown"],
	["New York City was originally named...?", "New Yawk City", "New Amsterdam", " The New Part", "New Holland", "New Amsterdam"],
	["The oldest college in the USA, founded in 1636 is?", "Princeton", "Columbia", "Harvard", "Digital Film Academy", "Harvard"],
	["In 1620, where did English Pilgrims land in the New world?", "Jamestown", "Plymouth Rock", "Roanoke", "New York City", "Plymouth Rock" ],
	["Who rode on his horse yelling, The British are coming!?", "Paul Revere", "Ben Franklin", "George Washington", "Sam Adams", "Paul Revere" ],
	["Which American general turned traitor and joined the British?", "George Washington", "Sam Adams", "Julio Eglesias", "Benedict Arnold", "Benedict Arnold"],
	["At what two places was the shot heard 'round the world fired?", "Boston and Concord", "Lexington and Boston", "Lexington and Concord", "Manchester and Concord", "Lexington and Concord"],
	["What song became the first military cadence during the American Revolution?", "Little Bird", "Yankee Doodle", "Airbourne Ranger", "Jesse James", "Yankee Doodle"],
	["Who was elected President of the Confederate States of America?", "Jefferson Davis", "Abraham Lincolin", "Usyless Grant", "Robert E. Lee", "Jefferson Davis"],
	["If you aint Cav?", "Infantry", "Artillery", "You Aint Shit", "All of the above", "All of the above"], 
	["What was the largest battle of the civil war?", "Fredericksburg", "Gettysburg", "Vicksburg", "Pettersburg", "Gettysburg"], 
	["Who was the first state in the union to secede?", "New York", "North Carolina", "Virginia", "South Carolina", "South Carolina"], 
	["What other country faced a particularly severe depression about the same time as America?", "Mexico", "France", "Canada", "Germany", "Germany"],
	["Which President's new deal helped get America back on it's feet?", "Theodore Roosevelt", "Franklin D. Roosevelt", "Herbert Hoover", "Woodrow Wilson", "Franklin D. Roosevelt"],
	["When did the stock market crash that started the Great Depression occur?", "October, 1929", "October, 1939", "November, 1929", "September, 1929", "October, 1929"],
	["What ended the Great Depression?", "Apple stocks picked up", "WWII", "Harry Truman", "Vietnam", "WWII"] ]

	,
	currentChoices: []
	,

	display: function(){

		$("#main").append("<div id='timer'></div>");
		$("#main").append("<div class='panel panel-default' id='displayPanel'><div class='panel-body' ></div></div>");
		timer.set({time: 1000, autostart: true})

		
	},

	startButton: function() {

		$("#button").click(function(){

			
			$('#button').remove();
			triviaGame.display();
			triviaGame.displayQuestion();
			

	
		
		});


	},
	restartGame: function(){

		$("#button2").click(function(){

			right = 0;
			wrong = 0 ;
 			slideNumber = 0; 
 			secondsLeft = 20;
 			$("#button2").remove();
 			$('#displayPanel').remove();
 			$('#timer').remove();
 			triviaGame.display(); 
 			triviaGame.displayQuestion();




		});


	},
	
	displayQuestion: function(){
			
		
		for (var i = 0; i < triviaGame.slides[slideNumber].length; i++) {
			 answer = triviaGame.slides[slideNumber][5]
			  
			 
			 if (i == 0){
			 	$("#displayPanel").append("<div id='question'>" + triviaGame.slides[slideNumber][i] + "</div>")
			 }
			 else if( i > 0 && i < 5){

			 	$("#displayPanel").append("<div class='choices' id='choice" + [i] +"'>" + triviaGame.slides[slideNumber][i]+ "</div>");
			 	$("#choice" + [i]).click(function(){
									 		
			 		if ($(this).text() == answer){
			 			
			 			right += 1
			 			$("#displayPanel").html("<div id='rightAnswer'>you are correct!</div>");
			 			winTimer.set({time:1000, autostart: true});
			 			
			 		}
			 		else{
			 			
			 			wrong += 1
			 			
			 			$("#displayPanel").html("<div id='wrongAnswer'>wrong... </div>");
			 			winTimer.set({time:1000, autostart: true});
			 		}

			 		
			 	});
			 	$("#choice" + [i]).hover(function(){

			 		$(this).css("font-family", "Troika");
			 	},function(){
			 		$(this).css("font-family", "Georgia, serif")

			 	}
			 	
			 	);

			 }
		
			
		}	

		
	
	},
	nextQuestion: function(){
		timer.play();
		if (slideNumber  < triviaGame.slides.length - 1){
			$("#timer").empty();
			$("#displayPanel").empty();
			slideNumber += 1
			secondsLeft = 20
			this.displayQuestion();
		}else{
			timer.stop();
			$('#displayPanel').html("<div class='panel panel-default' id='gameOver'><div class='panel-body'>gameOver</div></div>");
			$('#gameOver').append("<div id='wins'>" + 'correct answers : ' + right + "</div>");
			$('#gameOver').append("<div id='loses'>" + 'wrong answers : ' + wrong + "</div>");
			if (right >= wrong) {
			$('#gameOver').append('<p>You can get the fuck out of detention</p>');
			$('#gameOver').append("<button type='button' id='button2' class='btn btn-default' > <p>Get Outta Here!</p></button>");
		} else if(right <= wrong) {
			$('#gameOver').append('<p>You should of went to class more instead of smoking reefer with Brian Martinez</p>');
			$('#gameOver').append("<button type='button' id='button2' class='btn btn-default' > <p>Try Again!</p></button>");
			this.restartGame();
		}
			

		}
	
		
		

	},
	timerCount: function(){
		
	
		if (secondsLeft> 0){
			$('#timer').html(secondsLeft);
			secondsLeft -= 1

		}else {
			alert("time out");
			wrong += 1
			this.nextQuestion();
		}

		

	}




};

$(document).ready(function(){
	triviaGame.newGame()

});
		
	
