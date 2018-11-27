var words = ['game','clock','laptop','earth','pizza','book'];
var arrLen = words.length;

var getWord = Math.floor(Math.random() * arrLen );
var gameWord = words[getWord];
var guess = 0;
var attempt = 10;
var userInput = [];
var getAllIdx = [];
var start = false;  
var alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

//get user input and calculate # of attempts 
if (start){
    
document.onkeyup = function getUserinput(event){
    var getKey = event.key.toLowerCase();
    for (i in alphabets) {
         if(getKey == alphabets[i].toLowerCase()){
             guess++;
             if(attempt != 0){
              attempt--;
             }
               
              document.getElementById("p1").style.fontSize = '30px';
             document.getElementById("p1").style.fontFamily = "Poor Story";
                document.getElementById("p1").innerHTML = "Remaining guesses - " + attempt;
             document.getElementById('p1').style.color = '#360685'
                if(guess == 10){
                  document.getElementById('rstBtn').style.display = 'block';
                  document.getElementById('p2').style.color = 'red';
                  document.getElementById('cardImg').src = 'assets/images/Loser_icon.png';
                  document.getElementById('cardImg').style.height = '100'; 
                  document.getElementById('cardImg').style.display = 'block';
                  document.getElementById('p2').innerHTML = 'Game over! maximum guesses attempted!';

                    }
             
                if((userInput.indexOf(getKey) == -1) && (guess != 10)){

                    userInput.push(event.key);
                    console.log(userInput);
                    checkInput(getKey)
                    showUserInp()
                }
         }
    }
}
}
function showUserInp(){
    document.getElementById("p3").style.fontSize = '30px';
    document.getElementById("p3").style.fontFamily = "Poor Story";
    document.getElementById('p3').style.color = '#360685'
    document.getElementById('p3').innerHTML = "Your guesses - " + userInput;
}
function checkInput(val){
    var inputIdx = 0;
    var pos = 0;
    var match = 0;
    while ((inputIdx != -1) && (inputIdx  < gameWord.length)){
        
        inputIdx = gameWord.indexOf(val,inputIdx);
         console.log('inputIdx-',inputIdx);
        if(inputIdx != -1) {
            getAllIdx.push(inputIdx);     
            inputIdx++;
         }
      
      }
      console.log('index-',getAllIdx);
       newNode(getAllIdx);
}
//dynamically generate blanks to fill in gameword
function blankSpacegen(blanks){
    start = true;
    document.getElementById('jumbo').style.display = 'none';
    document.getElementById('card1').style.marginTop = '50px';
    document.getElementById('card1').style.width = '40%';
 document.getElementById('card1').style.left = '450px';
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById("p2").style.fontSize = '30px';
    document.getElementById("p2").style.fontFamily = 'Poor Story';
    document.getElementById('p2').style.color = '#360685'
    
    document.getElementById('p2').innerHTML = 'Start guessing!';
//    var node = document.createElement('span');
//    var text = document.createTextNode('_');
//    node.appendChild(text);
    console.log(gameWord);
    for(i=0;i<=blanks.length-1;i++){
        var node = document.createElement('span');
        var text = document.createTextNode('_');
        node.appendChild(text);
        document.getElementById('id1').appendChild(node);
        console.log(i);
     }
        
}
//check if the letter appears more than once
// create a text node to fill the corresponding blanks
 function newNode(idx){
  
    for (x in idx){
        var txtIdx = idx[x];
        
        var newletter = document.createTextNode(gameWord.charAt(txtIdx));
        console.log('x - ',x);
        var letter = document.getElementById('id1').childNodes[txtIdx];
        letter.style.color = '#FF530D';
        letter.style.fontSize = '50px';
        letter.style.fontFamily = "Black And White Picture";
        
         console.log(letter);
        letter.replaceChild(newletter,letter.childNodes[0]);
    }
     winCheck(idx);
}
//Check if length of gameword & guessed word array are equal //to check if the player has won the game
function winCheck(arr){
    if(arr.length == gameWord.length){
        document.getElementById('p2').style.color = 'blue';
        document.getElementById('p2').style.textAlign = 'center';
        document.getElementById('p2').style.fontSize = '30px'; 
        document.getElementById('p2').innerHTML = 
            'hooray!!!Winner!!';
        document.getElementById('cardImg').style.display = 'block';
        document.getElementById('rstBtn').style.display = 'block';
        
    }
    
    
}
// refresh/reload the page
function reset(){
    location.reload();
}



 