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

// firebase 백그라운드 서비스워커 설정 비활성화

// self.addEventListener('push', function (event) {
//   const payload = event.data.json();
//   console.log(payload);
//   const title = payload.data.google.c.a.c_l;
//   const options = {
//     // body: payload.notification.body,
//     // icon: payload.notification.icon,
//     // data: payload.notification.click_action,
//     icon: '/favicon.ico',
//   };
//   event.waitUntil(self.registration.showNotification(title, options));
// });
// self.addEventListener('notificationclick', function (event) {
//   event.notification.close();
//   event.waitUntil(clients.openWindow(event.notification.data));
// });

// self.addEventListener('push', function (event) {
//   const payload = event.data.json();
//   console.log(payload);
//   const title = payload.notification.title;
//   const options = {
//     body: payload.notification.body,
//     icon: payload.notification.icon,
//     data: payload.notification.click_action,
//     icon: '/favicon.ico',
//   };
//   event.waitUntil(self.registration.showNotification(title, options));
// });
// self.addEventListener('notificationclick', function (event) {
//   event.notification.close();
//   event.waitUntil(clients.openWindow(event.notification.data));
// });
