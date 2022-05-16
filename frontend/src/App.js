import { useState } from 'react';
import { Routing } from './pages/Routing';
// import './core/firebase';
import { onMessageListener } from './firebaseInit';
import Notifications from './components/Notifications/Notifications';
import ReactNotificationComponent from './components/Notifications/ReactNotification';

function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });

  console.log(show, notification);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload);
    })
    .catch((err) => console.log('실패:', err));

  return (
    <div className="App">
      {show ? (
        <ReactNotificationComponent title={notification.title} body={notification.body} />
      ) : (
        <></>
      )}
      <Notifications />
      <Routing />
    </div>
  );
}

export default App;
