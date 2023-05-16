import { ThemeProvider } from '@mui/material';
import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { theme } from './theme';

const App = lazy(() => import('./App'));
const ScopedCssBaseline = lazy(() => import('@mui/material/ScopedCssBaseline'));

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ScopedCssBaseline>
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  </ScopedCssBaseline>,
);
