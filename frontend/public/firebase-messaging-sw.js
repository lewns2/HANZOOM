// import { initializeApp } from 'firebase/app';
// import { getMessaging } from 'firebase/messaging/sw';
// 9.8.1
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';
import {
  getMessaging,
  isSupported,
  onBackgroundMessage,
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-messaging.js';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyDgXmj3E2LXDfu-4jSY2tH1lHlRc-YmV9I',
  authDomain: 'ssafy-103.firebaseapp.com',
  projectId: 'ssafy-103',
  storageBucket: 'ssafy-103.appspot.com',
  messagingSenderId: '1021924460606',
  appId: '1:1021924460606:web:4f7ce148a1dd1f2a8be96f',
  measurementId: 'G-EM19M4FZ5Q',
});

const messaging = getMessaging(firebaseApp);

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
