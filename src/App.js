import styles from './App.module.scss';
import { useEffect,  } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { loading, langLoading, getRemote } from './features/user/userSlice';
import { Routes, Route } from 'react-router-dom';
import { Loader } from './features/components/loader/loader';
import { pathBase } from './config';
import { LoadPage } from './features/loadPage/loadPage';
import { StatusOrder } from './features/statusOrder/statusOrder';
// import { StatusPage } from './features/statusPage/statusPage';
// import { Corpsystems } from './features/corpsystems/corpsystems';
// import ExpirationScreen from './features/expirationScreen';
// import { useState } from 'react';cTEMP_
// import { MainPage } from './features/main/mainpage';

function App() {
  const load = useSelector(loading);
  const langLoad = useSelector(langLoading);
  const dispatch = useDispatch();  
  // const [expired, onExpired] = useState(false);

  useEffect(() => { 
    dispatch(getRemote());
    // setTimeout(() => { onExpired(true); document.body.style.overflow = "hidden"}, 12*60*60*1000)
  }, [dispatch, ]);

  return (
    // expired 
    // ? <ExpirationScreen/>
    // : 
    load
      ? <LoadPage/>
      : <div className={styles.app}>
          <Routes>
            <Route path={`${pathBase}/`} > 
            {/* <Route path={`status`} element={<StatusOrder/>}/> */}
            <Route path={`/:id`} element={<StatusOrder/>}/>
              {/* <Route path={`/`} element={<MainPage/>}/>
              <Route path={`corpsystems/`} element={<Corpsystems/>}/>
              <Route path={`corpsystems/:system`} element={<Corpsystems/>}/> */}
              {/* <Route path={`status`} element={<StatusPage/>}/> */}
              {/* <Route path={`status/:system`} element={<StatusPage/>}/> */}
              {/* <Route path={`status/:system/:id`} element={<StatusPage/>}/> */}
            </Route>
          </Routes>
          { langLoad ? <Loader/> : null }
      </div>
  );
}

export default App;
