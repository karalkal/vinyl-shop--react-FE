import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './CartModal.module.css';

import { Backdrop } from './Modal';


const ModalOverlay = (props) => {
  return (
    <div className={classes.cartModal}>
      {props.children}
    </div>
  );
};

// created beforehand <div id="overlays"></div> in index.html
// where modal will be rendered
const portalElement = document.getElementById('overlays');

const CartModal = (props) => {
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

export default CartModal;
