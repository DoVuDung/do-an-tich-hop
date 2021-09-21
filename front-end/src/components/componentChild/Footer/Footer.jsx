import React from 'react'
import styles from './Footer.module.css'
import iconChplay from '../../../assets/image/icon/chplay.png'
import iconApple from '../../../assets/image/icon/apple_icon.png'
import iconTwitter from '../../../assets/image/icon/icons8-twitter-24.png'
import iconFacebook from '../../../assets/image/icon/icons8-facebook-24.png'
import iconGithub from '../../../assets/image/icon/icons8-github-24.png'

function Footer(props) {
  return (
    <footer>
      <ul className={styles.footer__fields}>
        <li className={styles.footer__field}>
          <ul className={styles.footer__child__fields}>GuruAcademy
            <li className={styles.footer__child__field}>About</li>
            <li className={styles.footer__child__field}>Careers</li>
            <li className={styles.footer__child__field}>Blog</li>
            <li className={styles.footer__child__field}>Partnerships</li>
          </ul>
        </li>
        <li className={styles.footer__field}>
          
          <ul className={styles.footer__child__fields} >Community
            <li className={styles.footer__child__field}>About</li>
            <li className={styles.footer__child__field}>Careers</li>
            <li className={styles.footer__child__field}>Blog</li>
            <li className={styles.footer__child__field}>Partnerships</li>
          </ul>
        </li>
        <li className={styles.footer__field}>
          <ul className={styles.footer__child__fields}>Teaching
            <li className={styles.footer__child__field}>Become a Teacher</li>
            <li className={styles.footer__child__field}>Teaching GuruAcademy</li>
          </ul>
        </li>
        <li className={styles.footer__field}>Mobile
          <img src={iconChplay} alt="goole play" />
          <img src={iconApple} alt="app store" />
        </li>
      </ul>
      <hr/>
      <ul className={styles.footer__child}>
        <li className={styles['footer__child--items']}>@ GuruAcademy, Inc, 2021</li>
        <li className={styles['footer__child--items']}>Help</li>
        <li className={styles['footer__child--items']}>Privacy</li>
        <li className={styles['footer__child--items']}>Terms</li>
        <li className={styles['footer__child--items']}>
          <ul className={styles['footer__child-social--icons']}>
            <li className={styles['footer__child-social--icon']}><img src={iconTwitter} alt="Twitter" /></li>
            <li className={styles['footer__child-social--icon']}><img src={iconFacebook} alt="Facebook" /></li>
            <li className={styles['footer__child-social--icon']}><img src={iconGithub} alt="Github" /></li>
          </ul>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
