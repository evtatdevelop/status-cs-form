import { useState } from 'react';
import styles from './attachments.module.scss';
import { useSelector, useDispatch } from "react-redux";
import dark from '../../../dark.module.scss';
import light from '../../../light.module.scss';
import { orderData } from '../../order/orderSlice';
import { darkTheme, langMode } from '../../../appSlice';
import dictionary from "../../../dictionary.json";
import { deldelAttachData, attachLoading} from '../../order/orderSlice';
import { TestLoader } from './testLoader';

export const Attachments = () => {
  const dispatch  = useDispatch();
  const order = useSelector(orderData);
  const lang = useSelector(langMode);
  const attachLoad = useSelector(attachLoading);

  const [loadingId, setloadingId] = useState(null);

  const deldelAttach = id => {
    dispatch(deldelAttachData({'asz63_id': id, 'asz31_id': order.main.asz31_id,}));
    setloadingId(id);
  }
  
  console.log('order: ',order);

  const darkMode = useSelector(darkTheme);
  const styleAttachments = darkMode ? `${styles.attachments} ${dark.attachments}` : `${styles.attachments} ${light.attachments}`;
  
  return (
    <section className={styleAttachments}>
      <h3>{dictionary.attachments[lang]}</h3>
      { order?.attachments
        ? <ul> { order.attachments.map(item => 
            <li key={item.id}>
              <div>
                <a href={`https://asuz.digtp.com/corpsystems_newrelease/download${order.main.session_key}_${item.id}`}>{item.file_name}</a>
                <p>Add: {item.app12_fio} (<a href={`mailto:${item.app12_email}`}>{item.app12_email}</a>) {item.date_create}</p>                    
              </div>
              { item.can_delete_file === '1'
                ? <button type='button'
                    onClick={() => deldelAttach(item.id)}
                  >{ attachLoad && loadingId === item.id
                    ? <TestLoader/>
                    : <>&times;</>
                    }</button>
                : null     
              }
              
            </li>
          ) } </ul>
        : null

      }
    </section>
  )
}
