import React, { useState, useEffect } from 'react';
import { getToken } from '../../firebaseInit.js';

const Notifications = (props) => {
  const [isTokenFound, setTokenFound] = useState(false);

  useEffect(() => {
    let data;

    async function tokenFunc() {
      data = await getToken(setTokenFound);
      if (data) {
        localStorage.setItem('browerToken', data);
      }
      return data;
    }

    tokenFunc();
  }, [setTokenFound]);
  return <></>;
};

Notifications.propTypes = {};

export default Notifications;
