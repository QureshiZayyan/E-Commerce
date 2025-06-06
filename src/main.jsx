// import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { StateProvider } from './components/states/StateProvider';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StateProvider>
      <App />
    </StateProvider>
  </Provider>
);