import { useState, useRef, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import AuthCtx from '../Contex/AuthContext'
import classes from './AuthForm.module.css';


const AuthForm = () => {

  const [isLogin, setIsLogin] = useState(true);
  //const [token, setToken] = useState(0);

  const history = useHistory();
  const ctx = useContext(AuthCtx);
  
  const EmailRef = useRef();
  const PasswordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onSubmitHandler = (e) =>{
 e.preventDefault();
 console.log('password entered', PasswordRef.current.value)

 if(isLogin) {

  
  fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAzZVAcgGS_VK-yHCAUzBU1mnaPcgvz3kc',
  {
    method: 'POST',
    body :  JSON.stringify({
    
      email: EmailRef.current.value,
      password: PasswordRef.current.value,
    returnSecureTocken: true
    }),
    
    headers: {
      'Content-Type' : 'application/json'
    }
    
      }
    ).then((res)=>{
        if(res.ok)
        {
          res.json().then((data)=>{
            console.log('data after fetch: ' ,data)
           // debugger;
          ctx.login(data.idToken);

          history.replace('/')
      
        //  console.log('context tocken ', ctx.authToken )
          })

         
        }
        else
        {
           res.json().then((data)=>{
             console.log(data)
           })
        }
    
      })
    
 }
 else {


  fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAzZVAcgGS_VK-yHCAUzBU1mnaPcgvz3kc', 
  {
method: 'POST',
body :  JSON.stringify({

  email: EmailRef.current.value,
  password: PasswordRef.current.value,
returnSecureTocken: true
}),

headers: {
  'Content-Type' : 'application/json'
}

  }
).then((res)=>{
    if(res.ok)
    {
      //  console.log('response after success ', res )
    }
    else
    {
       res.json().then((data)=>{
         console.log(data)
       })
    }

  })

}
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit = {onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref ={EmailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required  ref = {PasswordRef}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
