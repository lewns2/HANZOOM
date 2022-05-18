importScripts('https://www.gstatic.com/firebasejs/9.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.8.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyDgXmj3E2LXDfu-4jSY2tH1lHlRc-YmV9I',
  authDomain: 'ssafy-103.firebaseapp.com',
  databaseURL: 'https://ssafy-103-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'ssafy-103',
  storageBucket: 'ssafy-103.appspot.com',
  messagingSenderId: '1021924460606',
  appId: '1:1021924460606:web:d52fcb580c6ed0e68be96f',
  measurementId: 'G-74ZS8TSXWE',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

//백그라운드 서비스워커 설정
// messaging.onBackgroundMessage(messaging, (payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);

//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: payload,
//     icon: './img/HANZOOM.png',
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

self.addEventListener('push', function (event) {
  const payload = event.data.json();
  const title = payload.notification.title;
  const options = {
    body: payload.notification.body,
    icon: payload.notification.icon,
    data: payload.notification.click_action,
    icon: '/favicon.ico',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener('notificationclick', function (event) {
  console.log(event.notification);
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
});

// messaging.onBackgroundMessage(function (payload) {
//   console.log('백그라운드에서 받았어 ', payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: '/favicon.ico',
//   };
//   return self.registration.showNotification(notificationTitle, notificationOptions);
// });
