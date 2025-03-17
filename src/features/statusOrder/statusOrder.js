import { useEffect, } from 'react';
import styles from './statusOrder.module.scss';
import dark from '../../dark.module.scss';
import light from '../../light.module.scss';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { orderData, getOrderData, loading, } from '../order/orderSlice';
import { Loader } from '../components/loader/loader';
import { darkTheme, langMode } from '../../appSlice';
import { Header } from '../header/header';
import dictionary from "../../dictionary.json";
import { oredrType } from '../../config';
import { OrderData } from './orderData/orderData';
import { langLoading } from '../user/userSlice';
import { RequestPrivsAll } from './requestPrivsAll/requestPrivsAll';
import { Agreements } from './agreements/agreements';
import { remoteUser } from '../user/userSlice';
import { Attachments } from './attachments/attachments';
import { Control } from './control/control';
import { Execution } from './execution/execution';

export const StatusOrder = () => {

  const { id } = useParams();
  const order = useSelector(orderData);
  const loadingData = useSelector(loading);
  const langLoadingData = useSelector(langLoading);
  const lang = useSelector(langMode);
  const dispatch = useDispatch(); 
  const user = useSelector(remoteUser);

  useEffect(() => {
    if ( user.lang ) dispatch(getOrderData( {'order_type': oredrType, 'id': id, } ));
  }, [dispatch, id, user.lang]);
  
  const darkMode = useSelector(darkTheme);
  const styleStatusOrder = darkMode ? `${styles.statusOrder} ${dark.statusOrder}` : `${styles.statusOrder} ${light.statusOrder}`;
  
  return (
    <section className={styleStatusOrder} >
      <Header/>
      { !loadingData && !langLoadingData && lang
        ? <>
            <h1>{dictionary.ams_order_form[lang]}</h1>
            <h2>{order?.corp_system?.full_name_lang}</h2>
            <h3>{`${dictionary.request_number[lang]}`}: <span>{`${order?.main?.order_num}`}</span></h3>            
            <OrderData/>
            <RequestPrivsAll/>
            <Agreements/>
            <Attachments/>
            { order?.execute_list?.length
              ? <Execution/>
              : null
            }
            <Control/>
          </>
        : <Loader/>
      }
    </section>    
  )
}
