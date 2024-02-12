import { Fragment, useContext } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';
import AuthContext from '../context/auth-context';


// darken content below the modal, if clicked outside of modal, hide it
const Backdrop = (props) => {
  const { setLoginModalVisible } = useContext(AuthContext)

  return <div className={classes.backdrop} onClick={() => setLoginModalVisible(false)} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

// created beforehand <div id="overlays"></div> in index.html
// where modal will be rendered
const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onHideCart={props.onHideCart} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
