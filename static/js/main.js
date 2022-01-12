$(document).on("input", "input:file", function() {
        readURL(this)
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
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        var totalSeconds = 1 * 60
        , remainingSeconds = minutes * 60 + seconds

        bar.style.width = (remainingSeconds*100/totalSeconds) + "%";

        minutes = minutes < 10 ? "0" + minutes : minutes; // ? 조건문입니다. 10분 아래로 떨어지면 09:30 이렇게 9분 앞에 0을 붙입니다. 방식으로 표현합니다.
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds; // 화면 표시 분과 초를 :로 구분합니다.
        // if 조건문입니다. --timer: timer가 2일 때 --timer는 1을 할당하고 1을 반환합니다.
        // timeout 이 1000일 때는 1초 10000일 때는 10초의 지연시간이 있고 다시 실행을 반복합니다.
        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var minutes = 60 * 1,
    display = document.querySelector('#time');
    bar = document.querySelector('#progressBar');
    startTimer(minutes, display, bar);
};

