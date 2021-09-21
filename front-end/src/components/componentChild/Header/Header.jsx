import React from 'react'
import styles from './Header.module.css'
import logo from '../../../assets/image/icon/White Simple Home Furnishing Logo 7.png'
import iconSearch from '../../../assets/image/icon/icons8-search-24.png'
import Card from '../../../UI/Card/Card'
import iconMess from '../../../assets/image/icon/icons8-message-64.png'
import iconNotify from '../../../assets/image/icon/icons8-notification-50.png'
import iconAvatar from '../../../assets/image/icon/avatar.png'
function Header() {
  return (
    <header className={styles.header}>
      
        <div className={styles['header--logo']} >
          <img src={logo} alt="logo" />
        </div>
        <ul className={styles['header__option']}>
          <li className={styles['header__option-items']}>For you</li>
          <li className={styles['header__option-items']}>Live Stream</li>
        </ul>
        <div className={styles['header__search']}>
          <input type="text" />
          <img src={iconSearch} alt="search" />
        </div>
        <Card className={styles['header__sharework']}>Share Your Work</Card>
        <ul className={styles['header__info']}>
          <li className={styles['header__info-items']}>
            <img src={iconMess} alt="mess" />
          </li>
          <li className={styles['header__info-items']}>
            <img src={iconNotify} alt="notify" />
          </li>
          <li className={styles['header__info-items--avatar']}>
            <img src={iconAvatar} alt="avatar" />
          </li>
        </ul>
      
    </header>
  )
}

export default Header
