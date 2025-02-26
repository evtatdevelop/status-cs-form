// import { Fragment } from "react";
import styles from './agreements.module.scss';
import dark from '../../../dark.module.scss';
import light from '../../../light.module.scss';
import { useSelector, } from "react-redux";
import { orderData } from '../../order/orderSlice';
import { darkTheme, langMode } from '../../../appSlice';
import dictionary from "../../../dictionary.json";
import { AgreeTable } from "./agreeTable/agreeTable";

export const Agreements = () => {

  const order = useSelector(orderData);
  const lang = useSelector(langMode);
  
  const darkMode = useSelector(darkTheme);
  const styleAgreements = darkMode ? `${styles.agreements} ${dark.agreements}` : `${styles.agreements} ${light.agreements}`;

  return (
    <div className={styleAgreements}>
      <h3>{dictionary.approvals[lang]}</h3>
      {
        order?.roles
        ? order.roles.map(role => 
          <ul key={role.asz32_id}>

            { role.asz00_full_name
              ? <li>
                  <div>{`${dictionary.system[lang]}`}:</div>  
                  <div>{role.asz00_full_name}</div>
                </li>
              : null
            }

            { order?.main.asz80_full_name || order?.main.asz80_full_name_en
              ? <li>
                  <div>{`${dictionary.subsystem[lang]}`}:</div>  
                  <div>{lang === 'RU' ? order.main.asz80_full_name : order.main.asz80_full_name_en}</div>
                </li>
              : null
            }

            { role.asz03_name
              ? <li>
                  <div>{`${dictionary.nameRole[lang]}`}:</div>  
                  <div>{role.asz03_name}</div>
                </li>
              : null
            }       

            { role.asz02_name
              ? <li>
                  <div>{`${dictionary.nameProcessGroup[lang]}`}:</div>  
                  <div>{role.asz02_name}</div>
                </li>
              : null
            }        

            { role.role_cod
              ? <li>
                  <div>{`${dictionary.code[lang]}`}:</div>  
                  <div>{role.role_cod}</div>
                </li>
              : null
            }

            { true
              ? <li>
                  <div>{`${dictionary.role_valid[lang]}`}:</div>  
                  <div>{  
                    role.date_from && role.date_to
                    ? `${dictionary.from[lang]} ${role.date_from} ${dictionary.to[lang]} ${role.date_to}`
                    : !role.date_from && role.date_to
                      ? `${dictionary.to[lang]} ${role.date_to}`
                      : role.date_from && !role.date_to
                        ? `${dictionary.from[lang]} ${role.date_from} ${dictionary.no_limit[lang]}`
                        : !role.date_from && !role.date_to
                          ? `${dictionary.no_limit[lang]}`
                          : null
                  }</div>
                </li>
              : null
            }

            { role.comments
              ? <li>
                  <div>{`${dictionary.comment[lang]}`}:</div>  
                  <div>{role.comments}</div>
                </li>
              : null
            }

            <AgreeTable role = {role}/>

          </ul>
        )
        : null        
      }
    </div>

  )
}
