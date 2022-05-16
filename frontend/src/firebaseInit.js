import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyDgXmj3E2LXDfu-4jSY2tH1lHlRc-YmV9I',
  authDomain: 'ssafy-103.firebaseapp.com',
  projectId: 'ssafy-103',
  storageBucket: 'ssafy-103.appspot.com',
  messagingSenderId: '1021924460606',
  appId: '1:1021924460606:web:4f7ce148a1dd1f2a8be96f',
  measurementId: 'G-EM19M4FZ5Q',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const publicKey =
  'BB-XSNA71uO9uEGmPcxSeQ59IMEEhS1nxRP5BY9_fwbq7IGcHbDVnMM-4vah0hlw4Q9OKxUSy4twKdfDSxx6Igk';

export const getToken = async (setTokenFound) => {
  let currentToken = '';
  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log('토큰 못 가져옴...', error);
  }

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      console.log('메세지 내용 : ', payload);
      resolve(payload);
    });
  });
