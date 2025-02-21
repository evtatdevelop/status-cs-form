import styles from './orderData.module.scss';
import dark from '../../../dark.module.scss';
import light from '../../../light.module.scss';
import { useSelector, } from "react-redux";
import { orderData } from '../../order/orderSlice';
import { darkTheme, langMode } from '../../../appSlice';
import dictionary from "../../../dictionary.json";
import { strToStrDate } from "../../../utils";

export const OrderData = () => {

  const order = useSelector(orderData);
  const lang = useSelector(langMode);
  
  const darkMode = useSelector(darkTheme);
  const styleOrderData = darkMode ? `${styles.orderData} ${dark.orderData}` : `${styles.orderData} ${light.orderData}`;
  
  const calcStatus = status => {
    switch( status ) {
      case 'agreed': return dictionary.status_complete[lang];
      case 'refused': return dictionary.status_rejected[lang];
      case 'refused_timeout': return dictionary.status_timeout[lang];
      case 'refused_failed': return dictionary.status_errors[lang];
      case 'canceled': return dictionary.status_initiator[lang];
      case 'added': return dictionary.status_created[lang];
      default: return dictionary.status_inProgress[lang];
    }
  } 

  return (
    <ul className={styleOrderData} >

      { order?.main?.date_open
        ? <li>
            <div>{dictionary.date_creation[lang]}:</div>  
            <div>{strToStrDate(order.main.date_open, lang)}</div>
          </li>
        : null
      }

      { order?.main?.date_close
        ? <li>
            <div>{dictionary.closing_date[lang]}:</div>  
            <div>{strToStrDate(order.main.date_close, lang)}</div>
          </li>
        : null
      }

      { order?.main?.author_name
        ? <li>
            <div>{dictionary.applicant[lang]}:</div>  
            <div>{order.main.author_name} (<a href={`mailto:${order.main.author_email}`}>{order.main.author_email}</a>)</div>
          </li>
        : null
      }

      { order?.main?.status
        ? <li>
            <div>{dictionary.request_status[lang]}:</div>  
            <div>{calcStatus(order.main.status)}</div>
          </li>
        : null
      }

      { order?.main?.last_name
        ? <li>
            <div>{dictionary.requested_employee[lang]}:</div>  
            <div>{order.main.last_name} {order.main.first_name} {order.main.middle_name} (<a href={`mailto:${order.main.email}`}>{order.main.email}</a>)</div>
          </li>
        : null
      }

      { order?.main?.ad_account
        ? <li>
            <div>{dictionary.ad_account[lang]}:</div>  
            <div>{order.main.ad_account}</div>
          </li>
        : null
      }

      { order?.main?.position
        ? <li>
            <div>{dictionary.position[lang]}:</div>  
            <div>{order.main.position}</div>
          </li>
        : null
      }

      { order?.main?.company
        ? <li>
            <div>{dictionary.company[lang]}:</div>  
            <div>{order.main.company}</div>
          </li>
        : null
      }

      { order?.main?.branch
        ? <li>
            <div>{dictionary.branch[lang]}:</div>  
            <div>{order.main.branch}</div>
          </li>
        : null
      }

      { order?.main?.division
        ? <li>
            <div>{dictionary.department[lang]}:</div>  
            <div>{order.main.division}</div>
          </li>
        : null
      }

      { order?.main?.location
        ? <li>
            <div>{dictionary.location[lang]}:</div>  
            <div>{order.main.location}</div>
          </li>
        : null
      }

    </ul>    
  )
}
