import { useState } from 'react';
import styles from './modalPass.module.scss';
import { useSelector } from "react-redux";
import { SelectInput } from '../../../components/selectInput/selectInput';
import dark from '../../../../dark.module.scss';
import light from '../../../../light.module.scss';
import { darkTheme, langMode } from '../../../../appSlice';
import dictionary from "../../../../dictionary.json";

export const ModalPass = props => {

  const { setModal, modal } = props;

  const [comment, setComment] = useState('');
  const [user, setUser] = useState('');

  // console.log('orderEx: ', order.execute_list);
  // console.log('modal: ', modal);

  const lang = useSelector(langMode);
  const darkMode = useSelector(darkTheme);
  const selectVodalPass = darkMode ? `${styles.modalPass} ${dark.modalPass}` : `${styles.modalPass} ${light.modalPass}`;

  const passExec = () => {
    console.log(modal.mode);
    console.log('user', user);
    console.log('comment', comment);
    console.log('session_key', modal.session_key);
    console.log('asz31_id', modal.asz31_id);
    setModal(null);
  }

  return (
    <div className={selectVodalPass}>
      <textarea placeholder = {dictionary.comment[lang]} onInput={e => setComment(e.target.value)}/>
      <SelectInput
        selectHandler = { val => setUser(val) }
        placeholder = {dictionary.userNameOlaceholder[lang]}
        val = ''
        name='userName'
        mode = 'user'
        id = 'oredrUser'
      />
      <div>
        <button type='button' onClick={ () => passExec() }>{dictionary.ok_btn[lang]}</button>
        <button type='button' onClick={ () => setModal(null) }>{dictionary.cancel[lang]}</button>
      </div>
    </div>
  )
}