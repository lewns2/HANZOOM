import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import 'firebase/compat/database';

firebase.initializeApp(firebaseConfig);
export default firebase;

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

const messaging = firebase.messaging();

const publicKey = process.env.REACT_APP_FIREBASE_PUBLIC_KEY;

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
