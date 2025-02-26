import { Fragment } from "react";
import styles from './agreeTable.module.scss';
import dark from '../../../../dark.module.scss';
import light from '../../../../light.module.scss';
import { useSelector, } from "react-redux";
import { orderData } from '../../../order/orderSlice';
import { darkTheme, langMode } from '../../../../appSlice';
import dictionary from "../../../../dictionary.json";

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

  const darkMode = useSelector(darkTheme);
  const styleAgreeTable = darkMode ? `${styles.agreeTable} ${dark.agreeTable}` : `${styles.agreeTable} ${light.agreeTable}`;

  return (
    <ul className={styleAgreeTable}>{ 
      Object.entries(roleAgreements[role.asz32_id]).map(agreeStage => <li key={`${role.asz32_id}${agreeStage[0]}`} className={styles.stage}>
        <label>{agreeStage[1][0].asz10_name}</label>
        <ul className={styles.stageAgreements}>{
          agreeStage[1].map(agree=> <Fragment key={agree.asz06_id}>
            <div>{agree.asz06_path}</div>
            <div>{`${agree.app12_name} ${agree.app12_email}`}</div>
            <div>{agree.status}</div>
          </Fragment>)  
        }</ul>
      </li>)
    }</ul>   
  )
}
