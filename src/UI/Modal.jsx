
import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { useSelector } from "react-redux";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.close}></div>;
};

const ModalOverlays = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("modal");


const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.close}/>, portalElement)}
      {ReactDOM.createPortal(<ModalOverlays>{props.children}</ModalOverlays>,
        portalElement
      )}
    </Fragment>
  );
};
export default Modal;
