import { useState } from 'react';
import styles from './execution.module.scss';
import dark from '../../../dark.module.scss';
import light from '../../../light.module.scss';
import { useSelector, } from "react-redux";
import { orderData } from '../../order/orderSlice';
import { darkTheme, langMode } from '../../../appSlice';
import dictionary from "../../../dictionary.json";
import { Modal } from '../../modal/modal';
import { ModalCancel } from './modalCancel/modalCancel';
import { ModalPass } from './modalPass/modalPass';

export const Execution = () => {
  const order = useSelector(orderData);
  const lang = useSelector(langMode);

  const [modal, setModal] = useState(null);

  // console.log('orderEx: ', order.execute_list);
  
  const cancExec = () => {
    console.log('cancExec');
    
  }
  const passExec = () => {
    console.log('passExec');
    
  }

  const darkMode = useSelector(darkTheme);
  const styleExecution = darkMode ? `${styles.execution} ${dark.execution}` : `${styles.execution} ${light.execution}`;

  return (
    <div className={styleExecution} >
      <h3>{dictionary.execution[lang]}</h3>
      <ul>
        <li>
          <label>{dictionary.executor[lang]}</label>
          <label>{dictionary.route[lang]}</label>
          <label>{dictionary.receipt_mark[lang]}</label>
          <label>{dictionary.mark_completed[lang]}</label>
          <label>{dictionary.comment[lang]}</label>          
        </li>

        { order.execute_list.map((item, index) => <li key={index}>
          <div>
            {item.fio_short}
            <span className={styles.smaller}>{item.position_name}</span>
            <a className={styles.smaller} href={`mailto:${item.email}`}>{item.email}</a>
          </div>
          <div>{item.asz70_route}</div>
          
          <div>
            { item.asz70_receive_flag === '1'
              ? <>
                  Получено {item.app12_id !== item.asz70_receive_app12_id ? ' в режиме замещения' : ''}
                  <span>{item.receive_fio_short}</span>
                  <a className={styles.smaller} href={`mailto:${item.receive_email}`}>{item.receive_email}</a>
                  <span className={styles.smaller}>{item.asz70_receive_date}</span>
                </>
              : 'Не получено'  
            }
          </div>
          <div>
            { item.asz70_execute_flag === '1'
              ? <>
                'Выполнено' {item.app12_id !== item.asz70_receive_app12_id ? ' в режиме замещения' : ''}
                <span>{item.execute_fio_short}</span>
                <a className={styles.smaller} href={`mailto:${item.execute_email}`}>{item.execute_email}</a>
                <span className={styles.smaller}>{item.asz70_execute_date}</span>
                </>
              : item.show_execution_buttons_flag  === '1'
                ? <>
                    <button type='button' onClick={ () => setModal('cancExec') }>Отметить выполнение</button>
                    <button type='button' onClick={ () => setModal('passExec') }>Делегировать</button>
                  </>
                : null
            }
          </div>
          <div>{item.asz70_comments}</div>
        </li>)}

      </ul>

      { modal === 'cancExec'
        ? <Modal>
            <ModalCancel setModal = {setModal}/>
          </Modal>
        : null
      }     

      { modal === 'passExec'
        ? <Modal>
            <ModalPass setModal = {setModal}/>
          </Modal>
        : null
      }     

    </div>    
  )
}
