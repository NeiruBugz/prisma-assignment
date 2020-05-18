import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import 'react-data-grid/dist/react-data-grid.css';
import './styles/index.sass';

import { App } from './layouts/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
