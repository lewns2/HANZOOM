import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { Axios } from './axios';

const config = {
  apiKey: 'AIzaSyDgXmj3E2LXDfu-4jSY2tH1lHlRc-YmV9I',
  authDomain: 'ssafy-103.firebaseapp.com',
  projectId: 'ssafy-103',
  storageBucket: 'ssafy-103.appspot.com',
  messagingSenderId: '1021924460606',
  appId: '1:1021924460606:web:4f7ce148a1dd1f2a8be96f',
  measurementId: 'G-EM19M4FZ5Q',
};

const app = initializeApp(config);
const messaging = getMessaging();

/* 1. 토큰값 얻기 */
getToken(messaging, {
  vapidKey:
    'BB-XSNA71uO9uEGmPcxSeQ59IMEEhS1nxRP5BY9_fwbq7IGcHbDVnMM-4vah0hlw4Q9OKxUSy4twKdfDSxx6Igk',
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      // console.log(currentToken);
      // const header = {
      //   headers: {
      //     Authorization:
      //       'Bearer AAAA7e9xyD4:APA91bEPAokzHd9yaULDhqEUPy6WJ6wDWaqmmNYfGja87GQbwZYo-bgZSDIy_bLXfzJgwNHPXd00OpxzJ_qdTbNwiJvrFqPjEF9Tr2d2ZuREGUzoPoR29JbGqK1aeOBrXYQKerGqNHqO ',
      //     'Content-Type': 'application/json',
      //   },
      // };
      // const message = {
      //   notification: {
      //     title: 'TEST',
      //     body: '알림 테스트',
      //   },
      //   to: 'f61HbyqCgBXrVR8vwnEgTb:APA91bGMw-KMt-UgyExlfJDVMYeQ01le2BAv5L1DFZwRsjNXzbowrnXpzs9nS8dpG-aO3MuO0gS1U31goMXUvPN_QTWDYWEFMceY4qJb748PSw5U0vlzzT-BkGTq0_83eqYjABj8Lmf6',
      // };
      // Axios.post('https://fcm.googleapis.com/fcm/send', message, header)
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err));
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  })
  .catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });

const useNotification = (title, options) => {
  if (!('Notification' in window)) {
    return;
  }

  const fireNotif = () => {
    /* 권한 요청 부분 */
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          /* 권한을 요청받고 nofi를 생성해주는 부분 */
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      /* 권한이 있을때 바로 noti 생성해주는 부분 */
      new Notification(title, options);
    }
  };
  return fireNotif;
};

/* 포그라운드 메시지 수신인 경우 */
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
  useNotification('Test Noti', {
    body: 'notification body test',
  });
});
