import { Routing } from './pages/Routing';
import { firebaseApp } from './core/firebase';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const messaging = getMessaging(firebaseApp);

getToken(messaging, {
  vapidKey:
    'BB-XSNA71uO9uEGmPcxSeQ59IMEEhS1nxRP5BY9_fwbq7IGcHbDVnMM-4vah0hlw4Q9OKxUSy4twKdfDSxx6Igk',
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
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

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});

function App() {
  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;
