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
      case 'agreed': return <span style={{color: 'light-green'}}>{dictionary.approved[lang]}</span>;
      case 'refused': return <span style={{color: 'red'}}>{dictionary.rejected[lang]}</span>;
      case 'sent': return <p style={{color: 'orange'}}>{dictionary.under_consideration[lang]}</p>;
      case 'canceled': return <span style={{color: 'grey'}}>{dictionary.canceled[lang]}</span>;
      case 'added': return <span style={{color: 'grey'}}>{dictionary.previous_stage_pending[lang]}</span>;
      default: return <span></span>;
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
                </li>
              </Fragment>)  
            }</ul>
          </li>
        )
      }</ul>   
  )
}
