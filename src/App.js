import styles from './App.module.scss';
import { Routes, Route } from 'react-router';
import { pathBase } from './config';
import { StatusOrder, } from './features/statusOrder/statusOrder';

function App() {

  return (
    <div className={styles.app}>
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
