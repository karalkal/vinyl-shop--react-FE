import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import styles from './ErrorInfoModal.module.css';

import { Backdrop } from '../layouts/Modal';


const ModalOverlay = (props) => {
  return (
    <div className={styles.errorModal}>
      {props.children}
    </div>
  );
};

// created beforehand <div id="overlays"></div> in index.html
// where modal will be rendered
const portalElement = document.getElementById('overlays');

const ErrorInfoModal = (props) => {

  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default ErrorInfoModal;
