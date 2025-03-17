import styles from './control.module.scss';
import { useSelector, useDispatch } from "react-redux";
import dark from '../../../dark.module.scss';
import light from '../../../light.module.scss';
import { orderData } from '../../order/orderSlice';
import { darkTheme, langMode } from '../../../appSlice';
import dictionary from "../../../dictionary.json";
import { completeStageData, removeRequestData, actionsLoading } from '../../order/orderSlice';
import { TestLoader } from './testLoader';

export const Control = () => {
  const dispatch  = useDispatch();
  const order = useSelector(orderData);
  const lang = useSelector(langMode);
  const actionsLoad = useSelector(actionsLoading);

  // console.log('order: ',order);

  const darkMode = useSelector(darkTheme);
  const styleControl = darkMode ? `${styles.control} ${dark.control}` : `${styles.control} ${light.control}`;
  
  const complete_stage = () => {
    console.log('complete_stage');
     // if($this->remoteuser['id'] == $id_author){
    dispatch(completeStageData({'asz31_id': order.main.asz31_id, }));
  }
  
  const remove_request = () => {
    console.log('remove_request');
     // if($this->remoteuser['id'] == $id_author){
    dispatch(removeRequestData({'asz31_id': order.main.asz31_id, }));
  }

  return (
    <section className={styleControl}>
      <div>
        <button type='button'
          onClick={()=>complete_stage()}
        >{ actionsLoad
           ? <TestLoader/>
           : dictionary.complete_stage[lang]
        }</button>
        <button type='button'
          onClick={()=>remove_request()}
        >{ actionsLoad
          ? <TestLoader/>   
          : dictionary.remove_request[lang]
        
        }</button>        
      </div>
      <div>
        <span>{dictionary.complete_stage_description[lang]}</span>
        <span>{dictionary.remove_request_description[lang]}</span>
      </div>

    </section>
  )
}
