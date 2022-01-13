$(document).on("input", "input:file", function () {
    readURL(this)
    document.getElementById('user-img').classList.replace('invisible','visible')
});

function readURL(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            $('#user-img').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

//parseInt는 문자열 인자를 파싱을 통해 특정 정수로 표현할 수 있습니다.
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
            showImage()
            clearInterval(time_set)
        }
    }, 1000);
}

function showAlert(){
    document.getElementById('alert-container').classList.replace('invisible','visible')
}

// document.querySelector는 CSS의 클래스, 아이디를 찾아 같은 값을 반환합니다.
window.onload = function () {
    let minutes = 5,
        display = document.querySelector('#time');
    let bar = document.querySelector('#progressBar');
    startTimer(minutes, display, bar);
};

let imgArray = [];
	imgArray[0] = "/static/yoga-img/1.jpeg";
	imgArray[1] = "/static/yoga-img/2.jpeg";
	imgArray[2] = "/static/yoga-img/3.jpeg";
    imgArray[3] = "/static/yoga-img/3.jpeg";

function showImage() {
    const imgNum = Math.round(Math.random() * 3);
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
