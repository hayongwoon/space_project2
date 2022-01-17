$(document).on("input", "input:file", function () {
    readURL(this)
    document.getElementById('user-img').classList.replace('invisible','visible')
});
var sound = new Audio("https://raw.githubusercontent.com/Xiija/TestFiles/master/Yuki%20%26%20Tako%2001.mp3");

function readURL(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            $('#user-img').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

/*//parseInt는 문자열 인자를 파싱을 통해 특정 정수로 표현할 수 있습니다.
function startTimer(duration, display, bar) {
    let timer = duration, minutes, seconds;
    const time_set = setInterval(function () {
        minutes = parseInt(timer / 60, 10); //10진수 표현을 위해 radix를 10으로 합니다.(만약 2이면 2진수)
        seconds = parseInt(timer % 60, 10);

        const totalSeconds = 5
            , remainingSeconds = minutes * 60 + seconds

        bar.style.width = (remainingSeconds * 100 / totalSeconds) + "%"; //

        minutes = minutes < 10 ? "0" + minutes : minutes; // ? 조건문입니다. 10분 아래로 떨어지면 09:30 이렇게 9분 앞에 0을 붙입니다. 방식으로 표현합니다.
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds; // 화면 표시 분과 초를 :로 구분합니다.
        // if 조건문입니다. --timer: timer가 2일 때 --timer는 1을 할당하고 1을 반환합니다.
        // timeout 이 1000일 때는 1초 10000일 때는 10초의 지연시간이 있고 다시 실행을 반복합니다.(위의 setInterval 메서드)
        if (--timer < 0) {
            showAlert()
            clearInterval(time_set)
            sound.play();
        }
    }, 1000);
}
// document.querySelector는 CSS의 클래스, 아이디를 찾아 같은 값을 반환합니다.
window.onload = function () {
    let minutes = 5,
        display = document.querySelector('#time');
    let bar = document.querySelector('#progressBar');
    startTimer(minutes, display, bar);
};*/


function showAlert(){
    document.getElementById('alert-container').classList.replace('invisible','visible')
}

let imgArray = [];
	imgArray[0] = "/static/yoga-img/downdog.jpeg";
	imgArray[1] = "/static/yoga-img/goddess.jpeg";
	imgArray[2] = "/static/yoga-img/plank.jpeg";
    imgArray[3] = "/static/yoga-img/tree.jpeg";
    imgArray[4] = "/static/yoga-img/warrior2.jpeg";

function showImage() {
    const imgNum = Math.round(Math.random() * 4);
    let objImg = document.getElementById("yoga-img");
    document.getElementById('yoga-img').classList.replace('invisible','visible')
    objImg.src = imgArray[imgNum];
    able_button()
}

function able_button() {
    document.getElementById('btn').disabled = false;
    document.getElementById('check-button').disabled = false;
    document.getElementById('file-input').disabled = false;
}
//
// function checkImage(){
//     var prerandomYogaImg = document.getElementById('yoga-img').src.split('/');
//     var randomYogaImg = prerandomYogaImg[5].split(".")[0];
//     console.log(randomYogaImg)
//
//     $.ajax({
//         type: "GET",
//         url: "/fileupload",
//         contentType: "application/json; charset=utf-8",
//         data: {},
//         success: function (response){
//             alert(response);
//         }
//     });
function checkImage(){
    var prerandomYogaImg = document.getElementById('yoga-img').src.split('/');
    var randomYogaImg = prerandomYogaImg[5].split(".")[0];


    // alert(yoga_img)
    alert(randomYogaImg);

}

function posting() {
    let file = $('#file-input')[0].files[0]
    let form_data = new FormData()
    var prerandomYogaImg = document.getElementById('yoga-img').src.split('/');
    var randomYogaImg = prerandomYogaImg[5].split(".")[0];

    form_data.append("file_give", file)

    $.ajax({
        type: "POST",
        url: "/fileupload",
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            alert(response["result"])
            alert(randomYogaImg)
            if (response["result"] == randomYogaImg){
                alert('coreect');
                sound.pause();
                $("#button-container").addClass('invisible');
                $("#success-container").attr('class', 'visible');
            }
            else{
                alert('x');
            }
            // alert(response["result"])
            // window.location.reload()
        }
    });
}


function toGather() {
    const gatherlink = 'https://gather.town/app/aFVnoYb9QJ4GqA3d/sparta-nbcamp-ai';
    window.location.href = gatherlink;
}

function toCheckAttend() {
    const checkAttendLink = 'https://online.spartacodingclub.kr/nbcamp/records';
    window.location.href = checkAttendLink;
}