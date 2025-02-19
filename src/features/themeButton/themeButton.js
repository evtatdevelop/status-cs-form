import styles from './themeButton.module.scss';
import dark from '../../dark.module.scss';
import light from '../../light.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { darkTheme, setTheme, } from '../../appSlice';
import { remoteUser } from '../user/userSlice';
import dictionary from "../../dictionary.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

export const ThemeButton = () => {
  const dispatch = useDispatch(); 
  
  const darkMode = useSelector(darkTheme);
  const user = useSelector(remoteUser);

  const styleThemeButton = darkMode ? `${styles.themeButton} ${dark.themeButton}` : `${styles.themeButton} ${light.themeButton}`;
  
  return (
    <button type='buttom' className={styleThemeButton}
      onClick={() => dispatch(setTheme( !darkMode ))}
    >{ darkMode 
       ? <FontAwesomeIcon icon={ faSun } /> 
       : <FontAwesomeIcon icon={ faMoon } />
      }</button>    
  )
}
