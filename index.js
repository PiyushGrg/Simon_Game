var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];


$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length -1);
});


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

var level=0;
var gameStart=0;
$(document).keypress(function(){
    if(gameStart===0){
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStart=1;
    }
});



function nextSequence(){
    
    // Step 8 -> Empty array when nextSequence is called 
    userClickedPattern=[];
    
    // Step 7
    level++;
    $("#level-title").text("Level " + level);



    var a=Math.random();
    var randomNumber=Math.floor(a*4);

    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);    

}

function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }

    else{
        playSound("wrong");
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-titles").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}


function startOver() {

    //3. Inside this function, you'll need to reset the values of level, gamePattern and gameStart variables.
    level = 0;
    gamePattern = [];
    gameStart = 0;
  }
