import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import 'focus-visible';
import './styles/app.scss';

createRoot(document.getElementById('root')!).render(<App />);
