import { useState } from 'react';
import styles from './modalCancel.module.scss';
import { useSelector } from "react-redux";
import dark from '../../../../dark.module.scss';
import light from '../../../../light.module.scss';
import { darkTheme, langMode} from '../../../../appSlice';
import dictionary from "../../../../dictionary.json";
// import { orderData } from '../../../order/orderSlice';

export const ModalCancel = props => {

  const { setModal, modal } = props;

  // const order = useSelector(orderData);
  const [comment, setComment] = useState('');

  // console.log('orderEx: ', order.execute_list);
  // console.log('modal: ', modal);

  const lang = useSelector(langMode);
  const darkMode = useSelector(darkTheme);
  const selectModalCancel = darkMode ? `${styles.modalCancel} ${dark.modalCancel}` : `${styles.modalCancel} ${light.modalCancel}`;

  const cancExec = () => {
    console.log(modal.mode);
    console.log('comment', comment);
    console.log('session_key', modal.session_key);
    console.log('asz31_id', modal.asz31_id);
    setModal(null);
  }

  return (
    <div className={selectModalCancel}>
      <textarea placeholder = {dictionary.comment[lang]} onInput={e => setComment(e.target.value)}/>
      <div>
        <button type='button' onClick={ () => cancExec() }>{dictionary.ok_btn[lang]}</button>
        <button type='button' onClick={ () => setModal(null) }>{dictionary.cancel[lang]}</button>
      </div>
      
    </div>
  )
}