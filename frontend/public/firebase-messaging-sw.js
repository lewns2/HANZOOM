importScripts('https://www.gstatic.com/firebasejs/9.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.8.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'firebase apiKey',
  authDomain: 'authDomain',
  databaseURL: 'databaseURL',
  projectId: 'ssafy-103',
  storageBucket: 'storageBucket',
  messagingSenderId: 'messagingSenderId',
  appId: 'appId',
  measurementId: 'measurementId',
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
