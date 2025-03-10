import {  useState } from 'react';
import styles from './attachments.module.scss';
import { useSelector, useDispatch } from "react-redux";
import dark from '../../../dark.module.scss';
import light from '../../../light.module.scss';
import { orderData } from '../../order/orderSlice';
import { darkTheme, langMode } from '../../../appSlice';
import dictionary from "../../../dictionary.json";
import { deldelAttachData, delAttachLoading} from '../../order/orderSlice';
import { TestLoader } from './testLoader';
import { UploadFile } from '../../uploadFile/uplodeFile';
import { downloadFile } from '../../order/orderSliceAPI';

export const Attachments = () => {
  const dispatch  = useDispatch();
  const order = useSelector(orderData);
  const lang = useSelector(langMode);
  const attachLoad = useSelector(delAttachLoading);

  const [loadingId, setloadingId] = useState(null);

  const deldelAttach = id => {
    dispatch(deldelAttachData({'asz63_id': id, 'asz31_id': order.main.asz31_id,}));
    setloadingId(id);
  }

  // console.log('order: ',order.attachments);

  const darkMode = useSelector(darkTheme);
  const styleAttachments = darkMode ? `${styles.attachments} ${dark.attachments}` : `${styles.attachments} ${light.attachments}`;
  
  return (
    <section className={styleAttachments}>
      <h3>{dictionary.attachments[lang]}</h3>
      { order?.attachments
        ? <ul> { order.attachments.map(item => 
            <li key={item.id}>
              <label>{item.file_name.split('.')[1]}</label>
              <div>
                {/* <a href={`https://asuz.digtp.com/corpsystems_newrelease/download${order.main.session_key}_${item.id}`}>{item.file_name}</a> */}
                <a href={`https://asuz.digtp.com/api/download.php?orderid=${order.main.session_key}&file_id=${item.id}`}>{item.file_name}</a>
                {/* <a href={`https://asuz.digtp.com/api_tst/download${order.main.session_key}_${item.id}`}>{item.file_name}</a> */}
                {/* <button onClick={() => downloadFile({'asz31_id': order.main.session_key, 'asz63_id': item.id})}>{item.file_name}</button> */}
                <p>{item.app12_fio} (<a href={`mailto:${item.app12_email}`}>{item.app12_email}</a>) {item.date_create}</p>                    
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
      <UploadFile/>
    </section>
  )
}
