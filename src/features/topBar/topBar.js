import React, { useState } from "react";
import styles from './topBar.module.scss';
import { useSelector } from "react-redux";
import { user, loading } from '../user/userSlice';
import { LangButton } from "../components/langButton/langButton";
import dictionary from '../../dictionary.json';
import { ThemeButton } from "../components/themeButton/themeButton";
import { darkTheme } from "../main/mainpageSlice";
import { Link, useLocation  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, } from '@fortawesome/free-solid-svg-icons'

export const TopBar = () => {
  const location = useLocation();

  const userData = useSelector(user);
  const load = useSelector(loading);
  const dark = useSelector(darkTheme);

  const lang = userData.lang;

  const [show, setShow] = useState(false);

  const headerStyle = dark 
    ? `${styles.header} ${styles.dark}`
    : `${styles.header}`

    const btnPreferencesStyle = show ? `${styles.btnPreferences} ${styles.changed}` : `${styles.btnPreferences}`;

  return (
    <header className={headerStyle}>
    { !load
      ? <>
          <div className={styles.headerCaption}>
            <Link to="/">
              <h1 >{ dictionary.ams_order_form[lang] }</h1>
              {location.pathname !== '/' ? <FontAwesomeIcon icon={ faArrowUpRightFromSquare } className={styles.linkSign}/> : null}
            </Link>
          </div>

          <button
            type="button"
            className={btnPreferencesStyle}
            onClick={() => setShow(!show)}
          >
            {/* <FontAwesomeIcon icon={ faBars } className={styles.btnPreferencesIcon} /> */}
            <div></div>
          </button>

          { show
            ? <div className={styles.preferences}>
                <div><LangButton/></div>
                <div><ThemeButton/></div>
              </div>
            : null
          }

        </>
      : null
    }   
    </header>      
  )
}
