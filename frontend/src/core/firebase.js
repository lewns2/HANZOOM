import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

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
      console.log(currentToken);
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

/* 포그라운드 메시지 수신인 경우 */
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});
