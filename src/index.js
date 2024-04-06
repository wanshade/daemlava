import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AplikasiSTK from './stk';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <App />
      <AplikasiSTK />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
