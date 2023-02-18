import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RouterConfig from './jsx/Routes/Route';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterConfig />
  </React.StrictMode>
);

