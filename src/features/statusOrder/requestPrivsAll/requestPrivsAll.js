import styles from './requestPrivsAll.module.scss';
import dark from '../../../dark.module.scss';
import light from '../../../light.module.scss';
import { useSelector, } from "react-redux";
import { orderData } from '../../order/orderSlice';
import { darkTheme, langMode } from '../../../appSlice';
import dictionary from "../../../dictionary.json";

export const RequestPrivsAll = () => {

  const order = useSelector(orderData);
  const lang = useSelector(langMode);
  
  const darkMode = useSelector(darkTheme);
  const styleRequestPrivsAll = darkMode ? `${styles.requestPrivsAll} ${dark.requestPrivsAll}` : `${styles.requestPrivsAll} ${light.requestPrivsAll}`;

  return (
    <div className={styleRequestPrivsAll} >

      <h3>{dictionary.asked_access_permissions[lang]}</h3>
      <ul>
        <li>
          <label>{dictionary.role[lang]}</label>
          <label>{dictionary.organizational_levels[lang]}</label>

        </li>
        {
          order?.askedPermissions
          ? Object.values(order.askedPermissions).map( (role, index) => 
            <li key={index}>
              <label>{`${role.asz32_name} ${role.role_cod}`}</label>
              <ul className={styles.roleLevel}>{
                Object.entries(role.levels).map((level, indx) => 
                  <li key={indx}>
                    <label>{level[0]}</label>
                    <ul>{
                      Object.values(level[1]).map((value, i) =>
                        <li key={i}>{`${value.code_val}`}<span>{` (${value.asz06_name})`}</span></li>
                      )
                    }</ul>
                </li>)
              }</ul>
            </li> )
          : null  
        }
      </ul>
    </div>    
  )
}
