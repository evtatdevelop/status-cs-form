import styles from './modalCancel.module.scss';
import { useSelector } from "react-redux";
import dark from '../../../../dark.module.scss';
import light from '../../../../light.module.scss';
import { darkTheme, } from '../../../../appSlice';

export const ModalCancel = props => {


  const darkMode = useSelector(darkTheme);
  const selectModalCancel = darkMode ? `${styles.modalCancel} ${dark.modalCancel}` : `${styles.modalCancel} ${light.modalCancel}`;


  return (
    <div className={selectModalCancel}>
      <textarea/>
      <div>
        <button type='button' onClick={ () => props.setModal(null) }>ok</button>
        <button type='button' onClick={ () => props.setModal(null) }>Cancel</button>
      </div>
      
    </div>
  )
}