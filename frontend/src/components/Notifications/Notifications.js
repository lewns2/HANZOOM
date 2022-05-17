import React, { useState, useEffect } from 'react';
import { getToken } from '../../firebaseInit.js';
import PropTypes from 'prop-types';

const Notifications = (props) => {
  const [isTokenFound, setTokenFound] = useState(false);

  console.log('토큰 찾았다!', isTokenFound);

  useEffect(() => {
    let data;

    async function tokenFunc() {
      data = await getToken(setTokenFound);
      if (data) {
        localStorage.setItem('browerToken', data);
        console.log('토큰 is ', data);
      }
      return data;
    }

    tokenFunc();
  }, [setTokenFound]);
  return <></>;
};

Notifications.propTypes = {};

export default Notifications;
