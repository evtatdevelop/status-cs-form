import React, { useState, } from "react";
import styles from './langButton.module.scss';
import dark from '../../dark.module.scss';
import light from '../../light.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { darkTheme, langMode, setLangMode, } from '../../appSlice';
import { remoteUser, setLang, langLoading } from '../user/userSlice';
// import dictionary from "../../dictionary.json";
import { TestLoader } from './testLoader';

export const LangButton = () => {
  const dispatch = useDispatch(); 
  
  const darkMode = useSelector(darkTheme);
  const user = useSelector(remoteUser);
  const lang = useSelector(langMode);
  const langLoad = useSelector(langLoading);

  const [show, setShow] = useState(false)

  
  const setAppLang = lang => {
    dispatch(setLang( {'app12_id': user.id, 'lang': lang === 'ZH' ? 'EN' : lang, } ));
    dispatch(setLangMode(lang));
    setShow(false);
  }
  
  const styleLangButton = darkMode ? `${styles.langButton} ${dark.langButton}` : `${styles.langButton} ${light.langButton}`;
  const styleSelectList = show ? `${styles.selectList} ${styles.showSelectList}` : `${styles.selectList} ${styles.hideSelectList}`

  return (
    <div className={styleLangButton}>
      { langLoad || !lang
        ? <TestLoader/>
        : <>
            <button type='buttom'
              onClick={() => setShow(!show)}
            >{lang}</button>
            <ul className={styleSelectList}>
              { lang !== 'RU' ? <li><button type='buttom' onClick={() => setAppLang('RU') } >Ru</button></li> : null}
              { lang !== 'EN' ? <li><button type='buttom' onClick={() => setAppLang('EN') } >En</button></li> : null}
              { lang !== 'ZH' ? <li><button type='buttom' onClick={() => setAppLang('ZH') } >Zh</button></li> : null}         
            </ul>        
          </>
      }
    </div>
  
  )
}
