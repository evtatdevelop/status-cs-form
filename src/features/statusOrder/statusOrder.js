import { useEffect,  } from 'react';
import styles from './statusOrder.module.scss';
import dark from '../../dark.module.scss';
import light from '../../light.module.scss';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { orderData, getOrderData, loading } from '../order/orderSlice';
import { Loader } from '../components/loader/loader';
import { darkTheme, } from '../../appSlice';
import { Header } from '../header/header';
import dictionary from "../../dictionary.json";
import { remoteUser } from '../user/userSlice';

export const StatusOrder = () => {

  const { id } = useParams();
  const order = useSelector(orderData);
  const loadingData = useSelector(loading);
  const user = useSelector(remoteUser);
  const dispatch = useDispatch(); 

  useEffect(() => {
    if ( !Object.keys(order).length ) dispatch(getOrderData( {'order_type': 'corpsystems', 'id': id, } ));
  }, [dispatch, id, order]);

  
  console.log('order: ',order);
  
  
  const darkMode = useSelector(darkTheme);
  const styleStatusOrder = darkMode ? `${styles.statusOrder} ${dark.statusOrder}` : `${styles.statusOrder} ${light.statusOrder}`;
  
  return (
    <section className={styleStatusOrder} >
      <Header/>
      { !loadingData
        ? <div className={styles.main}>
            <h1 className={styles.interfaceColor}>{dictionary.ams_order_form[user.lang]}</h1>
            { order?.main?.asz31_id
              ? <p>{`OrderID: ${order.main.asz31_id}`}</p>
              : null
            } 
      
          </div>
        : <Loader/>
      }
    </section>    
  )
}
