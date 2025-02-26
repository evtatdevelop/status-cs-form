// import { Fragment } from "react";
import styles from './agreements.module.scss';
import dark from '../../../dark.module.scss';
import light from '../../../light.module.scss';
import { useSelector, } from "react-redux";
import { orderData } from '../../order/orderSlice';
import { darkTheme, langMode } from '../../../appSlice';
import dictionary from "../../../dictionary.json";
import { Row } from "../../components/row/row";
import { InfoField } from "../../components/infoField/infoField";
import { AgreeTable } from "./agreeTable/agreeTable";

export const Agreements = () => {

  const order = useSelector(orderData);
  const lang = useSelector(langMode);
  
  const darkMode = useSelector(darkTheme);
  const styleAgreements = darkMode ? `${styles.agreements} ${dark.agreements}` : `${styles.agreements} ${light.agreements}`;

  return (
    order?.roles
    ? order.roles.map(role => 
      <ul key={role.asz32_id} className={styleAgreements}>

        { role.asz00_full_name
          ? <li>
              <div>{`${dictionary.system[lang]}`}:</div>  
              <div>{role.asz00_full_name}</div>
            </li>
          : null
        }
        {/* <Row>
          <label>{`${dictionary.system[lang]}`}</label>
          <div className={styles.wrapField}><InfoField val = {role.asz00_full_name} /></div>
        </Row> */}

        { order?.main.asz80_full_name || order?.main.asz80_full_name_en
          ? <li>
              <div>{`${dictionary.subsystem[lang]}`}:</div>  
              <div>{lang === 'RU' ? order.main.asz80_full_name : order.main.asz80_full_name_en}</div>
            </li>
          : null
        }
        {/* <Row>
          <label>{`${dictionary.subsystem[lang]}`}</label>
          <div className={styles.wrapField}><InfoField val = {lang === 'RU' ? order.main.asz80_full_name : order.main.asz80_full_name_en} /></div>
        </Row> */}

        { role.asz03_name
          ? <li>
              <div>{`${dictionary.nameRole[lang]}`}:</div>  
              <div>{role.asz03_name}</div>
            </li>
          : null
        }       
        {/* <Row>
          <label>{`${dictionary.nameRole[lang]}`}</label>
          <div className={styles.wrapField}><InfoField val = {role.asz03_name} /></div>
        </Row> */}

        { role.asz02_name
          ? <li>
              <div>{`${dictionary.nameProcessGroup[lang]}`}:</div>  
              <div>{role.asz02_name}</div>
            </li>
          : null
        }        
        {/* <Row>
          <label>{`${dictionary.nameProcessGroup[lang]}`}</label>
          <div className={styles.wrapField}><InfoField val = {role.asz02_name} /></div>
        </Row> */}

        { role.role_cod
          ? <li>
              <div>{`${dictionary.code[lang]}`}:</div>  
              <div>{role.role_cod}</div>
            </li>
          : null
        }
        {/* <Row>
          <label>{`${dictionary.code[lang]}`}</label>
          <div className={styles.wrapField}><InfoField val = {role.role_cod} /></div>
        </Row> */}

        { role.date_from || role.date_to
          ? <li>
              <div>{`${dictionary.role_valid[lang]}`}:</div>  
              <div>{`${role.date_from} - ${role.date_to}`}</div>
            </li>
          : null
        }
        {/* <Row>
          <label>{`${dictionary.role_valid[lang]}`}</label>
          <div className={styles.wrapField}><InfoField val = {`${role.date_from} - ${role.date_to}`} /></div>
        </Row> */}

        { role.comments
          ? <li>
              <div>{`${dictionary.comment[lang]}`}:</div>  
              <div>{role.comments}</div>
            </li>
          : null
        }
        {/* <Row>
          <label>{`${dictionary.comment[lang]}`}</label>
          <div className={styles.wrapField}><InfoField val = {role.comments} /></div>
        </Row> */}

        <AgreeTable role = {role}/>

      </ul>
    )
    : null
  )
}
