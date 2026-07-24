
let studentName = "";

document.getElementById("startBtn").onclick = function () {

    studentName = document.getElementById("studentName").value.trim();

    if (studentName === "") {
        alert("لطفاً نام خود را وارد کن 😊");
        return;
    }

    document.getElementById("startPage").style.display = "none";
    document.getElementById("gamePage").style.display = "block";

    document.getElementById("showName").innerHTML =
        "🌸 " + studentName + " خوش آمدی";
};
