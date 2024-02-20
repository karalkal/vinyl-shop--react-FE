import { Fragment, useContext } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';
import AuthContext from '../context/AuthContextProvider'; 
import CartContext from '../context/CartContextProvider';


// darken content below the modal, if clicked outside of modal, hide it
// will reuse this in CartModal
export const Backdrop = (props) => {
  const { setLoginModalVisible, setRegisterModalVisible } = useContext(AuthContext);
  const { setCartModalVisible} = useContext(CartContext)

  // TODO: not very intelligent solution
  function clearAllModals() {
    console.log("clicked backdrop")
    setLoginModalVisible(false);
    setRegisterModalVisible(false)
    setCartModalVisible(false)
  }


  return <div className={classes.backdrop} onClick={clearAllModals} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      {props.children}
    </div>
  );
};

// created beforehand <div id="overlays"></div> in index.html
// where modal will be rendered
const portalElement = document.getElementById('overlays');

const Modal = (props) => {
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

export default Modal;
