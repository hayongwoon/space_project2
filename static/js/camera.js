//카메라 모달창 구현
//모달창 열기 함수 - 히든 클래스를 삭제해준다.
  const open = () => {
    document.querySelector(".camera-modal").classList.remove("hidden");
  }
  //모달창 닫기 함수 - 히든 클래스를 활성화
  const close = () => {
    document.querySelector(".camera-modal").classList.add("hidden");
  }

  document.querySelector(".camera-modal-open-btn").addEventListener("click", open);
  document.querySelector(".modal_close_btn").addEventListener("click", close);
  document.querySelector(".bg").addEventListener("click", close);


//비디오 재생
const vid = document.querySelector('video');
// 미디어 입력 장치 사용 권한을 요청. 사용자가 수락하면 mediastream을 반환한다.
// 스트림은 카메라, 비디오 녹화장치, 스크린 공유 장치 등 하드웨어와 비디오 트랙, 마이크, 오디오 스트림 등이 있다.
// navigator.mediaDevices.getUserMedia(constraints)
// constraints 에는 오디오와 비디오 둘중 하나를 지정해야 한다. { audio: true, video: true }
// video: { width: 1280, height: 720 } 비디오의 해상도를 지정할 수도 있다.
navigator.mediaDevices.getUserMedia({video: true}) // request cam
.then(stream => {
  //HTMLMediaElement.srcObject : 미디어의 소스 역할을 하는 객체를 설정하거나 반환
  //getUserMedia에서 반환된 stream을 video에 넣어 준다.
  vid.srcObject = stream; // don't use createObjectURL(MediaStream)
  return vid.play(); // returns a Promise 프로미스 반환. 미디어 재생
})
//사진 찍기 버튼 구현
.then(()=>{ // enable the button
  const btn = document.querySelector('.snapshot');
  //disabled 된 element는 사용할 수 없고, 클릭 할 수 없다.
  btn.disabled = false;
  btn.onclick = e => {
    takeASnap()
    .then(download);
  };
})
.catch(e=>console.log('please use the fiddle instead'));

//사진 찍기 함수
function takeASnap(){
  // canvas : 그래픽을 그리기위한 수단을 제공한다. 주로 2D 그래픽에 중점을 두고 있다.
  const canvas = document.createElement('canvas'); // 캔버스 생성
  const ctx = canvas.getContext('2d'); // get its context
  canvas.width = vid.videoWidth; // set its size to the one of the video
  canvas.height = vid.videoHeight; //캔버스의 너비와 높이를 비디오의 너비, 높이와 똑같이 한다.
  ctx.drawImage(vid, 0,0); // the video
  return new Promise((res, rej)=>{
    //프로미스가 이행되면(res) 저장할 수 있는 파일이 반환 된다.
    canvas.toBlob(res, 'image/jpeg'); // request a Blob from the canvas
  });
}
//사진 저장 함수
function download(blob){
  // uses the <a download> to download a Blob
  let a = document.createElement('a'); // a 엘리먼트를 생성한다.
  // 주어진 객체를 가리키는 URL을 DOMString으로 반환
  a.href = URL.createObjectURL(blob); //a의 주소를 정해준다?
  a.download = 'screenshot.jpg'; //다운로드 파일 이름 지정
  document.body.appendChild(a); //바디에 a를 추가해 준다.
  // appendChild : 특정 부모 노드의 자식 노드 리스트 중 마지막 자식으로 붙
  a.click(); //a 클릭 이벤트 실행
}


function camera_timer() {
    let timer_input = document.querySelector('.camera-timer-input').value
    let display = document.querySelector('#ct-check')
    // let timer_input_1000 = timer_input / 1000
    // let minus_num = timer_input / 1000
    // let ct_check = document.getElementById('ct-check')

  // setInterval 함수는 함수를 반복적으로 부를 때마다 시간 딜레이를 두고 실행한다.
    const timer = setInterval(function () {
        display.textContent = String(timer_input)
        if(--timer_input<0){ //--가 무슨 뜻일까?
          takeASnap().then(download);
          display.textContent = '찰칵'
          clearInterval(timer)
        }
    }, 1000)

    // for (let i = 0; i < timer_input_1000; i++) {
    //     ct_check.textContent = String(minus_num)
    //     minus_num -= 1
    //     sleep(1000)
    //     console.log(minus_num)
    //     if (minus_num === 0) {
    //         takeASnap().then(download)
    //     }
    // }
}


