import styles from './attachments.module.scss';
import dark from '../../../dark.module.scss';
import light from '../../../light.module.scss';
import { useSelector, } from "react-redux";
import { orderData } from '../../order/orderSlice';
import { darkTheme, langMode } from '../../../appSlice';
import dictionary from "../../../dictionary.json";

export const Attachments = () => {
  const order = useSelector(orderData);
  const lang = useSelector(langMode);
  
  const darkMode = useSelector(darkTheme);
  const styleAttachments = darkMode ? `${styles.attachments} ${dark.attachments}` : `${styles.attachments} ${light.attachments}`;
  return (
    <section className={styleAttachments}>
      <h3>{dictionary.attachments[lang]}</h3>
      { order?.attachments
        ? <ul>
            {
              order.attachments.map(item => <li key={item.id}><a href={`https://asuz.digtp.com/corpsystems_newrelease/download${order.main.session_key}_${item.id}`}>{item.file_name}</a></li>)
            }
          </ul>
        : null

      }
    </section>
  )
}
