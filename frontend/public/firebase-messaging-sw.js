importScripts('https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.8.0/firebase-messaging.js');

const config = {
  apiKey: 'AIzaSyDgXmj3E2LXDfu-4jSY2tH1lHlRc-YmV9I',
  authDomain: 'ssafy-103.firebaseapp.com',
  projectId: 'ssafy-103',
  storageBucket: 'ssafy-103.appspot.com',
  messagingSenderId: '1021924460606',
  appId: '1:1021924460606:web:4f7ce148a1dd1f2a8be96f',
  measurementId: 'G-EM19M4FZ5Q',
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

//백그라운드 서비스워커 설정
messaging.onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: payload,
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
