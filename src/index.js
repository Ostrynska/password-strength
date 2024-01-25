import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    <ToastContainer />
  </ThemeProvider>
);

