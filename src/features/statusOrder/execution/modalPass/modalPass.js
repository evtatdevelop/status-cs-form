import styles from './modalPass.module.scss';
import { useSelector } from "react-redux";
import { SelectInput } from '../../../components/selectInput/selectInput';
import dark from '../../../../dark.module.scss';
import light from '../../../../light.module.scss';
import { darkTheme, } from '../../../../appSlice';

export const ModalPass = props => {


  const darkMode = useSelector(darkTheme);
  const selectVodalPass = darkMode ? `${styles.modalPass} ${dark.modalPass}` : `${styles.modalPass} ${light.modalPass}`;

  return (
    <div className={selectVodalPass}>
      <textarea/>
      <SelectInput
        selectHandler = { val => console.log(val) }
        placeholder = {``}
        val = ''
        name='userName'
        mode = 'user'
        id = 'oredrUser'
      />
      <div>
        <button type='button' onClick={ () => props.setModal(null) }>ok</button>
        <button type='button' onClick={ () => props.setModal(null) }>Cancel</button>
      </div>
    </div>
  )
}