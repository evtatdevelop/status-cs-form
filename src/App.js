/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect,  } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './App.module.scss';
import dark from './dark.module.scss'
import light from './light.module.scss'
import { Routes, Route } from 'react-router';
import { pathBase } from './config';
import { StatusOrder, } from './features/statusOrder/statusOrder';
import { darkTheme, langMode, setLangMode, setTheme } from "./appSlice";
import { getRemote, remoteUser, } from "./features/user/userSlice";

function App() {
  const dispatch = useDispatch(); 
  const user = useSelector(remoteUser);
  const lang = useSelector(langMode);
  
  useEffect(() => {
    dispatch(setTheme( false || JSON.parse(localStorage.getItem('darkTheme')) ));
  }, []);

  useEffect(() => {
    dispatch(getRemote());
  }, []);

  useEffect(() => {
    if (user?.lang && !lang) dispatch(setLangMode(user.lang));
  }, [dispatch, user.lang]);

  
  console.log(user);


  const darkMode = useSelector(darkTheme);
  const styleApp = darkMode ? `${styles.app} ${dark.app}` : `${styles.app} ${light.app}`;

  return (
    <div className={styleApp}>
      <Routes>
        <Route path={`/`} > 
          <Route path={`${pathBase}/`} element={<div>No order is selected.</div>}/>
          <Route path={`${pathBase}/:id`} element={<StatusOrder/>}/>
        </Route>
      </Routes>
  </div>
  );
}

export default App;
