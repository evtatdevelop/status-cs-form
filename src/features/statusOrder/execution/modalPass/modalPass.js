import styles from './modalPass.module.scss';
import { SelectInput } from '../../../components/selectInput/selectInput';

export const ModalPass = props => {

  return (
    <div className={styles.modalPass}>
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