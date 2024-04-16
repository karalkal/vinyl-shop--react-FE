import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import styles from './AdminModal.module.css';

import { Backdrop } from '../layouts/Modal';


const ModalOverlay = (props) => {
  return (
    <div className={styles.adminModal}>
      {props.children}
    </div>
  );
};

// created beforehand <div id="overlays"></div> in index.html
// where modal will be rendered
const portalElement = document.getElementById('overlays');

const AdminModal = (props) => {

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

export default AdminModal;
