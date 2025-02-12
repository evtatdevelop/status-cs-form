import styles from './statusOrder.module.scss';
import { useParams } from "react-router-dom";

export const StatusOrder = () => {

  const { id } = useParams();

  // useEffect(() => {
  //   dispatch(getOrder( {'api_key': api_key, 'order_type': system, 'order_id': id, } ));
  //   dispatch(cleanSentStatusPage())
  // }, []);
  
  return (
    <section className={styles.statusOrder} >
      <h1>{id ? `Status Order: ${id}` : 'Application ID required' }</h1>
    </section>    
  )
}
