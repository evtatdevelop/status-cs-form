import { Fragment } from "react";
import styles from './agreements.module.scss';
import dark from '../../../dark.module.scss';
import light from '../../../light.module.scss';
import { useSelector, } from "react-redux";
import { orderData } from '../../order/orderSlice';
import { darkTheme, langMode } from '../../../appSlice';
import dictionary from "../../../dictionary.json";
import { Row } from "../../components/row/row";
import { InfoField } from "../../components/infoField/infoField";

export const Agreements = () => {

  const order = useSelector(orderData);
  const lang = useSelector(langMode);
  
  const darkMode = useSelector(darkTheme);
  const styleAgreements = darkMode ? `${styles.agreements} ${dark.agreements}` : `${styles.agreements} ${light.agreements}`;

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


// console.log('roles', order.roles);


  return (
    <div>

      { order?.roles
        ? order.roles.map(role => 
          <div key={role.asz32_id} className={styles.agreements}>
            <Row>
              <label>{`${dictionary.system[lang]}`}</label>
              <div className={styles.wrapField}><InfoField val = {role.asz00_full_name} /></div>
            </Row>
            <Row>
              <label>{`${dictionary.subsystem[lang]}`}</label>
              <div className={styles.wrapField}><InfoField val = {lang === 'RU' ? order.main.asz80_full_name : order.main.asz80_full_name_en} /></div>
            </Row>
            <Row>
              <label>{`${dictionary.nameRole[lang]}`}</label>
              <div className={styles.wrapField}><InfoField val = {role.asz03_name} /></div>
            </Row>
            <Row>
              <label>{`${dictionary.nameProcessGroup[lang]}`}</label>
              <div className={styles.wrapField}><InfoField val = {role.asz02_name} /></div>
            </Row>
            <Row>
              <label>{`${dictionary.code[lang]}`}</label>
              <div className={styles.wrapField}><InfoField val = {role.role_cod} /></div>
            </Row>
            <Row>
              <label>{`${dictionary.role_valid[lang]}`}</label>
              <div className={styles.wrapField}><InfoField val = {`${role.date_from} - ${role.date_to}`} /></div>
            </Row>
            <Row>
              <label>{`${dictionary.comment[lang]}`}</label>
              <div className={styles.wrapField}><InfoField val = {role.comments} /></div>
            </Row>

            <ul className={styles.roleAgreements}>{ 
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

          </div>
        )
        : null

      }
    </div>    
  )
}
