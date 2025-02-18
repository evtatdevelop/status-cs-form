import styles from './header.module.scss';
import dark from '../../dark.module.scss';
import light from '../../light.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { darkTheme, setTheme, } from '../../appSlice';
import { setLang } from '../user/userSlice';
import { remoteUser } from '../user/userSlice';
import dictionary from "../../dictionary.json";

export const Header = () => {
  const dispatch = useDispatch(); 
  
  const darkMode = useSelector(darkTheme);
  const user = useSelector(remoteUser);

  const styleHeader = darkMode ? `${styles.header} ${dark.header}` : `${styles.header} ${light.header}`;
  
  return (
    <section className={styleHeader} >
      <a href='https://asuz.digtp.com/'>{dictionary.asuz_ortal[user.lang]}</a>
      <div>
        <button type='buttom' 
          onClick={() => dispatch(setTheme( !darkMode ))}
        >Theme</button> 
        <button type='buttom' 
          onClick={() => dispatch(setLang( {'app12_id': user.id, 'lang': user.lang === 'RU' ? "EN" : "RU", } ))}
        >{user.lang}</button>         
      </div>

    </section>    
  )
}
