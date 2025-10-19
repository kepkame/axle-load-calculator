import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Buffer } from 'buffer';
import store from './store/index.ts';
import App from './App.tsx';

import 'focus-visible';
import './styles/app.scss';

window.Buffer = Buffer;

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('The root element was not found');
}

createRoot(rootElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
