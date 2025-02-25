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

      <h3 className={styles.asked_accesses}>{dictionary.asked_access_permissions[lang]}</h3>
      <ul className={styles.askedPermissions}>
        <li className={styles.role}>
          <label className={styles.tableHead}>{dictionary.role[lang]}</label>
          <label className={styles.tableHead}>{dictionary.organizational_levels[lang]}</label>

        </li>
        {
          order?.askedPermissions
          ? Object.values(order.askedPermissions).map( (role, index) => 
            <li key={index} className={styles.role}>
              <label className={styles.roleName}>{`${role.asz32_name} ${role.role_cod}`}</label>
              <ul className={styles.roleLevel}>{
                Object.entries(role.levels).map((level, indx) => 
                  <li key={indx} className={styles.level}>
                    <label className={styles.levelName}>{level[0]}</label>
                    <ul className={styles.values}>{
                      Object.values(level[1]).map((value, i) =>
                        <li key={i} className={styles.value}>{`${value.code_val}`}<span>{` (${value.asz06_name})`}</span></li>
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
