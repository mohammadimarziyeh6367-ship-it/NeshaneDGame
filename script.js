let studentName = "";
let score = 0;

const words = [

{word:"دَر",correct:true},
{word:"دریا",correct:true},
{word:"دوست",correct:true},
{word:"دندان",correct:true},
{word:"دست",correct:true},
{word:"دارکوب",correct:true},
{word:"درخت",correct:true},
{word:"دیوار",correct:true},
{word:"دارو",correct:true},
{word:"دُلمه",correct:true},
{word:"داغ",correct:true},
{word:"دل‌درد",correct:true},

{word:"سیب",correct:false},
{word:"گل",correct:false},
{word:"باد",correct:false},
{word:"خورشید",correct:false},
{word:"گربه",correct:false},
{word:"ماه",correct:false}

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

createCards();

}

function createCards(){

let box=document.getElementById("cards");

box.innerHTML="";

words.sort(()=>Math.random()-0.5);

words.forEach(item=>{

let btn=document.createElement("button");

btn.className="wordCard";

btn.innerHTML=item.word;

btn.onclick=function(){

if(btn.disabled)return;

btn.disabled=true;

if(item.correct){

btn.classList.add("correct");
createStars(btn);
score++;

document.getElementById("score").innerHTML=score;

document.getElementById("message").innerHTML=

"🌟 آفرین! این کلمه با «د» شروع می‌شود.";

}

else{

btn.classList.add("wrong");

document.getElementById("message").innerHTML=

"😊 این کلمه با «د» شروع نمی‌شود.";

}

}

box.appendChild(btn);

});

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
