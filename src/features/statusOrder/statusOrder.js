/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect,  } from 'react';
import styles from './statusOrder.module.scss';
import dark from '../../dark.module.scss';
import light from '../../light.module.scss';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { orderData, getOrderData, loading } from '../order/orderSlice';
import { Loader } from '../components/loader/loader';
import { darkTheme, langMode } from '../../appSlice';
import { Header } from '../header/header';
import dictionary from "../../dictionary.json";
import { oredrType } from '../../config';

export const StatusOrder = () => {

  const { id } = useParams();
  const order = useSelector(orderData);
  const loadingData = useSelector(loading);
  const lang = useSelector(langMode);
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(getOrderData( {'order_type': oredrType, 'id': id, } ));
  }, [lang]);

  
  console.log('order: ',order);
  console.log('lang: ',lang);
  
  
  const darkMode = useSelector(darkTheme);
  const styleStatusOrder = darkMode ? `${styles.statusOrder} ${dark.statusOrder}` : `${styles.statusOrder} ${light.statusOrder}`;
  const styleNumOrder = darkMode ? `${dark.numOrder}` : `${light.numOrder}`;
  
  return (
    <section className={styleStatusOrder} >
      <Header/>
      { !loadingData
        ? <div className={styles.main}>
              <h1>{dictionary.ams_order_form[lang]}</h1>
              <h2>{order?.corp_system?.full_name_lang}</h2>
              { order?.main?.asz31_id && lang
                ? <div>
                    <p className={styleNumOrder}>{`${dictionary.request_number[lang]}`} {`${order.main.asz31_id}`}</p>

                    { order?.main?.date_open
                      ? <p>{`${dictionary.date_creation[lang]} ${order.main.date_open}`}</p>
                      : null
                    }

                    { order?.main?.date_close
                      ? <p>{`${dictionary.closing_date[lang]} ${order.main.date_close}`}</p>
                      : null
                    }

                    { order?.main?.author_name
                      ? <p>{`${dictionary.applicant[lang]} ${order.main.author_name} (${order.main.author_email})`}</p>
                      : null
                    }

                    { order?.main?.status
                      ? <p>{`${dictionary.request_status[lang]} ${order.main.status}`}</p>
                      : null
                    }

                    { order?.main?.status
                      ? <p>{`${dictionary.requested_employee[lang]} ${order.main.last_name} ${order.main.first_name} ${order.main.middle_name} (${order.main.email})`}</p>
                      : null
                    }

                    { order?.main?.ad_account
                      ? <p>{`${dictionary.ad_account[lang]} ${order.main.ad_account}`}</p>
                      : null
                    }

                    { order?.main?.position
                      ? <p>{`${dictionary.position[lang]} ${order.main.position}`}</p>
                      : null
                    }

                    { order?.main?.company
                      ? <p>{`${dictionary.company[lang]} ${order.main.company}`}</p>
                      : null
                    }

                    { order?.main?.branch
                      ? <p>{`${dictionary.branch[lang]} ${order.main.branch}`}</p>
                      : null
                    }

                    { order?.main?.division
                      ? <p>{`${dictionary.department[lang]} ${order.main.division}`}</p>
                      : null
                    }

                    { order?.main?.location
                      ? <p>{`${dictionary.location[lang]} ${order.main.location}`}</p>
                      : null
                    }

                  </div>
                : null
              } 
            </div>
        : <Loader/>
      }
    </section>    
  )
}
