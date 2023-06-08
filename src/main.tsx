import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './assets/fonts/fonts.css';
import './App.css';
import './App.scss';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
