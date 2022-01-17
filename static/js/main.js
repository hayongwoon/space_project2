$(document).on("input", "input:file", function () {
    readURL(this)
    document.getElementById('user-img').classList.replace('invisible','visible')
});
let news_modal = true

function readURL(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            $('#user-img').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}


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
            if (response["result"] == randomYogaImg){
                alert('coreect');
                alarmClear();
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


function modal(){
    if(!news_modal){
        document.getElementById('news-modal').classList.replace('invisible','visible')
        news_modal = true
    }else {
        document.getElementById('news-modal').classList.replace('visible','invisible')
        news_modal = false
    }
}


function toGather() {
    const gatherlink = 'https://gather.town/app/aFVnoYb9QJ4GqA3d/sparta-nbcamp-ai';
    window.location.href = gatherlink;
}

function toCheckAttend() {
    const checkAttendLink = 'https://online.spartacodingclub.kr/nbcamp/records';
    window.location.href = checkAttendLink;
}