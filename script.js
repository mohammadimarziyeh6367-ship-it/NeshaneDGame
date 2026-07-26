let studentName = "";
let score = 0;
let currentQuestion = 0;
let stage = 1;
// ===== مرحله اول =====

const correctStart = [

"دست",
"در",
"دریا",
"دام",
"درخت",
"دود"

];

const wrongStart = [

"باد",
"بادبادک",
"بام",
"بابا",
"بادام",
"آب",
"آبی",
"آباد",
"مدرسه",
"سبد",
"آمد",
"سود",
"بود"

];


// ===== مرحله دوم =====

const correctEnd = [

"باد",
"بود",
"سود",
"آمد"

];

const wrongEnd = [

"دست",
"در",
"دریا",
"دام",
"درخت",
"دود",
"بابا",
"آبی",
"بادام",
"مدرسه",
"سبد"

];



document.getElementById("startBtn").onclick=function(){

studentName=document.getElementById("studentName").value.trim();

if(studentName==""){

alert("نام خود را وارد کن 😊");

return;

}

document.getElementById("startPage").style.display="none";

document.getElementById("gamePage").style.display="block";

document.getElementById("showName").innerHTML=

"🌸 "+studentName+" خوش آمدی";

nextQuestion();

}
function nextQuestion(){
if(currentQuestion>=correctWords.length){

if(stage===1){

stage=2;

currentQuestion=0;

alert("🌸 آفرین! مرحله اول تمام شد.\nحالا مرحله دوم شروع می‌شود.\n\nکلمه‌ای را پیدا کن که صدای آخرش «د» باشد.");

nextQuestion();

return;

}

finishGame();

return;

}


let correct=correctWords[currentQuestion];

let options=[correct];

while(options.length<4){

let word=wrongWords[
Math.floor(Math.random()*wrongWords.length)
];

if(!options.includes(word)){

options.push(word);

}

}

options.sort(()=>Math.random()-0.5);

for(let i=0;i<4;i++){

let btn=document.getElementById("btn"+i);

btn.disabled=false;

btn.className="optionBtn";

btn.innerHTML=options[i];

btn.onclick=function(){

checkAnswer(btn,options[i],correct);

}

}

}
function checkAnswer(btn,selectedWord,correctWord){

document.querySelectorAll(".optionBtn").forEach(b=>b.disabled=true);

if(selectedWord===correctWord){

btn.classList.add("correct");

createStars(btn);

score++;

document.getElementById("score").innerHTML=score;

document.getElementById("message").innerHTML=
"🌟 آفرین!";

}else{

btn.classList.add("wrong");

document.getElementById("message").innerHTML=
"😊 دوباره تلاش کن";

document.querySelectorAll(".optionBtn").forEach(button=>{

if(button.innerHTML===correctWord){

button.classList.add("correct");

}

});

}

currentQuestion++;

setTimeout(function(){

document.getElementById("message").innerHTML="";

nextQuestion();

},1500);

}



function finishGame(){

document.getElementById("gamePage").style.display="none";

document.getElementById("finishPage").style.display="block";

document.getElementById("resultName").innerHTML=
"🌸 آفرین "+studentName;

document.getElementById("finalScore").innerHTML=
score+" از "+correctWords.length;

}
function restartGame(){

score = 0;

currentQuestion = 0;

document.getElementById("score").innerHTML = 0;

document.getElementById("finishPage").style.display = "none";

document.getElementById("gamePage").style.display = "block";

nextQuestion();

}
function createStars(card){

const rect=card.getBoundingClientRect();

const cx=rect.left+rect.width/2;
const cy=rect.top+rect.height/2;

for(let i=0;i<28;i++){

const spark=document.createElement("div");

spark.className="spark";

spark.style.left=cx+"px";
spark.style.top=cy+"px";

const angle=(Math.PI*2/28)*i;
const distance=70+Math.random()*30;

const x=Math.cos(angle)*distance+"px";
const y=Math.sin(angle)*distance+"px";

spark.style.setProperty("--x",x);
spark.style.setProperty("--y",y);

document.body.appendChild(spark);

setTimeout(()=>{

spark.remove();

},900);

}

}
