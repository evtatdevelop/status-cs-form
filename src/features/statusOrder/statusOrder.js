import { useEffect,  } from 'react';
import styles from './statusOrder.module.scss';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { orderData, getOrderData, loading } from '../order/orderSlice';
import { Loader } from '../components/loader/loader';

export const StatusOrder = () => {

  const { id } = useParams();
  const order = useSelector(orderData);
  const loadingData = useSelector(loading);
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(getOrderData( {'order_type': 'corpsystems', 'id': id, } ));
  }, [dispatch, id]);

  console.log('order: ',order);
  
  
  return (
    <section className={styles.statusOrder} >
      { !loadingData
        ? <>
            <h1 className={styles.interfaceColor}>АВТОМАТИЗИРОВАННАЯ СИСТЕМА УПРАВЛЕНИЯ ЗАЯВКАМИ (АСУЗ)</h1>
            { order?.main?.asz31_id
              ? <p>{`OrderID: ${order.main.asz31_id}`}</p>
              : null
            }        
          </>
        : <Loader/>
      }
    </section>    
  )
}
