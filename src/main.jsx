import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import Tasklist from './components/TaskList/TaskList';

const rootElement = document.getElementById('root');
const reactRoot = createRoot(rootElement);

reactRoot.render(
  <StrictMode>
    <section className="todoapp">
      <Tasklist />
    </section>
  </StrictMode>
);
