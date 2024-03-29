import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// redux
import { store } from './redux/configStore';
import { Provider } from 'react-redux'
// react-router-dom
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
);

