import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import 'firebase/compat/database';
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';

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
export default firebase;

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
    // console.log('토큰 못 가져옴...', error);
  }

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
