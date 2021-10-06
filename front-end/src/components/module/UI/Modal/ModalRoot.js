import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import styles from './ModalRoot.module.scss';

const Backdrop = ({ onBackdropClick, backdropOpacity = 0.5, ...props }) => {
  return (
    <div
      className={styles.backdrop}
      style={{
        '--backdrop-opacity': backdropOpacity,
      }}
      onClick={onBackdropClick}
    ></div>
  );
};

const ModalOverlay = ({ overlayWidth, ...props }) => {
  return (
    <div
      className={`${styles.modal} ${props.className}`}
      style={{ '--overlay-width': overlayWidth }}
    >
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

export default function ModalRoot({
  onBackdropClick,
  backdropOpacity,

  overlayClassName,
  overlayWidth = '40rem',

  ...props
}) {
  return (
    <Fragment>
      {/* backdrop */}
      {ReactDOM.createPortal(
        <Backdrop
          backdropOpacity={backdropOpacity}
          onBackdropClick={onBackdropClick}
        ></Backdrop>,
        document.getElementById('backdrop-root')
      )}
      {/* overlay element */}
      {ReactDOM.createPortal(
        <ModalOverlay overlayWidth={overlayWidth} className={overlayClassName}>
          {props.children}
        </ModalOverlay>,
        document.getElementById('overlay-root')
      )}
    </Fragment>
  );
}
