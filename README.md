YOUTUBE TUTORIAL: https://www.youtube.com/watch?v=FoAyjLTrlak&list=PLyss3giYIrUzBFFUi9lDe-Ae0mYCIX54s


[Turkish]

Django'nun Channels Kütüphanesi ve JavaScript'in PeerJS kütüphanesiyle yazmış olduğum chat uygulaması. Yazılı iletişim kısmında Django Channels ve WebSocketler kullanılıyor. Görüntülü ve sesli iletişim kısmında ise PeerJS ve WebRTC kullanılıyor. Uygulama ile görsel ve ses dosyası da paylaşabilirken ses kaydedip karşı tarafa yollamak da mümkün.

Gerekenler:

- pip install -r requirements.txt

- python manage.py makemigrations
- python manage.py migrate
- python manage.py runserver

(Arka tarafta PeerServer'ın çalışabilmesi için NodeJS ve NPM'de gerekli)

- npm install
- npx peerjs --port 9000 (peer server'ı ayağa kaldırma)

Linux Kullanıcıları İçin:

- sudo apt install redis-server

[English]

The chat application I wrote with Django's Channels Library and JavaScript's PeerJS library. Django Channels and WebSockets are used for written communication. PeerJS and WebRTC are used in video and audio communication. While you can share image and audio files with the application, it is also possible to record audio and send it to the other party.

Requirements:

- pip install -r requirements.txt

- python manage.py makemigrations
- python manage.py migrate
- python manage.py runserver

(Required for NodeJS and NPM for PeerServer to work at the back)

- npm install
- npx peerjs --port 9000 (launch peer server)

For Linux Users:

- sudo apt install redis-server

