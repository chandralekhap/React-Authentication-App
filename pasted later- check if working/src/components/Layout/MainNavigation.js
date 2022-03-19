import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import {useContext} from 'react'
import AuthCtx from '../Contex/AuthContext'
import {useHistory} from 'react-router-dom';


const MainNavigation = () => {

  const context = useContext(AuthCtx)
  console.log('context in mainNavigator: ', context)
const history = useHistory();

  const onLogoutHandler = () =>{

    context.logout();
    history.replace('/auth')
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
        { !context.isLogin &&  (<li>
            <Link to='/auth'>Login</Link>
        </li>)}
         { context.isLogin &&  <li>
            <Link to='/profile'>Profile</Link>
          </li>}
        { context.isLogin && <li>
          <button onClick = {onLogoutHandler}>Logout</button>
        </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
