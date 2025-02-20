import styles from './header.module.scss';
import dark from '../../dark.module.scss';
import light from '../../light.module.scss';
import { useSelector, } from "react-redux";
import { darkTheme, langMode} from '../../appSlice';
import dictionary from "../../dictionary.json";
import { ThemeButton } from '../themeButton/themeButton';
import { LangButton } from '../langButton/langButton';

export const Header = () => {
  const darkMode = useSelector(darkTheme);
  const lang = useSelector(langMode);

  const styleHeader = darkMode ? `${styles.header} ${dark.header}` : `${styles.header} ${light.header}`;
  
  return (
    <section className={styleHeader} >
      <a href='https://asuz.digtp.com/'>{dictionary.asuz_portal[lang]}</a>
      <div>
        <ThemeButton/>
        <LangButton/>       
      </div>

    </section>    
  )
}
