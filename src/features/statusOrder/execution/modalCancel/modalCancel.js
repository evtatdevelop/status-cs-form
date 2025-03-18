import styles from './modalCancel.module.scss';

export const ModalCancel = props => {

  return (
    <div className={styles.modalCancel}>
      <textarea/>
      <div>
        <button type='button' onClick={ () => props.setModal(null) }>ok</button>
        <button type='button' onClick={ () => props.setModal(null) }>Cancel</button>
      </div>
      
    </div>
  )
}