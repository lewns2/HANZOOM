import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

const ReactNotificationComponent = ({ title, body }) => {
  toast.info(<Display />, {
    icon: ({ theme, type }) => <img src="/favicon.ico" />,
  });
  function Display() {
    return (
      <div style={{ marginLeft: '10%' }}>
        <h5 style={{ fontWeight: 'bolder' }}>{title}</h5>
        <p>{body}</p>
      </div>
    );
  }
  return <ToastContainer />;
};

ReactNotificationComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

export default ReactNotificationComponent;
