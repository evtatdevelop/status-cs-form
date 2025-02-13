import styles from './App.module.scss';
import { useEffect,  } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { loading, langLoading, getRemote } from './features/user/userSlice';
import { Routes, Route } from 'react-router';
import { Loader } from './features/components/loader/loader';
import { pathBase } from './config';
import { LoadPage } from './features/loadPage/loadPage';
import { StatusOrder } from './features/statusOrder/statusOrder';

function App() {
  const load = useSelector(loading);
  const langLoad = useSelector(langLoading);
  const dispatch = useDispatch();  

  useEffect(() => { 
    dispatch(getRemote());
  }, [dispatch, ]);

  console.log(`route: ${pathBase}`);


  return (
    // expired 
    // ? <ExpirationScreen/>
    // : 
    load
      ? <LoadPage/>
      : <div className={styles.app}>
          <Routes>
            <Route path={`/`} > 
              <Route path={`${pathBase}/`} element={<div>No order is selected.</div>}/>
              <Route path={`${pathBase}/:id`} element={<StatusOrder/>}/>
            </Route>
          </Routes>
          
          { langLoad ? <Loader/> : null }
      </div>
  );
}

export default App;
