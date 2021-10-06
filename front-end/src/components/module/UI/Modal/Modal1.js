import React from 'react';
import { IoMdClose } from 'react-icons/io';

import Button1 from '../Button/Button1';
import ModalRoot from './ModalRoot';

import styles from './Modal1.module.scss';

//Maximum 4 buttons
export default function Modal1({
  title = "Title here. Use 'inputTitle' props to show input in title",
  inputTitle = false,
  btn1,
  btn2,
  btn3,
  btn4,
  btn1Color,
  btn2Color,
  btn3Color,
  btn4Color,
  btn1Width,
  btn2Width,
  btn3Width,
  btn4Width,
  valueInput,
  btnFontSize,
  btnFontWeight,
  marginLeftBtn = '2rem',
  showCloseBtn = true,

  onBtn1Click,
  onBtn2Click,
  onBtn3Click,
  onBtn4Click,
  onCloseClick,
  onChangeInput,
  onBackdropClick,

  ...props
}) {
  return (
    <ModalRoot
      onBackdropClick={onBackdropClick}
      overlayWidth="40rem"
      overlayClassName={styles.container}
    >
      {/* header */}
      <div className={styles.header}>
        {inputTitle ? (
          <input
            value={valueInput}
            placeholder="Task's title"
            onChange={onChangeInput}
          ></input>
        ) : (
          <p>{title}</p>
        )}
        {showCloseBtn && <IoMdClose size={20} onClick={onCloseClick} />}
      </div>
      {/* content */}
      <div className={styles.content}>{props.children}</div>
      {/* footer */}
      <div
        style={{
          '--margin-left-btn': marginLeftBtn,
        }}
        className={styles.footer}
      >
        {btn1 && (
          <Button1
            onClick={onBtn1Click}
            buttonColor={btn1Color}
            buttonFontSize={btnFontSize}
            buttonWidth={btn1Width}
            buttonFontWeight={btnFontWeight}
            className={styles.btn}
          >
            {btn1}
          </Button1>
        )}
        {btn2 && (
          <Button1
            onClick={onBtn2Click}
            buttonColor={btn2Color}
            buttonFontSize={btnFontSize}
            buttonWidth={btn2Width}
            className={styles.btn}
            buttonFontWeight={btnFontWeight}
          >
            {btn2}
          </Button1>
        )}
        {btn3 && (
          <Button1
            onClick={onBtn3Click}
            buttonColor={btn3Color}
            buttonFontSize={btnFontSize}
            buttonWidth={btn3Width}
            className={styles.btn}
            buttonFontWeight={btnFontWeight}
          >
            {btn3}
          </Button1>
        )}
        {btn4 && (
          <Button1
            onClick={onBtn4Click}
            buttonColor={btn4Color}
            buttonFontSize={btnFontSize}
            buttonWidth={btn4Width}
            className={styles.btn}
            buttonFontWeight={btnFontWeight}
          >
            {btn4}
          </Button1>
        )}
      </div>
    </ModalRoot>
  );
}
