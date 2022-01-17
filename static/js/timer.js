// element 안에 minutes, seconds, control, reset을 queryselector 사용하여 index.html에서 불러옵니다.
el = {
    minutes: document.querySelector(".timer_minutes"),
    seconds: document.querySelector(".timer_seconds"),
    control: document.querySelector(".timer_btn_control"),
    reset: document.querySelector(".timer_btn_reset"),
};
// 변수 재할당이 가능한 let을 사용하여 interval과 remainingSeconds을 선언합니다.
let interval = null;
let remainingSeconds = 0;
// event 사용이 가능한 addEventListener을 사용합니다. 클릭 이벤트 발생시 조건을 줍니다.
el.control.addEventListener("click", () =>{
    if (interval === null) {
        start();
    } else {
        stop();
    }
});
// reset 버튼 클릭 이벤트입니다. 분은 60분 미만으로 작성가능합니다. 아래 updatetime 함수로 그 값을 보냅니다.
el.reset.addEventListener("click", () =>{
    const inputMinutes = prompt("몇 분으로 타이머 맞출거냐? 60미만 숫자만 적어라~");

    if (inputMinutes < 60) {
        stop();
        remainingSeconds = inputMinutes * 60;
        updateTime();
    }
    else if (inputMinutes >= 60) {
        alert("0~60사이 분을 입력해라~")
        }
    else {
        alert("숫자만 입력해라~ ex)40분이면 40을 입력")
    }


});
// 분과 초를 정의합니다. math.floor을 사용하는 이유는 소숫점 형태로 나오기 때문에 정수로 표현하기 위해 사용합니다.
function updateTime() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
// 분과 초를 어떻게 화면에 표시할지 정합니다. textcontent는 모든 텍스트를 그대로 가져올 수 있습니다.
    //padstart(HTML에 표시할 문자개수, 표시형식)
    //toString은 분과 초를 문자로 바꿔 가져옵니다.
    el.minutes.textContent = minutes.toString().padStart(2, "0");
    el.seconds.textContent = seconds.toString().padStart(2, "0");
}

// 버튼을 사용할 때 일시정지 기능을 사용하는 효과를 줍니다. interval이 null 값일 때 play버튼이 보이도록하고
// null 값이 아닐 때, 즉 일시정지 상태일 때 pause버튼이 보이도록 합니다. (시작하고 나서 play 버튼이 사라지는 문제가 발생하여 수정 중)
// innerHTML은 요소 내 포함된 HTML 부분을 가져올 수 있습니다.
function updateControls() {
    if(interval === null) {
        el.control.innerHTML = `<span class='material-icons'>play_arrow</span>`;
        el.control.classList.add("timer_btn_start");
        el.control.classList.remove("timer_btn_stop");
    } else {
        el.control.innerHTML = `<span class='material-icons'>pause</span>`;
        el.control.classList.add("timer_btn_stop");
        el.control.classList.remove("timer_btn_start");

    }
}
// 타이머를 시작할 때의 함수를 정의합니다.
function start() {
    if (remainingSeconds === 0) return;
    //setInterval 함수를 사용합니다. 남은 시간을 계속 줄이고 0이 되면 멈추게 합니다. 이를 interval 변수에 할당합니다.
    interval = setInterval(() => {
        remainingSeconds--;
        updateTime();

        if (remainingSeconds === 0) {
            stop();
        }
    }, 1000); // timeout 이 1000일 때는 1초 10000일 때는 10초의 지연시간이 있습니다.

updateControls();
}

function stop() {
    clearInterval(interval);
    interval = null;
    updateControls();
    if (el.seconds <= 0 && el.minutes == 0)
        showAlert()
        showImage()
}
