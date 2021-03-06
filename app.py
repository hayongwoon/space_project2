from flask import Flask, render_template, request, jsonify
from datetime import datetime
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg16 import preprocess_input
import requests
from bs4 import BeautifulSoup


# 학습시킨 binary classification model 불러오기 (출력층을 sigmoid 로 설정했기에, predict 하면 아웃풋이 0~1 로 나옴)
model = tf.keras.models.load_model('static/model/model.h5')
# 해당 모델은 아웃풋이 0이면 고양이, 1이면 강아지라고 판별한 것
# 아웃풋이 어떤지는 모델 생성 시 출력층을 어떻게 구성했는지에 따라 얼마든지 달라질 수 있음에 유의
# 모델 생성 시 출력층을 softmax 로 설정했다면 카테고리 갯수만큼 아웃풋이 나올 것
# 모델 생성 시 출력층을 sigmoid 로 설정했다면 0~1로 아웃풋이 나올 것
app = Flask(__name__)
model_class = ['downdog', 'goddess', 'plank', 'tree', 'warrior2']

@app.route('/')
def home():
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get('https://www.ytn.co.kr/news/main_news.html', headers=headers)

    soup = BeautifulSoup(data.text, 'html.parser')

    topic = soup.select_one('#wrap > div.newslist_bot.wrapper').select('div.topic > div')

    news = {}
    i = 1
    for t in topic:
        small = {}
        j = 1
        for s in t.select('.topic_small'):
            small_title = s.select_one('.til').text
            if s.select_one('a > div > div > div > img'):
                small_img = s.select_one('a > div > div > div > img').attrs['src']
                small_desc = ''
            else:
                small_img = ''
                small_desc = s.select_one('.topic_small > a > span.desc').text
            small[j] = {
                'title': small_title,
                'img': small_img,
                'desc': small_desc
            }
            j += 1
        news[i] = {
            'topic': t.select_one('h2>span>span').text,
            'big': {
                'title': t.select_one('a > span').text,
                'img': t.select_one('.topic_big > a > div > div > div > img').attrs['src']
            },
            'small': small
        }
        i += 1
    return render_template('index.html', news=news)


# 이전에 드렸던 파일 업로드 자료의 함수와 거의 동일합니다.
@app.route('/fileupload', methods=['POST'])
def file_upload():
    file = request.files['file_give']
    # 해당 파일에서 확장자명만 추출
    extension = file.filename.split('.')[-1]
    # 파일 이름이 중복되면 안되므로, 지금 시간을 해당 파일 이름으로 만들어서 중복이 되지 않게 함!
    today = datetime.now()
    mytime = today.strftime('%Y-%m-%d-%H-%M-%S')
    filename = f'{mytime}'
    # 파일 저장 경로 설정 (파일은 서버 컴퓨터 자체에 저장됨)
    save_to = f'static/img/{filename}.{extension}'
    # 파일 저장!
    file.save(save_to)
    # 바로 이미지 불러와서 형식 바꿔준다
    img = image.load_img(save_to, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    img_data = preprocess_input(x)
    classes = model.predict(img_data)
    # 예측값의 최대값 인덱스를 만들어 놓은 클래스에 맞게 보낸다

    #yogaFile = request.form['randomYogaImg']
    #return jsonify({'result': yogaFile})
    return jsonify({'result': model_class[classes.argmax()]})
    #return render_template('index.html', modelValue = model_class[classes.argmax()])

#
# @app.route('/result', methods=['POST'])
# def result():
#     # 모델은 불러와져 있으니, 사용자가 올린 데이터를 predict 함수에 넣어주면 됨
#     # 이미지이기에, rescale 및 size 조정을 위해 ImageDataGenerator 활용
#     test_datagen = ImageDataGenerator(rescale=1. / 255)
#     test_dir = 'static/img'
#     test_generator = test_datagen.flow_from_directory(
#         test_dir,
#         # target_size 는 학습할때 설정했던 사이즈와 일치해야 함
#         target_size=(224, 224),
#         color_mode="rgb",
#         shuffle=False,
#         # test 셋의 경우, 굳이 클래스가 필요하지 않음
#         # 학습할때는 꼭 binary 혹은 categorical 로 설정해줘야 함에 유의
#         class_mode=None,
#         batch_size=1)
#     pred = model.predict(test_generator)
#     # 마지막으로 업로드한 사진에 대한 판별결과를 보여줌
#     # 이 부분은 어떤 서비스를 만들고자 하는지에 따라서 얼마든지 달라질 수 있음
#     if pred[-1] > 0.5:
#         result = '강아지'
#     else:
#         result = '고양이'
#     return render_template('index.html', result=result)


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
