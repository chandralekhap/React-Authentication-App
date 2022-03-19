import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import {AuthContext} from './components/Contex/AuthContext'
import './index.css';
import App from './App';

ReactDOM.render(
  <AuthContext>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </AuthContext>,
  document.getElementById('root')
);
