import { Fragment } from "react";
import styles from './agreeTable.module.scss';
import dark from '../../../../dark.module.scss';
import light from '../../../../light.module.scss';
import { useSelector, } from "react-redux";
import { orderData } from '../../../order/orderSlice';
import { darkTheme, langMode } from '../../../../appSlice';
import dictionary from "../../../../dictionary.json";
import { short_name } from "../../../../utils";

export const AgreeTable = props => {

  const { role } = props;
  const order = useSelector(orderData);
  const lang = useSelector(langMode);
  
  const roleAgreements = 
    order?.agreement?.length
      ?  Object.entries( 
          order.agreement.reduce((result, item) => {
            const agreeVals = result[item.asz32_id]?.length ? [...result[item.asz32_id], item] : [item];
            return {...result, [item.asz32_id]:  agreeVals};
          }, {}) 
        ).reduce((result, item) => {
          const stg = item[1].reduce((stage, agree) => {
            const agreeSage = stage[`_${agree.asz10_seq}`]?.length ? [...stage[`_${agree.asz10_seq}`], agree] : [agree];
            return {...stage, [`_${agree.asz10_seq}`]:  agreeSage};
          },{})
          return {...result, [item[0]]: stg}
        }, {})
      : [];

  const calcStatus = status => {
    switch( status ) {
      case 'agreed': return <p style={{color: '#34B334', }}>{dictionary.approved[lang]}</p>;
      case 'refused': return <p style={{color: '#FF4040'}}>{dictionary.rejected[lang]}</p>;
      case 'sent': return <p style={{color: '#FFA700'}}>{dictionary.under_consideration[lang]}</p>;
      case 'canceled': return <p style={{color: '#91A3B0'}}>{dictionary.canceled[lang]}</p>;
      case 'added': return <p style={{color: '#91A3B0'}}>{dictionary.previous_stage_pending[lang]}</p>;
      default: return <p></p>;
    }
  }       

  const darkMode = useSelector(darkTheme);
  const styleAgreeTable = darkMode ? `${styles.agreeTable} ${dark.agreeTable}` : `${styles.agreeTable} ${light.agreeTable}`;

  return (
    <ul className={styleAgreeTable}>
      <li className=""><label>{dictionary.stage_name[lang]}</label><ul><li>{dictionary.org_Level[lang]}</li><li>{dictionary.approver[lang]}</li><li>{dictionary.status[lang]}</li></ul></li> 
      { 
        Object.entries(roleAgreements[role.asz32_id]).map(agreeStage => 
          <li key={`${role.asz32_id}${agreeStage[0]}`}>
            <label>{agreeStage[1][0].asz10_name}</label>
            <ul>{
              agreeStage[1].map(agree=> <Fragment key={agree.asz06_id}>
                <li>{agree.asz06_path}</li>
                <li><span>{`${short_name(agree.app12_name)}`}</span> <span  className={styles.smaller}>(<a href={`mailto:${agree.app12_email}`}>{agree.app12_email}</a>)</span></li>
                <li>
                  {calcStatus(agree.status)}
                  <span className={styles.smaller}>{agree.last_date ? `(${agree.last_date})` : null}</span>
                  { agree.vote_login && agree.app12_fact_id !== agree.app12_id
                    ? agree.autoagree_flag_2 === 1
                      ? <span className={styles.smaller}>{dictionary.auto_negotiation[lang]}</span>
                      : <span className={styles.smaller}>{dictionary.deputy_mode[lang]} - {short_name(agree.app12_fact_name)}</span>
                    : null
                  }
                  { agree.agree_comment && agree.autoagree_flag_2 !== 1
                    ? <span className={styles.smaller}><span className={styles.bold}>{dictionary.comment[lang]}</span>: {agree.agree_comment}</span>
                    : null
                  }
                </li>
              </Fragment>)  
            }</ul>
          </li>
        )
      }</ul>   
  )
}
