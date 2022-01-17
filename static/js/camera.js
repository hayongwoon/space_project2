//카메라 모달창

  const open = () => {
    document.querySelector(".camera-modal").classList.remove("hidden");
  }

  const close = () => {
    document.querySelector(".camera-modal").classList.add("hidden");
  }

  document.querySelector(".camera-modal-open-btn").addEventListener("click", open);
  document.querySelector(".modal_close_btn").addEventListener("click", close);
  document.querySelector(".bg").addEventListener("click", close);


//카메라 기능
const vid = document.querySelector('video');
navigator.mediaDevices.getUserMedia({video: true}) // request cam
.then(stream => {
  vid.srcObject = stream; // don't use createObjectURL(MediaStream)
  return vid.play(); // returns a Promise
})
.then(()=>{ // enable the button
  const btn = document.querySelector('.snapshot');
  btn.disabled = false;
  btn.onclick = e => {
    takeASnap()
    .then(download);
  };
})
.catch(e=>console.log('please use the fiddle instead'));

function takeASnap(){
  const canvas = document.createElement('canvas'); // create a canvas
  const ctx = canvas.getContext('2d'); // get its context
  canvas.width = vid.videoWidth; // set its size to the one of the video
  canvas.height = vid.videoHeight;
  ctx.drawImage(vid, 0,0); // the video
  return new Promise((res, rej)=>{
    canvas.toBlob(res, 'image/jpeg'); // request a Blob from the canvas
  });
}
function download(blob){
  // uses the <a download> to download a Blob
  let a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'screenshot.jpg';
  document.body.appendChild(a);
  a.click();
}

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

function camera_timer() {
 let timer_input = document.querySelector('.camera-timer-input').value
    let timer_input_1000 = timer_input / 1000
     let minus_num = timer_input / 1000
  let ct_check = document.getElementById('ct-check')

  // setTimeout(function(){takeASnap().then(download);}, timer_input)

    for (let i = 0; i < timer_input_1000; i++) {
      ct_check.textContent = String(minus_num)
      minus_num -= 1
      sleep(1000)
      console.log(minus_num)
      if (minus_num === 0) {
        takeASnap().then(download)
      }
    }
}
