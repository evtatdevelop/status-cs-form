import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import ErrorBoundry from './features/errorBoundry';
// import { BrowserRouter } from 'react-router';
import { HashRouter  } from 'react-router';
import './rest.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundry>
        {/* <BrowserRouter basename="/ams"> */}
        <HashRouter>
          <App />
        </HashRouter>  
        {/* </BrowserRouter> */}
      </ErrorBoundry>
    </Provider>
  </React.StrictMode>
);
