import styles from './modal.module.scss';

export const Modal = props => {

  return (
    <section className={styles.modal}>
      {props.children}
    </section>
  )
}