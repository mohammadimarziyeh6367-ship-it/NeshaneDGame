//========================
// متغیرها
//========================

let studentName="";
let score=0;
let currentQuestion=0;
let stage=1;

//========================
// الگوریتم Fisher-Yates
//========================

function shuffle(array){

for(let i=array.length-1;i>0;i--){

const j=Math.floor(Math.random()*(i+1));

[array[i],array[j]]=[array[j],array[i]];

}

return array;

}

//========================
// سوالات مرحله اول
//========================

const stage1=[

{correct:"دست",wrong:["بابا","آبی","باد"]},

{correct:"در",wrong:["گل","آب","مدرسه"]},

{correct:"دریا",wrong:["بابا","باد","آباد"]},

{correct:"دام",wrong:["بادام","بابا","سبد"]},

{correct:"درخت",wrong:["مدرسه","بابا","آبی"]},

{correct:"دارو",wrong:["باد","بابا","آب"]},

{correct:"داغ",wrong:["باد","بابا","گل"]},

{correct:"دیوار",wrong:["مدرسه","سبد","آباد"]},

{correct:"دُلمه",wrong:["بابا","گل","باد"]},

{correct:"دارکوب",wrong:["بادبادک","بابا","مدرسه"]}

];

//========================
// سوالات مرحله دوم
//========================

const stage2=[

{correct:"باد",wrong:["دریا","دست","در"]},

{correct:"بود",wrong:["دام","دارو","درخت"]},

{correct:"سود",wrong:["بابا","دریا","مدرسه"]},

{correct:"آمد",wrong:["دست","دریا","دام"]},

{correct:"سبد",wrong:["دارو","دریا","دست"]},

{correct:"دود",wrong:["دست","در","دریا"]}

];

//========================
// شروع بازی
//========================

document.getElementById("startBtn").onclick=function(){

studentName=document.getElementById("studentName").value.trim();

if(studentName===""){

alert("🌸 نام خود را وارد کن.");

return;

}

const gender=document.querySelector('input[name="gender"]:checked').value;

document.getElementById("avatar").innerHTML=

gender==="girl" ? "👧" : "👦";

document.getElementById("showName").innerHTML=

studentName;

document.getElementById("startPage").style.display="none";

document.getElementById("gamePage").style.display="block";

score=0;

currentQuestion=0;

stage=1;

document.getElementById("score").innerHTML=0;

// سوالات هر بار جابه‌جا شوند

shuffle(stage1);

shuffle(stage2);

nextQuestion();

};
//========================
// سوال بعدی
//========================

function nextQuestion(){

let data;

// انتخاب مرحله

if(stage===1){

document.getElementById("stageTitle").innerHTML="🌸 مرحله اول";

document.getElementById("question").innerHTML=

"کدام کلمه با «د» شروع می‌شود؟";

data=stage1;

}else{

document.getElementById("stageTitle").innerHTML="🌸 مرحله دوم";

document.getElementById("question").innerHTML=

"کدام کلمه صدای آخرش «د» است؟";

data=stage2;

}

// پایان مرحله

if(currentQuestion>=data.length){

if(stage===1){

document.getElementById("gamePage").style.display="none";

document.getElementById("stagePage").style.display="block";

return;

}else{

finishGame();

return;

}

}

// سوال جاری

let question=data[currentQuestion];

// ساخت گزینه‌ها

let options=[

question.correct,

...question.wrong

];

// کاملاً تصادفی

shuffle(options);

// قرار دادن روی دکمه‌ها

for(let i=0;i<4;i++){

let btn=document.getElementById("btn"+i);

btn.disabled=false;

btn.className="optionBtn";

btn.innerHTML=options[i];

btn.onclick=function(){

checkAnswer(

btn,

options[i],

question.correct

);

};

}

}
document.getElementById("stageBtn").onclick=function(){

stage=2;

currentQuestion=0;

document.getElementById("stagePage").style.display="none";

document.getElementById("gamePage").style.display="block";

nextQuestion();

};
//========================
// بررسی جواب
//========================

function checkAnswer(btn,selected,correct){

document.querySelectorAll(".optionBtn").forEach(b=>{

b.disabled=true;

});

if(selected===correct){

btn.classList.add("correct");

score++;

document.getElementById("score").innerHTML=score;

document.getElementById("message").innerHTML="🌟 آفرین!";

createFireworks(btn);

}else{

btn.classList.add("wrong");

document.getElementById("message").innerHTML="😊 دوباره فکر کن.";

document.querySelectorAll(".optionBtn").forEach(b=>{

if(b.innerHTML===correct){

b.classList.add("correct");

}

});

}

currentQuestion++;

setTimeout(function(){

document.getElementById("message").innerHTML="";

nextQuestion();

},1500);

}

//========================
// پایان بازی
//========================

function finishGame(){

document.getElementById("gamePage").style.display="none";

document.getElementById("finishPage").style.display="block";

document.getElementById("resultName").innerHTML=

"🌸 آفرین "+studentName;

let total=stage1.length+stage2.length;

document.getElementById("finalScore").innerHTML=

score+" از "+total;

}

//========================
// بازی دوباره
//========================

document.getElementById("restartBtn").onclick=function(){

location.reload();

};

//========================
// فشفشه رنگی
//========================

function createFireworks(button){

const rect=button.getBoundingClientRect();

for(let i=0;i<35;i++){

const spark=document.createElement("div");

spark.className="spark";

spark.style.left=(rect.width/2)+"px";

spark.style.top=(rect.height/2)+"px";

const angle=Math.random()*Math.PI*2;

const distance=40+Math.random()*70;

spark.style.setProperty("--x",

Math.cos(angle)*distance+"px");

spark.style.setProperty("--y",

Math.sin(angle)*distance+"px");

const colors=[

"#FFD700",

"#FF4081",

"#00BCD4",

"#4CAF50",

"#FF9800",

"#9C27B0"

];

spark.style.background=

colors[Math.floor(Math.random()*colors.length)];

button.appendChild(spark);

setTimeout(function(){

spark.remove();

},900);

}

}
